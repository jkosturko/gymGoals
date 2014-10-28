var Weeks = Backbone.Model.extend({
	idAttribute: '_id'
});

var WeekCollection = Backbone.Collection.extend({
	model: Weeks,
	url: "/weeks"
});

var WeekView = Backbone.View.extend({
	tagName: 'li',
	className: 'week',
	render: function () {
		var template = $('#weektemplate').html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		console.log('this.model.attributes', this.model.attributes);
		this.$el.html(html);
		return this;
	}
});


var WeekCollectionView = Backbone.View.extend({
	tagName: 'ul',
	className: 'weeks',
	render: function () {
		this.collection.each(function (week) {
			var weekView = new WeekView({ model: week });
			this.$el.append(weekView.render().el);
		}, this);

		return this;
	}
});