/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
// import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";

import { Menu, Layout, Badge, Avatar } from 'antd'
import { WechatOutlined, TeamOutlined, CloudSyncOutlined, AlignLeftOutlined } from '@ant-design/icons'

import { useStore, getState } from 'stook';
const { Sider } = Layout
const MenuItem = styled(Menu.Item)`
    margin-bottom: 20px!important;
    a>span {
        font-size: 20px!important;
    }
`
export default (props: any) => {
    const { url } = props;
    const [key, setKey] = useStore('[sideKey]', 'chatRoom')
    // const [hasMsg, setHasMsg] = useState(false) //消息红点提醒
    const userInfo = getState('[userInfo]')
    // console.log('userInfo', userInfo)
    const handleClick = (e: any) => {
        setKey(e.key)
    }
    const onCollapse = (collapsed: boolean, type: string) => {
        console.log('侧边栏收起||展开', collapsed, type)
    }
    const onBreakpoint = (broken: any) => {
        console.log('触发断点', broken)
    }
    return (
        <Sider breakpoint='sm' theme='light' width='80px' collapsed={true} collapsedWidth={80} onCollapse={onCollapse} onBreakpoint={onBreakpoint} css={css`text-align:center;padding: 30px 0px;background:#f5f5f5;`}>
            <Badge dot={false} css={css`margin-bottom:50px;background:#f5f5f5;border-radius: 8px;padding:5px;`}>
                <Avatar shape='square' size={30} src={userInfo.avatar} />
            </Badge>
            <Menu onClick={handleClick} selectedKeys={[key]} mode="inline" css={css`width: auto; border: none;color: #fff;background:#f5f5f5;`}>
                <MenuItem key='chatRoom' title='消息'>
                    <Link to={`${url}/message`}><WechatOutlined /></Link>
                </MenuItem>
                <MenuItem key='address' title='通讯录'>
                    <Link to={`${url}/address`}><TeamOutlined /></Link>
                </MenuItem>
                <MenuItem key='document' title='文件夹'>
                    <Link to={`${url}/document`}><CloudSyncOutlined /></Link>
                </MenuItem>
                <MenuItem key='mine' title='个人中心' css={css`margin-top: 300px!important;`}>
                    <Link to={`${url}/mine`}><AlignLeftOutlined /></Link>
                </MenuItem>
            </Menu>
        </Sider>
    )
}

