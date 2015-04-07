require('../../app/app');

angular.module('newsletter-liker-app')
	.controller('LikeItemDetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		$scope.init = function() {
			$http.get(window.location.pathname + 'api/like/details/' + $routeParams.id)
				.then(function(response) {
					$scope.likeItem = response.data;
					console.log('ITEM', $scope.likeItem);
				});
		};

		$scope.clearLikesDislikes = function(subCounter) {
			$http.put(window.location.pathname + 'api/clearSubLikesDislikes', {
					id: subCounter._id
				})
				.then(function(response) {

				});
		};

		$scope.init();
	}]);