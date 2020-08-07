/** @jsx jsx */
// 首页聊天记录列表

import { useRef, useState, useEffect } from 'react'
import { useStore } from 'stook'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";

import { Avatar, Layout, Menu, Badge } from 'antd'
import { IssuesCloseOutlined } from '@ant-design/icons'
import { Loading, Empty, PublicGroup, PrivateGroup } from '../../components'

import $ from '../../units/api'
import { userInfo as user } from '../../units/context'
import { GroupBaseInfo, HistoryRecordInfo } from '../../units/interface';

const { Sider, Content, } = Layout
const MenuItem = styled(Menu.Item)`
    height: auto!important;
    padding: 5px 15px!important;
    margin: 0!important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fafafa;
    &:hover {
        background: #f0f0f0;
    }
    &:first-of-type {
        line-height: 30px!important;
        font-size: 16px;
        font-weight: bold;
        justify-content: flex-start;
    }
    &:not(:last-of-type) {
        border-bottom: 1px solid #f0f0f0;
    }
`
const LastOnlineMsg = styled.div`
    color: #999;
    max-width: 300px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export default () => {
    const userInfo = useStore('userInfo')[0] || user
    const [isEmpty, setIsEmpty] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [historyGroupList, setHistoryGroupList] = useState([])
    const [chattingGroup, setChattingGroup] = useState<GroupBaseInfo>({ groupID: '', groupName: '聊天室', groupType: 0 })
    
    // 选择聊天对象,开启websocket
    const selectChattingGroup = (event: any) => {
        // let data = (groupBaseInfo.current as unknown as object).dataset
        let {domEvent} = event
        let data = domEvent.currentTarget.dataset
        console.log('data', data)
        setChattingGroup(data)
    }

    useEffect(() => {
        setIsLoading(true)
        // 聊天记录列表
        let cancelRequest = false // [组件销毁]的话, 停止修改数据
        $.getHistoryGroupList({ userID: userInfo.userID }).then((data: any) => {
            if (cancelRequest) { return }
            setIsLoading(false)
            setHistoryGroupList(data)
            setIsEmpty(!Boolean(data.length))
        })
        return () => {
            cancelRequest = true
        }
    }, [userInfo])
    return (
        <Layout css={css`height:100%`}>
            {/* 聊天记录侧边栏 */}
            <Sider width={300} css={css`background: #fafafa;heigth: 100%;`}>
                <Menu onClick={selectChattingGroup}>
                    <MenuItem><IssuesCloseOutlined style={{ fontSize: 20 }} />待办.{0}</MenuItem>
                    {
                        isLoading ? <Loading /> : isEmpty ? <Empty /> : historyGroupList.map((item: HistoryRecordInfo, index) => {
                            return (
                                <MenuItem key={index} data-group-i-d={item.groupID} data-group-name={item.groupName} data-group-type={item.groupType}>
                                    <Badge count={0}>
                                        <Avatar size={40} shape='square' src={item.groupAvatar} alt='图片加载失败' />
                                    </Badge>
                                    <div css={css`margin-left: 10px;flex: 1;`}>
                                        <div css={css`display: flex;justify-content: space-between;align-items: baseline;line-height: 20px;`}>
                                            <span css={css`font-size: 16px;font-weight: bold;`}>{item.groupName}</span>
                                            <span css={css`font-size: 12px; color: #999;`}>{item.lastOnlineDate || 'xxx'}</span>
                                        </div>
                                        <LastOnlineMsg>{item.lastOnlineMsg || '---'}</LastOnlineMsg>
                                    </div>
                                </MenuItem>)
                        })
                    }
                </Menu>
            </Sider>
            {/* 聊天栏 */}
            <Content>
                {(() => {
                    switch (+chattingGroup.groupType) {
                        case 1:
                            return <PublicGroup groupBaseInfo={chattingGroup} />
                        case 2:
                            return <PrivateGroup />
                        default:
                            return <Empty />
                    }
                })()}
            </Content>
        </Layout >
    )
}

