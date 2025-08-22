import { createSSRApp } from "vue";
import App from "./App.vue";
import uniQuery from 'uni-query';
import validate from './validate';

// #ifdef H5
import Zdebug from 'zdebug.js';
Zdebug();

import wx from 'wechat-offiaccount';
if (/MicroMessenger/i.test(window.navigator.userAgent)) { // 微信公众号
  window.wx = wx;

  uni.request({
    url: "http://" + window.location.hostname + ":8090/JsApiSignature?url=" + window.location.href.split('#')[0],
    method: "GET",
    success: function (res: any) {
      wx.config({
        debug: true,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: ['chooseImage', 'getLocation'] // 必填，需要使用的JS接口列表
      })

      wx.error(function (err) {
        console.error(err)
      })
    }
  });
}
// #endif

uni.staticSrc = "";

export function createApp() {
  const app = createSSRApp(App).use(uniQuery, {
    validate
  });
  return {
    app,
  };
}
