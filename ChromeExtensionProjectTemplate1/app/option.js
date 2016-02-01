$(document).ready(function () {
    //chrome.storage.sync.get(["workspaceId", "slackUrl"], function (o) {
    //    $("#txtRallyWorkspaceId").val(o.workspaceId);
    //    $("#txtSlackUrl").val(o.slackUrl);
    //    $("#btnSave").click(btnSave);
    //    $("#btnClose").click(function () { window.close(); });
    //});
    
});

function btnSave() {
    var workspaceId = $("#txtRallyWorkspaceId").val();
    var slackUrl = $("#txtSlackUrl").val();
    if (workspaceId == null || workspaceId.length == 0) {
        window.close();
        return;
    }
    if (slackUrl == null || slackUrl.length == 0) {
        window.close();
        return;
    }
    chrome.storage.sync.set({ workspaceId: workspaceId, slackUrl: slackUrl }, function () {
        askToRefreshOptions();
        
    });
}



function askToRefreshOptions() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { query: "refreshOptions" }, function (response) {
            if (response) {
                console.log("options refreshed");
                window.close();
                return true;
            }
            else {
                window.close();
                return false;
            }
        });
    });
}

