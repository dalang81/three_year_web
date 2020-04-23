import {stringify} from 'querystring';
import {history} from 'umi';
import {fakeAccountLogin} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {AuthService} from '@/api/DubheService';
import {ServiceSetting} from "@/api/SystemUtil" ;

const authService = new AuthService();
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * auth({payload}, {call, put}) {
      try {
        const response = yield call(authService.loginUsingPost,
          payload,
          ServiceSetting.axiosOption({
            reject: ({
                       type, message, errorCode, context
                     }) => console.log('customer reject ', type, message, errorCode)
          }));
        console.log('effects auth response ', response);
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const {resources} = response;

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
      } catch (e) {
        console.warn('login fail , error:', e);
      }
    },

    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

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
    },

    logout() {
      const {redirect} = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      const {user} = payload;
      const currentAuthority = user && _.split(user.roleIdAll, ',');
      setAuthority(currentAuthority);
      return {...state, status: payload.status, type: payload.type};
    },
  },
};
export default Model;
