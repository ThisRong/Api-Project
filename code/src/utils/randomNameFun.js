let array = [
  'baihe',
  'chahua',
  'kangnaixi',
  'kangnaixi2',
  'meiguihua',
  'muqingjie',
  'shuixianhua',
]
export const randomFun = ()=>{
  let number = Math.floor(Math.random()*6)+0;
  let url = `/pictures/interface/${array[number]}.svg`
  return url;
}