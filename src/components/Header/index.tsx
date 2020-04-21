/** @jsx jsx */
import React from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Avatar, Badge, Button} from 'antd'
import { UserOutlined } from '@ant-design/icons'

import logo from '../../resources/imgs/logo.svg'

const index = () => {
    const onSearch = (value:string) => {
        console.log(value)

    }
    return (
        <header>
            <Badge count={5}>
                <Avatar icon={<UserOutlined css={css`
                    color: #262626;  
                    background-color: #85a5ff;
                `}/>}/>
            </Badge>
            <img src={logo} alt="图片加载失败"/>
            <Button></Button> 
            <Button></Button> 
        </header>
    )
}

export default index
