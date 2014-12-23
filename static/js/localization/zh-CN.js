var app = app || {};
app.languages || (app.languages = {});

app.languages['zh-CN'] = { Name : '中文版',
  'Index'				: '首页',
  'File'				    : '文件',
  'Interview'				: '面试',
  'Problem'				    : '问题',
  "I'm Interviewer"			: "我是面试官",
  "I'm Interviewee"			: "我是面试者", 
  "New Problem"				: "新建题目",
  "New Interview"			: "新建面试",
  'Problems'				: '所有问题',
  'Interviews'				: '所有面试',
  'Interviewers'			: '所有面试官',
  'Interviewees'			: '所有面试者',
  'new interviewer:'		: '新的面试官：',
  'new interviewee:'		: '新的面试者：',
  'hide-title'				: '收起',
  'show-title'				: '展开',
  'pleaseinput'				: '请输入用户名',
  'unauthorized'			: '用户名和密码不匹配',
  'doesntmatch'				: '两次输入的密码不一致',
  'namelength'				: '用户名的长度必须在6-20之间',
  'passlength'				: '密码的长度必须在0-31之间',
  'registerok'				: '注册成功，请进入<a href="#login" id="login-view-2">登录</a>页面',
  'name exists'				: '用户名已存在',
  'inner error'				: '内部出错',
  'name invalid'			: '用户名只能由字母或数字组成',
  'loadfailed'				: '无法连接到服务器',
  'inputfilename'			: '请输入文件名',
  'conflict'				: '文件已存在',
  'newfile'				    : '新建文件',
  'newfolder'				: '新建文件夹',
  'inputpass'				: '请输入密码',
  'password incorrect'		: '旧密码错误',
  'createfilesuccess'		: '创建文件成功',
  'createfoldersuccess'		: '创建文件夹成功',
  'changepassword'			: '修改密码',
  'changepassworddone'		: '修改密码成功',
  'changeavatar'			: '修改头像',
  'error'				    : '出错',
  'filenameinvalid'			: '不能出现 *\|:"\'/<>?@',
  'delete'				    : '删除',
  'rename'				    : '重命名',
  'needrelogin'				: '需要重新登录',
  'inputusername'			: '请输入用户名',
  'selectuser'				: '请选择一个用户',
  'member already exists'	: '此用户已存在于共享列表中',
  'member doesn\'t exists'	: '用户不存在',
  'file exists'				: '文件已存在',
  'can\'t add yourself'		: '不能共享给文件主人',
  'changeavatarok'			: '头像修改成功',
  'openeditor'				: '编辑',
  'systemmessage'			: '系统消息',
  'join'				    : '加入了房间',
  'leave'				    : '离开了房间',
  'console'				    : '控制台',
  '\'s'					    : '的',
  'runsaprogram'			: '开始运行当前程序',
  'programfinish'			: '程序运行结束，返回值为',
  'kill-title'				: '终止',
  'run-title'				: '运行',
  'programkilledby'			: '程序被终止。中断信号为',
  'not supported'			: '不支持的类型',
  'saving...'				: '正在保存...',
  'saved'				    : '已保存',
  'unsaved'				    : '当前文件还没有保存，退出会造成数据丢失',
  'unshared'				: '失去了对当前文件的共享权',
  'you unshared'			: '你已经失去了对当前文件的共享权',
  'deleted'				    : '当前文件已被删除',
  'info'				    : '消息',
  'gotshared'				: '获得了对当前文件的共享权',
  'movedto'				    : '当前文件名被修改成了',
  'filename'				: '文件名',
  'state'				    : '状态',
  'timestamp'				: '修改时间',
  'nofile'				    : '没有文件',
  'owner'				    : '所有者',
  'shared'				    : '共享',
  'sharemanage'				: '共享管理',
  'export'				    : '导出',
  'import'				    : '导入',
  'file'				    : '文件',
  'folder'				    : '文件夹',
  'login'                   : '登录',
  'username'				: '用户名',
  'password'				: '密码',
  'register'				: '注册',
  'logout'				    : '登出',
  'confirm'				    : '确认密码',
  'owningfiles'				: '拥有的文件',
  'sharedfiles'				: '共享的文件',
  'currentdir:'				: '当前目录：',
  'shareduser'				: '共享用户',
  'maximum-title'			: '最大化',
  'back'				    : '返回',
  'send'				    : '发送',
  'popushteam'				: 'popush开发小组敬上',
  'ok'					    : '确定',
  'cancel'				    : '取消',
  'name'				    : '名称',
  'clicktochange'			: '点击图片以更换头像（支持jpg，png格式）：',
  'add'					    : '增加',
  'newuser:'				: '新用户名：',
  'sshareduser'				: '的共享用户：',
  'oldpassword'				: '旧密码',
  'newpassword'				: '新密码',
  'deleteconfirm'			: '确认删除',
  'suretodelete'			: '确认要删除',
  'newname'				    : '新名称',
  'debug-title'				: '调试',
  'stop-debug-title'		: '停止调试',
  'startdebug'				: '开始调试当前程序',
  'filenamelength'			: '文件名必须小于32个字符',
  'addexpression'			: '添加监视',
  'console'				    : '控制台',
  'step-title'				: '逐语句',
  'next-title'				: '逐过程',
  'continue-title'			: '继续',
  'finished'				: '<已终止>',
  'waiting'				    : '<暂挂>',
  'nosource'				: '<断点不在源代码内>',
  'too large'				: '头像大小不能超过1M',
  'esctoexit'				: '按 Esc 退出最大化',
  'finish-title'			: '跳出过程',
  'voice'				    : '语音',
  'graphics'				: '绘图',
  'removeexpression'		: '删除监视',
  'novoice'				    : '该浏览器不支持语音，请使用<br />Chrome 18+或Opera 12+',
  'only-platform'			: '只是另外一个协作编程平台',
  'only-contain'			: '只能包含字母和数字',
  'download'				: '下载',
  'upload'				    : '上传文件',
  'downzip'				    : '下载文件夹',
  'wrong path'				: '路径错误',
  'DIR!!'			    	: '目标是文件夹',
  'illegal file name'		: '无效的名称',
  'can not upload'			: '无法上传该类型文件',
  'problem exists'			: '该问题已经存在',
  'problem not found'		: '找不到问题',
  'interview exists'		: '面试已存在',
  'interview not found'		: '找不到面试',
  'isInterviewee'			: '该用户已在面试者列表中',
  'isInterviewer'			: '该用户已在面试官列表中',
  'interview name error'	: '面试名称长度不能大于40且不能包含非法字符',
  'problem name error'		: '题目名称长度不能大于40且不能包含非法字符',
  'newinterviewee'			: '添加面试者',
  'newinterviewer'			: '添加面试官',
  'addintervieweesuccess'	: '成功添加面试者',
  'addinterviewersuccess'	: '成功添加面试官',
  'setroundintervieweesuccess'		: '成功设置本轮面试者',
  'roundinterviewstart'		: '本轮开始',
  'interviewstart'			: '面试开始。请选择第一轮参与者。',
  'roundend'				: '本轮结束。可以开始下轮面试，或者直接结束本场面试。',
  'waiting'				    : '等待中',
  'ready'				    : '就绪',
  'running'				    : '进行中',
  'completed'				: '结束',
  'description'				: '描述',
  'Date'				    : '日期',
  'Set Interview'			: '设置面试',
  'Start Interview'			: '开始面试',
  'End Interview'			: '结束面试',
  'Set Interviewers'		: '设置面试官',
  'Set Interviewees'		: '设置面试者',
  'Set Problems'			: '设置问题',
  'Set Round'				: '开始本轮',
  'End Round'				: '结束本轮',
  'All problems'			: '所有问题',
  'Interview problems'		: '面试问题',
  'All interviewees'		: '所有面试者',
  'This round interviewees'	: '本轮面试者',
  'Confirm'				    : '确认',
  'Remark'				    : '评论',
  'score'				    : '分数',
  'startinterview-confirm'	: '本面试已开始，请设置第一轮。',
  'endinterview-confirm'	: '您真的要结束本面试吗？',
  'interviewee list is empty'   : '面试者列表不能为空',
  'stillNotPushProblem'         : '请先选择一道题目发给面试者',
  'not a running interview'     : '面试尚未开始',
  'no pushing problem'          : '请做好准备！等待面试官出题...',
  'no an onRound interview'     : '您不在当前轮次中，请耐心等待...',
  'startinterviewconfirm?'      : '确定要开始一场面试吗？',
  'interview ended'             : '面试已结束',
  'push'                        : '推送',
  'Push Problem'                : '推送题目',
  'Check Problem'               : '查看题目',
  'waitfornextproblem'          : '本道题已经结束。请等待下一题。',
  'Next'                        : '下一题',
  'youcanleavenow'              : '编程部分已结束',
  'leave'                       : '离开',
};
