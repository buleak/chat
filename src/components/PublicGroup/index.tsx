/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
import { useState, useEffect, useContext } from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
// import io from 'socket.io-client'
import io from 'socket.io'
// import io from 'socket.io-client'

import { Avatar, Badge, Layout, Menu } from 'antd'
import { SearchOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { chat, file, program, proclamation } from '../../pages'

import { baseURL } from '../../units/config.default'
import { UserInfoCtx } from '../../units/context'
import { GroupBaseInfo } from '../../units/interface';
import { useMineRouteMatch } from '../../units/customHooks';

interface MenuItemProp { title: string, path: string, name: string }
const { Header, Sider, Content, Footer } = Layout
// const socket = io(baseURL, {
//     path: 'public'
// })
const menuList: MenuItemProp[] = [
    { title: '打开聊天页', path: `chat`, name: '聊天' },
    { title: '查看群公告', path: `proclamation`, name: '公告' },
    { title: '查看群文件', path: `file`, name: '文件' },
    { title: '查看群应用', path: `program`, name: '应用' },
]
const MenuItem = styled(Menu.Item)`
    &:hover {
        border-bottom: 2px solid transparent;
        span {
            background: #f0f0f0;
        }
    }
`
export default (props: { groupBaseInfo: GroupBaseInfo }) => {
    const userInfo = useContext(UserInfoCtx), { groupBaseInfo } = props, { groupID, groupType } = groupBaseInfo;
    const { url, path } = useMineRouteMatch(), history = useHistory();
    const SearchOutlinedOnClick = () => {
        history.push('/search')
    }
    return (
        <Layout css={css`display: flex; align-items: space-between;`}>
            <Header css={css`height: 40px;padding: 0 20px;background: #fafafa;display: flex;justify-content: space-between;align-items: center;`}>
                <h1 css={css`font-size: 18px;`}>{groupBaseInfo.groupName}</h1>
                <Menu mode='horizontal' css={css`line-height:40px!important; background: #fafafa;margin-left: 100px;`}>
                    {
                        menuList.map(item => <Menu.Item key={item.name} title={item.title}><Link to={{
                            pathname: `${url}/message/${item.path}`,
                            state: { groupID, groupType }
                        }}>{item.name}</Link></Menu.Item>)
                    }
                    {/* <Menu.Item title='打开聊天页'><Link to={`${url}/message/chat`, {state: {groupID}}}>聊天</Link></Menu.Item>
                    <Menu.Item title='查看群公告'><Link to={`${url}/message/proclamation`}>公告</Link></Menu.Item>
                    <Menu.Item title='查看群文件'><Link to={`${url}/message/file`}>文件</Link></Menu.Item>
                    <Menu.Item title='查看群应用'><Link to={`${url}/message/program`}>应用</Link></Menu.Item> */}
                    <MenuItem><SettingOutlined /></MenuItem>
                </Menu>
            </Header>
            <Content css={css`height: 75vh;`}>
                {/* 聊天 公告 文件 应用 */}
                {/* 嵌套路由: 不能在父路由上加 exact[精准匹配] */}
                <Switch>
                    <Route exact path={`${path}/message/chat`} component={chat}></Route>
                    <Route exact path={`${path}/message/proclamation`} component={proclamation}></Route>
                    <Route exact path={`${path}/message/file`} component={file}></Route>
                    <Route exact path={`${path}/message/program`} component={program}></Route>
                </Switch>
            </Content>
            {/* <Sider></Sider> 
            <Footer></Footer> */}
        </Layout>
    )
}

