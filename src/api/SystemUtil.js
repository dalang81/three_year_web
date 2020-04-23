"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const lodash_1 = __importDefault(require("lodash"));
const events_1 = require("events");
const env_1 = require("./env");
const {DubheEnv} = env_1;
/* tslint-disable */
/* eslint-disable */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
const TYPE_GLOBAL_ERROR = 'GLOBAL_ERROR';
const TYPE_NET_STATUS_ERROR = 'NET_STATUS_ERROR';
const TYPE_BUSINESS_STATUS_ERROR = 'TYPE_BUSINESS_STATUS_ERROR';
const TYPE_GLOBAL_LOADING_START = 'TYPE_GLOBAL_LOADING_START';
const TYPE_GLOBAL_LOADING_END = 'TYPE_GLOBAL_LOADING_END';
exports.TYPE_GLOBAL_ERROR = TYPE_GLOBAL_ERROR;
exports.TYPE_NET_STATUS_ERROR = TYPE_NET_STATUS_ERROR;
exports.TYPE_BUSINESS_STATUS_ERROR = TYPE_BUSINESS_STATUS_ERROR;
exports.TYPE_GLOBAL_LOADING_START = TYPE_GLOBAL_LOADING_START;
exports.TYPE_GLOBAL_LOADING_END = TYPE_GLOBAL_LOADING_END;


function handleNetStatus(error) {
  // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
  // 请求配置发生的错误
  if (!error.response) {
    const {message} = error;
    const result = {errorCode: '-1', message};
    console.log('handleNetStatus result ', result);
    return result;
  }
  // 响应时状态码处理
  const {status} = error.response;
  const errortext = `请求错误 ${status} ${codeMessage[status] || error.response.statusText}`;
  return {errorCode: status, message: errortext};
}

exports.handleNetStatus = handleNetStatus;
const handleGlobalError = (context, type, {message, errorCode}) => context.event &&
  context.event.emit(TYPE_GLOBAL_ERROR, {
    type, message, errorCode, context
  });
exports.handleGlobalError = handleGlobalError;

function handleLoadingStart(context) {
  context.event && context.event.emit(TYPE_GLOBAL_LOADING_START);
}

exports.handleLoadingStart = handleLoadingStart;

function handleLoadingEnd(context) {
  context.event && context.event.emit(TYPE_GLOBAL_LOADING_END);
}

exports.handleLoadingEnd = handleLoadingEnd;

function handleGlobalNetError(context, error) {
  if (error && context) {
    handleGlobalError(context, TYPE_NET_STATUS_ERROR, error);
  } else if (error) {
    console.log('handleGlobalNetError handleGlobalNetError result ', result);
  }
}

exports.handleGlobalNetError = handleGlobalNetError;

function handleGlobalBusinessError(context, error) {
  if (error && context) {
    handleGlobalError(context, TYPE_BUSINESS_STATUS_ERROR, error);
  } else if (error) {
    console.log('handleGlobalBusinessError  result ', error);
  }
}

exports.handleGlobalBusinessError = handleGlobalBusinessError;
const sleepSafe = (done, ms, targetTime = Date.now() + ms) => {
  setTimeout(() => {
    const rest = targetTime - Date.now();
    if (rest > 0) {
      sleepSafe(done, rest, targetTime); // try sleep more
    } else {
      done();
    }
  }, ms);
};

function sleep(ms) {
  return new Promise(resolve => sleepSafe(resolve, ms));
}

exports.sleep = sleep;
let locked = false;
const IDLE_TIME_OUT = 100;
const MAX_LOOP_TIMES = 100;
const isLocked = options => locked;
exports.isLocked = isLocked;
const unlock = ({context}) => {
  // context && handleLoadingStart(context);
  locked = false;
};
exports.unlock = unlock;
const dolock = ({context}) => {
  // context && handleLoadingEnd(context);
  locked = true;
};
exports.dolock = dolock;

async function needWait(times = 0) {
  if (!locked) {
    return false;
  }
  if (times > MAX_LOOP_TIMES) {
    throw new Error(`more than max [${MAX_LOOP_TIMES}] `);
  }
  await sleep(IDLE_TIME_OUT);
  const result = await needWait(times + 1);
  return result;
}

exports.needWait = needWait;
const {window, getToken, getExpiration} = DubheEnv;
// window.logger = logger;
console.log('----------------------------------------------start------------------------------------');
const ServeProtocol = (lodash_1.default.replace(DubheEnv.server.protocol, ':', '') || `${window.location.protocol.replace(':', '')}`); // 本机
const ServeIp = DubheEnv.server.ip || `${window.location.hostname}`; // 本机
// const pathname = env.server.path || `${window.location.pathname}`;
const ServePort = DubheEnv.server.port || (lodash_1.default.isEmpty(window.location.port) ? 80 : parseInt(window.location.port)); // 服务端口
const SocketProtocol = DubheEnv.socketio.protocol || ServeProtocol; // 本机
const SocketIp = DubheEnv.socketio.ip || ServeIp; // 本机
const SocketIOPort = DubheEnv.socketio.port || ServePort + 1;
const SocketTransports = DubheEnv.socketio.transports || ['websocket', 'xhr-polling', 'jsonp-polling'];

/* console.log(window.location.hostname);
console.log(window.location.pathname);
console.log(window.location.port);
console.log(window.location.protocol); */
function formatUrl(p) {
  return Array.isArray(p) ? formatUrl(p.join('/')) : (p.startsWith('/') ? p.substring(1) : p);
}

let context = {
  event: new events_1.EventEmitter()
};
context.event.on(TYPE_GLOBAL_ERROR, error => {
  switch (error.type) {
    case TYPE_NET_STATUS_ERROR:
      console.log('TCL: msg', error);
      //   window.location.href = '../../login';
      break;
    default:
      console.log('there is a error catch but didnot handle', msg);
  }
});

function axiosOption({reject}) {
  // console.log('needRefreshToken : ', getExpiration() - moment().valueOf(), 'baseURL:', genUrl());
  return {
    baseURL: genUrl(),
    context,
    needRefreshToken: () => false,
    getHeaders: () => ({Authorization: `Bearer${getToken()}`}),
    reject: reject
  };
}

function genRest(...args) {
  return genUrl('rest', ...args);
}

function genUrl(...args) {
  // console.log('genUrl genUrl ServeProtocol ', ServeProtocol, 'ServeIp  ', ServeIp, 'ServePort ', ServePort);
  return `${ServeProtocol}://${ServeIp}:${ServePort}/${lodash_1.default.map(args, i => formatUrl(i)).join('/')}`.replace('/?', '?');
}

function genSocketUrl() {
  return `${SocketProtocol}://${SocketIp}:${SocketIOPort}`;
}

function genSocketTransports() {
  // console.log('genSocketTransports genSocketTransports SocketTransports ', SocketTransports, SocketTransports.length);
  return [...SocketTransports];
}

// localStorage.debug = 'socket.io:client*,picu*';
//localStorage.debug = '*';
exports.ServiceSetting = {
  context,
  url: genUrl,
  rest: genRest,
  socketUrl: genSocketUrl,
  socketTransports: genSocketTransports,
  axiosOption: axiosOption
};
// tslint:enable
//# sourceMappingURL=SystemUtil.js.map
