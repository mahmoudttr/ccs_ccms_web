let devPort = '3006';
let stagePort = '3006';
let localPort = '3006';


let devBaseURL = 'http://swifthelp.org:' + devPort;
let stageBaseURL = 'http://swifthelp.org:' + stagePort;
let localBaseURL = 'http://localhost:' + localPort;

let devBaseURLs = 'https://swifthelp.org:' + devPort;
let stageBaseURLs = 'https://swifthelp.org:' + stagePort;



function getCookie() {
    var strCookie = decodeURIComponent(JSON.stringify(document.cookie));
    var cookieArr = strCookie.split("=");
    var cookieArr1 = cookieArr[1].split("j:");
    var cookieString = cookieArr1[1].slice(0, -1);
    return JSON.parse(cookieString);
}
