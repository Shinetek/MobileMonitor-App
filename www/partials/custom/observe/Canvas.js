/**
 * Created by admin on 2017/7/21.
 */

angular
    .module("starter.services")
    .factory("CanvasTxy",CanvasTxy)
function CanvasTxy(){
    var side = {
        startrow:"0",
        startsow:"0",
        endrow:"0",
        endsow:"0",
        mapwidth:"0",
        mapheight:"0"
    };
    return{
        canvasimg:function(mapsize,mapside,canwidth,res){

            var map = mapsize
            var coord = mapside
            var scale = canwidth/map
            var canscale = scale.toFixed(2)


            side.startrow = (res.StartLineNo - coord) * canscale
            side.startrow = side.startrow.toFixed(2)

            side.startsow = (res.StartColumnNo - coord) * canscale
            side.startsow = side.startsow.toFixed(2)

            side.endrow = (res.EndLineNo - coord) * canscale
            side.endrow = side.endrow.toFixed(2)

            side.endsow = (res.EndColumnNo- coord) * canscale
            side.endsow = side.endsow.toFixed(2)

            side.mapwidth = side.endsow - side.startsow
            side.mapwidth = side.mapwidth.toFixed(2)
            side.mapheight = side.endrow - side.startrow
            side.mapheight = side.mapheight.toFixed(2)


            return side;
        }
    }
}