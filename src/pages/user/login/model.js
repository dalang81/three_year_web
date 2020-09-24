import {history} from 'umi';
import {message} from 'antd';
import {parse} from 'qs';
import {fakeAccountLogin, getFakeCaptcha} from './service';
import {stringify} from "querystring";

// import {AuthControllerApi} from 'kosmos-libra-api';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority, token) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // hard code
  localStorage.setItem('token', token); // hard code
  // reload Authorized component

  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}

const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    * login({payload: {userName, type, password}}, {call, put}) {

      try {
        const response = yield call(fakeAccountLogin, {password, type, userName});
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfullyuccessfully

        if (response.status === 'ok') {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let {redirect} = params;

          if (redirect) {
            const redirectUrlParams = new URL(redirect);

            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);

              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }
          history.replace(redirect || '/');
        }
      } catch (err) {
        console.error('effects login err ', err);
      }
    },

    logout() {
      //  const {redirect} = getPageQuery(); Note: There may be security issues, please note
      localStorage.setItem('token', null);
      if (window.location.pathname !== '/user/login') { //&& !redirect
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      const {token, status, type, user, expiration, currentAuthority} = payload;
      console.log('reducers changeLoginStatus token, status, type, user, expiration ', token, status, type, user, expiration);
      setAuthority(currentAuthority, token);
      return {...state, token, status, type, expiration, ...user};
    },
  },
};
export default Model;
