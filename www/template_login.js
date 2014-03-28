
document.write('<div id="wrap">');
document.write('	<div class="back">');
document.write('	</div>');
document.write('	<div class="home">');
document.write('	');
document.write('	</div>');
document.write('	<div class="trigger">');
document.write('			');
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


