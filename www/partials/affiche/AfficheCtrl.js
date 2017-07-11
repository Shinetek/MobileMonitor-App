/**
 * Created by admin on 2017/7/6.
 */
angular
    .module("starter.controllers")
    .controller("AfficheCtrl",AfficheCtrl);
AfficheCtrl.$inject = ["$scope",'$ionicActionSheet','$timeout'];

function AfficheCtrl($scope,$ionicActionSheet,$timeout){
    $scope.show = function() {

        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '发布公告' },
                { text: '查询公告' }
            ],
            //destructiveText: 'Delete',
            titleText:"公告设置",
            //cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                if(index == "0"){
                    var addtask = "#/tab/affiche/release"
                    window.location.href = addtask;
                }else if(index == "1"){
                    var addtask = "#/tab/affiche/histroty"
                    window.location.href = addtask;
                }
                return true;
            }
        });
        $timeout(function() {
            hideSheet();
        }, 50000);
    };
}