(function ($) {
    $.extend({
        postJSON: function (url, jsonData, callbackSuccess, options) {
            var config = {
                url: url,
                type: "POST",
                data: jsonData ? JSON.stringify(jsonData) : null,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: callbackSuccess
            };
            
            // $.ajax($.extend(options, config)); // only works for jQuery 1.4+
            $.ajaxSetup(config); // only works for jQuery 1.5+
            $.ajax();
            
            // reset back so that future users aren't affected
            config = {
                    url: null,
                    type: "GET",
                    data: null,
                    dataType: null,
                    contentType: "application/x-www-form-urlencoded",
                    success: null
                };
            $.ajaxSetup(config);
        }
    });
})(jQuery);