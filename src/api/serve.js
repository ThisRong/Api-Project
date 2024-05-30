import { getRequest,postRequest } from "./index.js";

// 用户注册 （使用账号密码注册）
export async function addAccountUser(url,params){
  return await postRequest(url,params);
}


// 用户登录 （使用账号密码登录）
export async function userAccountLogin(url,params){
  return await postRequest(url,params);
}

// 新增接口
export async function addInterface(url,params){
  return await postRequest(url,params);
}

// 接口广场数据列表获取
export async function interfacesquareInfo(url,params){
  return await getRequest(url,params);
}

// 通过ID获取接口数据
export async function interfacesquareById(url,params){
  return await getRequest(url,params);
}

// 通过ID修改接口
export async function updataInterFaceById(url,params){
  return await postRequest(url,params);
}

// 请求用户列表
export async function requestListUser(url,params){
  return await getRequest(url,params);
}

// 修改用户信息
export async function updataUser(url,params){
  return await postRequest(url,params);
}

// 获取已经登录的用户的信息
export async function getRequestUser(url,params){
  return await getRequest(url,params);
}

// 删除用户
export async function deleteUser(url,params){
  return await postRequest(url,params);
}

// 查询敏感词
export async function listSensitiveWord(url,params){
  return await getRequest(url,params);
}

// 修改敏感词
export async function updataSensitiveWord(url,params){
  return await postRequest(url,params);
}

// 添加敏感词
export async function addSensitiveWord(url,params){
  return await postRequest(url,params);
}

// 删除敏感词
export async function deleSensitiveWord(url,params){
  return await postRequest(url,params);
}

// 限流管理：增
export async function addCurrentLimting(url,params){
  return await postRequest(url,params);
}

// 限流管理：删
export async function deleteCurrentLimting(url,params){
  return await postRequest(url,params);
}

// 限流管理：改
export async function updataCurrentLimting(url,params){
  return await postRequest(url,params);
}

// 限流管理：查
export async function listCurrentLimting(url,params){
  return await postRequest(url,params);
}

// aksk
export async function getAKSK(url,params){
  return await getRequest(url,params);
}

// aksk更新
export async function genxinAKSK(url,params){
  return await postRequest(url,params);
}

// 预警词接口
export async function addYuJinci(url,params){
  return await postRequest(url,params);
}


