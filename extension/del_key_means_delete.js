// Copyright 2016 Google Inc. All Rights Reserved.

/**
 * @fileoverview Content script to associate DEL key with delete button.
 * @author tandrii@chromium.org Andrii Shyshkalov
 */
(function() {
    var msgPrefix = "Google Photos Delete Photo ShortCut: ";
    console.log(msgPrefix + "start");
    var button = null;
    var a = document.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
        // This is horrible and will likely only work for English.
        if (a[i].getAttribute("data-tooltip") == "Delete" &&
            a[i].getAttribute("role") == "button"){
            if (button == null){
                button = a[i];
            } else {
                console.log(msgPrefix + "ERROR: too many delete buttons found");
                return;
            }
        }
    }
    if (button == null){
        console.log(msgPrefix + "ERROR: didn't find delete button");
        return null;
    }
    function doc_delete_key_up(e){
        if (e.keyCode == 46){
            console.log(msgPrefix + "simulating mouse click");

            var clickEvent = document.createEvent("MouseEvents")
	    clickEvent.initEvent("mousedown", true, true)
	    button.dispatchEvent(clickEvent);

	    clickEvent = document.createEvent("MouseEvents")
	    clickEvent.initEvent("click", true, true)
	    button.dispatchEvent(clickEvent);

	    clickEvent = document.createEvent("MouseEvents")
	    clickEvent.initEvent("mouseup", true, true)
	    button.dispatchEvent(clickEvent);
        }
    }
    document.addEventListener('keyup', doc_delete_key_up, false);
})();
