chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.query == "checkIfExists")
            sendResponse({ message: true });
    });

$("#header").ready(function () {
    $("#btnBeat").remove();
    addButton();
});





function timerTask() {
    if (document.title.indexOf("Fino Consulting Slack") != -1) {
        
        //var alink = '<a href="https://github.com/FinoConsulting/ProjectApricot/commit/19e43bdb7e5b" rel="noreferrer" target="_blank">19e43bdb7e5b</a>';
        $(".message_content").each(function (index) {
            var h = $(this).html();
            if (h.indexOf('class="rallyItem') >= 0) return true;
            var replaced = hyperlinkify(h);
            if (replaced != null) {
                $(this).html(replaced);
            }

        });

        $(".rallyItem").ready(function () {
            $(".rallyItem").click(function () {
                $(this).colorbox({ iframe: true, width: "80%", height: "80%", opacity: 0, closeButton: true });
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
                var replaced = hyperlinkify(h);
                if (replaced != null) {
                    $(this).html(replaced);
                }
                
            });

            $(".rallyItem").ready(function () {
                $(".rallyItem").click(function () {
                    $(this).colorbox({ iframe: true, width: "80%", height: "80%",opacity:0,closeButton:true });
                });
            });
        });
    } else {
        //alert("Not Fino consulting slack");
    }
}



function hyperlinkify(text) {
    var userstoryPrefex = "https://rally1.rallydev.com/#/13073500360d/detail/userstory/";
    var defectPrefex = "https://rally1.rallydev.com/#/13073500360d/detail/defect/";
    var regex = /\b(us\d{3,10}|de\d{3,10})\b/ig;
    //alert(text);
    var result = text;
    var item;
    while ((item = regex.exec(text)) != null) {
        console.log(item[0]);
        if (/^de/i.test(item[0])) {
            result = result.replace(item[0], '<a class="rallyItem" href="' + defectPrefex + item[0] + '"  rel="noreferrer" target="_blank">' + item[0] + '</a>');
        }
        else {
            result = result.replace(item[0], '<a class="rallyItem" href="' + userstoryPrefex + item[0] + '" rel="noreferrer" target="_blank">' + item[0] + '</a>');
            //result = result.replace(item[0], '<a href="#" class="rallyItem" rel="noreferrer" target="_blank">' + item[0] + '</a>');
        }


    }
    return result;
}