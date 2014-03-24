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
        document.addEventListener('offline', this.offLine, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
            alert("pronto");
      
          /*Preso da http://blog.safaribooksonline.com/2012/02/29/phonegap-storing-and-retrieving-with-the-filesystem/ */
                  
                  var failCB = function (msg) { return function () { alert('[FAIL] ' + msg); } };
                  var FILENAME = 'confcommercio_config.db',
                      $ = function (id) {
                              return document.getElementById(id);
                          },
                      file = {
                          writer: { available: false },
                          reader: { available: false }
                      },
                      dbEntries = [];
                      
                      alert("qwwq");
                  
                  //guardo il file
                  var fail = failCB('requestFileSystem');
                  alert("qua");
                  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail); 
                  alert("qua2");
     },
     offLine: function() {
              window.location = "offline.html";
          } 
     
};
 
 
    
    