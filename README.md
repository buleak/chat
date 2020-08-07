# ali cloud 
1. // static /usr/local/static 7000 
2. // site   /usr/local/site   9000
3. // web    /usr/local/react/chatroom/build   80 

# Github oAuth
```js
{
  '修改配置URL': 'https://github.com/settings/applications/1315821',
  'Authorization callback URL': 'http://localhost:7001/oAuthGithub',
  'Client ID': 存放于私有仓库,
  'Client Secret': 存放于私有仓库,
}
/*
1. client: 点击第三方登录图标, 跳转到 Github认证页面: https://github.com/login/oauth/authorize?client_id & redirect_uri, 携带参数 客户端ID & 回跳网址(相当于请求后端)
2. 第三方: 点击 Github认证按钮, 携带授权码返回到回跳网址, 后端通过 ctx.query.code 获取授权码
3. server: 后端拿到授权码后向 Github请求令牌 access_token: https://github.com/login/oauth/access_token?client_id & client_secret & code
4. server: 拿到令牌后, 就可以请求 Github的 API: https://api.github.com 获取相应的数据了, 请求时需要在 headers里面携带令牌: Authorization: `token ${accessToken}`
*/
```

# 目录结构
- build：打包文件
- public：公共资源
- src
  - components：组件
    - Empty
    - Head
    - Loading
    - Send
    - Title
    - UserItem
    - UserList
    - index.ts
  - pages：页面
    - address
    - admin
    - chat
    - createGroup
    - detail
    - find
    - groupModify
    - invite
    - login
    - mine
    - notFound
    - register
    - search
    - index.ts
  - resources：静态资源
    - imgs
  - routers：路由
  - units：工具类
    - api.ts
    - axios.ts
    - config.default.ts
    - context.ts
    - customHooks.ts
    - interface.ts
    - storage.ts
    - unit.ts
    - virtualData.ts
  - App.tsx：主页面
  - index.tsx：入口页面
  - config-overrides.js：antd配置文件
- import顺序
  - 插件
  - 组件 & 页面
  - 自定义方法 & 其他

# 表
```js
User: 用户信息 
{
  avatar: String,
  userID: String,
  userName: String,
  passWord: String,
  sex: String,
  // star: Number, // 星 [暂缺]
  // score: Number, // 分数 [暂缺]
  registerDate: Number,
}
Address: 用户关系信息: 加入的群/好友/对话过的群或好友
{
  avatar: String,
  userID: String,
  userName: String,
  joinGroupList: [ // 加入的群[特指公共群]
    {
      groupAvatar: String,
      groupID: String,
      groupName: String,
      groupType: Number,
      joinGroupDate: Number,
    }
  ],
  becomeFriendList: [ // 好友
    {
      avatar: String,
      userID: String,
      userName: String,
      becomeFriendDate: Number,
    }
  ],
  historyRecordList: [ // 首页展示的历史纪录
    {
      groupAvatar: String,
      groupID: String,
      groupName: String,
      groupType: Number, // 1-群聊 2-私聊
      lastOnlineMsg: String, // 最后一次发言内容
      lastOnlineDate: Number, // 最后一次发言时间
    }
  ]
}
Group: 群信息
{
  groupID: String,
  groupName: String,
  groupLevel: Number,
  groupAvatar: String,
  groupType: Number, // 1-群聊 2-私聊
  groupCreateDate: Number, // 建群时间
  groupProfile: String, // 群简介
  memberList: [
    {
      avatar: String,
      userID: String,
      userName: String,
      userIdentity: String, // 群员身份[群主/管理员/群员/禁言]: [master, admin, member, np]
      userAuthority: Number, // 群员权限[4/3/2/1]
        /* {
          群主:     4: 设置管理员, 解散/转让群
          管理员:   3: 添加/禁言/删除群员, 修改群简介, 删除所有文件/相片
          群员:     2: 发言, 上传文件/相片, 删除自己上传的文件/相片, 下载文件/相片
          禁言:     1: 只能阅读聊天记录 
        } */
      joinGroupDate: Number, // 入群时间
    }
  ],
}
Msg: 群聊天记录: 每个群对应的聊天记录
{
  groupID: String,
  groupName: String,
  groupAvatar: String,
  // unreadMsgNum: Number,
  msgList: [
    {
        avatar: String,
        userID: String,
        userName: String,
        msg: String,
        msgID: String,
        msgDate: Number,
    }
  ],
}
```

# 流程
登录 --> 进入到首页
1. 首页: 
   1. 展示群历史记录: 
   2. 公共群: uuid; groupType: 1
   3. 私聊群: uuid; groupType: 2
      1. user第一次和 target对话,创建一个私聊群
   4. 查询: 判断群成员列表中有无 userid

2. 情况
   1. user新建群: 创建群[uuid] & 群聊天记录, user添加进群成员列表
   2. user第一次点击好友: 新建一个私聊群[uuid], user & target添加进群成员列表
   3. user之后点击好友: 查询`私聊群成员列表`, 含有 user & target的群 

# TODO
1. 创建聊天室非空判断和重名判断
2. 添加好友会导致首页增加历史群记录[聊天室]
3. 从通讯录进入顶部搜索/创建群页面, 点击系统自带返回, 会回到通讯录页面[上一历史页面], 底部导航显示的却一直是聊天室
4. 点击搜索的取消按钮返回, 会一直返回到聊天室页面,而不是[上一历史页面]
