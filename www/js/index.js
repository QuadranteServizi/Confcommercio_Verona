function init() {
	document.addEventListener("deviceready", deviceReady, true);
  document.addEventListener("offline", onOffline, false);
	delete init;
}

//Sezione per login con credenziali da Joomla 
//ispirato a http://www.raymondcamden.com/index.cfm/2012/6/21/Update-to-my-ServerBased-Login-PhoneGap-Demo

function checkPreAuth() {
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        document.getElementById('username').value=window.localStorage["username"];
        document.getElementById('password').value=window.localStorage["password"];
        handleLogin();
    } 
}

function handleLogin() {  
    document.getElementById("submitButton").disabled = true; 
    var u = document.getElementById('username').value;
    var p = document.getElementById('password').value;
    
    if(u != '' && p!= '') {
       //Cripto username e password per l'invio
       var key = "cd027Kgh";
       var crp_usr = stringToHex(des(key, u, 1, 0));
       var crp_pwd = stringToHex(des(key, p, 1, 0));
       //Verifico che le credenziali siano giuste
       var url='http://www.confcommercioverona.it/app/check_login.php?usr='+crp_usr+'&pwd='+crp_pwd;
       if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
          var http=new XMLHttpRequest();
       }else {
          var http=new ActiveXObject("Microsoft.XMLHTTP");
       }
                      
       http.open('HEAD', url, false);
       http.send();
      if (http.status==404){
          alert("Le credenziali di accesso salvate non sono corrette!");
          document.getElementById("submitButton").disabled = false;
      }else{
          window.localStorage["username"] = u;
          window.localStorage["password"] = p;
          window.location.replace("menu.html"); 
      }           
    } else {
        navigator.notification.alert("Devi inserire username e password!", function() {});
        document.getElementById("submitButton").disabled = false;
    }
    return false;
}

//Funzioni generiche

function deviceReady() {
  document.getElementById("launcherPage").style.display = "none";
  checkPreAuth(); 
}
function onOffline() {
  window.location.replace("offline.html");
}