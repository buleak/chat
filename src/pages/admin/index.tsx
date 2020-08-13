import React, {useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import {getState} from 'stook'
import { Layout } from 'antd'
import { Head, Side } from '../../components'
import { message, address, mine, document } from '../index'

import { useMineRouteMatch } from '../../units/customHooks'
import { userInfo, UserInfoCtx } from '../../units/context'

const {Content, Footer} = Layout

export default () => {
    // console.log('getState', getState('[userInfo]'))
    const { url, path } = useMineRouteMatch(), history = useHistory()
    useEffect(() => {
        history.push({
            pathname: `${url}/message`
        })
    }, [])
    return (
        <UserInfoCtx.Provider value={userInfo}>
            <Layout>
                <Side url={url} />
                <Layout>
                    <Head />
                    <Content>
                        {/* 消息 联系人 文件 设置 */ }
                        <Switch>
                            <Route path={`${path}/message`} component={message}></Route>
                            <Route exact path={`${path}/address`} component={address}></Route>
                            <Route exact path={`${path}/document`} component={document}></Route>
                            <Route exact path={`${path}/mine`} component={mine}></Route>
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

