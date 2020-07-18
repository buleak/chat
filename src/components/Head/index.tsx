/** @jsx jsx */
import { useState, useEffect, useRef } from 'react'
// import { useHistory } from 'react-router-dom'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Input, Layout, Drawer } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

import $ from '../../units/api'
import { UserList, Loading, Empty } from '../index'
import { userInfo } from '../../units/context'

const { Header } = Layout
const InputSearch = styled(Input)`
    width: 300px;
    color: #91d5ff;
    background: #f5f5f5;
    border-radius: 30px;
    box-sizing: border-box;
    box-shadow: 0 0 2px #85f5ff, 0 0 3px #adc6ff, 0 0 4px #d6e4ff; 
    .ant-input {
        color: #91d5ff;
        background: #f5f5f5;
    }
`

export default () => {
    const ref = useRef(null)
    const [isEmpty, setIsEmpty] = useState(true) // 查询内容为空
    const [visible, setVisible] = useState(false) // 展示隐藏结果页
    const [isLoading, setIsLoading] = useState(false) // 正在搜索
    const [searchText, setSearchText] = useState('')
    const [resultList, setResultList] = useState([])

    const onChange = (e: any) => { setSearchText(e.target.value) }
    const onSearch = () => {
        setVisible(true)
        setIsLoading(true)
        $.search({ value: searchText, userID: userInfo.userID, userName: userInfo.userName }).then((data: any) => {
            setSearchText('')
            setIsLoading(false)
            setResultList(data)
            setIsEmpty(!Boolean(data.length))
        })
    }
    const onClose = () => {
        setVisible(false)
    }
    const closeSearch = () => {
        setSearchText('')
    }
    useEffect(() => {
        (ref as any).current.focus()
    }, [])
    return (
        <Header id='search' css={css`background: #fff;padding: 0 10px;`}>
            <InputSearch
                ref={ref}
                value={searchText}
                onChange={onChange}
                onPressEnter={onSearch}
                prefix={<SearchOutlined onClick={onSearch} />}
                suffix={searchText ? <CloseOutlined onClick={closeSearch} /> : <span />}
                placeholder='搜索好友 & 聊天记录' />
            <Drawer
                width={400}
                mask={false}
                title='result'
                placement='right'
                visible={visible}
                onClose={onClose}
                destroyOnClose={true}
                bodyStyle={{padding: '10px'}}
            >
                {
                    isLoading ? <Loading /> : isEmpty ? <Empty /> : <UserList userList={resultList} type={2} />
                }
            </Drawer>
        </Header>
        // <div>
        //     <div style={{padding: '10px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#f0f0f0'}}>用户</div>
        //     {
        //         isLoading ? <Loading /> : isEmpty ? <Empty /> : <UserList userList={resultList} type={2} />
        //     }
        // </div>
    )
}

