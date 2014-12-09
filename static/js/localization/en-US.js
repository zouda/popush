var app = app || {};
app.languages || (app.languages = {});

app.languages['en-US'] = { Name :'English Version',
  'File'				: 'File',
  'Problem'				: 'Problem',
  'Interview'				: 'Interview',
  "I'm Interviewer"			: "I'm Interviewer",
  "I'm Interviewee"			: "I'm Interviewee",
  "New Problem"				: "New Problem",
  "New Interview"			: "New Interview",
  'Problems'				: 'Problems',
  'Interviews'				: 'Interviews',
  'Interviewers'			: 'Interviewers',
  'Interviewees'			: 'Interviewees',
  'Interviewers'			: 'Interviewers',
  'Interviewees'			: 'Interviewees',
  'new interviewer:'			: 'new interviewer:',
  'new interviewee:'			: 'new interviewee:',
  'hide-title'				: 'Hide',
  'show-title'				: 'Show more',
  'pleaseinput'				: 'Please enter the username',
  'unauthorized'			: 'Incorrect username or password',
  'doesntmatch'				: 'Password does not match the confirmation',
  'namelength'				: 'The length of username must be between 6 and 20',
  'passlength'				: 'The length of password must be between 0 and 31',
  'registerok'				: 'Registration success! Please enter <a href="#login">login</a> page',
  'name exists'				: 'The username is already taken',
  'inner error'				: 'An inner error happened',
  'name invalid'			: 'The username may only contain letters or numbers',
  'loadfailed'				: 'Can not connect to the server',
  'inputfilename'			: 'Please enter the filename',
  'conflict'				: 'The file has already existed',
  'newfile'				: 'New File',
  'newfolder'				: 'New Folder',
  'inputpass'				: 'Please enter the password',
  'password incorrect'			: 'Old password mistaken',
  'createfilesuccess'			: 'The file is successfully created',
  'createfoldersuccess'			: 'The folder is successfully created',
  'changepassword'			: 'Change the password',
  'changepassworddone'			: 'The password is successfully changed',
  'changeavatar'			: 'Change the head image',
  'error'				: 'Error',
  'filenameinvalid'			: 'cannot include *\|:"\'/<>?@',
  'delete'				: 'Delete',
  'rename'				: 'Rename',
  'needrelogin'				: 'You need to log in again',
  'inputusername'			: 'Please enter the username',
  'selectuser'				: 'Please select a user',
  'member already exists'		: 'The user has already existed in the shared list',
  'member doesn\'t exists'		: 'The user does not exist',
  'file exists'				: 'The file has already existed',
  'can\'t add yourself'			: 'Can not be shared to yourself',
  'changeavatarok'			: 'The head image is successfully changed',
  'openeditor'				: 'Edit',
  'systemmessage'			: 'System message',
  'join'				: 'Join the room',
  'leave'				: 'Leave the room',
  'console'				: 'Console',
  '\'s'					: '\'s',
  'runsaprogram'			: 'Begin to run the current program',
  'programfinish'			: 'End of the program run. The return value is ',
  'kill-title'				: 'Terminate',
  'run-title'				: 'Run',
  'programkilledby'			: 'Program terminated. The interrupt signal is ',
  'not supported'			: 'Unsupported type',
  'saving...'				: 'Saving...',
  'saved'				: 'Saved',
  'unsaved'				: 'The current file has not been saved. Exitting now can cause data loss',
  'unshared'				: 'Loss sharing right of the current file',
  'you unshared'			: 'You have lost sharing right of the current file',
  'deleted'				: 'The file is successfully deleted',
  'info'				: 'Info',
  'gotshared'				: 'You have got sharing right of the current file',
  'moved to'				: 'The filename is changed to ',
  'filename'				: 'Filename',
  'state'				: 'State',
  'timestamp'				: 'Modified time',
  'nofile'				: 'No file exists',
  'owner'				: 'Owner',
  'shared'				: 'Shared',
  'sharemanage'				: 'Share management',
  'export'				: 'Export',
  'import'				: 'Import',
  'file'				: 'File',
  'folder'				: 'Folder',
  'login'				: 'Log in',
  'username'				: 'Username',
  'password'				: 'Password',
  'register'				: 'Register',
  'logout'				: 'Log out',
  'confirm'				: 'Confirm the password',
  'owningfiles'				: 'All files',
  'sharedfiles'				: 'Shared files',
  'currentdir:'				: 'Current Dir:',
  'shareduser'				: 'Shared Users',
  'maximum-title'			: 'Maximize',
  'back'				: 'Back',
  'send'				: 'Send',
  'popushteam'				: 'Popush Development Group Sincerely',
  'ok'					: 'OK',
  'cancel'				: 'Cancel',
  'name'				: 'Name',
  'clicktochange'			: 'Click the picture to change the head icon (jpg,png supported):',
  'add'					: 'Add',
  'newuser:'				: 'new username:',
  'sshareduser'				: '\'s shared user:',
  'oldpassword'				: 'old password',
  'newpassword'				: 'new password',
  'deleteconfirm'			: 'Delete',
  'suretodelete'			: 'Confirm to delete',
  'newname'				: 'new name',
  'debug-title'				: 'Debug',
  'stop-debug-title'		: 'Stop debugging',
  'startdebug'				: 'Start debugging',
  'filenamelength'			: 'The length of filename must be less than 32 characters',
  'addexpression'			: 'Add supervision expression',
  'console'				: 'Console',
  'step-title'				: 'Step into',
  'next-title'				: 'Step over',
  'continue-title'			: 'Continue',
  'finished'				: '<terminated>',
  'waiting'				: '<pending>',
  'nosource'				: '<the breakpoint is not in the source code>',
  'too large'				: 'Head image can not be larger than 1M',
  'esctoexit'				: 'Press Esc to exit the maximization',
  'finish-title'			: 'Jump out of the process',
  'voice'				: 'Voice',
  'removeexpression'			: 'Remove supervision expression',
  'novoice'				: 'The browser does not support voice function, please use<br />Chrome18+ or Opera12+',
  'only-platform'			: 'Another Platform for Code Cooperation',
  'only-contain'			: 'Only contain characters and numbers',
  'download'				: 'Download',
  'upload'				: 'Upload',
  'downzip'				: 'Download Folder',
  'wrong path'				: 'The path has an error',
  'DIR!!'				: 'The destination is a directory',
  'illegal file name'			: 'illegal name',
  'can not upload'			: 'can not upload files with such a type',
  'problem exists'         		: 'problem already exists',
  'problem not found'       		: 'problem not found',
  'interview exists'        		: 'interview already exists',
  'interview not found'     		: 'interview can not be found',
  'isInterviewee'           		: 'The user has been selected as an interviewee',
  'isInterviewer'           		: 'The user has been selected as an interviewer',
  'interview name error'    		: 'interview name length must be less than 40 and contain no illegal chars',
  'problem name error'      		: 'problem name length must be less than 40 and contain no illegal chars',
  'newinterviewee'          		: 'New Interviewee',
  'addintervieweesuccess'   		: 'Add interviewee successfully',
  'setroundintervieweesuccess'		: 'Set this round successfully',
  'newinterviewer'          		: 'New Interviewer',
  'addinterviewersuccess'   		: 'Add interviewer successfully',
  'roundinterviewstart'     		: 'Round START',
  'interviewstart'          		: 'Interview START',
  'roundend'                		: 'This round has ended. Please start next round, or you can end this interview now!',
  'waiting'				: 'waiting',
  'ready'				: 'ready',
  'running'				: 'running',
  'completed'				: 'completed',
  'description'				: 'description',
  'Date'				: 'Date',
  'Set Interview'			: 'Set Interview',
  'Start Interview'			: 'Start Interview',
  'End Interview'			: 'End Interview',
  'Set Interviewers'			: 'Set Interviewers',
  'Set Interviewees'			: 'Set Interviewees',
  'Set Problems'			: 'Set Problems',
  'Set Round'				: 'Start Round',
  'End Round'				: 'End Round',
  'All problems'			: 'All problems',
  'Interview problems'			: 'Interview problems',
  'All interviewees'			: 'All interviewees',
  'This round interviewees'		: 'This round interviewees',
  'Confirm'				: 'Confirm',
  'Remark'				: 'Remark',
  'score'				: 'score',
  'startinterview-confirm'		: 'This interview is started. Please set the first round.',
  'endinterview-confirm'		: 'Are you really going to end this interview?',
};
