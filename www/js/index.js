function readText() {
    alert("read");

    if (file.entry) {
        
        file.entry.file(function (dbFile) {
        
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                var textArray = evt.target.result.split("***");
                var user = textArray[0];
                var pass = textArray[1];
                var not = textArray[2];
                 

                dbEntries = textArray.concat(dbEntries);
                alert("user letto: "+user);
                alert("pass letta: "+pass);
                alert("not letto: "+not);
                document.getElementById('username').value=user;
               if (typeof pass === 'undefined'){
                  document.getElementById('password').value="";
                }else{
                  document.getElementById('password').value=pass;
                }
                
                if (typeof not === 'undefined'){
                  document.getElementById('ricevinotifiche').checked=false;
                }else{
                  if (not=="on"){
                     document.getElementById('ricevinotifiche').checked=true;
                  }else{
                     document.getElementById('ricevinotifiche').checked=false;
                  }
                }

            //Cripto username e password per l'invio
            var key = "cd027Kgh";
            var crp_usr = stringToHex(des(key, user, 1, 0));
            var crp_pwd = stringToHex(des(key, pass, 1, 0));
            
            //Verifico che le credenziali siano giuste
            var url='http://www.confcommercioverona.it/app/check_login.php?usr='+crp_usr+'&pwd='+crp_pwd;
            if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                var http=new XMLHttpRequest();
            } 
            else {
                var http=new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            http.open('HEAD', url, false);
            http.send();
            if (http.status!=404){
             /* document.getElementById("definitions").style.display="block";
              $('definitions').innerHTML = "Le credenziali di accesso sono corrette!<br>Ora puoi utilizzare la APP";
              setTimeout(function() {window.location = "index.html";}, 1000); */
            }else{
              document.getElementById("definitions").style.display="block";
              $('definitions').innerHTML = "Le credenziali di accesso non sono corrette!";  
            }
            }
            reader.readAsText(dbFile);
        }, failCB("FileReader"));
    }
    }//readText

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
                  
                  //guardo il file
                  var fail = failCB('requestFileSystem');
                  
                  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail); 
     } 
     
};
 
 
    
    