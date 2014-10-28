$(function () {
	var collection = new WeekCollection();
	collection.fetch({
		success: function (data) { 
			var view = new WeekCollectionView({collection: data});
			$('body').append(view.render().el);
		}
	});
});