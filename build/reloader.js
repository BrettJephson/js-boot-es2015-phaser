(function(global, document, browserSync) {
  var socket = browserSync.socket;
  var canReload = false;

  socket.on("connection", function(client) {
    if(canReload) {
      canReload = false;
      global.location.reload();
    }
  });

  socket.on("disconnect", function(client) {
      canReload = true;
  });

})(window, document, ___browserSync___);
