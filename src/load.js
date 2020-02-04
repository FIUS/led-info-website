urlCeiling ="www.fius-ceiling.int.stuvus.uni-stuttgart.de:5000";


function load() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            console.log( xmlHttp.responseText);
        }else{
            console.log( xmlHttp.readyState);
            console.log(xmlHttp.status);
        }
    }
    xmlHttp.open("GET", "http://www.fius-ceiling.int.stuvus.uni-stuttgart.de:5000/getAnimations", true); // true for asynchronous 
   
    xmlHttp.send(null);
}

window.onload = function () {
   this.load();
}