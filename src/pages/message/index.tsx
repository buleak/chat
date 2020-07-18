/** @jsx jsx */
// 首页聊天记录列表

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from 'stook'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";

import { Avatar, Layout, Menu, Badge } from 'antd'
import {IssuesCloseOutlined, SettingOutlined} from '@ant-design/icons'
import { Loading, Empty } from '../../components'

import $ from '../../units/api'
import { useMineRouteMatch } from '../../units/customHooks'
import { userInfo as user } from '../../units/context'
import { historyRecordInfo } from '../../units/interface';

const { Sider, Content, Footer } = Layout
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
const PublicBtnGroup = (props:any) => {
    return (
        <Menu>公共群</Menu>
    )
}
const SelfBtnGroup = (props:any) => {
    return (
        <Menu>私聊群</Menu>
    )
}
export default () => {
    const userInfo = useStore('userInfo')[0] || user
    const [isEmpty, setIsEmpty] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [historyGroupList, setHistoryGroupList] = useState([])
    const [onlineGroup, setOnlineGroup] = useState({id: '', name: '聊天室', type: 0})
    const { url, path } = useMineRouteMatch()
    const selectOnlineGroup = (event:any) => {
        let data = event.currentTarget.dataset
        console.log('data', event.currentTarget.dataset)
        setOnlineGroup(data)
    }
    useEffect(() => {
        setIsLoading(true)
        // 历史记录列表
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
            <Sider width={300} css={css`background: #fafafa;heigth: 100%;`}>
                <Menu>
                    <MenuItem><IssuesCloseOutlined style={{fontSize: 20}}/>待办.{0}</MenuItem>
                    {
                        isLoading ? <Loading /> : isEmpty ? <Empty /> : historyGroupList.map((item: historyRecordInfo) => {
                            return (
                                <MenuItem key={item.groupID} >
                                    <Badge count={0}>
                                        <Avatar size={40} shape='square' src={item.groupAvatar} alt='图片加载失败' />
                                    </Badge>
                                    <div css={css`margin-left: 10px;flex: 1;`} data-id={item.groupID} data-name={item.groupName} data-type={item.groupType} onClick={selectOnlineGroup}>
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
            <Layout>
                <Content>
                    {
                        !onlineGroup.type ? <Empty />: (<div>
                        {onlineGroup.name}
                        {
                            onlineGroup.type === 1 ? <PublicBtnGroup /> : <SelfBtnGroup />
                        }
                    </div> )
                    }
                </Content>
                <Footer>footer</Footer>
            </Layout>
        </Layout >
    )
}

