function init() {
	document.addEventListener("deviceready", deviceReady, true);
  document.addEventListener("offline", onOffline, false);
	delete init;
}

//Sezione per le notifiche ad Android e iOS

function addNotify() {
    try{ 
        var pushNotification = window.plugins.pushNotification;
        if ( device.platform == 'android' || device.platform == 'Android' ){  
           pushNotification.register(
           successHandler,
           errorHandler, {
           "senderID":"1073127551296",
           "ecb":"onNotificationGCM"
           });
        }else{
           pushNotification.register(
           tokenHandler, 
           errorHandler, {
           "badge":"true",
           "sound":"true",
           "alert":"true",
           "ecb":"onNotificationAPN"
           });	// required!
        }    
    }catch(err){ 
        txt="There was an error on this page.\n\n"; 
        txt+="Error description: " + err.message + "\n\n"; 
        alert(txt); 
    }
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
        }
    
        // iOS
        function onNotificationAPN(event) {
            var pushNotification = window.plugins.pushNotification;

            if (event.alert) {
                var str = event.alert;
                var res = str.split("***");

                navigator.notification.confirm(
                    res[0],                             // message
                    /*window.open("apri.html?notify_id="+res[1],"_self","location=yes"),*/
                    alert("fsdfsdfdsfds"),       
                    "Confcommercio Verona",             // title
                    'Si,No'                             // buttonLabels
                );  
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
        //Android
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


//Funzioni generiche

function deviceReady() {
  addNotify();
}
function onOffline() {
  window.location.replace("offline.html");
}