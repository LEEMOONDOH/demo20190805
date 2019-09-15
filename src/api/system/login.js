/*
 * @description: 用户登录调用api的文件
 * @author: Dylan(2102028233@qq.com)
 * @since: 2019年8月24日 13点59分
 * @modify:
 */
import request from '@/config/axios/instance';
import {BaseUrl} from "@/api/api"

export const getUser = (userEmail, userPassword) => {
  console.log(userEmail)
  return request({
    url: "user/login",
    method: "post",
    data: {
      userEmail,
      userPassword,
    }
  })
}
/* export default getUser */
