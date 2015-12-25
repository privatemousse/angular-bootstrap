(function(angular) {

    var module = angular.module('modalDialog', ['ngAnimate', 'ui.bootstrap']);

	    module.controller('ModalCtrl', ['$scope', '$modalInstance', 'config', function($scope, $modalInstance, config) {
	        // 初始化control的数据，使用依赖注入的值
	        $scope.config = config;
	        $scope.data = angular.copy(config.data);
	        $scope.instance = $modalInstance;
	    }]);

	    module.factory('modalService', 
	    	['$log', '$modal', function($log, $modal) {
		        return {
		            // 调用服务室传入的对象，返回的还是config对象
		            show: function(config) {
		            	// config的作用域
		                var instance = $modal.open({
		                    animation: config.animate === true,
		                    // 在这个模板中使用config对象的属性
		                    templateUrl: 'templates/modal-template.html',
		                    controller: 'ModalCtrl',
		                    resolve: {
		                        config: function() {
		                            return config;
		                        }
		                    }
		                });
		                // instance是正在打开的对象
		                instance.opened.then(function(result) {
		                    // 可以调用代码做一些事情
		                    $log.info('Opened:', result);

		                });
		                // 
		                instance.result.then(
		                	// 第一个参数是关闭时的回调
		                	function(result) {

		                        $log.info('Closed:', result);

		                    },
		                    // 第二个参数是消失时的回调
		                    function(reason) {
		                        $log.info('Dismissed:', reason);
		                    }
		                );
		            }
		        };
	   		}]
	    );

})(window.angular);
