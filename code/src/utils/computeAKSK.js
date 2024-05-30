import md5 from 'js-md5';

export const computeAKSKFun = (id = null,youxiang = null) => {
  if(youxiang == null){
    youxiang = '';
  }
  if(id == null){
    id = '';
  }
  let stringList = id + youxiang + "yidiansishiyi";
  let a = md5(stringList);
  let str = a.slice(8,24);
  return str;
}