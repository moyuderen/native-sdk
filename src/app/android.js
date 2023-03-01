export default function injectWebViewJavascriptBridgeAndroid() {
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

    const even = new CustomEvent('WebViewJavascriptBridgeReady', {

    });

    setTimeout(() => {
        window.WebViewJavascriptBridge = WebViewJavascriptBridge
        document.dispatchEvent(even);
    }, 2000)
}