/**
 * Created by admin on 2017/5/5.
 */

angular
  .module("starter.services")
  .factory("HeightService", HeightService)
function HeightService() {
  var index = null;
  return {
    getheight: function (res, srcoll) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].status == "waiting") {
          index = i;
          break;
        }
      }
      var scrollheight = srcoll;
      scrollheight = parseInt(scrollheight.height);
      var _heights = Math.floor(index / 4) * 57;
      if (_heights <= scrollheight) {
        var _height = 0;
        return _height;
      } else {
        var _height = parseInt(index / 4) * 57 - scrollheight + 85;
        return _height;
      }
    }
  }
}
