(function(angular) {

    var app = angular.module('modalDemoApp', ['modalDialog']);

    app.controller('mainController', ['$scope', '$log', 'modalService', function($scope, $log, modalService) {
    	// 初始化按钮的值
        $scope.buttonLabel = 'Show Modal';
        // 要弹出的对话框的数据和回调的函数
        $scope.modalConfig = {
            data: {
                title: 'begin title',
                message: 'bagin Message'
            },
            include: 'templates/modal-content-template.html',
            animate: true,
            buttons: [{
                type: 'info',
                label: 'Info',
                click: function(event, data, instance) {
                    $log.info('Info:', event, data, instance);
                }
            }, {
                type: 'success',
                label: 'Success',
                click: function(event, data, instance) {
                    $log.info('success:', event, data, instance);
                }
            }, {
                type: 'warning',
                label: 'Warning',
                click: function(event, data, instance) {
                    $log.info('warning:', event, data, instance);
                }
            }, {
                type: 'danger',
                label: 'Danger',
                click: function(event, data, instance) {
                    $log.info('danger:', event, data, instance);
                }
            }, {
                label: 'Cancel',
                click: function(event, data, instance) {
                    $log.info('csancel:', event, data, instance);
                    instance.dismiss('cancel');
                }
            }, {
                type: 'primary',
                label: 'Update',
                click: function(event, data, instance) {
                    if (data.title && data.message) {
                        $log.info('Update:', event, data, instance);
                        $scope.modalConfig.data.title = data.title;
                        $scope.buttonLabel = data.message;
                        instance.close(data);
                    }
                }
            }],
            keyup: function(event, data, instance) {
                $log.info('keyup:', event, data, instance);
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
        // 界面按钮
        $scope.showModal = function() {
            $log.info('Show Modal');
            // 调用对话框服务，出入上面定义的消息
            modalService.show($scope.modalConfig);
        };
    }]);

})(window.angular);
