document.addEventListener('DOMContentLoaded',function()
{
	var link = document.getElementById('export');
	link.addEventListener('click',function()
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
			console.log("aici sunt");
			db=request.result;
			tx = db.transaction('sites','readwrite');
			store = tx.objectStore('sites');
			db.onerror = function(e){
				window.alert('Error'+e.target.errorCode);
			};
			var data = store.getAll();
			data.onsuccess = function(e){
				//var stockData = [];
				//var data = {};
				for(var i=0;i<data.result.length;i++)
				{	
					console.log(data.result[i].url)
					//data ={};
					//data = {
						//url : data.result[i].url,
						//htmlCode: data.result[i].htmlCode
					//};
					//stockData.push(data)
				}
				//console.log(stockData);
			}
				
			tx.oncomplete = function(){
				db.close(); 
			};
		};
	});
});


