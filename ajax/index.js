function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    var xhr = XMLHttpRequest ?  new XMLHttpRequest() 
            : new ActiveXObject('Microsoft.XMLHTTP');

    var params = [];
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }

    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xhr.open(opt.method, opt.url, opt.async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(postData);
    }else if (opt.method.toUpperCase() === 'GET') {
        xhr.open(opt.method, opt.url + '?' + postData, opt.async);
        xhr.send(null);
    } 

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            opt.success(xhr.responseText);
        }
    };
}

function fetch(method, url, data) {
    var xhr = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200){
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.open(method, url);
        xhr.send(data);
    })
}