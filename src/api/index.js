import axios from "axios";
import { message } from 'ant-design-vue';

const service = axios.create({
  baseURL: 'http://localhost:7529/api',
  timeout: 10000,
  withCredentials: true, //表示跨域请求时是否需要使用凭证
  // headers: { 'Content-Type': 'application/json' },
})

// 数据请求拦截
service.interceptors.request.use((config) => {
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 返回响应数据拦截
service.interceptors.response.use((res) => {
  const data = res.data;
  // 状态码为 2xx 范围时都会调用该函数，处理响应数据
  if (res.status === 200) {
    // message.success('请求成功！');
    // const code = data.code;
    return Promise.resolve(data);
  }
}, (error) => {
  if (error.response.status) {
    // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
    switch (error.response.status) {
      case 404:
        message.error('找不到请求路径！404');
        break;
      case 502:
        message.error('内部服务器错误！502');
        break;
      default:
        break;
    }
  }
  return Promise.reject(error);
});

// get请求
export const getRequest = (url, params) => {
  const config = {
    method:'GET',
    url,
  };
  if (params) {
    config.params = {...params};
  }
  return service(config);
}

// post请求
export const postRequest =async (url, params,head = {}) => {
  const config = {
    method:'POST',
    url,
  };
  if (params) {
    config.data = {...params};
  }
  if(head){
    config.headers = {...head};
  }
  return await service(config);
}