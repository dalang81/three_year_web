"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const moment_1 = __importDefault(require("moment"));
var localStorage;
var window;
const LOCAL_STORAGE_MOCK = {
  expiration: moment_1.default().valueOf(),
  authtoken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDAyOCIsImNyZWF0ZWQiOjE1NjkzNzgxMjkyODIsImV4cCI6MTU2OTQxNDEyOX0.e3FCGpGyIZIimBDEo2t35w-drWky_hwZFTUrvQ5fqGJAjuV1s_et4H2N3dTmPWNdenSrBALm-XSvaht9SbzDVg'
};
const localStorageMock = {
  getItem: key => LOCAL_STORAGE_MOCK[key],
  setItem: (key, data) => (LOCAL_STORAGE_MOCK[key] = data)
};
localStorage = localStorage || localStorageMock;
const setToken = token => localStorage.setItem('authtoken', token);
const getToken = () => localStorage.getItem('authtoken');
const getExpiration = () => localStorage.getItem('expiration');
window = window || {
  location: {
    protocol: 'http',
    hostname: 'localhost',
    port: '28101',
    pathname: '/'
  }
};
const configs = {
  prod: {
    application: 'PICU',
    profile: 'prod',
    log: {
      //       level: 'DEBUG',
      // levels: ['TRACE', 'DEBUG', 'INFO', 'WARNING', 'ERROR'],
      // models: ['UI', 'SYSTEM', 'SERVICE', 'OTHER', 'UTIL'],
      level: 'INFO',
      models: ['UI'],
      // levels: '*',
      // models: '*',
      autoAllowHighLevel: true,
      exModel: ['EX_TEMP'],
      customer: 'CUSTOMER_TEMP:x, CUSTOMER_TEST',
      overConfig: true
    },
    server: {
      protocol: undefined,
      ip: undefined,
      //protocol: 'http',
      //ip: '10.10.10.253',
      path: undefined,
      port: 28001
    },
    socketio: {
      protocol: undefined,
      ip: undefined,
      port: 28002,
      transports: ['websocket', 'polling']
    },
    window,
    setToken,
    getToken,
    getExpiration
  },
  qa: {
    application: 'PICU',
    profile: 'qa',
    log: {
      //       level: 'DEBUG',
      // levels: ['TRACE', 'DEBUG', 'INFO', 'WARNING', 'ERROR'],
      // models: ['UI', 'SYSTEM', 'SERVICE', 'OTHER', 'UTIL'],
      level: 'INFO',
      models: ['UI'],
      // levels: '*',
      // models: '*',
      autoAllowHighLevel: true,
      exModel: ['EX_TEMP'],
      customer: 'CUSTOMER_TEMP:x, CUSTOMER_TEST',
      overConfig: true
    },
    server: {
      protocol: 'http',
      ip: 'picu.ngrok.lilian-info.com',
      //protocol: 'http',
      //ip: '10.10.10.253',
      path: undefined,
      port: 4441
    },
    socketio: {
      protocol: 'http',
      ip: 'picusio.ngrok.lilian-info.com',
      port: 4441,
      transports: ['polling']
    },
    window,
    setToken,
    getToken,
    getExpiration
  },
  dev: {
    application: 'PICU',
    profile: 'dev',
    log: {
      level: 'TRACE',
      // levels: ['TRACE', 'DEBUG', 'INFO', 'WARNING', 'ERROR'],
      // models: ['UI', 'SYSTEM', 'SERVICE', 'OTHER', 'UTIL'],
      //      level: 'INFO',
      //models: ['UI'],
      // levels: '*',
      models: '*',
      autoAllowHighLevel: true,
      exModel: ['EX_TEMP'],
      customer: 'CUSTOMER_TEMP:x, CUSTOMER_TEST',
      overConfig: true
    },
    server: {
      protocol: 'http',
      ip: 'localhost',
      //protocol: 'http',
      //ip: '10.10.10.253',
      path: undefined,
      port: 28101
    },
    socketio: {
      protocol: undefined,
      ip: undefined,
      port: undefined,
      transports: ['websocket', 'polling']
    },
    window,
    setToken,
    getToken,
    getExpiration
  },
  beta: {
    application: 'PICU',
    profile: 'beta',
    log: {
      //       level: 'DEBUG',
      // levels: ['TRACE', 'DEBUG', 'INFO', 'WARNING', 'ERROR'],
      // models: ['UI', 'SYSTEM', 'SERVICE', 'OTHER', 'UTIL'],
      level: 'INFO',
      models: ['UI'],
      // levels: '*',
      // models: '*',
      autoAllowHighLevel: true,
      exModel: ['EX_TEMP'],
      customer: 'CUSTOMER_TEMP:x, CUSTOMER_TEST',
      overConfig: true
    },
    server: {
      protocol: undefined,
      ip: undefined,
      //protocol: 'http',
      //ip: '10.10.10.253',
      path: undefined,
      port: 28101
    },
    socketio: {
      protocol: undefined,
      ip: undefined,
      port: 28002,
      transports: ['websocket', 'polling']
    },
    window,
    setToken,
    getToken,
    getExpiration
  },
  mock: {
    application: 'HAIS',
    profile: 'mock',
    log: {
      //       level: 'DEBUG',
      // levels: ['TRACE', 'DEBUG', 'INFO', 'WARNING', 'ERROR'],
      // models: ['UI', 'SYSTEM', 'SERVICE', 'OTHER', 'UTIL'],
      level: 'INFO',
      models: ['UI'],
      // levels: '*',
      // models: '*',
      autoAllowHighLevel: true,
      exModel: ['EX_TEMP'],
      customer: 'CUSTOMER_TEMP:x, CUSTOMER_TEST',
      overConfig: true
    },
    server: {
      protocol: 'http',
      ip: '192.168.0.205',
      path: undefined,
      port: 28101
    },
    socketio: {
      protocol: undefined,
      ip: undefined,
      port: 28102,
      transports: ['websocket', 'polling']
    },
    window,
    setToken,
    getToken,
    getExpiration
  }
};
const {API_ENV = 'dev'} = process.env;
console.log('  API_ENV ', API_ENV);
exports.DubheEnv = configs[API_ENV];
//# sourceMappingURL=env.js.map
