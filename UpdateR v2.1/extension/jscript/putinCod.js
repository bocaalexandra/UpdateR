function import_db(){
	chrome.storage.sync.get(['value'],function(d){
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
			for(var i=0;i<=d.value.length-1;i++)
				store.put({url:d.value[i].url, htmlCode:d.value[i].htmlCode });
			tx.oncomplete = function(){
				db.close(); 
			};
		};
	});
}

function get_data(urlp)
{
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	let request = window.indexedDB.open('UpdateR2',1),db,tx,store,index;
	request.onupgradeneeded = function(e){
		let db = request.result,store = db.createObjectStore('sites', {keyPath: 'url'}) 
	};
	request.onerror = function(e){
		window.alert('Error'+e.target.errorCode);
	};
	let returnValue = null;
	request.onsuccess = function(e){
		db=request.result;
		tx = db.transaction('sites','readwrite');
		store = tx.objectStore('sites');
		db.onerror = function(e){
			window.alert('Error'+e.target.errorCode);
		};
		var data = store.get(urlp);
		
		data.onsuccess = function(e){
			if(data.result){
				var htmlPage = document.documentElement.innerText;
				console.log(htmlPage);
				console.log(htmlPage.includes(data.result.htmlCode));
				if(htmlPage.includes(data.result.htmlCode) === false){
					chrome.extension.sendRequest({msg: "MERGE BOSSS"}, function(response) {
    					console.log(response.returnMsg);
					});
				}
			}	
		}
		tx.oncomplete = function(){
			db.close(); 
		};

	};
}

import_db();
get_data(document.URL);