export default function injectWebViewJavascriptBridgeIos() {
    if(window.WebViewJavascriptBridge) {
        return 
    }
    const WebViewJavascriptBridge = {
        callHandler(name, data, callback) {
            setTimeout(() => {
                callback({
                    code: 0,
                    data: Math.random() * 10,
                    message: 'Success'
                })
            }, 1000) 
        }
    }

    setTimeout(() => {
      var callbacks = window.WVJBCallbacks;
      delete window.WVJBCallbacks;
      for (var i=0; i<callbacks.length; i++) {
        callbacks[i](WebViewJavascriptBridge);
      }
    }, 2000);
}