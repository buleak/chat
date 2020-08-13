// 登录注册
import login from "./checksum/login";
import register from "./checksum/register";

// 首页
import admin from "./admin";

// 消息
import message from "./message";
import PublicGroup from './message/group-public';
import PrivateGroup from './message/group-private';
import file from "./message/file";
import program from "./message/program";
import chatRoom from "./message/chatRoom";
import proclamation from "./message/proclamation";

// 通讯录
import address from "./address";

// 文件
import document from "./document";

// 个人中心
import mine from "./mine";

// 好友
import detail from "./detail";
import invite from "./invite";

// 群
import createGroup from "./createGroup";
import groupModify from "./groupModify";
// 404
import notFound from "./notFound";

export {
    login, register,
    admin, 
    message, address, document, mine, 
    chatRoom, file, program, proclamation, PublicGroup, PrivateGroup,
    detail, invite,
    createGroup, groupModify,
    notFound,
}