  //preso da http://www.html.it/articoli/phonegap-accedere-al-file-system-1/
  //questo file potrebbe essere inutile
    
    function comincia() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }
     
    function gotFS(fileSystem) {
      fileSystem.root.getDirectory("ConfcommercioVerona", {create: true, exclusive: false}, directoryFS, fail);
    }
 
    function directoryFS(fileSystem) {
        fileSystem.getFile("settings.txt", {create: true}, gotFileEntry, fail);
    }
    
    function gotFileEntry(fileEntry) {
      fileEntry.createWriter(salvaImpostazioni, fail);
    }
    
    function salvaImpostazioni(writer) {
      writer.write("ciccio ciccio");
    }
    
    function showRecipe() {
      getAttributes();
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }
     
    function gotFS(fileSystem) {
        fileSystem.root.getDirectory("ConfcommercioVerona", {create: true, exclusive: false}, directoryFS, fail);
    }
     
    function directoryFS(fileSystem) {
        fileSystem.getFile("settings.txt", {create: true}, gotFileEntry, fail);
    }
     
    function gotFileEntry(fileEntry) {
        fileEntry.file(readRecipe, fail);
    }

    function readRecipe(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("read success");
            console.log(evt.target.result);
            /*document.getElementById('selectedReceipe').innerHTML = evt.target.result;  */
        };
        reader.readAsText(file);
    }
    