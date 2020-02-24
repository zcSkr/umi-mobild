const requestUrl = 'http://118.123.17.96:8080' //http://192.168.2.75:8087 http://118.123.17.96:8080
const projectName = 'phone'

export default {
  rootUrl: requestUrl + '/' + projectName, 
  fileUrl: requestUrl + '/' + projectName + '/', //文件根路径
  uploadUrl: requestUrl + '/' + projectName + '/sys/file/uploadFile.do', //上传文件
  getToken: function() {
    return localStorage.token ? localStorage.token : null;
  },
  setToken: function(token) {
    localStorage.token = token;
  },
  getUnionuser: function() {
    try {
      return localStorage.unionuser ? JSON.parse(localStorage.unionuser) : null;
    } catch (ex) {
      return null;
    }
  },
  setUnionuser: function(unionuser) {
    localStorage.unionuser = JSON.stringify(unionuser);
  },
  getSN: function() {
    try {
      return localStorage.SN ? JSON.parse(localStorage.SN) : null;
    } catch (ex) {
      return null;
    }
  },
  setSN: function(SN) {
    localStorage.SN = JSON.stringify(SN);
  },
  getPayLogId: function() {
    try {
      return localStorage.payLogId ? localStorage.payLogId : '';
    } catch (ex) {
      return null;
    }
  },
  setPayLogId: function(payLogId) {
    localStorage.payLogId = payLogId;
  }
};
