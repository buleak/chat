/** @jsx jsx */
import { Fragment, useState, useContext } from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Avatar, Badge, Button, message } from 'antd'


import $ from '../../units/api'
import { getDate } from '../../units/unit'
import { UserInfoCtx, UserItemCtx } from '../../units/context'
// import { FriendInfo, GroupSchema, UserBaseInfo } from '../../units/interface'

const LastOnlineMsg = styled.div`
    color: #999;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const UserItemBox = styled.li`
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
        background: #fafafa;
    }
`
/* // 类型判断
function isGroupSchema(props: GroupSchema | UserBaseInfo | FriendInfo): props is GroupSchema {
    return (props as GroupSchema).groupID !== undefined
}
function isFriendInfo(props: GroupSchema | UserBaseInfo | FriendInfo): props is FriendInfo {
    return (props as FriendInfo).becomeFriendDate !== undefined
} */

export default (props: any) => {
    /* // 类型保护
    if (isFriendInfo(props)) {
        becomeFriendDate = props.becomeFriendDate
    } */
    let { userID, avatar, userName, isFriend,groupID, groupName, groupAvatar } = props;
    const [isUserFriend, setIsUserFriend] = useState(isFriend)
    const [msgNum, lastOnlineDate, lastOnlineMsg] = [0, new Date().getTime(), 'xxx']
    const userInfo = useContext(UserInfoCtx)
    const userItemContext = useContext(UserItemCtx)
    const lastDate = getDate(lastOnlineDate);
    // const onSearch = (value: string) => {
    //     console.log(value)

    // }
    const addFriend = () => {
        $.addFriend({ userID: userInfo.userID, targetID: userID, }).then((data: any) => {
            if (data.status) {
                setIsUserFriend(true)
                message.info(data.msg)
            } else {
                message.warn(data.msg)
            }
        })
    }
    const AdminUserItem = () => {
        return (
            <Fragment>
                <div css={css`display: flex;justify-content: space-between;align-items: baseline;`}>
                    <span css={css`font-size: 16px;font-weight: bold;`}>{groupName}</span>
                    <span css={css`font-size: 12px; color: #999;`}>{lastDate}</span>
                </div>
                <LastOnlineMsg>{lastOnlineMsg}</LastOnlineMsg>
            </Fragment>
        )
    }
    const SearchUserItem = () => {
        return (
            <Fragment>
                <div css={css`display: flex;justify-content: space-between;align-items: baseline;`}>
                    <span css={css`font-size: 16px;font-weight: bold;`}>{userName}</span>
                    {
                        isUserFriend ? <Button>发消息</Button> : <Button onClick={addFriend} css={css`background: #85f5ff;color:#fff;`}>加好友</Button>
                    }
                </div>
            </Fragment>
        )
    }
    return (
        <UserItemBox key={userID} data-id={groupID}>
            <Badge count={msgNum}>
                <Avatar size={40} shape='square' src={userItemContext === 1 ? groupAvatar : avatar} alt='图片加载失败' />
            </Badge>
            <div css={css`margin-left: 10px;flex: 1;`}>
                {userItemContext === 1 ? <AdminUserItem /> : <SearchUserItem />}
            </div>
        </UserItemBox>
    )
}

