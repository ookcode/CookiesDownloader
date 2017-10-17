chrome.browserAction.onClicked.addListener(function(tab) 
{
	var url = tab.url.match(new RegExp("[a-z]+://[A-Za-z0-9_.]+")).toString()
	cookiestr = ""
	chrome.cookies.getAll({url: url}, function(cookie) {
		cookie.forEach(function(c){ 
			cookiestr += (c.name + '=' + c.value + ';'); 
		});
		chrome.tabs.executeScript(tab.id, {file: 'content_script.js'}, function(){
			chrome.tabs.sendMessage(tab.id, {cookies: cookiestr, url:url}, function(){});
		});
	});
});