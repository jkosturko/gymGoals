
// $(function () {
	var Weeks = Backbone.Model.extend({
		idAttribute: '_id'
	});

	var WeekCollection = Backbone.Collection.extend({
		model: Weeks,
		url: "/weeks",
	});

	var WeekView = Backbone.View.extend({
		events: {
			// "click .name" : "singleWeekLink" ///check this why repeat
		},
		tagName: 'li',
		className: 'week',
		render: function () {
			var template = $('#weektemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model.attributes);
			this.$el.html(html);
			return this;
		},
		singleWeekLink: function () { 
			var id = this.model.get('_id');
			router.navigate("week/" + id, {trigger: true});
		}
	});

	var DetailedWeekView = Backbone.View.extend({
		initialize: function () {
			console.log('model', this.model)
			// this.listenTo(this.model, 'change', this.render);
		},		
		render: function () {
			console.log('Rendering Detailed week view')
			var template = $('#detailtemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model.attributes);
			console.log('mymodel',this.model);

			this.$el.html(html);
			return this;
		}
	});

	var WeekCollectionView = Backbone.View.extend({
		initialize: function () {
			this.listenTo(this.collection, 'reset', this.render);
		},
		tagName: 'ul',
		className: 'weeks',
		render: function () {
			console.log('rendering WeekCollectionView');
			this.$el.html('');
			this.collection.each(function (week) {
				weekView = new WeekView({ model: week });
				this.$el.append(weekView.render().el);
			}, this);

			return this;
		}
	});

var collection;
	var AppRouter = Backbone.Router.extend({
		initialize: function () {
			this._setupCollection();
		},
		_setupCollection: function () { 
			if(this.collection) 
				return;

			// Maybe implement a caching solution here
			// Jquery wasn't loaded yet
			var data = document.getElementById('initialContent').innerHTML;
			var json = JSON.parse(data);
			this.collection = new WeekCollection(JSON.parse(data));

		},
		_renderView: function (view) {
			$('.app').html(view.render().el);
		},
		routes: {
			"" : "index",
			"week/:id" : "singleWeek"
		},
		index: function () {
			var view = new WeekCollectionView({collection: this.collection});
			this._renderView(view);
		},
		singleWeek: function (id) {
			console.log('this.collection', this.collection);
			var week = this.collection.get(id);
			var view = new DetailedWeekView({model: week});
			this._renderView(view);
		}
	});	