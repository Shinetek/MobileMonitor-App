/**
 * Created by qq on 2017/4/18.
 */
angular
    .module('starter.controllers')
    .controller('SubSystemCustomCtrl', SubSystemCustomCtrl);

SubSystemCustomCtrl.$inject = ['$scope', 'Systems', 'SQLiteService'];

function SubSystemCustomCtrl($scope, Systems, SQLiteService) {

    console.log("SubSystemCustomCtrl normal!");

    var systemlist = Systems.all();

    SQLiteService.get("").then(function (res) {
        for (var j = 0; j < systemlist.length; j++) {
            systemlist[j].selected = false;

            for (var i = 0; i < res.rows.length; i++) {
                if (systemlist[j].name == res.rows.item(i).name) {
                    systemlist[j].selected = true;
                }
            }
        }

        $scope.systems = systemlist;

    }, function (err) {
        alert("SystemCustomCtrl get error");
    });

    $scope.selectedChanged = function (name, $event) {
        var checkbox = $event.target;

        for (var i = 0; i < $scope.systems.length; i++) {
            if ($scope.systems[i].name == name) {
                $scope.systems[i].selected = !$scope.systems[i].selected;

                if ($scope.systems[i].selected) {
                    // 被选中，插入数据
                    SQLiteService.insert(
                        $scope.systems[i].id,
                        $scope.systems[i].name,
                        $scope.systems[i].icon).then(function () {
                    });
                }
                else {
                    // 取消选中，删除数据
                    SQLiteService.delete($scope.systems[i].id).then(function (res) {

                    });
                }
            }
        }
    }
}
