const getApi = () => {
  const {API_ENV} = process.env;
  console.log(' getApi API_ENV ', API_ENV);
  switch (API_ENV) {
    case 'dev': {
      // return 'http://localhost:28101';
      return 'http://libra-privilege.api.9dyf.cn';
    }
    case 'qa': {
      return 'http://10.10.10.210:28301';
    }
    case 'demo': {
      return 'http://cdcs.g.lilian-info.com:4441';
    }
    case 'cfsa': {
      return 'http://cfsa.g.lilian-info.com:4441';
    }
    default : {
      console.warn(`not support API_ENV:[${API_ENV}]`);
      return '';
    }
  }
};

console.log(`

|  |/  /  /  __  \\      /       ||   \\/   |  /  __  \\      /       |
|  '  /  |  |  |  |    |   (----\`|  \\  /  | |  |  |  |    |   (----\`
|    <   |  |  |  |     \\   \\    |  |\\/|  | |  |  |  |     \\   \\
|  .  \\  |  \`--'  | .----)   |   |  |  |  | |  \`--'  | .----)   |
|__|\\__\\  \\______/  |_______/    |__|  |__|  \\______/  |_______/

`);


const proSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Dubhe',
  pwa: false,
  iconfontUrl: '',
  endpoint: () => `${getApi()}`,
};
export default proSettings;
