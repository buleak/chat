import { get, post } from './axios'

export default {
    login: (params: any) => get('/chat/login', params), // 登录接口 @param params {userName, passWord} 
    register: (params: any) => post('/chat/login', params), // 注册接口 @param params {userName, passWord, sex, rePassWord}
    search: (params: any) => get(`/chat/login/new`, params), // 首页搜索用户
    getHistoryGroupList: (params: any) => get(`/chat/group/${params.userID}`), // 查询曾经对话过的群列表
    getAddressObj: (params: {userID:string}) => get(`/chat/address/${params.userID}`), // 通讯录：好友列表 & 群列表
    addFriend: (params: {userID:string, targetID:string}) => post('/chat/address', params), // 申请好友
    getHistoryMsg: (params: {groupID:string, groupType:number}) => get('/chat/msg', params) // 获取里聊天记录
    // hasToken: () => get('/token'), // 通过响应拦截判断是否有 token或 token是否过期
    // ranking: (params:any) => get('/rank', params),
    // getUserInfo: (params:any) => get(`/user/${params.userName}`), 
    // getChatHistory: (params:any) => get('/chatHistory', params),
}
