
const url = document.URL + '/api';
const urlSign = url + "/sign";
const urlCeiling = url + "/ceiling";

var setColor = function (rgb) {
    var r = Number(rgb.substring(4, rgb.length - 1).split(",")[0])
    var g = Number(rgb.substring(4, rgb.length - 1).split(",")[1])
    var b = Number(rgb.substring(4, rgb.length - 1).split(",")[2])
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    document.getElementById("colorInput").value = hex;
}

function on(destination) {
    sendRequest("on", "true",destination);
    document.getElementById("on").disabled = true;
    document.getElementById("off").disabled = false;
}

function off(destination) {
    sendRequest("on", "false",destination);
    document.getElementById("off").disabled = true;
    document.getElementById("on").disabled = false;
}

function text(destination) {
    sendRequest("text", document.getElementById("textInput").value,destination);
}

function speed(destination) {
    sendRequest("speed", 55 - document.getElementById("speedInput").value,destination);
}

function animation(destination) {
    sendRequest("animationType", document.getElementById("selector"+destination).value,destination);
}

function emptyTicks(destination) {
    sendRequest("emptyTicks", document.getElementById("emptyTicks").value,destination);
}

function color(destination) {
    element = document.getElementById("colorInput").value;

    splitter = element.split("#")[1];

    r = splitter.substring(0, 2);
    g = splitter.substring(2, 4);
    b = splitter.substring(4, 6);

    rP = parseInt("0x" + r);
    gP = parseInt("0x" + g);
    bP = parseInt("0x" + b);

    output = pad(rP, 3) + pad(gP, 3) + pad(bP, 3);

    sendRequest("color", output,destination);
}

window.onload = function () {
    //For the sign
    http = new XMLHttpRequest();
    http.open("POST", url+urlSign + "?get");
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var json = JSON.parse(http.responseText);
            console.log(json);
            document.getElementById("textInput").value = json.text;
            document.getElementById("speedInput").value = 55 - json.speed;
            document.getElementById("selector").value = json.animationType;
            setColor(json.color);
            if (json.isActive === 1) {
                document.getElementById("on").disabled = true;
            }
            else {
                document.getElementById("off").disabled = true;
            }
            document.getElementById("emptyTicks").value = json.emptyTicks;
        }
    };
    http.send();
}

function sendRequest(param, value, destination="none") {
    http = new XMLHttpRequest();
    requestURL = "";
    if (destination == "sign") {
        requestURL = urlSign + "?" + param + "=" + value;
    } else if (destination == "ceiling") {
        requestURL = urlCeiling + "?" + param + "=" + value;
    } else {
        console.log("Uknown destination ("+destination+")");
        return;
    }
    http.open("POST", requestURL);

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            showToast("Successfully updated!");
        } else if (http.readyState === 4) {
            showToast("Request failed! (Code: " + http.status + ")");
        }
    };
    http.send();

}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
