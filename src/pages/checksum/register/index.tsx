// 不能删除下面这个注释：删除会导致 [css``] 调用无效
// 此注释告诉babel将jsx转换为对名为jsx的函数的调用，
// 而不是对response . createelement的调用

/** @jsx jsx */
// import React from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Form, Input, Radio, message } from 'antd'
import {NButton} from '../../../components/Neumorphism'

import $ from '../../../units/api'
import bg from '../../../resources/imgs/bg-1.jpg'
import logo from '../../../resources/imgs/logo.svg'
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
const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 8 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, }, };

export default (props: any) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => { // 提交表单
        // console.log('Received values of form: ', values);
        $.register(values).then((data:any) => {
            const {msg, status} = data
            if(status) { // 注册成功
                message.info(msg)
                toLogin()
            }else { // 注册失败
                message.warn(msg)
            }
        })
    };
    const onFinishFailed = (errorInfo: any) => { // 提交表单失败
        console.log('Failed: ', errorInfo)
    };
    const toLogin = () => { // 跳转-登录页面
        props.history.replace('/login')
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
                {...formItemLayout}
                form={form}
                name='register'
                scrollToFirstError
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                css={css`
                width: 300px;
                margin: 10px auto;
                padding: 20px 10px;
                border-radius: 8px;
                background: rgba(240, 240, 240, 0.5);
                box-shadow: 1px 1px 3px rgba(0,0,0,0.5), 3px 3px 5px rgba(0,0,0,0.3), 5px 5px 8px rgba(0,0,0,0.1); // inset 左 下 模糊区间 模糊距离 颜色 内阴影
                `}
            >
                <Form.Item
                    label="性别"
                    name="sex"
                    rules={[
                        {
                            required: true,
                            message: '请设置您的性别',
                        },
                    ]}
                >
                    <Radio.Group name='sex'>
                        <Radio value="male">男</Radio>
                        <Radio value="female">女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='姓名'
                    name='userName'
                    rules={[{ required: true, message: '请设置您的姓名' }]}
                >
                    <Input placeholder='请设置您的姓名' />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="passWord"
                    rules={[{ required: true, message: '请设置您的密码' }]}
                >
                    <Input.Password placeholder='请设置您的密码' />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="再次确认"
                    dependencies={['passWord']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '密码不一致',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('passWord') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('密码不一致');
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='请再次设置您的密码'/>
                </Form.Item>

                <Form.Item {...btnLayout} css={css`margin:10px auto;`}>
                    <NButton type="primary" htmlType="submit"> Register </NButton>
                    <NButton htmlType="submit" css={css`margin-left: 10px;`} onClick={toLogin}> to login </NButton>
                </Form.Item>
            </Form>
        </LoginBox>
    )
}

