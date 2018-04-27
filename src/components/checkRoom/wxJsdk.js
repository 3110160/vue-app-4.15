import Vue from 'vue'
import axios from 'axios'
import { WechatPlugin } from 'vux'

Vue.use(WechatPlugin)
/**
* @desc 检查微信接口是否可用
* @function wxCheckJsApi
* @param array
* @return Promise
* */
const wxCheckJsApi = (jsApiList) => {
    return new Promise((resolve, reject) => {
        Vue.wechat.checkJsApi({
            jsApiList: jsApiList,
            success: function (res) {
                resolve(res)
            }
        });
    })
};
/**
 * @desc 开启查找周边ibeacon设备接口
 * @function wxStartSearchBeacons
 * @return Promise
 * */
const wxStartSearchBeacons = () => {
    return new Promise((resolve, reject) => {
        Vue.wechat.startSearchBeacons({
            ticket: "",
            complete: function (argv) {
                let n = argv.errMsg.split(":")[1];
                switch (n) {
                    case "ok":
                        resolve('正在监听蓝牙...')//return []
                        break;
                    case "already started":
                        reject("请刷新页面后再进入");//"打开后未stop再次打开"
                        break;
                    case "bluetooth power off":
                        reject("蓝牙未打开");
                        break;
                    case "location service disable":
                        reject("地理位置服务未打开");
                        break;
                    case "system unsupported":
                        reject("系统不支持");
                        break;
                    default:
                        reject(n);
                        break;
                }
            }
        });
    })
};

/**
 *@desc 关闭查找周边ibeacon设备接口
 *@function wxStopSearchBeacons
 * @return Promise
 * */
const wxStopSearchBeacons = () => {
    return new Promise((resolve, reject) => {
        Vue.wechat.stopSearchBeacons({
            complete: function (res) {
                resolve(res)
            }
        });
    })
};
/**
 *@desc 监听周边ibeacon设备接口
 *@function wxOnSearchBeacons
 * @return Promise
 * */
const wxOnSearchBeacons = () => {
    return new Promise((resolve, reject) => {
        Vue.wechat.onSearchBeacons({
            complete: function (argv) {
                resolve(argv.beacons)
            }
        });
    })
};

const setWxConfig = () => {
    axios.post('http://wechat.ranqichina.com/weixin/jssdk/jsticket.do', {
        url: window.location.href.split('#')[0]
    }).then(res => {
        Vue.wechat.config({
            debug: false,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.signature,
            jsApiList: [
                'startSearchBeacons',
                'onSearchBeacons',
                'stopSearchBeacons'
            ]
        })
    }).catch(e => {
        console.log(e)
    })
}

export { 
    wxCheckJsApi, 
    wxStartSearchBeacons, 
    wxStopSearchBeacons, 
    wxOnSearchBeacons, 
    setWxConfig }