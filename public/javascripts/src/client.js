
// $(function () {

	var Weeks = Backbone.Model.extend({
		idAttribute: '_id'
	});

	var WeekCollection = Backbone.Collection.extend({
		model: Weeks,
		url: "/weeks",
	});

	//I wish each button had an id, so button/:id would work
	var ButtonView = Backbone.View.extend({	
		tagName: 'li',
		className: 'button',
		render: function () {	
			var template = $('#buttontemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model.attributes);
			this.$el.html(html);
			return this;	
		}
	});
	
	// This is the view that you see when you click 
	// into a specific week
	var DetailView = Backbone.View.extend({
		initialize: function (options) {
			this.models = options.collection;
			console.log('DETAIL VIEW WAS TRIGGERED', this.models)
		},
		tagName: 'ul',
		events: {
			"click .button" : "pressButton"
		},
		render: function () {
			this.$el.html('');
			this.models.each(function(model) {
				dayView = new ButtonView({ model: model});
				this.$el.append(dayView.render().el);
			}, this);

			return this;			
		},
		pressButton: function () {
			console.log('you pressed the button on Detail View!')
		}		
	});

	var WeekView = Backbone.View.extend({
		initialize: function (options) {
			this.model = options.model;
		},
		tagName: 'ul',
		events: {
			"click .name" : "singleWeekLink",
		},
		render: function () {
			var template = $('#weektemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model.attributes);
			this.$el.html('');
			this.$el.html(html);

			return this;
		},			
		singleWeekLink: function (e) { 
			var id = this.model.get('_id');
			router.navigate("weeks/" + id, {trigger: true});
			e.preventDefault();
		}
	});


	var WeekCollectionView = Backbone.View.extend({
		initialize: function (options) {
			// this.listenTo(this.collection, 'reset', this.render());
			this.models = options.collection.models;
		},
		tagName: 'ul',
		className: 'weeks',
		render: function () {
			this.$el.html('');
			_.each(this.models,function (model) {
				weekView = new WeekView({ model: model });
				this.$el.append(weekView.render().el);
			}, this);

			return this;
		}
	});
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
			this.collection = new WeekCollection(JSON.parse(data));
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
			var view = new DetailView({collection: this.collection});
			this._renderView(view);
		}
	});	