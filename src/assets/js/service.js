import axios from "axios";
import Cookies from "js-cookie";

const Instance = axios.create({
  baseURL: "http://192.168.9.17:8090"
});

Instance.interceptors.request.use(
  config => {
    // config.headers["token"] = Cookies.get("token");
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  res => {
    const obj = {};
    obj.data = res.data;
    obj.status = res.status;
    obj.statusText = res.statusText;
    return obj;
  },
  error => {
    return Promise.reject(error);
  }
);

class Service {
  get(url, params, config = {}) {
    url = url || "";
    return Instance.get(url, { params, ...config });
  }
  post(url, params, config = {}) {
    url = url || "";
    return Instance.post(url, params, config);
  }
  delete(url, params, config = {}) {
    url = url || "";
    return Instance.delete(url, { params, ...config });
  }
}

export default new Service();
