function get_data()
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
		var data = store.getAll();
		
		data.onsuccess = function(e){
			if(data.result){
				chrome.storage.local.set({'db1':data.result});
			}	
		}
		tx.oncomplete = function(){
			db.close(); 
		};

	};
}

function get_data_img()
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
		var data = store.getAll();
		
		data.onsuccess = function(e){
			if(data.result){
				chrome.storage.local.get(['db1'],function(d){
					var table = '';
					var rows = d.db1.length;
					var cols = 3;
					table += '<table name="tab">';
					for(var j=0; j<rows;j++)
					{
						table +='<tr>';
						table +='<td><h3><input type="checkbox" name="name1" value="'+d.db1[j].url+'"/>'+d.db1[j].url+'</td>';
						table +='<td><h4>'+d.db1[j].htmlCode+'</td>';
						table +='<td><img src="'+data.result[j].img+'"width=500px height=500px /></td>';	
						table +='</tr>';
						//console.log(d.db1[j].url);
						//console.log(data.result[j].url);
					}
					table+='</table>';
					//console.log(table);
					document.getElementById("right").innerHTML = table;	
				});

			}	
		}
		tx.oncomplete = function(){
			db.close(); 
		};

	};
}

get_data_img();
get_data();

function delete_fromDb2(choices){
	//for(var i=0;i<choices.length;i++){
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
			var data = store.delete(choices);
			console.log(choices)
			data.onsuccess = function(e){
				console.log("succes")
			}
			tx.oncomplete = function(){
				db.close(); 
			};

		};
	//}
	
}

function delete_fromDb1(choices){
	//for(var i=0;i<choices.length;i++){
		//console.log(choices[i]);
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
			var data = store.delete(choices);
			
			data.onsuccess = function(e){
				console.log("succes")
			}
			tx.oncomplete = function(){
				db.close(); 
			};

		};
	//}
	
}



function convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

function downloadCSV(args,stockData) {  
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: stockData
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

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
	let returnValue = null;
	request.onsuccess = function(e){
		db=request.result;
		tx = db.transaction('sites','readwrite');
		store = tx.objectStore('sites');
		db.onerror = function(e){
			window.alert('Error'+e.target.errorCode);
		};
		var data = store.getAll();
		
		data.onsuccess = function(e){
			if(data.result){
				var stockData = [];
				var data1 = {};
				for(var i=0;i<data.result.length;i++)
				{
					data1 = {};
					data1 = {
						url : data.result[i].url,
						htmlCode : data.result[i].htmlCode
					};
					stockData.push(data1);
				}
					downloadCSV({ filename: "stock-data.csv" },stockData);
			}	
		}
		tx.oncomplete = function(){
			db.close(); 
		};

	};
}


document.addEventListener('DOMContentLoaded',function()
{
	var del = document.getElementById('button1');
	del.addEventListener('click',function(){
		var choices = [];
		var els = document.getElementsByName('name1');
		for (var i=0;i<els.length;i++){
  			if ( els[i].checked ) {
  				console.log(els[i].value);
    			//choices.push(els[i].value);
    			delete_fromDb1(els[i].value);
				delete_fromDb2(els[i].value);
 			}
		}
	});
	
	var exp = document.getElementById('button2');
	exp.addEventListener('click',function(){
		export_db();
	});
})
