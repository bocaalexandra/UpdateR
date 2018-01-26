document.addEventListener('DOMContentLoaded',function()
{
	var addSite = document.getElementById('add');
	addSite.addEventListener('click',function()
	{
		chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.executeScript(tab.id,{
				code :"function addThisSite(){window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;let request = window.indexedDB.open('UpdateR2',1),db,tx,store,index;request.onupgradeneeded = function(e){let db = request.result,store = db.createObjectStore('sites', {keyPath: 'url'}) };request.onerror = function(e){window.alert('Error'+e.target.errorCode);};request.onsuccess = function(e){db=request.result;tx = db.transaction('sites','readwrite');store = tx.objectStore('sites');db.onerror = function(e){window.alert('Error'+e.target.errorCode);};store.put({url:document.URL, htmlCode:document.documentElement.innerHTML });tx.oncomplete = function(){db.close(); }; };};addThisSite();"
			});
		});
	});
})