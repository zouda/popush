/*编程页面视图*/
var app = app || {};
(function () {
    'use strict';
    app.RoomView = Backbone.View.extend({
        el: '#editor',
        TChat: _.template($('#chat-template').html(), null, {
            variable: 'd'
        }),
        initialize: function (opt) {
            opt || (opt = {});
            if (opt.noinit) {
                return this;
            }
            var e = this.$el,
			m = {
			    $docState: '#current-doc-state',
			    $btnRun: '#editor-run',
			    $btnDebug: '#editor-debug',
			    $btnHome: '#editor-back',
			    $btnCon: '#editor-console',
			    $under: '#under-editor',
			    $con: '#console',
			    $conTitle: '#console-title',
			    $conIn: '#console-input',
			    $conBox: '#console-inner',
			    $members: '#member-list-doc',
			    $chatIn: '#chat-input',
			    $chatSend: '#chat-send',
			    $chatBox: '#chat-show-inner',
			    $chatShow: '#chat-show',
			    $chatPanel: '#chatbox',
			    $vars: '#varlist',
			    $varsReal: '#varlistreal',
			    $varsBtns: '.debugandwait',
			    $mainBox: '#editormain-inner',
			    $main: '#editormain',
			    $tip: '#fullscreentip'
			};
            for (var i in m) {
                this[i] = e.find(m[i]);
            }
        },
        events: {
            'shown': 'enter',
            'hide': 'exit',
            'click #chat-send': 'chat',
            'click #editor-run': 'run',
            'click #editor-debug': 'debug',
            'click #editor-console': 'toggleConsole',
            'click #editor-full': 'setConsoleFull',
            'click #toggle-chat': 'togglechat',
            'click #debugstep': 'debugstep',
            'click #debugnext': 'debugnext',
            'click #debugfinish': 'debugfinish',
            'click #debugcontinue': 'debugcontinue',
            'click #voice-on': 'voice',
            'click #toggle-problem': 'toggleproblem',
            'click #graphics-on': 'openDrawboard',

            'keydown #console-input': function (e) {
                ((e.keyCode || e.which) == 13) && this.stdin();
            },
            'keydown #chat-input': function (e) {
                ((e.keyCode || e.which) == 13) && this.chat();
            }
        },
        /*语音*/
        voice: function () {
            this.room.openVoice();
        },
        /*离开编程页面*/
        closeeditor: function () {
            app.socket.emit('leave', {});
            this.room.stopListen();
            $("body").animate({
                scrollTop: this.oldscrolltop
            });
            this.room.leaveVoiceRoom();
            app.resize = this.resize_old;
        },
        debugstep: function () {
            if (this.room.debugLock && this.room.waiting) {
                this.room.socket('step', {});
            }
        },
        debugnext: function () {
            if (this.room.debugLock && this.room.waiting) {
                this.room.socket('next', {});
            }
        },
        /*调试结束*/
        debugfinish: function () {
            if (this.room.debugLock && this.room.waiting) {
                this.room.socket('finish', {});
            }
        },
        debugcontinue: function () {
            if (this.room.debugLock && this.room.waiting) {
                this.room.socket('resume', {});
            }
        },
        /*开关聊天框*/
        togglechat: function () {
            if (app.viewswitchLock)
                return;
            if (this.room.chatstate) {
                if ($('#editormain').parent().hasClass('col-xs-12')) {
                    $('#editormain').parent().removeClass('col-xs-12');
                    $('#editormain').parent().addClass('col-xs-9');
                }
                else{
                    $('#editormain').parent().removeClass('col-xs-9');
                    $('#editormain').parent().addClass('col-xs-6');
                }
                $('#chatbox').show();
                $('#toggle-chat').html('<span class="glyphicon glyphicon-forward"></span>');
                $('#toggle-chat').attr('title', strings['hide-title']);
            } else {
                if ($('#editormain').parent().hasClass('col-xs-9')) {
                    $('#editormain').parent().removeClass('col-xs-9');
                    $('#editormain').parent().addClass('col-xs-12');
                }
                else{
                    $('#editormain').parent().removeClass('col-xs-6');
                    $('#editormain').parent().addClass('col-xs-9');
                }
                $('#chatbox').hide();
                $('#toggle-chat').html('<span class="glyphicon glyphicon-backward"></span>');
                $('#toggle-chat').attr('title', strings['show-title']);
            }
            var o = $('#chat-show').get(0);
            o.scrollTop = o.scrollHeight;
            this.editor.refresh();
            this.resize();
            this.room.chatstate = !this.room.chatstate;
        },

        /*开关题目显示*/
        toggleproblem: function(){
            if (this.room.problemstate) {
                if ($('#editormain').parent().hasClass('col-xs-9')) {
                    $('#editormain').parent().removeClass('col-xs-9');
                    $('#editormain').parent().addClass('col-xs-6');
                }
                else{
                    $('#editormain').parent().removeClass('col-xs-12');
                    $('#editormain').parent().addClass('col-xs-9');
                }
                $('#problem-box').show();
                $('#current-doc').hide();
                $('#toggle-problem').html('<span class="glyphicon glyphicon-backward"></span>');
                $('#toggle-problem').attr('title', strings['hide-title']);
            } else {
                if ($('#editormain').parent().hasClass('col-xs-6')) {
                    $('#editormain').parent().removeClass('col-xs-6');
                    $('#editormain').parent().addClass('col-xs-9');
                }
                else{
                    $('#editormain').parent().removeClass('col-xs-9');
                    $('#editormain').parent().addClass('col-xs-12');
                }
                $('#problem-box').hide();
                $('#current-doc').show();
                $('#toggle-problem').html('<span class="glyphicon glyphicon-forward"></span>');
                $('#toggle-problem').attr('title', strings['show-title']);
            }
            this.editor.refresh();
            this.resize();
            this.room.problemstate = !this.room.problemstate;
        },
        /*设置代码编辑框全屏*/
        setFullScreen: function (cm, full) {
            var wrap = cm.getWrapperElement();
            if (full) {
                $('#editormain').css('position', 'static');
                $('#editormain-inner').css('position', 'static');
                $('#fullscreentip').fadeIn();
                setTimeout('$(\'#fullscreentip\').fadeOut();', 1000);
                wrap.className += " CodeMirror-fullscreen";
                wrap.style.height = $(window).height() + "px";
                document.documentElement.style.overflow = "hidden";
            } else {
                $('#editormain').css('position', 'fixed');
                $('#editormain-inner').css('position', 'relative');
                $('#fullscreentip').hide();
                wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
                wrap.style.height = "";
                document.documentElement.style.overflow = "";
            }
            cm.refresh();
            cm.focus();
        },
        setConsoleFull: function () {
            this.setFullScreen(this.editor, true);
        },
        /*开关控制台*/
        toggleConsole: function () {
            this.setConsole(!this.consoleOpened);
        },
        /*运行代码*/
        run: function () {
            this.room.run();
        },
        /*调试代码*/
        debug: function () {
            this.room.debug();
        },
        setShownName: function () {
            var name = this.room.docModel.json.shownName;
            if (name.indexOf('@') >= 0)
                name = name.substring(0, name.indexOf('@'));
            this.$('#current-doc').html(name);
            if ($('#current-doc').text().trim().length >= 20){
                var replaceName = $('#current-doc').text().trim().substring(0, 16)+'...';
                $('#current-doc').text(replaceName);
            }
        },
        enter: function (data) {
            this.oldscrolltop = $('body').scrollTop();
            this.listenTo(this.room.docModel, 'change', this.setShownName);
            this.setShownName();
            var that = this;
            this.editor.on("gutterClick",
			function (cm, n) {
			    if (typeof that.gutterClick == 'function') {
			        that.gutterclick(cm, n);
			    }
			});
        },
        exit: function () {
            //this.room.leaveVoiceRoom();
            $("body").animate({
                scrollTop: this.oldscrolltop
            });
            //this.stopListening();
        },
		/*设置断点*/
        setBreak: function (cm, n, add) {
            add && (add = $('<div><img src="images/breakpoint.png" /></div>')[0]);
            cm.setGutterMarker(n, 'breakpoints', add || null);
        },
		/*清除所有断点*/
        removeAllBreaks: function (bps) {
            for (var i = 0, l = bps.length, cm = this.editor, info; i < l; i++) {
                if (bps[i] != '0') {
                    info = cm.lineInfo(i);
                    if (info.gutterMarkers && info.gutterMarkers['breakpoints']) {
                        cm.setGutterMarker(i, 'breakpoints', null);
                    }
                }
            }
        },
        setRunState: function () {
            if (this.room.runEnabled()) {
                this.$btnRun.removeClass('disabled');
            }
            else {
                this.$btnRun.addClass('disabled');
            }
            if (this.room.debugEnabled()) {
                this.$btnDebug.removeClass('disabled');
            }
            else {
                this.$btnDebug.addClass('disabled');
            }
        },
        setConsole: function (opened) {
            opened = !!opened;
            if (this.consoleOpened != opened) {
                this.consoleOpened = opened;
                if (opened) {
                    this.$under.show();
                    this.$btnCon.addClass('active');
                } else {
                    this.$under.hide();
                    this.$btnCon.removeClass('active');
                }
                this.resize();
            }
            if (opened) {
                this.$conIn.focus();
            }
        },
        setRun: function () {
            this.$conBox.html('');
            this.$conIn.val('');
            this.$btnRun.attr('title', strings['kill-title'] || 'kill')[0].childNodes[0].className = 'glyphicon glyphicon-stop';
            this.$btnDebug.addClass('disabled');
            this.$conTitle.text(strings['console'] || 'console');
            this.setConsole(true);
        },
        setDebug: function (text) {
            this.editor.setOption('readOnly', true);
            this.$conBox.html('');
            this.$conIn.val('');
            this.$btnDebug.attr('title', strings['stop-debug-title'] || 'stop debug')[0].childNodes[0].className = 'glyphicon glyphicon-eye-close';
            this.$btnRun.addClass('disabled');
            this.$conTitle.text(strings['console']);
            this.setConsole(true);
            this.room.old_text = this.editor.getValue();
            this.editor.setValue(text);
            this.popHistory();
        },
        popHistory: function () {
            var editordoc = this.editor.getDoc(),
			hist = editordoc.getHistory();
            hist.done.pop();
            editordoc.setHistory(hist);
        },
        onRunning: function () {
            this.runTo(-1);
            this.$varsBtns.addClass('disabled');
            this.$conTitle.text(strings['console'] || 'console');
        },
        onWaiting: function (data) {
            this.runTo((typeof data.line == 'number') ? (data.line - 1) : -1);
            this.$varsBtns.removeClass('disabled');
            this.$conTitle.text(strings['console'] + strings['waiting'] + ((typeof data.line == 'number') ? '' : ((data.line) ? ('[' + data.line + ']') : strings['nosource'])));
        },
        runTo: function (n) {
            if (this.runningLine >= 0) {
                this.editor.removeLineClass(this.runningLine, '*', 'running');
                this.editor.setGutterMarker(this.runningLine, 'runat', null);
            }
            if (n >= 0) {
                this.editor.addLineClass(n, '*', 'running');
                this.editor.setGutterMarker(n, 'runat', $('<div><img src="images/arrow.png" width="16" height="16" style="min-width:16px;min-width:16px;" /></div>').get(0));
                this.editor.scrollIntoView({
                    line: n,
                    ch: 0
                });
            }
            this.runningLine = n;
        },
        stdin: function (text) {
            if (this.room.debugLock && this.room.waiting) {
                return;
            }
            var text = this.$conIn.val();
            if (this.room.runLock || this.room.debugLock) {
                this.room.stdin(text + '\n');
            } else {
                this.toConsole(text + '\n', 'stdin');
            }
            this.$conIn.val('');
        },
        chat: function () {
            var t = this.$chatIn.val(); (t) && this.room.chat(t);
            this.$chatIn.val('');
        },
        toChatBox: function (name, type, content, time) {
            time = new Date(time);
            $('#chat-show-inner').append('<p class="chat-element"><span class="chat-name ' + type + '">' + name + '&nbsp;&nbsp;' + time.toTimeString().substr(0, 8) + '</span><br />' + content + '</p>');
            var o = $('#chat-show').get(0);
            o.scrollTop = o.scrollHeight;
        },
        toConsole: function (content, type) {
            type = (type) ? ('<span class="' + type + '">') : '<span>';
            this.$conBox.append(type + _.escape(content || '').replace(/ /g, '&nbsp;').replace(/\n/gm, '<br />') + '</span>');
            var o = this.$conBox[0];
            o.scrollTop = o.scrollHeight;
        },
        setSaving: function () {
            this.$docState.text(strings['saving...'] || 'saving...').addClass('red');
            this.room.timestamp = 0;
            this.room.isSaving = true;
            this.setRunState();
        },
        setSaved: function () {
            this.room.timestamp = new Date().getTime();
            var that = this;
            window.setTimeout(function () {
                that.setSaved2(that.room.timestamp);
            },
			that.room.saveTimeout);
            this.room.saveTimeout = 500;
        },
        setSaved2: function (stamp) {
            if (this.room.timestamp == stamp) {
                this.room.isSaving = false;
                this.$docState.removeClass('red').text(strings['saved'] || 'saved');
                this.setRunState();
            }
        },
        newCursor: function (content) {
            var cur = $('<div class="cursor">' + '<div class="cursor-not-so-inner">' + '<div class="cursor-inner">' + '<div class="cursor-inner-inner">' + '</div>' + '</div>' + '</div>' + '</div>');
            cur.find('.cursor-inner').popover({
                html: true,
                content: '<b>' + content + '</b>',
                placement: 'bottom',
                trigger: 'hover'
            });
            return cur[0];
        },
        isFullScreen: function (cm) {
            return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
        },
        resize: function () {
            var w,
			h = $(window).height(),
			o = this,
			cbh,
			cbhexp,
			underh; (h < 100) && (h = 100);
            cbh = h - o.$members.height() - 138;
            cbhexp = cbh > 100 ? 0 : 100 - cbh; (cbh < 100) && (cbh = 100);
            o.$chatShow.css('height', cbh - 27 + 'px');
            o.$chatPanel.css('height', (h - 110 + cbhexp) + 'px');
            w = o.$main.parent().width();
            o.$main.css('width', w + 'px');
            underh = h > 636 ? 212 : h / 3; (o.consoleOpened) || (underh = 0);
            o.$under.css('height', underh + 'px');
            o.$con.css({
                width: (w - w / 3 - 2) + 'px',
                height: (underh - 12) + 'px'
            });
            o.$vars.css({
                width: (w / 3 - 1) + 'px',
                height: (underh - 12) + 'px'
            });
            o.$varsReal.css('height', (underh - 42) + 'px');
            o.$conBox.css({
                height: (underh - 81) + 'px'
            });
            o.$conIn.css({
                width: (w - w / 3 - 5) + 'px'
            });
            if (!this.isFullScreen(this.editor))
                this.$('.CodeMirror').css('height', (h - underh - this.$('#over-editor').height() - 110) + 'px');
            w = o.$chatShow.width();
            if (w != 0) {
                o.$chatIn.css('width', (w - 120) + 'px');
            }
            o.$tip.css('left', (($(window).width() - o.$tip.width()) / 2) + 'px');
            o.$mainBox.css('left', (-$(window).scrollLeft()) + 'px');
            var topWidth = document.getElementById("nav-head").clientWidth;
            if (topWidth >= 770){
                $('.navbar-right').show();
                $('.navbar-left').show();
            }
            else
            {
                $('.navbar-right').hide();
                $('.navbar-left').hide();
            }
            this.editor.refresh();
        },
        changelanguage: function (language) {
            if (app.languageMap[language]) {
                if (app.modeMap[language])
                    this.editor.setOption('mode', app.modeMap[language]);
                else
                    this.editor.setOption('mode', this.languageMap[language]);
                CodeMirror.autoLoadMode(this.editor, app.languageMap[language]);
            } else {
                this.editor.setOption('mode', 'text/plain');
                CodeMirror.autoLoadMode(this.editor, '');
            }
        },
        //选择语言
        selectlanguage: function(){
            var sel = $('#language-selector'),
                lan = sel.val(),
                view = app.room.view;
            view.changelanguage(app.languageShortMap[lan]);
            app.room.ext = app.languageShortMap[lan];
            app.room.checkrunanddebug(app.languageShortMap[lan]);
        },
        //显示题目描述
        showProblem: function(problem){
            var name = problem.attributes.name;
            if (name.length >= 12)
            name = name.substring(0, 8) + '...';
            $('#interviewproblem-name').text(name);
            var description = problem.attributes.description;
            if (description.length >= 499)
                description = description.substring(0, 497)+ '...';
            $('#interviewproblem-description').text(description);
        },
        //显示题目描述细节对话框
        showProblemDetail: function(problem){
            var modal = $('#viewproblem');
            $('#viewproblem-name').text(problem.attributes.name);
            $('#viewproblem-description').text(problem.attributes.description);
            app.showInputModal(modal);
            modal.on('hide', function () {
                modal.find('.modal-confirm').off('click');
                modal.off('hide');
            });
            modal.find('.modal-confirm').on('click', function(){
                modal.modal('hide');
            });
        },
        //保存绘图
        saveCanvas: function(){
            var canvas = $('.drawing-board-canvas')[0];
            var data = canvas.toDataURL('image/png');
            app.room.onSavingDraw(data);
        },
        //重渲染绘图
        renewDraw: function(data){
            var canvas = $('.drawing-board-canvas')[0];
            var image = new Image();
            image.src = data;
            canvas.getContext("2d").drawImage(image, 0, 0);
        },
        //打开绘图板
        openDrawboard: function(){
            app.room.initBoard();
            var modal = $('#graphics');
            app.showInputModal(modal);
            var canvas = $('.drawing-board-canvas'),
                that = this;
            $('.drawing-board-control-navigation').find('button').on('click', function(){
                var Update = setTimeout(function(){
                    that.saveCanvas();
                    clearTimeout(Update);
                }, 200);
            });
            canvas.on('mouseup', function(){
                that.saveCanvas();
            });
        },
        //设置批注html
        setPopover: function(elem, options, text){
            elem.popover('destroy');
            var child = $('<span></span>');
            child.addClass('comment-content');
            child.text(text);
            elem.data('content', child).popover(options);
        },
        //刷新批注
        flashComment: function(line){
            var editor = this.editor,
                view = this,
                LineHandle = editor.getLineHandle(line),
                icon = $(LineHandle.widgets[0].node).find('.lint-error-icon');
            icon.addClass('lint-error-icon-highlight');
            icon.popover('show');
            icon.parent().parent().addClass('lint-line-highlight');
            var popoverFlash = setTimeout(function(){
                icon.popover('hide');
                icon.parent().parent().removeClass('lint-line-highlight');
                icon.removeClass('lint-error-icon-highlight');
                view.inpopover = false;
                clearTimeout(popoverFlash);
            }, 5000);
        },
        //添加批注事件响应
        attachEvents : function (e) {
            var view = this;
            $('.popover').on('mouseenter', function() {
                view.inpopover=true;
            });
            $('.popover').on('mouseleave', function() {
                view.inpopover=false;
                $(e).popover('hide');
            });
        },
        //清空所有批注对应的控件
        clearAllLineWidget :function(){
            var editor = this.editor;
            for (var i = 0; i < editor.lineCount(); i++) {
                var l = editor.getLineHandle(i);
                if (!l.widgets) continue;
                this.editor.removeLineWidget(l.widgets[0]);
            }
        },
        //设置批注
        setLineWidget: function (l, text){
            var msg = $('<div></div>');
            var icon = $('<span></span>');
            icon.html('=');
            icon.addClass('lint-error-icon');
            msg.addClass('lint-line');
            msg.append(icon);
            var options = {placement:'left', trigger: 'manual', html: true};
            var view = this,
                editor = view.editor,
                LineHandle = editor.getLineHandle(l);
            this.setPopover(icon, options, text);
            icon.on('mouseenter', function() {
                var that = this;
                setTimeout(function(){
                    if (!view.inpopover) {
                        $(that).popover('show');
                        view.attachEvents(that);
                    }
                }, 200);
            });
            icon.on('mouseleave', function(){
                var that = this;
                setTimeout(function(){
                    if (!view.inpopover)
                        $(that).popover('hide');
                }, 200);
            });
            icon.on('click', function(){
                var modal = $('#newcomment');
                app.showInputModal(modal);
                var cnfm = modal.find('.modal-confirm');
                modal.on('hide', function () {
                    cnfm.off('click');
                    modal.off('hide');
                });
                modal.find('.modal-input').val(LineHandle.comment);
                cnfm.on('click', function(){
                    var newText = modal.find('.modal-input').val();
                    app.room.addComment(l, newText);
                    modal.modal('hide');
                })
            });
            return msg;
        }
    });

    app.init || (app.init = {});
    app.init.roomView = function () {
        if (app.views['room']) {
            return;
        }
        app.room || app.init.room();
        var view = app.views['room'] = new app.RoomView();
        view.room = app.room;
        view.widgets = [];
        app.room.view = view;
        var Browser = {};
        var ua = navigator.userAgent.toLowerCase();
        var s; (s = ua.match(/msie ([\d.]+)/)) ? Browser.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Browser.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Browser.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Browser.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Browser.safari = s[1] : 0;
        if ((!Browser.chrome || parseInt(Browser.chrome) < 20) && (!Browser.opera || parseInt(Browser.opera) < 18) && (!Browser.firefox || parseInt(Browser.firefox) < 22)) {
            app.novoice = true;
            $('#voice-on').addClass('disabled');
            $('#voice-on').removeAttr('title');
            $('#voice-on').popover({
                html: true,
                content: strings['novoice'],
                placement: 'left',
                trigger: 'hover',
                container: 'body'
            });
        }
        view.editor = CodeMirror.fromTextArea($('#editor-textarea').get(0), {
            lineNumbers: true,
            lineWrapping: true,
            indentUnit: 4,
            indentWithTabs: true,
            styleActiveLine: true,
            extraKeys: {
                "Esc": function (cm) {
                    if (view.isFullScreen(cm))
                        view.setFullScreen(cm, false);
                    view.resize();
                },
                "Ctrl-S": view.room.saveevent
            },
            gutters: ["runat", "CodeMirror-linenumbers", "breakpoints"]
        });
        view.gutterclick = function (cm, n) { };
        view.editor.on("gutterClick",
		function (cm, n) {
		    view.gutterclick(cm, n);
		});
        view.room.registereditorevent();
        if (!app.Package.ENABLE_RUN) {
            $('#editor-run').remove();
            if (!ENABLE_DEBUG) {
                $('#editor-console').remove();
            }
        }
        if (!app.Package.ENABLE_DEBUG) {
            $('#editor-debug').remove();
        }
    };
})();