/**
 * Created by tarma on 14年11月9日.
 */
var app = app || {};

(function() {
    var listeners = {

        // Add problem
        /*"add-problem": function(data) {
            app.collection.problems.fetch({
                all: true,
                name: '',
                success: function() {
                    app.views['problemset'].renewList();
                },
                virtual: true
            });
        },*/

        // Refresh problem collection
        "read-problem": function(data) {
            if (data == null) {
                app.Lock.remove();
                return;
            }

            app.Lock.detach(data);
            app.collections.problems.fetch({
                success: function() {
                    alert('success');
                },
                all: true,
                name: ''
            });
            app.Lock.detach(data);
            delete data.problem;
        }

    };

    app.init_suf || (app.init_suf = {});

    // Start listening
    (function() {
        var _init = false;
        app.init_suf.problemSocket = function() {
            if (_init) {
                return;
            } else {
                _init = true;
            }
            app.init_suf.socket();
            var socket = app.socket;

            for (var i in listeners) {
                socket.on(i, listeners[i]);
            }
        };
    })();

})();