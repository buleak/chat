import {useRouteMatch} from 'react-router-dom'
export const useMineRouteMatch = () => {
    // 当路由从 '/' 跳转到 '/xxx' 时，错误的认为 http://localhost:3000//xxx --> http://xxx，报错
    let {url, ...other} = useRouteMatch()
    if(url === '/') { url = '/admin'}
    return {url, ...other}
}

/**
 * lastOnlineDate格式化
 * 1. 五分钟内显示 [刚刚]
 * 1. 当天之内显示 [hh:mm]
 * 2. 昨天之内显示 [昨天 hh:mm]
 * 3. 昨天之外显示 [YY/MM/DD]
 * @param date 时间戳
 */
export const getDate = (date: number|undefined):string => {
    if(!date) { return `????/??/??` }
    const nowDate = new Date(), 
        oldDate = new Date(date), 
        nowDay = nowDate.getDate(), 
        oldDay = oldDate.getDate();
    const timeInterval = nowDate.getTime() - date;
    if(timeInterval < 300000) {
        return '刚刚'
    }else if(nowDay - oldDay === 0) {
        return `${oldDate.getHours()}:${oldDate.getMinutes()}`
    }else if(nowDay - oldDay === 1) {
        return `昨天 ${oldDate.getHours()}:${oldDate.getMinutes()}`
    }else if(nowDay - oldDay > 1) {
        return `${oldDate.getFullYear()}/${oldDate.getMonth()}/${oldDay}`
    }else {
        return `????/??/??`
    }
}