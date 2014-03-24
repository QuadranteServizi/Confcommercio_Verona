
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('online', this.onLine, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      
          /*Preso da http://blog.safaribooksonline.com/2012/02/29/phonegap-storing-and-retrieving-with-the-filesystem/ */
                  var FILENAME = 'confcommercio_config.db',
                  $ = function (id) {
                  return document.getElementById(id);
                 },
                 file = {
                      writer: { available: false },
                      reader: { available: false }
                 },
                 dbEntries = [];
              //guardo il file
              
                  var fail = failCB('requestFileSystem');
                  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
              
     } 
     
}; 