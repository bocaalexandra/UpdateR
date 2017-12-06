document.addEventListener('DOMContentLoaded',function()
{
	var link = document.getElementById('manage');
	link.addEventListener('click',function()
	{
		var openUrl = "./pages/manage.html";
		chrome.tabs.create({url: openUrl});
	});
});