import {history} from 'umi';
import {message} from 'antd';
import {parse} from 'qs';
import {fakeAccountLogin, getFakeCaptcha} from './service';
import {AuthControllerApi} from 'kosmos-dubhe-api';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // hard code
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
      const service = new AuthControllerApi();
      try {
        console.log('effects login userName, type, password ', userName, type, password);
        const {success, data} = yield call(() => service.loginUsingPOST(userName, password));
        yield put({
          type: 'changeLoginStatus',
          payload: {...data, status: 'ok', type: 'browser'}
        }); // Login successfully

        if (success) {
          message.success('登录成功！');
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
              window.location.href = redirect;
              return;
            }
          }

          history.replace(redirect || '/');
        }
      } catch (e) {
        console.log('effects login e ', e);
        message.error('密码输入错误.');
      }
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      const {token, status, type, user, expiration} = payload;
      console.log('reducers changeLoginStatus token, status, type, user, expiration ', token, status, type, user, expiration)
      setAuthority(token);
      return {...state, status, type, expiration, ...user};
    },
  },
};
export default Model;
