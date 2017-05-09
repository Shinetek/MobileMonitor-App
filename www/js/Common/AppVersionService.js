/**
 * Created by qq on 2017/4/20.
 */
angular
    .module('starter.services')
    .factory('AppVersionService', AppVersionService)

AppVersionService.$inject = [
    '$cordovaAppVersion',
    '$cordovaNetwork',
    'HttpService',
    '$rootScope',
    '$ionicPopup',
    '$ionicLoading',
    '$cordovaFileTransfer',
    '$cordovaFileOpener2',
    '$timeout'];

function AppVersionService($cordovaAppVersion,
                           $cordovaNetwork,
                           HttpService,
                           $rootScope,
                           $ionicPopup,
                           $ionicLoading,
                           $cordovaFileTransfer,
                           $cordovaFileOpener2,
                           $timeout) {

    // Android升级
    function checkUpdate() {

        var type = $cordovaNetwork.getNetwork();
        //alert(type);

        //获取本地APP版本
        $cordovaAppVersion.getVersionNumber().then(function (version) {

            var apkurl = "http://123.56.135.196:4102/api/updating?name=FY4MonitorApp&version=v" + version;
            var apkpath;
            var fileSize;

            var promise = HttpService.getdata(apkurl);
            promise.then(function (data) {

                console.log("data.latestVersion : " + data.latestVersion);

                if (data.latestVersion != "") {

                    apkpath = data.path;
                    fileSize = data.size;

                    if (type === 'wifi') {
                        $ionicPopup.confirm({
                            title: '版本升级',
                            template: '版本升级详细内容,你现在下载的是FY4集中监控APP!<br>当前版本 : v' + version + '<br>最新版本 : ' + data.latestVersion,
                            cancelText: '取消',
                            okText: '升级'
                        }).then(function (res) {
                            if (res) {
                                UpdateForAndroid(apkpath, fileSize);
                            }
                        });
                    } else {
                        $ionicPopup.confirm({
                            title: '建议您在WIFI条件下进行升级，是否确认升级？',
                            template: '版本升级详细内容,你现在下载的是FY4集中监控APP!<br>当前版本 : v' + version + '<br>最新版本 : ' + data.latestVersion,
                            cancelText: '取消',
                            okText: '升级'
                        }).then(function (res) {
                            if (res) {
                                UpdateForAndroid(apkpath, fileSize);
                            }
                        });
                    }
                }
            })
        });

        // 无网络时
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {

            $ionicLoading.show({
                template: '网络异常，不能连接到服务器！'
            });

            $timeout(function () {
                $ionicLoading.hide()
            }, 2000);
        })
    }

    function UpdateForAndroid(url, filesize) {
        $ionicLoading.show({
            template: "请稍等..."
        });
        //var url = 'http://10.24.4.131:8081/android-debug.apk'; // 下载地址
        var targetPath = cordova.file.externalDataDirectory + "FY4APP.apk";
        var trustHosts = true;
        var options = {};

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
            .then(function (result) {
                $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
                ).then(function () {
                        // 成功
                        //alert("下载" + url + "成功。")
                    }, function (err) {
                        //alert("下载" + url + "异常。" + err)
                        console.log(err);
                    });
                $ionicLoading.hide();
            },

            function (err) {
                //alert("下载" + url + "异常。" + err)
                $ionicLoading.show({
                    template: "下载失败"
                });
                $ionicLoading.hide();
            },

            function (progress) {
                $timeout(function () {
                    var downloadProgress = (progress.loaded / filesize) * 100;
                    $ionicLoading.show({
                        //template: "已经下载：" + Math.floor(downloadProgress) + "%"
                        template: "正在下载升级文件" +
                        "<br/>文件大小 : " + formatFileSize(filesize) + ". " +
                        "<br/>已下载 : " + Math.floor(downloadProgress) + "%"
                    });
                    if (downloadProgress > 99) {
                        $ionicLoading.hide();
                    }
                });
            });
    }

    function formatFileSize(fileSize) {
        var updateSize;
        var unit;

        if ((fileSize / 1024) < 1) {
            updateSize = fileSize;
            unit = "";
        }
        else if ((fileSize / (1024 * 1024)) < 1) {
            updateSize = (fileSize / 1024);
            unit = "K";
        }
        else if ((fileSize / (1024 * 1024 * 1024)) < 1) {
            updateSize = (fileSize / (1024 * 1024));
            unit = "M";
        }

        return updateSize.toFixed(2) + unit;
    }

    return {
        check: checkUpdate,
    };
}
