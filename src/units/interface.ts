export interface AxiosConfig {
    baseURL: string;
    transformRequest: ((data: any, headers: any) => string)[];
    transformResponse: ((data: any) => any)[];
    headers: {};
    timeout: number;
    withCredentials: boolean;
}

export interface UserBaseInfo {avatar: string, userID: string, userName: string, isFriend?: boolean,}
export interface UserInfo extends UserBaseInfo {  sex: string, msgNum?: number, registerDate: number, lastOnlineMsg?: string, lastOnlineDate: number, }
export interface UserShowInfo extends UserBaseInfo {  sex: string, msgNum?: number, registerDate: number, lastOnlineMsg?: string, lastOnlineDate: number, }
export interface UserSchema extends UserBaseInfo { passWord: string, sex: string, star: number, score: number, msgNum: number, registerDate: number, lastOnlineMsg: string, lastOnlineDate: number, }

export interface FriendInfo extends UserBaseInfo { becomeFriendDate: number,}
export interface FriendSchema extends UserBaseInfo { friendList: FriendInfo[], joinGroupList: GroupJoinInInfo[]}

export interface GroupBaseInfo {groupAvatar: string, groupID: string, groupName: string,}
export interface GroupJoinInInfo extends GroupBaseInfo {joinGroupDate: Number,}
export interface GroupMemeberInfo extends UserBaseInfo {joinGroupDate: Number,}
export interface GroupSchema extends UserBaseInfo, GroupBaseInfo { groupType: number, groupProfile: String, memberList: GroupMemeberInfo[],}

export interface MsgInfo extends UserBaseInfo{msg: string, msgDate: number,}
export interface MsgSchema extends GroupBaseInfo { msgProfile: string, msgList: MsgInfo[],}

export interface UserListProp {
    type: number, // 1-历史记录的群列表 2-搜索结果的用户列表 3-建群添加群成员的好友列表 
    userList: GroupSchema[] | UserInfo[] | FriendInfo[],
}

export interface LastMsgProp {
    msg: string
}

export interface UserHistoryMsgInfo {
    msg: string,
    msgID: string,
    avatar: string,
    userID: string,
    userName: string,
}
export interface groupInfo {
    groupID: string,
    groupName: string,
    lastHistoryMsgDate: number,
    UserHistoryMsgList: UserHistoryMsgInfo[],
}