(function(angular) {

	var app = angular.module('modalDemoApp', ['modalDialog']);

	app.controller('MainCtrl', ['$scope', '$log', 'modalService', function($scope, $log, modalService) {
		$scope.buttonLabel = 'Show Modal';

		$scope.modalConfig = {
			data: {
				title: 'Title Goes Here',
				message: 'Message goes here'
			},
			include: 'templates/modal-content-template.html',
			animate: true,
			buttons: [{
				type: 'info',
				label: 'Info',
				click: function(event, data, instance) {
					$log.info('Info:', event, data, instance);
				}
			},{
				type: 'success',
				label: 'Success'
			},{
				type: 'warning',
				label: 'Warning'
			},{
				type: 'danger',
				label: 'Danger'
			},{
				label: 'Cancel',
				click: function(event, data, instance) {
					instance.dismiss('cancel');
				}
			},{
				type: 'primary',
				label: 'Update',
				click: function(event, data, instance) {
					if (data.title && data.message) {
						$scope.modalConfig.data.title = data.title;
						$scope.buttonLabel = data.message;
						instance.close(data);
					}
				}
			}],
			keyup: function(event, data, instance) {
				if (event.which === 13) {
					if (data.title && data.message) {
						$scope.modalConfig.data.title = data.title;
						$scope.buttonLabel = data.message;
						instance.close(data);
					}
				}
			},
			select: function(event, data, instance) {
				$log.info('Select:', event, data, instance);
				event.target.select();
			}
		};

		$scope.showModal = function() {
			$log.info('Show Modal');
			modalService.show($scope.modalConfig);
		};
	}]);

})(window.angular);
