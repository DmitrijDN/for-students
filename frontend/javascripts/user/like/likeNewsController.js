require('../../app/app');
var Fingerprint = require('fingerprintjs');
var async = require('async');

angular.module('newsletter-liker-app')
	.controller('LikeNewsController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
		$scope.init = function() {
			$scope.likedItem = {
				generalName: $routeParams.generalName,
				date: $routeParams.date,
				subItem: $routeParams.subItem
			};

			var fingerprint = new Fingerprint().get();
			$scope.alreadyRated = false;
			$scope.likedItem = {
				generalName: $routeParams.generalName,
				date: $routeParams.date,
				subItem: $routeParams.subItem
			};

			async.series([function(callback) {
				$http.post(window.location.pathname + 'api/getBrowserId/', {
					browserId: fingerprint,
					counterData: $scope.likedItem
				}).then(function(response) {
					$scope.alreadyRated = true;
					callback({
						message: 'Already rated'
					});
				}).catch(function(err) {
					if (err.data.toLowerCase() === 'not found') {
						callback(null, null);
					}
				});

			}, function(callback) {
				$http.post(window.location.pathname + 'api/storebrowserid', {
						browserId: fingerprint,
						counterData: $scope.likedItem
					})
					.then(function(response) {
						callback(null, {
							message: 'Insert browserId Successful'
						});
					});
			}], function(err, result) {
				if (err !== null && err !== undefined && err.message === 'Already rated') {
					$location.url('/alreadyRated');
				} else {
					$http.get(window.location.pathname + 'api/like/' + $routeParams.generalName + '/' + $routeParams.date + '/' + $routeParams.subItem)
						.then(function(response) {});
				}
			});



		};

		$scope.cancelAction = function() {
			$http.put(window.location.pathname + 'api/like/cancel', $scope.likedItem)
				.then(function(response) {
					$location.url('/cancelAction');
				});
		};

		$scope.dislikeAction = function() {
			$http.post(window.location.pathname + 'api/like/todislike', $scope.likedItem)
				.then(function(response) {
					$location.url('/thanks');
				});
		};

		$scope.confirmAction = function(comment) {
			if (comment !== undefined && comment !== null && comment.length > 0) {
				$scope.likedItem.comment = comment;
				$http.post(window.location.pathname + 'api/like', $scope.likedItem)
					.then(function(response) {
						$location.url('/thanks');
					});
			} else {
				alert('Комментарий пустой');
			}
		};

		$scope.init();
	}]);