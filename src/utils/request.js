/*
 * @Author: luobr
 * @Date: 2022-11-19 14:15:04
 * @LastEditors: luobr
 * @LastEditTime: 2022-11-19 14:29:55
 * @Description: 
 */
import axios from 'axios';
axios.defaults.baseURL = '';

// 请求拦截器
axios.interceptors.request.use(config=>config);

// 响应拦截器
axios.interceptors.response.use(res=>{
    return res;
}, err=> Promise.reject(err));

