import initBridge from './bridge.js'

class NativeSdk {
  constructor(config) {
    this.bridge = null;
    this.invokeQueue = [];

    this.init(config);
  }

  // 初始化操作
  init() {
    initBridge(this);
  }

  loaded(bridge) {
    console.log("native sdk 初始化成功！！");
    this.bridge = bridge;
    console.log('sdk', this)
    while (this.invokeQueue.length) {
      const first = this.invokeQueue.shift();
      if (first) {
        const [apiName, options] = first;
        this.invoke(apiName, options);
      }
    }
  }

  invoke(apiName, options) {
    if (!this.bridge) {
      // 等效于window.WebViewJavascriptBridge, 是吧window.WebViewJavascriptBridge挂载this.bridge属性下了
      // 执行的方法存入队列中
      this.invokeQueue.push([apiName, options]);
      return;
    }
    const ctx = {
      apiName,
      ...options,
    };

    const { success, fail, ...params } = options;
    // 等效于window.WebViewJavascriptBridge
    this.bridge.callHandler(ctx.apiName, params, (res) => {
      const {code, data} = res
      if(code === 0) {
        ctx.success(data, ctx);
      }
    });
  }
}

export default NativeSdk