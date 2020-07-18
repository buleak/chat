/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
// import React from 'react'
// import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import {Empty} from 'antd'
// import { ChromeFilled} from '@ant-design/icons'

const index = () => {
    return (
        <Empty 
            description='暂无数据'
            css={css`width:100%;height:200px;margin:150px 0 0;font-size: 30px;`}> </Empty>
    )
}

export default index
