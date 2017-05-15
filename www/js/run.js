angular.module('starter')

    .run(function ($ionicPlatform,
                   AppVersionService,
                   SQLiteService,
                   JPushService) {

        // 初始化数据库放到deviceready前面，以便controller里去进行数据库的操作
         /*SQLiteService.init("tblSystems").then(function (res) {
             // 走到这里就是初始化数据库成功了
         }, function (err) {
             alert("err : " + err);
         });*/

        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required·
                StatusBar.styleDefault();
            }

            document.addEventListener("deviceready", function () {

                // 确认版本升级
                AppVersionService.check();

                // 推送服务启动
                JPushService.init();
                //JPushService.setAlias("myapp"); // 别名

            }, false);

        });
    })
