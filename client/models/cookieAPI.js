const cookieAPI = {};

cookieAPI.getCookie = function(key, cookies = document.cookie) {
	if(cookies == '') return '';
	var startIndex = cookies.indexOf(key)+key.length+1;
	var correctStart = cookies.substring(startIndex);
	var endIndex = correctStart.indexOf('&') == - 1 ? cookies.length : correctStart.indexOf('&');
	return cookies.substring(startIndex,endIndex);
}

export default cookieAPI;