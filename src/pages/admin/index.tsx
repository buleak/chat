import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import $ from '../../units/api'
import { useMineRouteMatch } from '../../units/unit'
import { userInfo, UserInfo } from '../../units/context'
import { Head, Foot, UserList, Loading, Empty } from '../../components'
import { address, mine, find } from '../index'
export default () => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [historyGroupList, setHistoryGroupList] = useState([])
    const { url, path } = useMineRouteMatch()
    useEffect(() => {
        setIsLoading(true)
        // 历史记录列表
        let cancelRequest = false
        $.getHistoryGroupList({ userID: userInfo.userID }).then((data: any) => {
            if(cancelRequest) { return }
            setIsLoading(false)
            setHistoryGroupList(data)
            setIsEmpty(!Boolean(data.length))
        })
        return () => {
            cancelRequest = true
        }
    }, [])
    return (
        <UserInfo.Provider value={userInfo}>
            <Head />
            <main style={{ margin: '60px 0 80px', height: 'calc(100vh-140px)' }}>
                <Switch>
                    <Route exact path={`${path}`} render={({ location }) => isLoading ? <Loading /> : isEmpty ? <Empty /> : <UserList userList={historyGroupList} type={1} />}></Route>
                    <Route exact path={`${path}/address`} component={address}></Route>
                    <Route exact path={`${path}/find`} component={find}></Route>
                    <Route exact path={`$${path}/mine`} component={mine}></Route>
                </Switch>
            </main>
            <Foot url={url} />
        </UserInfo.Provider>
    )
}

