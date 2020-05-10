/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
// import React from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import {Spin} from 'antd'
import { ChromeFilled} from '@ant-design/icons'

const index = () => {
    return (
        <Spin
            css={css`width:100vw;height:200px;margin-top:150px;font-size: 30px;`}
            size='large' 
            tip='加载中 (o…O)' 
            indicator={<ChromeFilled spin style={{fontSize: '60px'}} />} 
        > 
        </Spin>
    )
}

export default index
