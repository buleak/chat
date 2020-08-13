import { get, post } from './axios'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
// import { useFetch, useUpdate, fetch, fetcher, Refetch } from 'stook-rest'

export default {
    // 登录
    login: (params: { userName: string, passWord: string }) => get('/chat/login', params),
    // 注册
    register: (params: { userName: string, passWord: string, sex: string }) => post('/chat/login', params),
    // 搜索用户
    search: (params: any) => get(`/chat/login/new`, params),
    // 查询曾经对话过的群列表
    getHistoryGroupList: (params: { userID: string }) => get(`/chat/group/${params.userID}`),
    // 通讯录：好友列表 & 群列表
    getAddressObj: (params: { userID: string }) => get(`/chat/address/${params.userID}`),
    // 申请好友
    addFriend: (params: { userID: string, targetID: string }) => post('/chat/address', params),
    // 获取历史聊天记录
    getHistoryMsg: (params: { userID: string, groupID: string, groupName: string, groupType: number }) => get('/chat/msg', params),
    // 创建群聊
    createGroup: (params: { userID: string, groupName: string, groupType: number, groupAvatar: string, memberList: CheckboxValueType[] }) => post('/chat/group', params),
}
