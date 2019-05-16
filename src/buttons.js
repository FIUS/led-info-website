
const url = document.URL+'/api';

var setColor = function( rgb ){
    var r = Number(rgb.substring(4,rgb.length-1).split(",")[0])
    var g = Number(rgb.substring(4,rgb.length-1).split(",")[1])
    var b = Number(rgb.substring(4,rgb.length-1).split(",")[2])
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    document.getElementById("colorInput").value=hex;
}

function on() {
    sendRequest("on", "true");
    document.getElementById("on").disabled=true;
    document.getElementById("off").disabled=false;
}

function off() {
    sendRequest("on", "false");
    document.getElementById("off").disabled=true;
    document.getElementById("on").disabled=false;
}

function text() {
    sendRequest("text", document.getElementById("textInput").value);
}

function speed() {
    sendRequest("speed", document.getElementById("speedInput").value);
}

function animation(){
    sendRequest("animationType", document.getElementById("selector").value);
}

function emptyTicks(){
    sendRequest("emptyTicks", document.getElementById("emptyTicks").value);
}

function color() {
    element = document.getElementById("colorInput").value;

splitter=element.split("#")[1];

    r = splitter.substring(0, 2);
    g = splitter.substring(2, 4);
    b = splitter.substring(4, 6);

    rP = parseInt("0x" + r);
    gP = parseInt("0x" + g);
    bP = parseInt("0x" + b);

    output = pad(rP,3) + pad(gP,3) + pad(bP,3);

    sendRequest("color",output);
}

window.onload = function(){
    http = new XMLHttpRequest();
    http.open("POST", url+"?get");
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var json = JSON.parse(http.responseText);
            console.log(json);
            document.getElementById("textInput").value=json.text;
            document.getElementById("speedInput").value=json.speed;
            setColor(json.color);
            if(json.isActive === 1){
                document.getElementById("on").disabled=true;
            }
            else{
                document.getElementById("off").disabled=true;
            }
}
    };
    http.send();
}

function sendRequest(param, value) {
    http = new XMLHttpRequest();
    http.open("POST", url + "?" + param + "=" + value);
    http.send();
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
