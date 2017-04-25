angular.module('starter.services', ['ngCordova'])

  .factory('Sensors',function(){
    var sensors = [{
      id:"cxy",
      name:'成像仪',
      icon:'img/accessories-camera-icon.png',
      success:'10',
      fail:'10'
    },{
      id:"tcy",
      name:'探测仪',
      icon:'img/midori-globe-icon.png',
      success:'10',
      fail:'10'
    },{
      id:"sdy",
      name:'闪电仪',
      icon:'img/flash.png',
      success:'10',
      fail:'10'
    }];

    return {
      all: function() {
        return sensors;
      },
      getSensor:function(name){
          for (var i = 0; i < sensors.length; i++) {
            if (sensors[i].name === name) {
              return sensors[i];
            }
          }
          return null;
      }
    };
  })

  .factory('Systems',function(){
    var systems = [{
      id:'DTS',
      name:'数据获取',
      icon:'img/data-download.png',
      selected: false
    },{
      id:'NRS',
      name:'图像定位',
      icon:'img/gps.png',
      selected: false
    },{
      id:'PGS',
      name:'产品生成',
      icon:'img/social_round_product_hunt_149px_1196573_easyicon.net.png',
      selected: false
    },{
      id:'SWS',
      name:'空间天气',
      icon:'img/weather.png',
      selected: false
    },{
      id:'MCS',
      name:'任务管控',
      icon:'img/task.png',
      selected: false
    },{
      id:'DSS',
      name:'数据服务',
      icon:'img/database(1).png',
      selected: false
    },{
      id:'MRS',
      name:'应用示范',
      icon:'img/Application_213px_1194722_easyicon.net.png',
      selected: false
    },{
      id:'CVS',
      name:'定标检验',
      icon:'img/check_128px_1180491_easyicon.net.png',
      selected: false
    },{
      id:'CNS',
      name:'计算机网络',
      icon:'img/network.png',
      selected: false
    }];

    return {
      all: function() {
        return systems;
      }
    };
  });



