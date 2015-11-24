// It is good specify the charset you expect.
// You can use the charset you want instead of utf-8.
// See details for scriptCharset and contentType options: 
// http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
$.ajaxSetup({
    scriptCharset: "utf-8", //or "ISO-8859-1"
    contentType: "application/json; charset=utf-8"
});

$.getJSON('http://whateverorigin.org/get?url=' + 
    encodeURIComponent('http://google.com') + '&callback=?',
    function (data) {
        console.log("> ", data);

        //If the expected response is text/plain
        $("#viewer").html(data.contents);

        //If the expected response is JSON
        //var response = $.parseJSON(data.contents);
});
