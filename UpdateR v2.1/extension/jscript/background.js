var add_context = {
	"id": "addContext",
	"title": "Add This Part-UpdateR",
	"contexts":["selection"]
};
chrome.contextMenus.create(add_context);

var show_img = {
	"id": "showImg",
	"title": "See last version-UpdateR",
	"contexts":["page"]
}
chrome.contextMenus.create(show_img);

chrome.contextMenus.onClicked.addListener(function(clickData,tab){
	if(clickData.menuItemId == "addContext")
	{	
		insert_db(clickData.pageUrl,clickData.selectionText);
		export_db();
		chrome.windows.getCurrent(function(win){
			chrome.tabs.captureVisibleTab(win.id,function(dataUrl)
			{
				insert_imgDb(clickData.pageUrl,dataUrl);
				console.log(dataUrl)
			});
		});	
	}

	if(clickData.menuItemId == "showImg")
	{


		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		let request = window.indexedDB.open('UpdateR2-img',1),db,tx,store,index;
		request.onupgradeneeded = function(e){
			let db = request.result,store = db.createObjectStore('images', {keyPath: 'url'}) 
		};
		request.onerror = function(e){
			window.alert('Error'+e.target.errorCode);
		};
		let returnValue = null;
		request.onsuccess = function(e){
			db=request.result;
			tx = db.transaction('images','readwrite');
			store = tx.objectStore('images');
			db.onerror = function(e){
				window.alert('Error'+e.target.errorCode);
			};
			var data = store.get(clickData.pageUrl);
			
			data.onsuccess = function(e){
				if(data.result){
					var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1000,height=1000,top="+(screen.height-400)+",left="+(screen.width-840));
					win.document.body.innerHTML = '<img src="'+data.result.img+'"width:auto height:auto"/>';
				}	

			}
			tx.oncomplete = function(){
				db.close(); 
			};

		};	
		
	}
});

function export_db()
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
		var data = store.getAll();
		data.onsuccess = function(e){
			chrome.storage.sync.set({"value":data.result});
		}
			
		tx.oncomplete = function(){
			db.close(); 
		};
	};
}

function insert_db(url_site,data,image)
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
		store.put({url:url_site, htmlCode:data});
		tx.oncomplete = function(){
			db.close(); 
		};
	};
}


function insert_imgDb(url_site,image)
{
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	let request = window.indexedDB.open('UpdateR2-img',1),db,tx,store,index;
	request.onupgradeneeded = function(e){
		let db = request.result,store = db.createObjectStore('images', {keyPath: 'url'}) 
	};
	request.onerror = function(e){
		window.alert('Error'+e.target.errorCode);
	};
	request.onsuccess = function(e){
		db=request.result;
		tx = db.transaction('images','readwrite');
		store = tx.objectStore('images');
		db.onerror = function(e){
			window.alert('Error'+e.target.errorCode);
		};
		store.put({url:url_site, img:image});
		tx.oncomplete = function(){
			db.close(); 
		};
	};
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
    var notify = {
    	type: 'basic',
    	iconUrl: './images/icon2.png',
    	title: 'There is a modification',
    	message: 'To see the old content of this page, click right and click on the "See last version-UpdateR"'
    };

   chrome.notifications.create('sda',notify);
  });

