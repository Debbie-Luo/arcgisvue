/*
 * @Author: luobr
 * @Date: 2023-11-05 20:27:48
 * @LastEditors: luobr
 * @LastEditTime: 2023-11-05 20:51:07
 * @Description: 坐标转换（百度地图、GCJ、WGS84），参考链接：https://juejin.cn/post/6990647685711659015
 */
var pi = 3.14159265358979324;
const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
class CoordTransfer{
    constructor(){}
    /**
     * @description: 火星坐标系GCJ02转地球坐标系WGS84
     * @param {*} lnglat
     * @return {*}
     */    
    transformGCJ2WGS(lnglat) {
        const gcjLat = lnglat.lat;
        const gcjLon = lnglat.lng;
        let d = this.delta(gcjLat, gcjLon);
        return {
            lat: gcjLat - d.lat,
            lng: gcjLon - d.lon,
        };
    }
    /**
     * 百度坐标转火星坐标：
     * @param {*} baidu_point
     * @returns
     */
    baiduTomars(baidu_point) {
        var mars_point = { lng: 0, lat: 0 };
        var x = baidu_point.lng - 0.0065;
        var y = baidu_point.lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        mars_point.lng = z * Math.cos(theta);
        mars_point.lat = z * Math.sin(theta);
        return mars_point;
    }

    //百度转84
    BDTo84(location){
        let location1 = this.baiduTomars(location);
        let location2 = this.transformGCJ2WGS(location1);
        return location2;
    }

    transformLat(x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /3.0;
        ret += ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) /3.0;
        ret += ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) * 2.0) / 3.0;
        return ret;
    }

    transformLon(x, y) {
        var ret = 300.0 +  x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0;
        ret += ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
        ret += ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) * 2.0) /3.0;
        return ret;
    }

    delta(lat, lon) {
        let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        let dLat = this.transformLat(lon - 105.0, lat - 35.0);
        let dLon = this.transformLon(lon - 105.0, lat - 35.0);
        let radLat = (lat / 180.0) * pi;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
        dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
        return {
            lat: dLat,
            lon: dLon,
        };
    }
}
export default new CoordTransfer();