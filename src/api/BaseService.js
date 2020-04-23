"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const axios_1 = __importDefault(require("axios"));
const SystemUtil_1 = require("./SystemUtil");

class BaseService {
  static async doRefresh(url, options) {
    //   console.log('options.needRefreshToken: ', options.needRefreshToken(), 'isLocked: ', isLocked(options));
    return (await SystemUtil_1.needWait()) || new Promise(async (resolve, reject) => {
      SystemUtil_1.dolock(options);
      const configs = Object.assign({}, options, {method: 'POST'});
      configs.headers = Object.assign({}, BaseService.getHeaders(options), {'Content-Type': 'application/json'});
      const localUrl = '/rest/refresh/token';
      configs.url = localUrl;
      const data = null;
      configs.data = data;
      axios_1.default(configs)
        .then(res => {
          SystemUtil_1.unlock(options);
          BaseService.handleData(options, res.data);
        })
        .catch(err => {
          SystemUtil_1.unlock(options);
          BaseService.handleNetError(options, err, options.reject || reject);
        });
    });
  }

  static async doRefresToken(url, options) {
    // console.log('options.needRefreshToken', options.needRefreshToken(), url);
    if (!url.startsWith('/rest') || url === '/rest/refresh/token') {
      return Promise.resolve();
    }
    if (options.needRefreshToken()) {
      const result = await BaseService.doRefresh(url, options);
      return result;
    }
    return Promise.resolve();
  }

  static getHeaders(options) {
    return options.getHeaders();
  }

  static handleNetError(options, err, reject) {
    console.log('BaseService handleNetError err ', err);
    const j = options.reject || reject;
    const error = SystemUtil_1.handleNetStatus(err);
    j
      ? j({
        ...error,
        type: SystemUtil_1.TYPE_BUSINESS_STATUS_ERROR
      })
      : SystemUtil_1.handleGlobalNetError(options.context,
      {...error, type: SystemUtil_1.TYPE_NET_STATUS_ERROR});
  }

  static handleBusinessException(options, {message, errorCode}, reject) {
    const j = options.reject || reject;
    j && j({message, errorCode});
    !j && SystemUtil_1.handleGlobalBusinessError(options.context, {message, errorCode});
  }

  static handleData(options, {data, errorCode, success, message}, resolve, reject) {
    success && resolve && resolve(data);
    !success && BaseService.handleBusinessException(options, {message, errorCode}, reject);
  }

  static preHandleRequest({context}, params) {
    // console.log('BaseService preHandleRequest preHandleRequest ');
    SystemUtil_1.handleLoadingStart(context);
  }

  static postHandleRequest({context}, data) {
    // console.log('BaseService postHandleRequest preHandleRequest ');
    SystemUtil_1.handleLoadingEnd(context);
  }
}

exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map
