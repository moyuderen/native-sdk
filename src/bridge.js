import { isAndroid } from './utils.js'
import injectWebViewJavascriptBridgeAndroid from './app/android.js'
import injectWebViewJavascriptBridgeIos from './app/ios.js'

const __Mock__Is_Android = false

if(__Mock__Is_Android) {
    injectWebViewJavascriptBridgeAndroid()
}else {
    injectWebViewJavascriptBridgeIos()
}


export default function initBridge(sdk) {
    if(isAndroid || __Mock__Is_Android) {
        setupAndroidJavascriptBridge((bridge) => {
            console.log('Android Javascript bridge ready', bridge);
            sdk.loaded(bridge)
        })
    }else {
        setupIosJavascriptBridge((bridge) => {
            console.log('IOS Javascript bridge ready', bridge);
            sdk.loaded(bridge)
        }) 
    }
    console.log('start init bridge !')
}

function setupAndroidJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function(e) {
            callback(window.WebViewJavascriptBridge)
        }, false)
    }
}

export function setupIosJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge)
    }
    // WVJBCallbacks用于还没有初始化的时候，保存回调函数，初始化之后，bridge里面会去遍历该数组中的函数，并传入bridge对象
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}