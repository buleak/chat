/** @jsx jsx */
import { useState, useEffect, useRef, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Avatar, Input, Button, Checkbox, message } from 'antd'

import $ from '../../units/api'
import { userInfo } from '../../units/context'
import { Title } from '../../components'
// import { GroupSchema, MsgInfo } from "../../units/interface";
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const CheckboxGroup = styled(Checkbox.Group)`
    width: 100%;
    .ant-checkbox-group-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f0f0f0; 
        padding: 0 10px;
        &:hover {
            background: #fafafa;
        }
        span:last-of-type {
            display: flex;
            align-items: center;
            flex: 1;
        }
        .ant-avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            color: #ffffff;
            background: #1890ff;
            font-size: 24px;
            border-radius: 4px;
            margin: 5px 15px;
        }
        .type {
            flex: 1;
            font-size: 16px;
        }
    }
`
const InputCenter = styled(Input)`
    width: 200px;
    height:40px;
    margin: 0 auto 20px;
    border-radius: 25px;
    display: block;
    &::-webkit-input-placeholder{
        text-align: center;
    }
`

export default () => {
    const history = useHistory()
    const groupNameRef = useRef(null)
    const [groupName, setGroupName] = useState('')
    const [memberList, setMemberList] = useState<CheckboxValueType[]>([])
    const [groupAvatar, setGroupAvatar] = useState('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg')
    const [options, setOptions] = useState([
        { label: <div></div>, value: '用户ID' }
    ])
    const chooseUser = (checkedValues:CheckboxValueType[]) => {
        setMemberList(checkedValues)
    }
    const changeGroupName = (e:any) => {
        setGroupName(e.target.value)
    }
    const createGroup = () => {
        $.createGroup({userID:userInfo.userID, groupName, groupType: 1, groupAvatar, memberList}).then((data:any) => {
            console.log('data', data)
            const {status, msg} = data
            if(status) {
                message.info(msg)
                history.push({
                    pathname: `admin/address`
                })
            }else {
                message.error(msg)
            }
        })
    }
    useEffect(() => {
        (groupNameRef as any).current.focus()
        $.getAddressObj({ userID: userInfo.userID }).then((data: any) => {
            let opt = []
            for (let i of data.becomeFriendList) {
                opt.push({ label: (<Fragment><Avatar src={i.avatar} /><span className='type'>{i.userName}</span></Fragment>), value: i.userID })
            }
            setOptions(opt)
        })
        return () => {

        }
    }, [])
    return (
        <div>
            <Title title='发起群聊' bgColor='#f0f0f0' />
            <Avatar src={groupAvatar} css={css`margin: 80px auto 20px;display: block;width: 80px;height: 80px;`} />
            <InputCenter ref={groupNameRef} placeholder='群名称' maxLength={20} onPressEnter={changeGroupName} onBlur={changeGroupName} />
            <div style={{ padding: '10px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>用户</div>
            <CheckboxGroup options={options} onChange={chooseUser} />
            <Button onClick={createGroup} type='primary' css={css`width:100px;margin: 20px 50%;transform:translateX(-50%);`}>创建</Button>
        </div>
    )
}
