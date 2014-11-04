
// $(function () {

	var Weeks = Backbone.Model.extend({
		idAttribute: '_id'
	});

	var WeekCollection = Backbone.Collection.extend({
		model: Weeks,
		url: "/weeks",
	});

	var Days = Backbone.Model.extend({
		idAttribute: '_id'
	});

	var DaysCollection = Backbone.Collection.extend({
		initialize: function () {
			this.Days = new Days();
			this.url =  '/weeks/' + '5457d213001264b182f06fef' +'/data'
			// body...
		}
	});

	//I wish each button had an id, so button/:id would work
	var ButtonView = Backbone.View.extend({
		initialize: function () {
			// console.log('this.index', this.index)
			// console.log('view att', this.attributes);
			// this.model.set({attributes: index});
		},		
		events: {
			"click .button" : 'pressButton'
		},
		tagName: 'li',
		className: 'button',
		render: function () {	
			var template = $('#buttontemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model);
			console.log('this.mode', this.model)
			this.$el.html(html);
			return this;	
		},
		pressButton: function (e) {
			console.log('mymodel', mymodel);
			var myData = this.model.set({checked: false})
		},	

	});

	var WeekView = Backbone.View.extend({
		events: {
			"click .name" : "singleWeekLink"
		},
		render: function () {
			this.$el.html('');

			var template = $('#weektemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model);
			this.$el.html(html);

			this.collection.each(function(model, i) {
				dayView = new ButtonView({ model: model, index: i});
				this.$el.append(dayView.render().el);
			}, this);

			return this;
		},			
		singleWeekLink: function (e) { 
			var id = this.model.get('_id');
			router.navigate("week/" + id, {trigger: true});
			e.preventDefault();
		}
	});


	var WeekCollectionView = Backbone.View.extend({
		initialize: function () {
			this.listenTo(this.collection, 'reset', this.render());
		},
		tagName: 'ul',
		className: 'weeks',
		render: function () {
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
			// var data = document.getElementById('initialContent').innerHTML;
			// var json = JSON.parse(data);
			// this.collection = new WeekCollection(JSON.parse(data));


			var data = document.getElementById('weekContent').innerHTML;
			var json = JSON.parse(data);
			console.log('data', data)
			this.collectionDays = new WeekCollection(JSON.parse(data));			
		},
		_renderView: function (view) {
			$('.app').html(view.render().el);
		},
		routes: {
			"" : "index",
			"weeks/:id" : "singleWeek",
 		},
		index: function () {
			var view = new WeekCollectionView({collection: this.collection});
			this._renderView(view);
		},
		singleWeek: function (id) {
			console.log('singleweek', this.collectionDays)
			var view = new WeekView({collection: this.collectionDays});
			this._renderView(view);
		}
	});	