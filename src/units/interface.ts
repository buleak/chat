export interface AxiosConfig {
    baseURL: string;
    transformRequest: ((data: any, headers: any) => string)[];
    transformResponse: ((data: any) => any)[];
    headers: {};
    timeout: number;
    withCredentials: boolean;
}

export interface UserBaseInfo { avatar: string, userID: string, userName: string, isFriend?: boolean }
export interface UserShowInfo extends UserBaseInfo { sex: string, registerDate: number }
export interface UserInfo extends UserBaseInfo { passWord: string, sex: string, registerDate: number }
export type UserSchema = UserBaseInfo 

export interface GroupBaseInfo { groupAvatar: string, groupID: string, groupName: string, groupType: number }
export interface GroupMemeberInfo extends UserBaseInfo { userIdentity: number, userAuthority: number, joinGroupDate: number, }
export interface GroupSchema extends GroupBaseInfo { groupLevel: number, groupProfile: string, groupCreateDate: number, memberList: GroupMemeberInfo[], }

export interface FriendInfo extends UserBaseInfo { becomeFriendDate: number, }
export interface GroupJoinInInfo extends GroupBaseInfo { joinGroupDate: number, }
export interface historyRecordInfo extends GroupBaseInfo { lastOnlineMsg: string, lastOnlineDate: number }
export interface AddressSchema extends UserBaseInfo { joinGroupList: GroupJoinInInfo[], becomFriendList: FriendInfo[], historyRecordList: historyRecordInfo[] }

export interface MsgInfo extends UserBaseInfo { msg: string, msgID: string, msgDate: number, }
export interface MsgSchema extends GroupBaseInfo { msgList: MsgInfo[], }

export interface UserListProp {
    type: number, // 1-历史记录的群列表 2-搜索结果的用户列表 3-建群添加群成员的好友列表 
    userList: GroupSchema[] | UserInfo[] | FriendInfo[],
}

export interface LastMsgProp {
    msg: string
}
