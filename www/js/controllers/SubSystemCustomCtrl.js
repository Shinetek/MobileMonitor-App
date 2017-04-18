/**
 * Created by qq on 2017/4/18.
 */
define([], function () {
  function ctrl($scope, Systems, SQLiteService){
    var systemlist = Systems.all();

    SQLiteService.get("").then(function(res){

      //alert("res.rows.length : " + res.rows.length)
      for(var i = 0;i<res.rows.length;i++){
        //alert("name : " + systemlist[j].name + ", selected : " + systemlist[j].selected);

        for(var j = 0;j<systemlist.length;j++){

          if(systemlist[j].name == res.rows.item(i).name){
            //alert("name : " + systemlist[j].name + ", selected : " + systemlist[j].selected);

            systemlist[j].selected = true;
          }
        }
      }

      $scope.systems = systemlist;


    }, function (err) {
      alert("SystemCustomCtrl get error");
    });

    $scope.selectedChanged = function(name,$event){
      var checkbox = $event.target;
      //alert("name : " + name + ", checkState : " + checkbox.checked);
      for(var i = 0;i<$scope.systems.length;i++){
        if($scope.systems[i].name == name){
          $scope.systems[i].selected = checkbox.checked;
          //alert("name : " + $scope.systems[i].name + ", selected : " + $scope.systems[i].selected);
        }
      }
    }

    // 更新数据库中的数据
    function UpdateDataBase(){
      SQLiteService.delete("").then(function(res){

        alert("删除数据成功！" + $scope.systems.length);

        // 先清空数据库在插入新数据
        for(var i = 0;i<$scope.systems.length;i++) {
          if($scope.systems[i].selected == true){
            //alert($scope.systems[i].name + " " + $scope.systems[i].selected);
            SQLiteService.insert($scope.systems[i].id,$scope.systems[i].name,$scope.systems[i].icon).then(function(){
              alert("插入数据" + $scope.systems[i].id);
            });
          }
        }
      }, function(err){
        alert("删除数据错误！");
      });
    }

    $scope.saveChanged = function(){
      UpdateDataBase();
    }
  }

  ctrl.$inject = ['$scope', 'Systems', 'SQLiteService'];
  return ctrl;
});
