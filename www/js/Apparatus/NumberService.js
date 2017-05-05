/**
 * Created by admin on 2017/5/4.
 */

angular
  .module("starter.services")
  .factory("NumberService",NumberService)
function NumberService(){
  var result = {
    day_plan:0,
    success:0,
    runing:0,
    failure:0,
    cur_plan:0
  };
  return{
    getnumber:function(res){
      for(var i = 0; i < res.length; i++){
        if(res[i].status == "success"){
           result.success++;
        }else if(res[i].status == "failure"){
          result.failure++;
        }else if(res[i].status == "running"){
          result.runing++;
        }
      }
      result.day_plan = res.length;
      result.cur_plan = result.success +  result.runing +  result.failure;
      return result;
    }
  }
}
