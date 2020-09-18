/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {DefaultFooter, SettingDrawer} from '@ant-design/pro-layout';
import React, {useEffect} from 'react';
import {Link, useIntl, connect, history} from 'umi';
import {GithubOutlined} from '@ant-design/icons';
import {Result, Button, notification} from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {getAuthorityFromRouter} from '@/utils/utils';
import logo from '../assets/logo.svg';
import {
  registAuthExceptionHandler,
  registBusinessExceptionHandler,
  registSystemExceptionHandler,
} from '@/utils/utils';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁金服体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined/>,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  registAuthExceptionHandler(err => {
    console.log('BasicLayout registAuthExceptionHandler err ', err);
    const {data} = err;
    const {body: {improvement = '请重新登录', message = '认证失败或已过期', level = 0}} = (data || {body: {}});
    notification.error({
      message: '警告',
      description: `${message}  , ${improvement}`,
      onClose: () => localStorage.setItem('token', '') || router.push('/user/login'),
    });
    throw err;
  });

  registBusinessExceptionHandler(err => {
    console.log('BasicLayout registBusinessExceptionHandler err ', err);
    const {data} = err;
    const {body: {improvement = '请通知管理员', message = '操作失败', level = 0}} = (data || {body: {}});
    notification.error({
      message: '操作失败',
      description: `${message}  , ${improvement} `,
    });
    throw err;
  });

  registSystemExceptionHandler(err => {
    console.log('BasicLayout registSystemExceptionHandler err ', err);
    const {data} = err || {};
    const {body} = data;
    const {improvement = '请通知管理员', message = '系统异常', level = 0} = body;
    notification.error({
      message: '系统异常',
      description: `${message}  , ${improvement}`,
    });
    throw err;
  });

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  const {formatMessage} = useIntl();
  return (
    <>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent/>}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({global, settings}) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
