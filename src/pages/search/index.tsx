/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Input, Button, message } from 'antd'
// import { SearchOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom'

import $ from '../../units/api'
import { UserList, Loading, Empty } from '../../components'
import {userInfo} from '../../units/context'
// import { friendList } from '../../units/virturalData'

const InputSearch = styled(Input.Search)`
    flex: 1;
    box-sizing: border-box;
    color: #91d5ff;
    margin-left: 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 2px #85f5ff, 0 0 3px #adc6ff, 0 0 4px #d6e4ff; 
    .ant-input {
        color: #91d5ff;
        background: #fff;
    }
`

export default () => {
    const ref = useRef(null)
    const history = useHistory()
    const [isEmpty, setIsEmpty] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchUserList, setSearchUserList] = useState([])

    const onChange = (e:any) => { setSearchText(e.target.value) }
    const onSearch = (value: string) => {
        setIsLoading(true)
        $.search({value, userID:userInfo.userID, userName: userInfo.userName}).then((data:any)=> {
            setSearchText('')
            setIsLoading(false)
            setSearchUserList(data)
            setIsEmpty(!Boolean(data.length))
        })
    }
    const closeSearch = () => {
        setSearchText('')
        history.replace('/admin')
    }
    useEffect(() => {     
        (ref as any).current.focus()
    }, [])
    return (
        <div>
            <header css={css`display: flex; justify-content: center; align-items: center;padding: 10px 0;border-bottom: 1px solid #999;`}>
                <InputSearch
                    loading={isLoading}
                    value={searchText}
                    ref={ref}
                    placeholder='input search text'
                    onSearch={onSearch}
                    onChange={onChange} />
                <Button
                    ghost
                    onClick={closeSearch}
                    css={css`color: #85a5ff;`}
                >取消</Button>
            </header>
            <div>
                <div style={{padding: '10px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#f0f0f0'}}>用户</div>
                {
                    isLoading ? <Loading /> : isEmpty ? <Empty /> : <UserList userList={searchUserList} type={2} />
                }
            </div>
        </div>
    )
}

