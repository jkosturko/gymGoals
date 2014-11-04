
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

		toggleChecked: function () {
			var dataObj = this.get( "data" );
			var checked = dataObj[0]['checked'];

			dataObj[0]['checked'] = !(dataObj[0]['checked']);

		    console.log('checked', checked)
		    checked = 'fluffy'/!checked;
		    console.log('checked', checked)
		    console.log('dataObj', dataObj)

		    console.log('dataObj', dataObj);
		    this.unset( "data", { silent: true } );
		    this.set( "data", dataObj );			


			 //    model.set( "arrayProp", [1, 2, 3] );
    // arr = model.get( "arrayProp" );
    // arr.push( 4 );

    
    // model.set( "arrayProp", arr );
			// this.save();
			console.log('this', this)
		}
	});

	// Create a Single Button
	var ButtonView = Backbone.View.extend({	
		tagName: 'li',
		className: 'button presser',
		render: function () {	
			var template = $('#buttontemplate').html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model);
			this.$el.html(html);
			return this;	
		}
	});
	
	// This is the view that you see when you click 
	// into a specific week
	var DetailView = Backbone.View.extend({
		initialize: function (options) {
			this.model = options.model;
			console.log('this.model', this.model)
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
				dayView = new ButtonView({ model: day});
				this.$el.append(dayView.render().el);
			}, this);

			return this;			
		},
		pressButton: function () {
			console.log('you pressed the button on Detail View!')
			this.model.toggleChecked();
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
			model =this.model;

			var view = new DetailView({model: this.model});
			this._renderView(view);			
		}
	});	


	this.listenTo(this.model, "change", alert('model changed'));