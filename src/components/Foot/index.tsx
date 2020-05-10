/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
import { useState, useContext } from 'react'
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'antd'
import { WechatOutlined, TeamOutlined, CompassOutlined, UserOutlined } from '@ant-design/icons'

import { UserInfo } from '../../units/context'

const MenuItem = styled(Menu.Item)`
    a {
        display: flex !important;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .anticon {
            margin: 0;
            font-size: 20px;
        }
        span {
            line-height: 24px;
        }
    }
`
export default (props:any) => {
    const userInfo = useContext(UserInfo), history = useHistory(), {url} = props;
    const [key, setKey] = useState('chat')
    const SearchOutlinedOnClick = () => {
        history.push('/search')
    }
    const handleClick = (e: any) => {
        setKey(e.key)
    }
    return (
        <footer css={css`position:fixed;bottom:0;left:0;width:100vw;padding: 10px;background-color:#fafafa;border-top:1px solid #8c8c8c;z-index:100;`}>
            <Menu onClick={handleClick} selectedKeys={[key]} mode="horizontal" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fafafa', borderBottomColor: '#fafafa' }}>
                <MenuItem key='chat'> <Link to='/'><WechatOutlined /><span>聊天室</span></Link></MenuItem>
                <MenuItem key='address'><Link to={`${url}/address`}><TeamOutlined /><span>通讯录</span></Link></MenuItem>
                <MenuItem key='find'><Link to={`${url}/find`}><CompassOutlined /><span>发现</span></Link></MenuItem>
                <MenuItem key='mine'><Link to={`${url}/mine`}><UserOutlined /><span>我的</span></Link></MenuItem>
            </Menu>
        </footer>
    )
}

