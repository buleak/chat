/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
import {useContext} from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Avatar, Badge } from 'antd'
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';

import {UserInfoCtx} from '../../units/context'
import logo from '../../resources/imgs/logo.svg'

const Logo = styled.img` width: 80px; height: 80px; `;

export default () => {
    const userInfo = useContext(UserInfoCtx), history = useHistory();
    const SearchOutlinedOnClick = () => {
        history.push('/search')
    }
    return (
        <header css={css`position:fixed;top:0;left:0;width:100vw;padding: 10px;background-color:#fff;border-bottom:1px solid #8c8c8c;z-index:100;`}>
            <div css={css`width:100%;display:flex;justify-content:space-between;align-items:center;`}>
                <Badge count={userInfo.msgNum}>
                    <Avatar src={userInfo.avatar} />
                </Badge>
                <Logo src={logo} alt="图片加载失败" css={css`position: absolute;left: 50%;transform:translateX(-50%);`} />
                <div>
                <SearchOutlined onClick={SearchOutlinedOnClick} style={{ fontSize: '28px' }} />
                <PlusCircleOutlined spin style={{ fontSize: '28px', marginLeft: '10px', }} />
                </div>
            </div>
        </header>
    )
}

