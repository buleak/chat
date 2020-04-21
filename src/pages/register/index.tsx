// 不能删除下面这个注释：删除会导致 [css``] 调用无效
// 此注释告诉babel将jsx转换为对名为jsx的函数的调用，
// 而不是对response . createelement的调用

/** @jsx jsx */
import React from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Form, Input, Select, Button } from 'antd'

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
const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 8 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, }, };

export default (props: any) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed: ', errorInfo)
    };
    const toLogin = () => {
        props.history.replace('/login')
    }
    return (
        <LoginBox>
            <img src={logo} alt="图片加载失败" css={css`
                width: 200px; 
                height: 200px; 
                animation: App-logo-spin 20s linear; 
                &:hover {
                    animation-play-state: paused; 
                }
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
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                css={css`
                width: 400px;
                margin: 10px auto;
                padding: 20px 10px;
                background: rgba(255, 255, 255, 0.5);
                box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.8); // inset 左 下 模糊区间 模糊距离 颜色 内阴影
                `}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='UserName'
                    name='userName'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Please input your username!' />
                </Form.Item>
                <Form.Item
                    label="PassWord"
                    name="passWord"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder='Please input your password!' />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['passWord']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                console.log(value, getFieldValue('passWord'))
                                if (!value || getFieldValue('passWord') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...btnLayout} css={css`margin:10px auto;`}>
                    <Button type="primary" htmlType="submit"> Register </Button>
                    <Button type="dashed" htmlType="submit" css={css`margin-left: 30px;`} onClick={toLogin}> to login </Button>
                </Form.Item>
            </Form>
        </LoginBox>
    )
}

