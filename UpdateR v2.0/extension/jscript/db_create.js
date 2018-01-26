function main()
{
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	let request = window.indexedDB.open("UpdateR2",1),
		db,
		tx,
		store,
		index;

	request.onupgradeneeded = function(e){
		let db = request.result,
			store = db.createObjectStore("sites", {keyPath: "url"})
	};

	request.onerror = function(e){
		window.alert("Error"+e.target.errorCode);
	};

	request.onsuccess = function(e){
		db=request.result;
		tx = db.transaction("sites","readwrite");
		store = tx.objectStore("sites");


		db.onerror = function(e){
			window.alert("Error"+e.target.errorCode);
		};

		chrome.tabs.getCurrent(function(tab){
			let url_s = store.get(tab.url);

			q1.onsuccess = function(){
				window.alert(url_s.result);
			};
		});

		tx.oncomplete = function(){
			db.close();
		};
	};


};

main()


function addThisSite()
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
		store.put({url:document.URL, htmlCode:document.documentElement.innerHTML });
		tx.oncomplete = function(){
			db.close(); 
		};
	};
};
addThisSite();