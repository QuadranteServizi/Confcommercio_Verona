function init() {
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function checkPreAuth() {
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        document.getElementById('username').value=window.localStorage["username"];
        document.getElementById('password').value=window.localStorage["password"];
        handleLogin();
    } 
}

function handleLogin() {  

    //disable the button so we can't resubmit while we wait
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

function deviceReady() {
  checkPreAuth(); 
}