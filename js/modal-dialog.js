(function(angular) {

	var module = angular.module('modalDialog', ['ngAnimate', 'ui.bootstrap']);

	module.controller('ModalCtrl', ['$scope', '$modalInstance', 'config', function($scope, $modalInstance, config) {
		$scope.config = config;
		$scope.data = angular.copy(config.data);
		$scope.instance = $modalInstance;
	}]);

	module.factory('modalService', ['$log', '$modal', function($log, $modal) {
		return {
			show: function(config) {
				var instance = $modal.open({
					animation: config.animate === true,
					templateUrl: 'templates/modal-template.html',
					controller: 'ModalCtrl',
					resolve: {
						config: function() {
							return config;
						}
					}
				});

				instance.opened.then(function(result) {
					$log.info('Opened:', result);
				});

				instance.result.then(function(result) {
					$log.info('Closed:', result);
				}, function(reason) {
					$log.info('Dismissed:', reason);
				});
			}
		};
	}]);

})(window.angular);
