require('../../app/app');

angular.module('newsletter-liker-app')
	.controller('ViewCountersController', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.init = function() {
			$http.get(window.location.pathname + 'api/like')
				.then(function(response) {
					$scope.allLikesData = response.data;
					for (var i = 0; i < $scope.allLikesData.length; i++) {
						$scope.allLikesData[i].likeCount = 0;
						$scope.allLikesData[i].dislikeCount = 0;
						for (var j = 0; j < $scope.allLikesData[i].subCounters.length; j++) {
							$scope.allLikesData[i].likeCount += $scope.allLikesData[i].subCounters[j].likeCount;
							$scope.allLikesData[i].dislikeCount += $scope.allLikesData[i].subCounters[j].dislikeCount;
						}
					}
				});
		};

		$scope.viewDetails = function(likeItem) {
			$location.url('/counter/' + likeItem._id);
		};

		$scope.init();
	}]);