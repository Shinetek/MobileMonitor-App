angular.module('starter')

    .run(function ($ionicPlatform,
                   AppVersionService,
                   SQLiteService,
                   JPushService,
                    $rootScope,
                    $location,
                    $timeout,
                    $ionicHistory,
                    $cordovaToast) {

        // 初始化数据库放到deviceready前面，以便controller里去进行数据库的操作
        SQLiteService.init("tblSystems").then(function (res) {
             //console.log("走到这里就是初始化数据库成功了")
         }, function (err) {
             alert("err : " + err);
         });



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

        //添加双击推出效果
        $ionicPlatform.registerBackButtonAction(function (e){
            //判断处于那个页面双击退出
            if($location.path() == "/tab/subsystem"){
                if($rootScope.backButtonPressedOnceToExit){
                    ionic.Platform.exitApp();
                }else{
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showShortBottom("再按一次退出系统");
                    setTimeout(function(){
                        $rootScope.backButtonPressedOnceToExit = false;
                    },2000)
                }
            }
            else if($ionicHistory.backView()){
                    $ionicHistory.goBack();
            }else{
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortTop('再按一次退出系统');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
            e.preventDefault()
            return false
        },101);

    });
