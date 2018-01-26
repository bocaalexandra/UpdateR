document.addEventListener('DOMContentLoaded',function()
{
	var link = document.getElementById('manage');
	link.addEventListener('click',function()
	{
		var openUrl = "./pages/manage.html";
		chrome.tabs.create({url: openUrl});
	});

	var select = document.getElementById('select');
	select.addEventListener('click',function()
	{
		 alert('Now you can select an element !');
         chrome.tabs.getSelected(null, function(tab){
    	 chrome.tabs.executeScript(tab.id, {code: "function clickHandler(e){var elem, evt = e ? e:event;if (evt.srcElement)  elem = evt.srcElement;else if (evt.target) elem = evt.target;alert ('' + 'You clicked the following HTML element:  <'+elem.tagName.toUpperCase() + ' ' + elem.innerHTML +'>')} document.onclick = clickHandler;"}, function(response) {
        
            });
         });
    });
       
});