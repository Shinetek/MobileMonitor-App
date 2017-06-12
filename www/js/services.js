angular.module('starter.services', ['ngCordova'])

  .factory('PopoverService',function(){
    return {
      initPop:function($scope, $ionicPopover, popUrl){

        //$scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
        //  scope: $scope
        //});

        $ionicPopover.fromTemplateUrl('my-popover.html', {
          scope: $scope
        }).then(function (popover) {
          $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
          $scope.popover.show($event);
        };

        $scope.closePopover = function () {
          $scope.popover.hide();
        };
        // 清除浮动框
        $scope.$on('$destroy', function () {
          $scope.popover.remove();
        });
        // 在隐藏浮动框后执行
        $scope.$on('popover.hidden', function () {
          // 执行代码
        });
        // 移除浮动框后执行
        $scope.$on('popover.removed', function () {
          // 执行代码
        });
      }
    }
  })

  .factory('Sensors', function () {
    var sensors = [{
      id: "agri",
      name: '成像仪',
      icon: 'img/accessories-camera-icon.png',
      success: '-',
      fail: '-'
    }, {
      id: "giirs",
      name: '探测仪',
      icon: 'img/midori-globe-icon.png',
      success: '-',
      fail: '-'
    }, {
      id: "lmi",
      name: '闪电仪',
      icon: 'img/flash.png',
      success: '-',
      fail: '-'
    }];

    return {
      all: function () {
        return sensors;
      },
      getSensor: function (name) {
        for (var i = 0; i < sensors.length; i++) {
          if (sensors[i].name === name) {
            return sensors[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Systems', function () {
    var systems = [{
      id: 'DTS',
      name: '数据获取',
      icon: 'img/data-download.png',
      selected: false
    }, {
      id: 'NRS',
      name: '图像定位',
      icon: 'img/gps.png',
      selected: false
    }, {
      id: 'PGS',
      name: '产品生成',
      icon: 'img/social_round_product_hunt_149px_1196573_easyicon.net.png',
      selected: false
    }, {
      id: 'SWS',
      name: '空间天气',
      icon: 'img/weather.png',
      selected: false
    }, {
      id: 'MCS',
      name: '任务管控',
      icon: 'img/task.png',
      selected: false
    }, {
      id: 'DSS',
      name: '数据服务',
      icon: 'img/database(1).png',
      selected: false
    }, {
      id: 'MRS',
      name: '应用示范',
      icon: 'img/Application_213px_1194722_easyicon.net.png',
      selected: false
    }, {
      id: 'CVS',
      name: '定标检验',
      icon: 'img/check_128px_1180491_easyicon.net.png',
      selected: false
    }, {
      id: 'CNS',
      name: '计算机网络',
      icon: 'img/network.png',
      selected: false
    }];

    return {
      all: function () {
        return systems;
      }
    };
  })
    .factory("FaultID",function(){
      var faultName = [{
        id:"全部"
      },{
        id: 'DTS'
      }, {
        id: 'NRS'
      }, {
        id: 'PGS'
      }, {
        id: 'SWS'
      }, {
        id: 'MCS'
      }, {
        id: 'DSS'
      }, {
        id: 'MRS'
      }, {
        id: 'CVS'
      }, {
        id: 'CNS'
      }];
      return {
        faultname: function () {
          return faultName
        }
      };
    });



