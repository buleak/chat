/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
// import React from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import {Input} from 'antd'
import { SmileFilled, PlusCircleOutlined} from '@ant-design/icons'


const index = (props:any) => {
    const { title, hasDashBtn=false, color='#000', bgColor='#fff' } = props;
    const onPressEnter = (value: any) => {
        console.log('value', value)
    }
    return (
        <footer>
            <Input.TextArea autoSize={true} onPressEnter={onPressEnter} />
        </footer>
    )
}

export default index
