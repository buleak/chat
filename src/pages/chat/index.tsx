/** @jsx jsx */
import {useState, useEffect, useReducer} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Avatar, Badge, Button } from 'antd'

import $ from '../../units/api'
import { Send, Title } from '../../components'
import { groupInfo } from '../../units/virturalData'
import { UserHistoryMsgInfo } from "../../units/interface";

const triangle = (col:string, rowNum:string, colNum:string, bwidth:string, bcolor1:string, bcolor2:string, zIndex: number) => {
    return `
        content: '';
        position: absolute;
        top: ${rowNum};
        ${col}: ${colNum};
        width: 0;
        height: 0;
        border-width: ${bwidth};
        border-style: solid;
        border-color: transparent ${bcolor1} transparent ${bcolor2};
        z-index: ${zIndex};
    `
}
const OtherMsg = styled.li`
    align-self: flex-start;
    .msg {
        color: #262626;
        background-color: #adc6ff;
        &::before {
            ${triangle('left', '7px', '-11px', '8px 11px 8px 0', '#595959', 'transparent', 5)}
        }
        &::after {
            ${triangle('left', '8px', '-9px', '7px 10px 7px 0', '#adc6ff', 'transparent', 10)}
        }
    }
`
const MineMsg = styled.li`
    align-self: flex-end;
    flex-direction: row-reverse;
    .msg {
        color: #f0f0f0;
        background-color: #597ef7;
        &::before {
            ${triangle('right', '7px', '-11px', '8px 0 8px 11px', 'transparent', '#595959', 5)}
        }
        &::after {
            ${triangle('right', '8px', '-9px', '7px 0 7px 10px', 'transparent', '#597ef7', 10)}
        }
    }
`
const Msg = styled.div`
    max-width: 250px;
    padding: 5px 8px;
    border-radius: 8px;
    border: 1px solid #595959;
    position: relative;
    z-index: 15;
    word-wrap: break-word;
    word-break: break-all;
`
export default (props:any) => {
    const location = useLocation()
    console.log('location', location.state)
    const state:any = location.state
    const {groupID, groupType} = state
    const [historyMsg, setHistoryMsg] = useState([])

    useEffect(() => {

        $.getHistoryMsg({groupID, groupType}).then((data:any) => {
            console.log('data', data)
        })
        return () => {
        }
    }, [])
    return (
        <div>
            <Title title={groupInfo.groupName} bgColor='#f0f0f0' />
            <ul css={css`
                height: 100vh; 
                padding-top: 70px;
                overflow-y: scroll;
                background: #f0f0f0;
                display: flex; flex-wrap: nowrap; flex-direction: column;
                li {
                    display: flex;
                    margin-bottom: 10px;
                }
                .ant-avatar {
                    margin: 0 10px;
                }
            `}>
                {
                    groupInfo.UserHistoryMsgList.map((item: UserHistoryMsgInfo) => {
                        if (item.userID === JSON.parse(localStorage.getItem('userInfo') as string).userID) {
                            return (
                                <MineMsg key={item.msgID}>
                                    <Avatar src={item.avatar} alt='图片加载失败' />
                                    <Msg className='msg'>{item.msg}</Msg>
                                </MineMsg>
                            )
                        } else {
                            return (
                                <OtherMsg key={item.msgID}>
                                    <Avatar src={item.avatar} alt='图片加载失败' />
                                    <Msg className='msg'>{item.msg}</Msg>
                                </OtherMsg>
                            )
                        }
                    })
                }
            </ul>
            <Send/>
        </div>
    )
}

