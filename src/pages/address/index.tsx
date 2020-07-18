import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'

import {Avatar} from 'antd'
import { UserAddOutlined, TeamOutlined } from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
// import { Empty, Loading, UserList } from '../../components'

import $ from '../../units/api'
import { UserInfoCtx } from '../../units/context'
import {FriendInfo, GroupJoinInInfo} from '../../units/interface'
// import { useMineRouteMatch } from '../../units/customHooks'

const FlexLi = styled.li`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0; 
    &:hover {
        background: #fafafa;
    }
    .anticon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: #ffffff;
        background: #1890ff;
        font-size: 24px;
        border-radius: 4px;
        margin: 5px 15px;
    }
    .type {
        flex: 1;
        font-size: 16px;
    }
`
interface AddressObject {
    becomeFriendList: FriendInfo[], 
    joinGroupList: GroupJoinInInfo[]
}
let obj:AddressObject = {
    becomeFriendList: [],
    joinGroupList: []
};
export default () => {
    const history = useHistory()
    // const { url, path } = useMineRouteMatch()
    const userInfo = useContext(UserInfoCtx)
    const [addressObj, setAddressObj] = useState(obj)

    const privateChat = (e:any) => {
        let groupID = ''
        const {grouptype, id} = e.currentTarget.dataset
        if(grouptype === 1) {
            groupID = id
        }else if(grouptype === 2) {
            groupID = `${userInfo.userID}_${id}`
        }
        history.push({
            pathname: '/chat',
            state: { groupID, groupType: Number(grouptype) }
        })
    }

    const addFriend = () => {}

    const createGroup = () => {
        history.push({
            pathname: '/createGroup',
        })
    }
    
    useEffect(() => {
        $.getAddressObj({ userID: userInfo.userID }).then((data: any) => {
            setAddressObj(data)
        })
    }, [userInfo.userID])

    return (
        <div>
            <ul>
                <FlexLi key='newFriend' onClick={addFriend}>
                    <UserAddOutlined style={{ backgroundColor: '#faad14' }} />
                    <span className='type'>新的朋友</span>
                </FlexLi>
                <FlexLi key='newGroup' onClick={createGroup}>
                    <TeamOutlined className='icon' style={{ backgroundColor: '#40a9ff' }} />
                    <span className='type'>群聊</span>
                </FlexLi>
            </ul>
            <ul style={{borderBottom: '1px solid #f0f0f0'}}>
                <li style={{padding: '10px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#f0f0f0'}}>好友列表</li>
                {
                    addressObj.becomeFriendList && addressObj.becomeFriendList.map((item:any) => (
                        // e.target.dataset.userid 
                        <FlexLi key={item.userID} data-grouptype={2} data-id={item.userID} onClick={privateChat}>
                            <Avatar className='anticon' src={item.avatar} />
                            <span className='type'>{item.userName}</span>
                        </FlexLi>
                    ))
                }
            </ul>
            <ul>
                <li style={{padding: '10px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#f0f0f0'}}>群列表</li>
                {
                    addressObj.joinGroupList && addressObj.joinGroupList.map((item:any) => (
                        <FlexLi key={item.groupID} data-grouptype={2} data-id={item.groupID} onClick={privateChat}>
                            <Avatar className='anticon' src={item.groupAvatar} size={30} />
                            <span className='type'>{item.groupName}</span>
                        </FlexLi>
                    ))
                }
            </ul>
            {/* {
                isLoading ? <Loading /> : isEmpty ? <Empty /> : <UserList userList={friendList} type={1} />}
            } */}
        </div>
    )
}

