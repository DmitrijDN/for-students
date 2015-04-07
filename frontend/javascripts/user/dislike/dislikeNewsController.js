require('../../app/app');
var Fingerprint = require('fingerprintjs');
var async = require('async');

angular.module('newsletter-liker-app')
	.controller('DislikeNewsController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
		$scope.init = function() {

			var fingerprint = new Fingerprint().get();
			$scope.alreadyRated = false;
			$scope.dislikedItem = {
				generalName: $routeParams.generalName,
				date: $routeParams.date,
				subItem: $routeParams.subItem
			};

			async.series([function(callback) {
				$http.post(window.location.pathname + 'api/getBrowserId/', {
					browserId: fingerprint,
					counterData: $scope.dislikedItem
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
						counterData: $scope.dislikedItem
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
					$http.get(window.location.pathname + 'api/dislike/' + $routeParams.generalName + '/' + $routeParams.date + '/' + $routeParams.subItem)
						.then(function(response) {});
				}
			});
		};

		$scope.cancelAction = function() {
			$http.put(window.location.pathname + 'api/dislike/cancel', $scope.dislikedItem)
				.then(function(response) {
					$location.url('/cancelAction');
				});
		};

		$scope.dislikeAction = function() {
			$http.post(window.location.pathname + 'api/dislike/tolike', $scope.dislikedItem)
				.then(function(response) {
					$location.url('/thanks');
				});
		};

		$scope.confirmAction = function(comment) {
			if (comment !== undefined && comment !== null && comment.length > 0) {
				$scope.dislikedItem.comment = comment;
				$http.post(window.location.pathname + 'api/dislike', $scope.dislikedItem)
					.then(function(response) {
						$location.url('/thanks');
					});
			} else {
				alert('Комментарий пустой');
			}
		};

		$scope.init();
	}]);