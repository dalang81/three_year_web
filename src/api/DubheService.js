"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const axios_1 = __importDefault(require("axios"));
const BaseService_1 = __importDefault(require("./BaseService"));
const SystemUtil_1 = require("./SystemUtil");

class AuthService extends BaseService_1.default {
  /**
   * 认证接口
   */
  loginUsingPost(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/auth/login';
      request.url = url;
      request.params = {username: params['username'], password: params['password']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch((err, res) => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.AuthService = AuthService;

class TyDemoService extends BaseService_1.default {
  /**
   * 测试fetch
   */
  fetchMonitorStatusUsingGet1(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/TY/fetchMonitorStatus';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 测试fetch分页nosql
   */
  fetchMonitorStatusPageUsingGet1(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/TY/fetchMonitorStatusPage';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.TyDemoService = TyDemoService;

class ClassesService extends BaseService_1.default {
  /**
   * 创建班级信息
   */
  createClassesUsingPost(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/classes/createClasses';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = Object.assign({}, params['classes']);
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 创建班级信息
   */
  createClassesLightUsingPost(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/classes/createClassesLight';
      request.url = url;
      request.params = {schoolId: params['schoolId'], classesName: params['classesName']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 删除班级信息
   */
  deleteClassesUsingDelete(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'DELETE'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/classes/deleteClasses/{id}';
      url = url.replace('{id}', params['id'] + '');
      request.url = url;
      request.params = {};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 查询班级信息
   */
  fetchClassesByNameUsingGet(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/classes/fetchClassesByName';
      request.url = url;
      request.params = {
        pageSize: params['pageSize'],
        pageNum: params['pageNum'],
        orderBy: params['orderBy'],
        gradesId: params['gradesId'],
        classesName: params['classesName']
      };
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 修改班级信息
   */
  updateClassesUsingPut(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'PUT'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/classes/updateClasses';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = Object.assign({}, params['classes']);
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.ClassesService = ClassesService;

class GradesService extends BaseService_1.default {
  /**
   * 创建年级信息
   */
  createGradesUsingPost(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/grades/createGrades';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = Object.assign({}, params['grades']);
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 创建年级信息
   */
  createGradesLightUsingPost(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/grades/createGradesLight';
      request.url = url;
      request.params = {schoolId: params['schoolId'], gradesName: params['gradesName']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 删除年级信息
   */
  deleteGradesUsingDelete(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'DELETE'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/grades/deleteGrades/{id}';
      url = url.replace('{id}', params['id'] + '');
      request.url = url;
      request.params = {};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 查询年级信息
   */
  fetchGradesByNameUsingGet(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/grades/fetchGradesByName';
      request.url = url;
      request.params = {
        pageSize: params['pageSize'],
        pageNum: params['pageNum'],
        orderBy: params['orderBy'],
        schoolId: params['schoolId'],
        gradesName: params['gradesName']
      };
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 修改年级信息
   */
  updateGradesUsingPut(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'PUT'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/grades/updateGrades';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = Object.assign({}, params['grades']);
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.GradesService = GradesService;

class MonitorStatusDemoService extends BaseService_1.default {
  /**
   * 测试fetch
   */
  fetchMonitorStatusUsingGet(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/monitorStatus/fetchMonitorStatus';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 测试fetch分页nosql
   */
  fetchMonitorStatusPageUsingGet(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/monitorStatus/fetchMonitorStatusPage';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 测试fetch分页sql
   */
  fetchMonitorStatusPageSqlUsingGet(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/monitorStatus/fetchMonitorStatusPageSql';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.MonitorStatusDemoService = MonitorStatusDemoService;

class LoginService extends BaseService_1.default {
  /**
   * 登录接口
   */
  refreshTokenUsingPost(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/refresh/token';
      request.url = url;
      request.params = {};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.LoginService = LoginService;

class SchoolService extends BaseService_1.default {
  /**
   * 创建学校信息
   */
  createSchoolUsingPost(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/school/createSchool';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = Object.assign({}, params['school']);
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 创建学校信息
   */
  createSchoolLightUsingPost(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'POST'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/school/createSchoolLight';
      request.url = url;
      request.params = {schoolName: params['schoolName'], shortName: params['shortName']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 删除学校信息
   */
  deleteSchoolUsingDelete(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'DELETE'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/school/deleteSchool/{id}';
      url = url.replace('{id}', params['id'] + '');
      request.url = url;
      request.params = {};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 查询学校信息
   */
  fetchSchoolByNameUsingGet(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/school/fetchSchoolByName';
      request.url = url;
      request.params = {
        pageSize: params['pageSize'],
        pageNum: params['pageNum'],
        orderBy: params['orderBy'],
        schoolName: params['schoolName'],
        shortName: params['shortName']
      };
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 修改学校信息
   */
  updateSchoolUsingPut(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'PUT'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/school/updateSchool';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = Object.assign({}, params['school']);
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.SchoolService = SchoolService;

class SystemConfigService extends BaseService_1.default {
  /**
   * 获取全部配置项设置值
   */
  fetchAllItemSettingUsingGet(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/systemConfig/fetchAllItemSetting';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 获取配置组信息
   */
  fetchConfigByGroupCodeUsingGet(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/systemConfig/fetchConfigByGroupCode/{groupCode}';
      url = url.replace('{groupCode}', params['groupCode'] + '');
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 获取配置项设置值
   */
  fetchItemSettingByItemCodeUsingGet(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/systemConfig/fetchItemSettingByItemCode/{itemCode}';
      url = url.replace('{itemCode}', params['itemCode'] + '');
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 禁用配置项
   */
  updateDisableSystemConfigUsingPut(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'PUT'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/systemConfig/updateDisableSystemConfig/{itemCode}';
      url = url.replace('{itemCode}', params['itemCode'] + '');
      request.url = url;
      request.params = {};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 启用配置项
   */
  updateEnableSystemConfigUsingPut(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'PUT'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/systemConfig/updateEnableSystemConfig/{itemCode}';
      url = url.replace('{itemCode}', params['itemCode'] + '');
      request.url = url;
      request.params = {};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 保存组配置信息
   */
  updateConfigByGroupSettingUsingPut(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'PUT'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/systemConfig/updateSystemConfigGroupSetting';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = params['list'];
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 保存项配置信息
   */
  updateSystemConfigSettingUsingPut(params, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'PUT'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/systemConfig/updateSystemConfigItemSetting';
      request.url = url;
      request.params = {};
      let requestBody = null;
      requestBody = Object.assign({}, params['config']);
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.SystemConfigService = SystemConfigService;

class UserService extends BaseService_1.default {
  /**
   * 获取当前用户信息
   */
  querAllAvailableUsingGet(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/user/all';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }

  /**
   * 获取当前用户信息
   */
  currentUsingGet(params = {}, options = SystemUtil_1.ServiceSetting.axiosOption()) {
    return new Promise(async (resolve, reject) => {
      const request = Object.assign({}, options, {method: 'GET'});
      request.headers = Object.assign({}, BaseService_1.default.getHeaders(options), {'Content-Type': 'application/json'});
      let url = '/rest/user/current';
      request.url = url;
      request.params = {pageSize: params['pageSize'], pageNum: params['pageNum'], orderBy: params['orderBy']};
      let requestBody = null;
      request.data = requestBody;
      await BaseService_1.default.doRefresToken(url, options);
      BaseService_1.default.preHandleRequest(options, params);
      axios_1.default(request)
        .then(res => {
          const data = res && res.data;
          BaseService_1.default.postHandleRequest(options, params);
          BaseService_1.default.handleData(options, data, resolve, reject);
        })
        .catch(err => {
          BaseService_1.default.handleNetError(options, err);
          BaseService_1.default.postHandleRequest(options, params);
          reject(err);
        });
    });
  }
}

exports.UserService = UserService;

class AuthResponse {
  constructor(data) {
    if (data) {
      this['expiration'] = data['expiration'];
      this['token'] = data['token'];
      this['user'] = data['user'];
    }
  }
}

exports.AuthResponse = AuthResponse;

class Classes {
  constructor(data) {
    if (data) {
      this['classesId'] = data['classesId'];
      this['classesName'] = data['classesName'];
      this['gradesId'] = data['gradesId'];
      this['remark'] = data['remark'];
      this['seq'] = data['seq'];
    }
  }
}

exports.Classes = Classes;

class Grades {
  constructor(data) {
    if (data) {
      this['completionDate'] = data['completionDate'];
      this['enrollmentDate'] = data['enrollmentDate'];
      this['gradesId'] = data['gradesId'];
      this['gradesName'] = data['gradesName'];
      this['remark'] = data['remark'];
      this['schoolId'] = data['schoolId'];
    }
  }
}

exports.Grades = Grades;

class IUser {
  constructor(data) {
    if (data) {
      this['avatar'] = data['avatar'];
      this['createdTime'] = data['createdTime'];
      this['deptList'] = data['deptList'];
      this['dutiesId'] = data['dutiesId'];
      this['email'] = data['email'];
      this['password'] = data['password'];
      this['positionTitleId'] = data['positionTitleId'];
      this['positionTypeId'] = data['positionTypeId'];
      this['roleIdAll'] = data['roleIdAll'];
      this['roleNameAll'] = data['roleNameAll'];
      this['roleTypeId'] = data['roleTypeId'];
      this['telephone'] = data['telephone'];
      this['updateTime'] = data['updateTime'];
      this['userAccountStatus'] = data['userAccountStatus'];
      this['userCode'] = data['userCode'];
      this['userId'] = data['userId'];
      this['userName'] = data['userName'];
    }
  }
}

exports.IUser = IUser;

class School {
  constructor(data) {
    if (data) {
      this['address'] = data['address'];
      this['city'] = data['city'];
      this['district'] = data['district'];
      this['eduNumber'] = data['eduNumber'];
      this['email'] = data['email'];
      this['province'] = data['province'];
      this['reginNumber'] = data['reginNumber'];
      this['remark'] = data['remark'];
      this['schoolId'] = data['schoolId'];
      this['schoolName'] = data['schoolName'];
      this['schoolNameEn'] = data['schoolNameEn'];
      this['shortName'] = data['shortName'];
      this['shortNameEn'] = data['shortNameEn'];
      this['subDistrict'] = data['subDistrict'];
      this['telephone'] = data['telephone'];
    }
  }
}

exports.School = School;

class SysSystemConfig {
  constructor(data) {
    if (data) {
      this['disabled'] = data['disabled'];
      this['groupCode'] = data['groupCode'];
      this['groupName'] = data['groupName'];
      this['groupRemark'] = data['groupRemark'];
      this['groupSeq'] = data['groupSeq'];
      this['itemCode'] = data['itemCode'];
      this['itemDefaultValue'] = data['itemDefaultValue'];
      this['itemName'] = data['itemName'];
      this['itemRemark'] = data['itemRemark'];
      this['itemSeq'] = data['itemSeq'];
      this['itemType'] = data['itemType'];
      this['itemValue'] = data['itemValue'];
      this['itemValueRange'] = data['itemValueRange'];
      this['settingValue'] = data['settingValue'];
      this['systemConfigId'] = data['systemConfigId'];
    }
  }
}

exports.SysSystemConfig = SysSystemConfig;

class Users {
  constructor(data) {
    if (data) {
      this['avatar'] = data['avatar'];
      this['createdTime'] = data['createdTime'];
      this['deptList'] = data['deptList'];
      this['dutiesId'] = data['dutiesId'];
      this['email'] = data['email'];
      this['password'] = data['password'];
      this['positionTitleId'] = data['positionTitleId'];
      this['positionTypeId'] = data['positionTypeId'];
      this['roleTypeId'] = data['roleTypeId'];
      this['telephone'] = data['telephone'];
      this['updateTime'] = data['updateTime'];
      this['userAccountStatus'] = data['userAccountStatus'];
      this['userCode'] = data['userCode'];
      this['userId'] = data['userId'];
      this['userName'] = data['userName'];
    }
  }
}

exports.Users = Users;
//# sourceMappingURL=DubheService.js.map
