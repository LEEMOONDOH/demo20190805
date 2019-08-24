/*
* @description: axios插件，负责http请求与响应拦截
* @author: Dylan(2102028233@qq.com)
* @since: 2019年8月24日 13点08分
*/
import axios from "axios"
// import {BaseUrl} from "@/api/api"
import BaseUrl from "@/api/api"
import NProgress from "nprogress" //进度条插件
import "nprogress/nprogress.css"
import {Notification} from 'element-ui' //element-ui的通知样式
import Qs from "qs" // 用来处理数据


axios.defaults.withCredentials = true; //每次请求携带cookie信息

const instance = axios.create({
  baseURL: BaseUrl,
  timeout: 5000 //请求超时时间->10s
})

//http request拦截器
instance.interceptors.request.use(config => {
  NProgress.start(); //开启Nprogress加载进度条
  console.log("baseurl",BaseUrl)
  console.log("config",config)
  // console.log(store.getters.token)
  /* if (store.getters.token) {
    console.log(getToken())
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    var token = getToken()
    Object.assign(config.headers, { 'token': token })
  } */
  return config;
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

//http respone拦截器
instance.interceptors.response.use(
   response => {
     NProgress.done();
     // 异常处理
     if(response.status < 200 || response.status > 500){
       
       Notification({
         message: "未知错误",
         type: 'error',
         showClose: false,
         // duration: 5 * 1000 //持续时间
       })
     }else if(response.status === 200){
       let res = response.data;
       if (res.code != 200){
         Notification({
           message: res.message,
           type: 'error',
           showClose: false,
           // duration: 5 * 1000 //持续时间
         })
       }else
       return res;
     }
    // /**
    //  * code为非20000是抛错 可结合自己业务进行修改
    //  */
    // console.log("response",response)
    // console.log("response.data",response.data)
    // const res = response.data
    // if (res.code !== 200) {
    //   return response.data
    //   NProgress.done();
    //   Notification({
    //     message: res.message,
    //     type: 'error',
    //     showClose: false,
    //     duration: 5 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return null;
    // } else {
    //   return response.data
    // }
  },
  error => {
    NProgress.done();
    if(error.response && error.response.status == 404){
      Notification({
        message: "资源未找到",
        type: 'error',
        showClose: false,
        // duration: 5 * 1000 //持续时间
      })
    }
/*    if (error.message === 'Network Error' && error.config.url.endsWith('/license')) {
      Message({
        message: '无法连接到本地代理程序，请确认代理程序是否运行正常！',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      console.log(error + ' ' + error.config.url) // for debug
      Message({
        message: error.message + ' ' + error.config.url,
        type: 'error',
        duration: 5 * 1000
      })
    } */
    return Promise.reject(error)
  }
)
export default instance;
