/** @jsx jsx */
// import React from 'react'
// import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";

import { UserItem } from '../index'
import { UserListProp } from '../../units/interface'
import {UserItemCtx} from '../../units/context'
export default (props: any) => {
    const {userList, type } = props;
    return (
        <UserItemCtx.Provider value={type}>
            <ul css={css`width:100vw;height:80vh;padding: ${type===1 ? '60px' : '0'} 0 20px; overflow-y:scroll;`}>
                {
                    userList.map((item: any) => <UserItem key={item.userID} {...item} />)
                }
            </ul>
        </UserItemCtx.Provider>
    )
}


