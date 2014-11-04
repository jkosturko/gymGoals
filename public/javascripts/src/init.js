//temporarily global for debugging
$(function () {
	window.router = new AppRouter();
	Backbone.history.start({pushState: true});
	// Backbone.history.start();
});
