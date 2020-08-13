/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
import { useState, useEffect, useContext } from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
// import io from 'socket.io-client'
import io from 'socket.io'
// import io from 'socket.io-client'

import { Avatar, Badge, Layout, Menu } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { chatRoom, file, program, proclamation } from '../index'
import { Link, Route, Switch, useHistory } from 'react-router-dom';

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
    { title: '打开聊天页', path: `chatRoom`, name: '聊天' },
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
    const { groupID, groupName, groupType } = props.groupBaseInfo;
    const { url, path } = useMineRouteMatch(), history = useHistory();
    console.log('props', url, path)
    const SearchOutlinedOnClick = () => {
        history.push('/search')
    }
    return (
        <Layout css={css`display: flex; align-items: space-between;`}>
            <Header css={css`height: 40px;padding: 0 20px;background: #fafafa;display: flex;justify-content: space-between;align-items: center;`}>
                <h1 css={css`font-size: 18px;`}>{groupName}[Private]</h1>
                <Menu mode='horizontal' css={css`line-height:40px!important; background: #fafafa;margin-left: 100px;`}>
                    {
                        menuList.map(item => <Menu.Item key={item.name} title={item.title}>
                            <Link to={{
                                pathname: `${url}/${item.path}`,
                                state: {groupID, groupName, groupType}
                            }}>{item.name}</Link>
                        </Menu.Item>)
                    }
                    <MenuItem><SettingOutlined /></MenuItem>
                </Menu>
            </Header>
            <Content css={css`height: 75vh;`}>
                {/* 聊天 公告 文件 应用 */}
                {/* 嵌套路由: 不能在父路由上加 exact[精准匹配] */}
                <Switch>
                    <Route exact path={`${path}/chatRoom`} component={chatRoom}></Route>
                    <Route exact path={`${path}/proclamation`} component={proclamation}></Route>
                    <Route exact path={`${path}/file`} component={file}></Route>
                    <Route exact path={`${path}/program`} component={program}></Route>
                </Switch>
            </Content>
            {/* <Sider></Sider> 
            <Footer></Footer> */}
        </Layout>
    )
}

