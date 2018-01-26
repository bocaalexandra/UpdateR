var checkPage ={
	"id": "findModification",
	"title": "Check for updates"
};
chrome.contextMenus.create(checkPage);

var add_context = {
	"id": "addContext",
	"title": "Add This Part-UpdateR",
	"contexts":["selection"]
};
chrome.contextMenus.create(add_context);

var add_site = {
	"id": "addSite",
	"title":"Add this site"
};
chrome.contextMenus.create(add_site);


chrome.contextMenus.onClicked.addListener(function(clickData,tab){
	if(clickData.menuItemId=="addSite")
	{
		var code = 'window.alert(document.documentElement.innerHTML);';
		chrome.tabs.executeScript(tab.id,{code:code});	
	}

	if(clickData.menuItemId == "addContext")
	{
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		let request = window.indexedDB.open('UpdateR2',1),db,tx,store,index;
		request.onupgradeneeded = function(e){
			let db = request.result,store = db.createObjectStore('sites', {keyPath: 'url'}) 
		};
		request.onerror = function(e){
			window.alert('Error'+e.target.errorCode);
		};
		request.onsuccess = function(e){
			db=request.result;
			tx = db.transaction('sites','readwrite');
			store = tx.objectStore('sites');
			db.onerror = function(e){
				window.alert('Error'+e.target.errorCode);
			};
			store.put({url:clickData.pageUrl, htmlCode:clickData.selectionText });
			tx.oncomplete = function(){
				db.close(); 
			};
		};
		
	}

	if(clickData.menuItemId == "findModification")
	{
		window.aler("findModification");
	}
});