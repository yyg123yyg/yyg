import axios from 'axios'
import {Toast} from "vant";
import Loading from "../store/index";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  })
// 请求拦截
  instance.interceptors.request.use(config => {
    // 当getters里面的isLoading为true再显示请求加载
    if (Loading.getters.isLoading) {
        Toast.loading({
          forbidClick: true,
          message: "加载中...",
        });
    }
    // console.log(config)
    return config
  }, err => {
    console.log(err)
  });
//响应拦截
  instance.interceptors.response.use(res => {
    Toast.clear();
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  });

  return instance(config)
}
