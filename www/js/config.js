angular.module('starter')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  var date = new Date();
  console.log(date.toLocaleString() + " ###############################");

  $ionicConfigProvider.platform.android.tabs.position('bottom'); //导航栏置底
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.scrolling.jsScrolling(false);

  $stateProvider

    .state('tab', {
      url: '/tab',
      //abstract: true,
      templateUrl: 'partials/tabs.html',
    })
    .state('tab.building',{
      url:'/building',
      views:{
        'tab-building':{
          templateUrl:'partials/building.html',
          //controller:'TelemteringCtrl'
        }
      }
    })
    .state('tab.fastView',{
      url:'/fastView',
      views:{
        'tab-fastView':{
          templateUrl:'partials/fastview/fastview.html',
          controller:'FastViewCtrl'
        }
      }
    })
    .state('tab.fastView-detail',{
      url:'/fastView/:instname',
      views:{
        'tab-fastView':{
          templateUrl:'partials/fastview/fastview-detail.html',
          controller:'FastViewDetailCtrl'
        }
      }
    })
    .state("tab.lv1fastview", {
      url: "/lv1fastview",
      views: {
        "tab-lv1fastview": {          
            templateUrl: "partials/lv1fastview/lv1fastview.html",
            controller:'L1FastViewController'
        }
      }
    })
    .state('tab.subsystem',{
      url:'/subsystem',
      views:{
        'tab-subsystem':{
          templateUrl:'partials/subsystem/subsystem.html',
          controller:'SubSystemCtrl'
        }
      }
    })
    .state('tab.subsystem-custom',{
      url:'/subsystem/:state',
      views:{
        'tab-subsystem':{
          templateUrl:'partials/subsystem/subsystem-custom.html',
          controller:'SubSystemCustomCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/lv1fastview');

});
