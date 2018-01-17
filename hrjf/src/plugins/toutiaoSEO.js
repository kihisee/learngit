(function(root) {
    root._tt_config = true;
    var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
    ta.src = document.location.protocol + '//' + 's3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
    ta.onerror = function () {
        var request = new XMLHttpRequest();
        var web_url = window.encodeURIComponent(window.location.href);
        var js_url  = ta.src;
        var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=72462130802';
        request.open('GET', url, true);
        request.send(null);
    }
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ta, s);
})(window);