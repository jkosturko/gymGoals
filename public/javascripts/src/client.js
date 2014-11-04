
// $(function () {

	var Weeks = Backbone.Model.extend({
		idAttribute: '_id'
	});

	var WeekCollection = Backbone.Collection.extend({
		model: Weeks,
		url: "/weeks",
	});

	var Day = Backbone.Model.extend({
		initialize: function (options) {
			this.id = options.id
		},
		urlRoot: '/weeks/data',

		toggleChecked: function (i) {
			var dataObj = this.get( "data" );

			dataObj[i]['checked'] = !(dataObj[i]['checked']);
		    this.unset( "data", { silent: true } );
		    this.set( "data", dataObj );			
		}
	});

	// Create a Single Button
	var ButtonView = Backbone.View.extend({
		tagName: 'li',
		className: 'button presser',
		render: function () {	
			var template = $('#buttontemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model, this.options);
			this.$el.html(html);
			return this;	
		}
	});
	
	// This is the view that you see when you click 
	// into a specific week
	var DetailView = Backbone.View.extend({
		initialize: function (options) {
			this.model = options.model;
			this.listenTo(this.model, 'change', this.render);
		},
		tagName: 'ul',
		events: {
			"click .presser" : "pressButton"
		},
		render: function () {
			console.log('rendering')
			this.$el.html('');
			_.each(this.model.attributes.data,function(day, i) {
				dayView = new ButtonView({ model: day, index: i});
				this.$el.append(dayView.render().el);
			}, this);

			return this;			
		},
		pressButton: function (e) {
			var $item = $(e.currentTarget).closest('li');
        	var	index = $item.index();
			this.model.toggleChecked(index);
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
			var html = compiled(this.model.attributes );
			this.$el.html('');
			this.$el.html(html);

			return this;
		},			
		singleWeekLink: function (e) { 
			var id = this.model.get('_id');
			router.navigate("weeks/" + id, {trigger: true});
			e.preventDefault();
			e.stopPropagation();
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

	var collection, model;
	var AppRouter = Backbone.Router.extend({
		initialize: function () {
			this._setupCollection();
		},
		_setupCollection: function () { 
			if(this.collection) 
				return;

			// Maybe implement a caching solution here
			var data = $('#initialContent').html()
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
			this.model = new Day({id: id}) //think of naming here //siletn true is bad here
			this.model.fetch();

			var view = new DetailView({model: this.model});
			this._renderView(view);			
		}
	});	
