
const url = 'localhost';

function on() {
    sendRequest("on", "true");
}

function off() {
    sendRequest("on", "false");
}

function text() {
    sendRequest("text", document.getElementById("textInput").value);
}

function speed() {
    sendRequest("speed", document.getElementById("speedInput").value);
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

function sendRequest(param, value) {
    http = new XMLHttpRequest();
    http.open("GET", url + "?" + param + "=" + value);
    http.send();
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}