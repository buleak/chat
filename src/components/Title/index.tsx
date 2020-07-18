/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
// import React from 'react'
// import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { LeftOutlined, DashOutlined} from '@ant-design/icons'

const index = (props:any) => {
    const { title, hasDashBtn=false, color='#000', bgColor='#fff' } = props;
    return (
        <header css={css`display:flex;justify-content: space-between;align-items: center;position:fixed;top:0;left:0;width:100vw;padding: 10px;background-color:${bgColor};border-bottom:1px solid #8c8c8c;z-index: 100;`}>
            <LeftOutlined style={{fontSize: 16}} />
            <h3 css={css`color: ${color}`}>{title}</h3>
            { hasDashBtn && <DashOutlined style={{fontSize: 20}} /> }
        </header>
    )
}

export default index
