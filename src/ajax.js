var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject() {
    var xmlHttp;

    // check for IE
    if (window.ActiveXObject) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
            xmlHttp = false;
        }
    }
    else {
        try {
            xmlHttp = new XMLHttpRequest();
        }
        catch (e) {
            xmlHttp = false;
        }
    }

    if (!xmlHttp) {
        alert('cannot create that object')
    }
    else {
        return xmlHttp;
    }
}

function process() {
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        //var food = encodeURIComponent(document.getElementById('s').value);
        console.log('process func');
        xmlHttp.open('GET', 'templates/home.html', true);
        xmlHttp.onreadystatechange = handleServerResponse;
        xmlHttp.send(null);
    }
    else {
        setTimeout(process(), 1000);
    }
}

function handleServerResponse() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            console.log(xmlHttp.response);
            var xmlResponse = xmlHttp.responseXML;
            var xmlDocumentElement = xmlResponse.documentElement;
            var message = xmlDocumentElement.firstChild.data;
            console.log(message);
        }
    }
}

process();