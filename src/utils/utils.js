import {parse} from 'querystring';
import pathRegexp from 'path-to-regexp';
import defaultSettings from '../../config/defaultSettings';
import { ApiClient, ApiContext } from 'kosmos-libra-api';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const {NODE_ENV} = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({routes, path = '/', target = '_self'}) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};


// -----------------------------------------------------------------------
const voidFunction = () => ({});

const selectSelf = (store, namespace) => store[namespace];
const selectSelfFn = namespace => store => {
  return selectSelf(store, namespace);
};

const buildApiClient = () => {
  const result = ApiClient.instance;
  const basePath = defaultSettings.endpoint;
  result.defaultHeaders = {...result.defaultHeaders, ...{token: localStorage.getItem('token')}};
  result.basePath = basePath;
  return result;
};

const registSystemExceptionHandler = fn => {
  ApiContext.instance.handleSystemException = fn || ApiContext.instance.handleSystemException;
};

const registAuthExceptionHandler = fn => {
  ApiContext.instance.handleAuthException = fn || ApiContext.instance.handleAuthException;
};

const registBusinessExceptionHandler = fn => {
  ApiContext.instance.handleBusinessException = fn || ApiContext.instance.handleBusinessException;
};

ApiClient.getInstance = buildApiClient;

export {
  buildApiClient,
  voidFunction,
  registSystemExceptionHandler,
  registAuthExceptionHandler,
  registBusinessExceptionHandler,
  selectSelf,
  selectSelfFn,
};
