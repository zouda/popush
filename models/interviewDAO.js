module.exports = InterviewDAO;
var db = require('./db.js');
function InterviewDAO() {
    if(!(this instanceof InterviewDAO)) {
        return new InterviewDAO();
    }
    this.innerError = false;
}

//命名规范
function validateName(str){
    var re = /[\*\\\|:\"\'\/\<\>\?\@]/;
    return str.length <= 40 && re.test(str);
}

//新建面试
InterviewDAO.prototype.createInterview = function (name,interviewers,interviewees,problems,callback) {
    db.interview.findOne({name:name}, {_id:1}, function(err, interview) {
        if (err) {
            return callback("inner error");
        }
        if(validateName(name)){
            return callback("interview name error");
        }
        if (interview) {
            return callback("interview exists");
        }
        db.interview.find({},{_id:1},function(err, interviews) {
            if (err) {
                return callback("inner error");
            }
            var intervieweelist = [];
            var i = 0;
            interviewees.forEach(function(iname,i){
                intervieweelist[i] = {
                    name: iname,
                    status: "waiting",
                    evaluation: "",
                    problem: []
                };
                i++;
            });
            var problemlist = [];
            var j = 0;
            problems.forEach(function(iname,j){
                problemlist[j] = {name:iname,status:"waiting"};
                j++;
            });
            db.interview.insert({
                    name: name,
                    interviewer:interviewers,
                    interviewee:intervieweelist,
                    problemlist:problemlist,
                    status:"waiting",
                    createTime: new Date().getTime()
                },
                function (err, newInterview) {
                    if(err) {
                        return callback("inner error");
                    }
                    if(!newInterview) {
                        return callback("inner error");
                    }
                    return callback(null);
                });
        });
    });
};

//获取面试
InterviewDAO.prototype.getInterviewByName = function (name, callback) {
    db.interview.findOne({name:name}, {name:1, interviewer:1, interviewee:1, problemlist:1,status:1 ,createTime:1}, function (err, interview) {
        if (err) {
            return callback("inner error");
        }
        if (!interview) {
            return callback("interview not found");
        }
        return callback(null, interview);
    });
};

//获取一个人的所有面试
InterviewDAO.prototype.getInterviews = function (userName, mode, callback) {
    if (mode == 1) {
        db.interview.find({"interviewer": userName}, {
            name: 1,
            interviewer: 1,
            interviewee: 1,
            problemlist: 1,
            status: 1,
            createTime: 1
        }, function (err, interviews) {
            if (err) {
                return callback("inner error");
            }
            if (!interviews) {
                return callback("interview not found");
            }
            return callback(null, interviews);
        });
    } else {
        if (mode == 2) {
            db.interview.find({"interviewee.name":userName}, {name:1,interviewer:1,interviewee:1,status:1, createTime: 1}, function (err,interviews) {
                if (err) {
                    return callback("inner error");
                }
                if (!interviews) {
                    return callback("interview not found");
                }
                return callback(null, interviews);
            });
        } else {
            return callback("bad mode infomation");
        }
    }
};

//删除面试
InterviewDAO.prototype.deleteInterview = function (name,callback) {
    db.interview.findOne({name:name}, {_id:1}, function (err, interview) {
        if (err) {
            return callback("inner error");
        }
        if (!interview) {
            return callback("interview not found");
        }
        db.interview.remove({_id: interview._id}, function (err, reply) {
            if (err) {
                return callback("inner error");
            }
            return callback(null);
        });
    });
};

//更新题目
InterviewDAO.prototype.updateProblem = function(name, problems, callback) {
    var probleml = [];
    var i = 0;
    problems.forEach(function(problemname,i){
        probleml[i] = {name:problemname,status:"waiting"};
        i++;
        if(i == problems.length){
            db.interview.findAndModify({
                query: {name: name},
                update: {$set: {problemlist: probleml}},
                new: true,
                fields: {problemlist: 1}
            }, function(err, interview) {
                if (err) {
                    return callback("inner error");
                }
                if (!interview) {
                    return callback("interview not found");
                }
                return callback(null, interview);
            });
        }
    });
};

//更新面试者状态
InterviewDAO.prototype.updateIntervieweestatus = function(interviewname, intervieweename,status, callback) {
    db.interview.findOne({name:interviewname},{interviewee:1},function(err,interv){
        if(err){
            return callback("inner error");
        }
        var intervieweelist=[];
        var i = 0,j = 0;
        var flag = 0;
        interv.interviewee.forEach(function(viewee){
            intervieweename.forEach(function(vieweename){
                if(viewee.name == vieweename){
                    intervieweelist[i] = {
                        name: vieweename,
                        status:status,
                        evaluation:viewee.evaluation,
                        problem: viewee.problem
                    };
                    i++;
                    flag = 1;
                }
                j++;
                if(j == intervieweename.length){
                    j = 0;
                    if(flag == 0){
                        intervieweelist[i] = viewee;
                        i++;
                    }
                    flag = 0;
                }
                if(i == interv.interviewee.length)
                {
                    db.interview.update(
                        {
                            name:interviewname
                        },
                        {
                            $set:{
                                interviewee:intervieweelist
                            }
                        }, function(err, interview) {
                            if (err) {
                                return callback("inner error");
                            }

                            db.interview.findOne({name: interviewname}, {
                                name: 1,
                                interviewee: 1
                            }, function (err, interview) {
                                if (err) {
                                    return callback("inner error");
                                }
                                if (!interview) {
                                    return callback("interview not found");
                                }
                                return callback(null, interview);

                            });
                        });
                }
            })
        })
    })
};

//更新题目状态
InterviewDAO.prototype.updateProblemstatus = function(interviewname, problemname,status, callback) {
    db.interview.findOne({name:interviewname},{problemlist:1},function(err,interv){
        if(err){
            return callback("inner error");
        }
        var problems=[];
        var i = 0;
        interv.problemlist.forEach(function(problem){
            if(problemname == problem.name){
                problems[i] = {name:problemname,status:status}
            }
            else{
                problems[i] = problem;
            }
            i++;
            if(i == interv.problemlist.length)
            {
                db.interview.update(
                    {
                        name:interviewname
                    },
                    {
                        $set:{
                            problemlist:problems
                        }
                    }, function(err, interview) {
                        if (err) {
                            return callback("inner error");
                        }
                        db.interview.findOne({name: interviewname}, {
                            name: 1,
                            problemlist: 1
                        }, function (err, interview) {
                            if (err) {
                                return callback("inner error");
                            }
                            if (!interview) {
                                return callback("interview not found");
                            }
                            return callback(null, interview);

                        });
                    });
            }
        })
    })
};

//更新面试状态
InterviewDAO.prototype.updateInterviewstatus = function(interviewname,status, callback) {
    db.interview.update(
        {name: interviewname},
        {
            $set:{
                status:status
            }

        }, function(err, interview) {
            if (err) {
                return callback("inner error");
            }
            db.interview.findOne({name:interviewname},{name:1,status:1},function(err,interview){
                if (err) {
                    return callback("inner error");
                }
                if (!interview) {
                    return callback("interview not found");
                }
                return callback(null, interview);
            });
        });
};

//获取某个状态下的面试者列表
InterviewDAO.prototype.getstatusinterviewees = function(interviewname,status,callback){
    db.interview.findOne({name:interviewname},{interviewee:1},function(err,inter){
        if(err){
            return callback("inner error");
        }
        var intervieweelist = [];
        var i,j;
        i = 0;
        j = 0;

        inter.interviewee.forEach(function(interviewee){
            if(interviewee.status == status){
                intervieweelist[i] = interviewee.name;
                i++;
            }
            j++;
            if(j == inter.interviewee.length){
                return callback(null,intervieweelist);
            }
        });
    })
};

//获取某个状态下的题目列表
InterviewDAO.prototype.getstatusproblems = function(interviewname,status,callback){
    db.interview.findOne({name:interviewname},{problemlist:1},function(err,inter){
        if(err){
            return callback("inner error");
        }
        var problemlist = [];
        var i,j;
        i = 0;
        j = 0;
        inter.problemlist.forEach(function(problem){
            if(problem.status == status){
                problemlist[i] = problem.name;
                i++;
            }
            j++;
            if(j == inter.problemlist.length){
                return callback(null,problemlist);
            }
        });
    });
};

//修改面试官
InterviewDAO.prototype.modifyinterviewers = function(interviewname,interviewers,callback){
    db.interview.update(
        {name: interviewname},
        {
            $set:{
                interviewer:interviewers
            }

        }, function(err, interview) {
            if (err) {
                return callback("inner error");
            }

            db.interview.findOne({name:interviewname},{name:1,interviewer:1},function(err,interview){
                if (err) {
                    return callback("inner error");
                }
                if (!interview) {
                    return callback("interview not found");
                }
                return callback(null, interview);
            });
        });
};

//修改面试者
InterviewDAO.prototype.modifyinterviewees = function(interviewname,interviewees,callback){
    var intervieweelist = [];
    var i = 0;
    interviewees.forEach(function(iname,i){
        intervieweelist[i] = {
            name: iname,
            status: "waiting",
            evaluation: "",
            problem: []
        };
        i++;
        if(i == interviewees.length){
            db.interview.update(
                {
                    name: interviewname
                },
                {
                    $set:{
                        interviewee:intervieweelist
                    }

                }, function(err, interview) {
                    if (err) {
                        return callback("inner error");
                    }
                    db.interview.findOne({name:interviewname},{name:1,interviewee:1},function(err,interview){
                        if (err) {
                            return callback("inner error");
                        }
                        if (!interview) {
                            return callback("interview not found");
                        }
                        return callback(null, interview);
                    });
                });
        }
    });
};

//置于等待状态
InterviewDAO.prototype.restoreAllToWaiting = function(interviewName, callback) {
    db.interview.findOne({name: interviewName}, {
        problemlist: 1,
        interviewee: 1
    }, function(err, interview) {
        if (err) {
            return callback("inner error");
        }
        var newProblemList = [];
        var newIntervieweeList = [];
        interview.problemlist.forEach(function(problem) {
            problem.status = 'waiting';
            newProblemList.push(problem);
        });
        interview.interviewee.forEach(function(interviewee) {
            interviewee.status = 'waiting';
            newIntervieweeList.push(interviewee);
        });
        db.interview.update({name: interviewName}, {$set: {
            problemlist: newProblemList,
            interviewee: newIntervieweeList
        }}, function(err) {
            if (err) {
                return callback("inner error");
            }
            return callback(null);
        })
    });
};

//更新评价
InterviewDAO.prototype.updateIntervieweeevaluation = function(interviewname, intervieweename,evaluation, callback) {
    db.interview.findOne({name:interviewname},{interviewee:1},function(err,interv){
        if(err){
            return callback("inner error");
        }
        var intervieweelist=[];
        var i = 0,j = 0;
        var flag = 0;
        interv.interviewee.forEach(function(viewee){
            intervieweename.forEach(function(vieweename){
                if(viewee.name == vieweename){
                    intervieweelist[i] = {name:vieweename,status:viewee.status,evaluation:evaluation}
                    i++;
                    flag = 1;
                }
                j++;
                if(j == intervieweename.length){
                    j = 0;
                    if(flag == 0){
                        intervieweelist[i] = viewee;
                        i++;
                    }
                    flag = 0;
                }
                if(i == interv.interviewee.length)
                {
                    db.interview.update(
                        {
                            name:interviewname
                        },
                        {
                            $set:{
                                interviewee:intervieweelist
                            }
                        }, function(err, interview) {
                            if (err) {
                                return callback("inner error");
                            }

                            db.interview.findOne({name: interviewname}, {
                                name: 1,
                                interviewee: 1
                            }, function (err, interview) {
                                if (err) {
                                    return callback("inner error");
                                }
                                if (!interview) {
                                    return callback("interview not found");
                                }
                                return callback(null, interview);

                            });
                        });
                }
            });
        });
    });
};

//获取评价
InterviewDAO.prototype.getintervieweeevaluation = function(interviewname,intervieweename,callback){
    db.interview.findOne({name:interviewname},{interviewee:1},function(err,inter){
        if(err){
            return callback("inner error");
        }
        var intervieweeobj = [];
        var i,j;
        i = 0;
        j = 0;

        inter.interviewee.forEach(function(interviewee){
            if(interviewee.name == intervieweename){
                intervieweeobj = interviewee;
                i++;
            }
            j++;
            if(j == inter.interviewee.length){
                return callback(null,intervieweeobj);
            }
        });
    })
};

//更新面试者题目列表
InterviewDAO.prototype.pushintervieweeproblem = function(interviewname,intervieweename,problem,callback) {
    db.interview.findOne({name:interviewname},{interviewee:1, problemlist:1},function(err,interv){
        if(err){
            return callback("inner error");
        }
        var intervieweelist = [];
        var i,j;
        i = 0;
        j = 0;
        interv.interviewee.forEach(function(viewee) {
            for (i = 0; i < intervieweename.length; i++) {
                if (viewee.name == intervieweename[i]) {
                    for (j = 0; j < viewee.problem.length; j++) {
                        if (problem == viewee.problem[j]) {
                            break;
                        }
                    }
                    if (j == viewee.problem.length) {
                        viewee.problem.push(problem);
                    }
                    break;
                }
            }
            intervieweelist.push(viewee);
        });
        for (i = 0; i < interv.problemlist.length; i++) {
            if (interv.problemlist[i].name == problem) {
                interv.problemlist[i].status = 'pushing';
                break;
            }
        }
        db.interview.update({name: interviewname}, {$set: {
            interviewee: intervieweelist,
            problemlist: interv.problemlist
        }}, function (err) {
            if (err) {
                return callback("inner error");
            }
            return callback(null);
        });
    });
};

//获取面试者题目列表
InterviewDAO.prototype.getintervieweeproblem = function(interviewname,intervieweename,callback) {
    db.interview.findOne({name:interviewname},{interviewee:1},function(err,interv){
        var i = 0;
        interv.interviewee.forEach(function(viewee) {
            if (viewee.name == intervieweename) {
                return callback(null,viewee.problem);
            }
            i++;
            if(i == interv.interviewee.length){
                return callback("not found");
            }
        });
    });
};