         function gotFS(fs) {
            var fail =null;
            fs.root.getFile('confcommercio_config.db', {create: true, exclusive: false},
                            gotFileEntry, fail);
         }
         
         function gotFileWriter(fileWriter) {
              file.writer.available = true;
              file.writer.object = fileWriter;
          }

                     
        function gotFileEntry(fileEntry) {
            var fail = failCB('createWriter');
            alert("got");
            file.entry = fileEntry;
            fileEntry.createWriter(gotFileWriter, fail);
            readText();
        }  

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
    
    
function saveText(e) {
        //alert(document.getElementById('ricevinotifiche'));
        document.getElementById("definitions").style.display="block";
        $('definitions').innerHTML = "Salvataggio in corso...";
        
        var username = $('username').value,
            password = $('password').value,
            ricevinotifiche = document.getElementById('ricevinotifiche'),
            fail;
  
        if (ricevinotifiche.checked){
                ricevinotifiche='on';
        }else{
               ricevinotifiche='off';
        }
                                               
        dbEntries.push(username + '***' + password + '***'+ ricevinotifiche);
  
    
        if (file.writer.available) {
           file.writer.available = false;
           file.writer.object.onwriteend = function (evt) {
                      file.writer.available = true; 
                      file.writer.object.seek(0); 
                     } 
              file.writer.object.write(username + '***' + password + '***'+ ricevinotifiche); 

                //Aggiorno lo stato delle notifiche sul db
              var url='http://www.confcommercioverona.it/app/notify_newdevice.php?deviceid='+device.uuid+'&notifiche='+ricevinotifiche;
              var ref = window.open(url, '_blank','hidden=yes');
              ref.addEventListener('loadstart', function() {});
              ref.addEventListener('loadstop', function() {});
              ref.addEventListener('exit', function() {}); 
              // close InAppBrowser after 5 seconds
              setTimeout(function() {
                    ref.close();
              }, 5000);   
              //qui devo vedere perchè il deviceid non va
  
      }
     
     if (typeof username === 'undefined'){username="";}
     if (typeof password === 'undefined'){password="";}

     
     if(username.length==0 || password.length==0){
        window.location = "login.html";
     }else{
       //Cripto username e password per l'invio
       var key = "cd027Kgh";
       var crp_usr = stringToHex(des(key, username, 1, 0));
       var crp_pwd = stringToHex(des(key, password, 1, 0));
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
           document.getElementById("definitions").style.display="block";
           $('definitions').innerHTML = "Le credenziali di accesso sono corrette!<br>Ora puoi utilizzare la APP";
           setTimeout(function() {window.location = "index.html";}, 2000);
       }else{
           document.getElementById("definitions").style.display="block";
           $('definitions').innerHTML = "Le credenziali di accesso non sono corrette!";
           setTimeout(function() {window.location = "login.html";}, 2000);  
       }   
     }
  
     /*$('definitions').innerHTML = "Impostazioni salvate con successo!";
     setTimeout(function() {document.getElementById("definitions").style.display="none";}, 2000);
     //window.location = "index.html";
            */

  // return false;
    }

        function receivedEvent(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            console.log('Received Event: ' + id);      
        }
        // result contains any message sent from the plugin call
        function successHandler(result) {
         //   alert('Callback Success! Result = '+result)
        }
        function errorHandler(error) {
            alert(error);
        }
        function tokenHandler(result) {
          // Your iOS push server needs to know the token before it can push to this device
          // here is where you might want to send it the token for later use.
          //alert('device token = ' + result);
          
          //Quando il token è pronto lo inserisco nel database delle notifiche
          var url='http://www.confcommercioverona.it/app/notify_newdevice.php?deviceid='+device.uuid+'&platform='+device.platform+'&model='+device.model+'&registrationId='+result;
          //ricordarsi l'encodeURI per iOS
          var ref = window.open(encodeURI(url), '_blank','hidden=yes');
          ref.addEventListener('loadstart', function() {});
          ref.addEventListener('loadstop', function() {});
          ref.addEventListener('exit', function() {}); 
          // close InAppBrowser after 5 seconds
          setTimeout(function() {
            ref.close();
          }, 5000);
          
          var registrationId=result;
          //alert("RegistrationId= "+registrationId);     
        }
    
        // iOS
        function onNotificationAPN(event) {
            var pushNotification = window.plugins.pushNotification;
            //alert("Received a notification! " + event.alert);
            //alert("event sound " + event.sound);
            //alert("event badge " + event.badge);
            //alert("event " + event);
            if (event.alert) {
                //navigator.notification.alert(event.alert);
                var str = event.alert;
                var res = str.split("***");
    
                var x="";
                var r=confirm(res[0]);
                if (r==true){
                    var notify_news_id=res[1]; //  id del contenuto joomla da notificare
                    //qui per aprire la notifica in app
                    window.open("apri.html?notify_id="+notify_news_id,"_self","location=yes");
                }
            }
            if (event.badge) {
                console.log("Set badge on  " + pushNotification);
                pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
            }
            if (event.sound) {
                var snd = new Media(event.sound);
                snd.play();
            }
            
        }
        //Andriod
        function onNotificationGCM(e) {
            switch( e.event )
            {
              case 'registered':
                if ( e.regid.length > 0 )
                  {
     
                    //Quando il device è pronto lo inserisco nel database delle notifiche
                    var url='http://www.confcommercioverona.it/app/notify_newdevice.php?deviceid='+device.uuid+'&platform='+device.platform+'&model='+device.model+'&registrationId='+e.regid;
                    var ref = window.open(url, '_blank','hidden=yes');
                    ref.addEventListener('loadstart', function() {});
                    ref.addEventListener('loadstop', function() {});
                    ref.addEventListener('exit', function() {}); 
                    // close InAppBrowser after 5 seconds
                    setTimeout(function() {
                      ref.close();
                    }, 5000);     
                    var registrationId=e.regid;
                    //alert("RegistrationId= "+registrationId);
    
                  }
                    break;
    
                    //questo è il comportamento che segue quando viene ricevuta una notifica
                case 'message':
                    // this is the actual push notification. its format depends on the data model from the push server
                    var str = e.message;
                    var res = str.split("***");
    
                        var x="";
                        var r=confirm(res[0]);
                        if (r==true)
                          {
                          
                          var notify_news_id=res[1]; //  id del contenuto joomla da notificare
                          //qui per aprire la notifica in app
                          window.open("apri.html?notify_id="+notify_news_id,"_self","location=yes");
                          }
    
                    break;
    
                case 'error':
                    alert('GCM error = '+e.msg);
                    break;
    
                default:
                    alert('An unknown GCM event has occurred');
                    break;
            }
        }
        
             
   //--------------------------------------------------------------------------          