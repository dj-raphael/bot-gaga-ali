$.get(chrome.extension.getURL('/main.js'), 
    function(data) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", "injected_main");
        script.innerHTML = data;
        document.getElementsByTagName("head")[0].appendChild(script);
        document.getElementsByTagName("body")[0].setAttribute("onLoad", "injected_main();");
    }
);
