chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.query == "checkIfExists") {
            sendResponse({ message: true });
            return true;
        }
            
        if (request.query == "refreshOptions") {
            sendResponse({ message: true });
            window.location.reload();
            return true;
        }

            
    });
var workspaceId = "";
var slackUrl = "";
var inRefresh = false;
$("#header").ready(function () {
    //$("#btnBeat").remove();
    //addButton();
    chrome.storage.sync.get(["workspaceId", "slackUrl"], function (o) {
        workspaceId = o.workspaceId;
        slackUrl = o.slackUrl;
        if (workspaceId == null || workspaceId == "") {
            return false;
        }
        if (slackUrl == null || slackUrl == "") {
            return false;
        }

        //$("#btnBeat").remove();
        //addButton();

        //var timer = $.timer(function () {
        //    timerTask();
        //});
        //timer.set({ time: 10000, autostart: true });

        anime_watch("span.message_content", function (span) {
            handleSpan(span);
        });
    });

    
});



var anime_watch = function (selector, callback) {
    var guid = selector.replace(/[^a-zA-Z0-9]+/g, "_") + "_" + ((new Date()).getTime());

    $("<style/>").html([
        "@-webkit-keyframes {guid} { from { clip: rect(auto, auto, auto, auto); } to { clip: rect(auto, auto, auto, auto); } }",
        "@keyframes {guid} { from { clip: rect(auto, auto, auto, auto); } to { clip: rect(auto, auto, auto, auto); } }",
        "{selector} { animation-duration: 0.001s; animation-name: {guid}; -webkit-animation-duration: 0.001s; -webkit-animation-name: {guid}; }"
    ].join("\n").replace(/\{guid\}/g, guid).replace(/\{selector\}/g, selector)).appendTo("head");


    var eventHandler = function(event) {
        if (event.animationName === guid || event.WebkitAnimationName === guid) {
            callback.call(event.target, event.target);
        }
    };

    document.addEventListener("animationstart", eventHandler, false);
    document.addEventListener("webkitAnimationStart", eventHandler, false);
};



function loadOptions() {
    chrome.storage.sync.get(["workspaceId", "slackUrl"], function (o) {
        workspaceId=o.workspaceId;
        slackUrl=o.slackUrl;
    });
}


function handleSpan(item) {
    if (document.domain.toLowerCase() == slackUrl.toLowerCase()) {
        //var alink = '<a href="https://github.com/FinoConsulting/ProjectApricot/commit/19e43bdb7e5b" rel="noreferrer" target="_blank">19e43bdb7e5b</a>';
        var ht = $(item).html();
        if (ht.indexOf('class="rallyItem') >= 0) return true;
        hyperlinkifyInnerMost($(item)[0]);

        //$(".message_content").each(function (index) {
        //    var h = $(this).html();
        //    if (h.indexOf('class="rallyItem') >= 0) return true;
        //    hyperlinkifyInnerMost($(this)[0]);
        //});

        $(".rallyItem").ready(function () {
            $(".rallyItem").click(function () {
                //$(this).colorbox({ iframe: true, width: "80%", height: "80%",opacity:0,closeButton:true });
                var h = $(window).height() * 0.8;
                var w = $(window).width() * 0.8;
                $.modal('<iframe id="rallyItemIframe" src="' + $(this).attr("rallyItem") + '" scrolling="no" style="overflow:hidden; border:0; position:relative; height:' + h + 'px; width:' + w + 'px;">', {
                    closeHTML: "",
                    containerCss: {
                        backgroundColor: "#fff",
                        borderColor: "#fff",
                        height: h,
                        padding: 0,
                        width: w,
                    },
                    overlayClose: true,
                    escClose: true
                });
                $("#simplemodal-data").css("height", $("#rallyItemIframe").height());
                $("#simplemodal-data").css("overflow", "hidden");
            });
        });

    }
    else {
        //alert("Not Fino consulting slack");
    }
}


function timerTask() {
    if (document.domain.toLowerCase() == slackUrl.toLowerCase()) {
        //var alink = '<a href="https://github.com/FinoConsulting/ProjectApricot/commit/19e43bdb7e5b" rel="noreferrer" target="_blank">19e43bdb7e5b</a>';
        $(".message_content").each(function (index) {
            var h = $(this).html();
            if (h.indexOf('class="rallyItem') >= 0) return true;
            hyperlinkifyInnerMost($(this)[0]);
        });

        $(".rallyItem").ready(function () {
            $(".rallyItem").click(function () {
                //$(this).colorbox({ iframe: true, width: "80%", height: "80%",opacity:0,closeButton:true });
                var h = $(window).height() * 0.8;
                var w = $(window).width() * 0.8;
                $.modal('<iframe id="rallyItemIframe" src="' + $(this).attr("rallyItem") + '" scrolling="no" style="overflow:hidden; border:0; position:relative; height:' + h + 'px; width:' + w + 'px;">', {
                    closeHTML: "",
                    containerCss: {
                        backgroundColor: "#fff",
                        borderColor: "#fff",
                        height: h,
                        padding: 0,
                        width: w,
                    },
                    overlayClose: true,
                    escClose: true
                });
                $("#simplemodal-data").css("height", $("#rallyItemIframe").height());
                $("#simplemodal-data").css("overflow", "hidden");
            });
        });

    }
    else {
        //alert("Not Fino consulting slack");
    }
}

function addButton() {
    if (document.title.indexOf("Fino Consulting Slack") != -1 && $('#btnBeat').length == 0) {
        var btn = document.createElement("a");
        btn.setAttribute('id', 'btnBeat');
        btn.setAttribute('class', 'normal');
        var t = document.createTextNode("Rallify Page");
        
        btn.appendChild(t);
        
        //alert("Fino consulting slack");
        $("#header").append(btn);
        $("#btnBeat").css("color", "white");
        $("#btnBeat").css("margin-left", "20px");
        $("#btnBeat").click(function () {
            //var alink = '<a href="https://github.com/FinoConsulting/ProjectApricot/commit/19e43bdb7e5b" rel="noreferrer" target="_blank">19e43bdb7e5b</a>';
            $(".message_content").each(function (index) {
                var h = $(this).html();
                if (h.indexOf('class="rallyItem') >= 0) return true;
                hyperlinkifyInnerMost($(this)[0]);
            });

            $(".rallyItem").ready(function () {
                $(".rallyItem").click(function () {
                    //$(this).colorbox({ iframe: true, width: "80%", height: "80%",opacity:0,closeButton:true });
                    var h = $(window).height() * 0.8;
                    var w = $(window).width() * 0.8;
                    $.modal('<iframe id="rallyItemIframe" src="' + $(this).attr("rallyItem") + '" style=" border:0; position:relative; height:' + h + 'px; width:' + w + 'px;">', {
                        closeHTML: "",
                        containerCss: {
                            backgroundColor: "#fff",
                            borderColor: "#fff",
                            height: h,
                            padding: 0,
                            width: w,
                        },
                        overlayClose: true,
                        escClose:true
                    });
                    $("#simplemodal-data").css("height", $("#rallyItemIframe").height());
                    $("#simplemodal-data").css("overflow", "hidden");
                });
            });
        });
    } else {
        //alert("Not Fino consulting slack");
    }
}


function hyperlinkify(text) {
    //var userstoryPrefex = "https://rally1.rallydev.com/#/13073500360d/detail/userstory/";
    var userstoryPrefex = "https://rally1.rallydev.com/#/" + workspaceId +"/detail/userstory/";
    //var defectPrefex = "https://rally1.rallydev.com/#/13073500360d/detail/defect/";
    var defectPrefex = "https://rally1.rallydev.com/#/" + workspaceId + "/detail/defect/";
    var regex = /\b(us\d{3,10}|de\d{3,10})\b/ig;

    //alert(text);
    var result = text;
    

    result = result.replace(regex, function(match, capture) {
        if (/^de/i.test(match)) {
            return '<a class="rallyItem" style="color:#00f;font-weight:bold;" href="#" rallyItem="' + defectPrefex + match+'"  rel="noreferrer" target="_self">'+match+'</a>';
        } else {
            return '<a class="rallyItem" style="color:#00f;font-weight:bold;" href="#" rallyItem="' + userstoryPrefex + match+'"  rel="noreferrer" target="_self">'+match+'</a>';
        }
    });
    
    return result;
}


function hyperlinkifyInnerMost(node) {
    if (node.nodeType == 3) {
        // Filter out text nodes that contain only whitespace
        if (!/^\s*$/.test(node.data)) {
            var replace = hyperlinkify(node.data);
            wrapMatchesInNode(node, replace);
            return;
        }
    } else if (node.hasChildNodes()) {
        for (var i = 0, len = node.childNodes.length; i < len; ++i) {
            hyperlinkifyInnerMost(node.childNodes[i]);
        }
    }
}

function wrapMatchesInNode(textNode, replacementText) {

    var temp = document.createElement('div');

    temp.innerHTML = replacementText;

    // temp.innerHTML is now:
    // "\n    This order's reference number is <a href="/order/RF83297">RF83297</a>.\n"
    // |_______________________________________|__________________________________|___|
    //                     |                                      |                 |
    //                 TEXT NODE                             ELEMENT NODE       TEXT NODE

    // Extract produced nodes and insert them
    // before original textNode:
    while (temp.firstChild) {
        //console.log(temp.firstChild.nodeType);
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
    }
    // Logged: 3,1,3

    // Remove original text-node:
    textNode.parentNode.removeChild(textNode);

}