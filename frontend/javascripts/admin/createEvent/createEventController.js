require('../../app/app');

angular.module('newsletter-liker-app')
	.controller('CreateEventController', ['$scope', '$http', function($scope, $http) {
		$scope.init = function() {
			$scope.isLinkGenerated = false;
			$(document).ready(function() {
				$(":input.date").inputmask();
			});
			var today = new Date(Date.now());
			var date = formInputDateString(new Date(Date.now()));
			$scope.post = {
				date: date,
				subCounters: [{
					name: '',
					likeCount: 0,
					dislikeCount: 0
				}]
			};
			angular.element(document.getElementsByClassName('date')).val(date);
		};

		function formInputDateString(date) {
			var dateString = '';
			if (date.getDate() < 10) {
				dateString += '0' + date.getDate();
			} else {
				dateString += date.getDate();
			}
			dateString += '/';
			if (date.getMonth() < 9) {
				dateString += '0' + (date.getMonth() + 1);
			} else {
				dateString += (date.getMonth() + 1);
			}
			dateString += '/' + date.getFullYear();
			return dateString;
		}

		$scope.createCounter = function(post) {
			post.count = 0;
			var date = angular.element(document.getElementsByClassName('date')).val();
			if (date.indexOf('d') !== -1 || date.indexOf('m') !== -1 || date.indexOf('y') !== -1) {
				alert('Дата заполнена неверно');
				return;
			} else {
				$scope.post.date = date.replace(/\//g, '.');
			}

			for (var j = 0; j < $scope.post.subCounters.length; j++) {
				$scope.post.subCounters[j].name = $scope.post.subCounters[j].name.replace(/ /g, '-');
			}
			$scope.post.name = $scope.post.name.replace(/ /g, '-');

			$http.post(window.location.pathname + 'api/createAction/', post)
				.then(function(response) {
					console.log('Saving successful');
					var counters = response.data;
					$scope.linksToCount = [];
					for (var i = 0; i < counters.subCounters.length; i++) {
						$scope.linksToCount.push({
							name: counters.subCounters[i].name,
							like: window.location.origin + window.location.pathname + '#/like/' + $scope.post.name + '/' + $scope.post.date + '/' + counters.subCounters[i].name,
							dislike: window.location.origin + window.location.pathname + '#/dislike/' + $scope.post.name + '/' + $scope.post.date + '/' + counters.subCounters[i].name

						});
					}
					$scope.isLinkGenerated = true;
				})
				.catch(function(err) {
					console.log('ERROR:', err);
				});
		};

		$scope.deleteSubItem = function(index) {
			console.log('Index: ', index);
			$scope.post.subCounters.splice(index, 1);
		};

		$scope.addSubCounters = function() {
			$scope.post.subCounters.push({
				name: "",
				likeCount: 0,
				dislikeCount: 0
			});
		};

		$scope.init();
	}]);