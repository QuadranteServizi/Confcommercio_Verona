/*document.write('<div class="header">');
document.write('<h1 class="bar"></h1>');
document.write('<div id="homebutton">');
document.write('<a href="javascript:history.back()">');
document.write('<img src="img/icona.png" alt="Confcommercio Verona" style="vertical-align:middle;"/>');
document.write('</a>');
document.write('');
document.write('</div>');
document.write('</div>'); 

document.write('<div id="spacerhome">');
document.write('</div>'); 
document.write('<div id="logo-wrap">');
document.write('<img src="img/logo_big.png" alt="Confcommercio Verona" />');
document.write('</div>');  
*/
// JS is only used to add the <div>s


document.write('<div id="wrap">');
document.write('	<div class="back">');
document.write('		<a href="javascript:history.back();">');
document.write('			<img src="img/back.png">');
document.write('		</a>');
document.write('	</div>');
document.write('	<div class="home">');
document.write('	<a href="menu.html"><img src="img/menu.png"></a>');
document.write('	</div>');
document.write('	<div class="trigger">');
document.write('			<span><label>Notifiche<input type="checkbox" class="ios-switch" checked /></label></span>');
document.write('	</div>');
document.write('</div>');
document.write('<div id="spacerhome">');
document.write('</div>');
document.write('<div id="logo-wrap">');
document.write('<img src="img/logo_big.png" alt="Confcommercio Verona" />');
document.write('</div>');
document.write('<div class="footer">');
document.write('<h1 class="bar">&copy; <script>document.write(new Date().getFullYear())</script> Confcommercio Verona </h1>');
document.write('</div>'); 

var switches = document.querySelectorAll('input[type="checkbox"].ios-switch');

for (var i=0, sw; sw = switches[i++]; ) {
	var div = document.createElement('div');
	div.className = 'switch';
	sw.parentNode.insertBefore(div, sw.nextSibling);
}
