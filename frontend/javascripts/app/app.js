angular.module('newsletter-liker-app', [
		'ngRoute',
		'ngResource',
	])
	.config(['$routeProvider', '$resourceProvider', function($routeProvider, $resourceProvider) {
		$routeProvider
			.when('/create', {
				templateUrl: './templates/admin/createEvent/createEvent.html',
				controller: 'CreateEventController'
			})
			.when('/viewcounters', {
				templateUrl: './templates/admin/viewCounters/viewCounters.html',
				controller: 'ViewCountersController'
			})
			.when('/counter/:id', {
				templateUrl: './templates/admin/likeItemDetails/likeItemDetails.html',
				controller: 'LikeItemDetailsController'
			})
			.when('/like/:generalName/:date/:subItem', {
				templateUrl: './templates/user/like/likeNews.html',
				controller: 'LikeNewsController'
			})
			.when('/dislike/:generalName/:date/:subItem', {
				templateUrl: './templates/user/dislike/dislikeNews.html',
				controller: 'DislikeNewsController'
			})
			.when('/thanks', {
				templateUrl: './templates/user/messagePages/thanks.html'
			})
			.when('/cancelAction', {
				templateUrl: './templates/user/messagePages/actionCancel.html'
			})
			.when('/alreadyRated', {
				templateUrl: './templates/user/messagePages/alreadyRated.html'
			})
			.otherwise({
				redirectTo: '/viewcounters'
			});
		$resourceProvider.defaults.stripTrailingSlashes = false;
	}]);