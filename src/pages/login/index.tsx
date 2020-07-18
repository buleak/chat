// 不能删除下面这个注释：删除会导致 [css``] 调用无效
// 此注释告诉babel将jsx转换为对名为jsx的函数的调用，
// 而不是对response . createelement的调用

/** @jsx jsx */
// import React from 'react'
import { mutate } from 'stook'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Form, Input, message } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { NButton } from "../../components/Neumorphism";
import { useFetch } from 'stook-rest'

// import {LoginForm} from '../../units/interface'
import $ from '../../units/api'
import bg from '../../resources/imgs/bg-1.jpg'
import logo from '../../resources/imgs/logo.svg'

const LoginBox = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    font-size: 20px;
    background: url(${bg}) 0 0/cover repeat;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    &:hover {
        color: white;
    }
`;
const btnLayout = { wrapperCol: { offset: 4, span: 16 } };
const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }, };

export default (props:any) => {
    const onFinish = (values: any) => { // 提交表单
        console.log('login', values)
        $.login(values).then((data:any) => {
            console.log(data)
            const {msg, token, status, userInfo} = data
            if(status) { // 登录成功
                message.info(msg)
                localStorage.setItem(`token`, token)
                localStorage.setItem(`userInfo`, JSON.stringify(userInfo))
                mutate('[userInfo]', userInfo)
                props.history.replace('/admin')
            }else { // 登录失败
                message.warn(msg)
            }
        })
    };
    const onFinishFailed = (errorInfo: any) => { // 提交表单失败
        console.log('Failed: ', errorInfo)
    };
    const toRegister = () => { // 跳转-注册页面
        props.history.replace('/register')
    }
    const oAuthGithub = () => { // 第三方 Github登录 TODO
        const url = 'https://github.com/login/oauth/authorize', 
            clientID = localStorage.getItem('oAuthGithub'), 
            redirectURI = 'http://localhost:7001/oAuthGithub';
        window.location.href = `${url}?client_id=${clientID}&redirect_uri=${redirectURI}`
    }
    return (
        <LoginBox>
            <img src={logo} alt="图片加载失败" css={css`
                width: 200px; 
                height: 200px; 
                animation: App-logo-spin 20s linear; 
                @keyframes App-logo-spin {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
            `} />
            <Form
                {...layout}
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                css={css`
                width: 300px;
                margin: 10px auto;
                padding: 20px 10px;
                border-radius: 8px;
                background: rgba(240, 240, 240, 0.5);
                box-shadow: 2px 2px 3px rgba(0,0,0,1), -2px -2px 3px rgba(240,240,240,1), 
                    3px 3px 4px rgba(0,0,0,0.8), -3px -3px 4px rgba(240,240,240,0.8), 
                    4px 4px 5px rgba(0,0,0,0.5), -4px -4px 5px rgba(240,240,240,0.5); // inset 左 下 模糊区间 模糊距离 颜色 内阴影
                `}
            >
                <Form.Item
                    label='姓名'
                    name='userName'
                    rules={[{ required: true, message: '请输入正确的姓名' }]}
                >
                    <Input placeholder='您的姓名'/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="passWord"
                    rules={[{ required: true, message: '请输入正确的密码' }]}
                >
                    <Input.Password placeholder='您的密码'/>
                </Form.Item>

                <Form.Item {...btnLayout} css={css`margin:10px auto;`}>
                    <NButton type="primary" htmlType="submit"> Submit </NButton>
                    <NButton htmlType="submit" css={css`margin-left: 10px;`} onClick={toRegister}> to register </NButton>
                    <GithubOutlined onClick={oAuthGithub} />
                </Form.Item>
            </Form>
        </LoginBox>
    )
}

