import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Layout } from 'antd'
import { Head, Side } from '../../components'
import { message, address, mine, document } from '../index'

import { useMineRouteMatch } from '../../units/unit'
import { userInfo, UserInfoCtx } from '../../units/context'

const {Content, Footer} = Layout

export default () => {
    const { url, path } = useMineRouteMatch()

    return (
        <UserInfoCtx.Provider value={userInfo}>
            <Layout>
                <Side url={url} />
                <Layout>
                    <Head />
                    <Content>
                        <Switch>
                            {/* 消息 联系人 文件 设置 */}
                            <Route exact path={`${path}`} component={message}></Route>
                            <Route exact path={`${path}/address`} component={address}></Route>
                            <Route exact path={`${path}/document`} component={document}></Route>
                            <Route exact path={`$${path}/mine`} component={mine}></Route>
                        </Switch>
                    </Content>
                    <Footer>
                        <a href="http://www.beian.miit.gov.cn" target='_blank'>豫ICP备19036212号</a>
                    </Footer>
                </Layout>
            </Layout>
        </UserInfoCtx.Provider>
    )
}

