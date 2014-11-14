/**
 * Created by tarma on 14年11月9日.
 */
var app = app || {};

(function() {
    var listeners = {

        // Add problem
        "add-problem": function() {
            app.collection.problems.fetch({
                success: function() {
                    app.views['problemset'].renewList();
                }
            });
        }

    };

    // Start listening
    (function() {
        app.init_suf.socket = function() {
            if (app.socket) {
                return;
            }
            var socket = app.socket;
            for (var i in listeners) {
                socket.on(i, listeners[i]);
            }
        };
    })();

})();