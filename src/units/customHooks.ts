import {useRouteMatch} from 'react-router-dom';

export const useMineRouteMatch = () => {
    // 当路由从 '/' 跳转到 '/xxx' 时，错误的认为 http://localhost:3000//xxx --> http://xxx，报错
    let {url, ...other} = useRouteMatch()
    if(url === '/') { url = '/admin'}
    return {url, ...other}
}