
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    initialize(tabId);
});


chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    initialize(tabId);
});


function initialize(tabId) {
    if (!isMyScriptLoaded())
    {
        chrome.tabs.executeScript(tabId, { file: "jquery-1.11.1.min.js", allFrames: true });
        chrome.tabs.insertCSS(tabId, { file: "colorbox.css", allFrames: true });
        chrome.tabs.executeScript(tabId, { file: "jquery.colorbox.js", allFrames: true });
        chrome.tabs.executeScript(tabId, { file: "jquery.timer.js", allFrames: true });
        chrome.tabs.executeScript(tabId, { file: "content.js", allFrames: true });
    }
    
    //chrome.tabs.executeScript(tabId, { file: "jquery-2.0.2.js", allFrames: true });
}
function isMyScriptLoaded() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { query: "checkIfExists" }, function (response) {
            if (response) {
                console.log("script loaded");
                return true;
            }
            else {
                console.log("script not loaded");
                return false;
            }
        });
    });
}

