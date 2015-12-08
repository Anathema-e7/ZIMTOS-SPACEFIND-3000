var bloecke = [];
store = localStorage;
$( document ).ready(function() {

    unixdate = "1449069041"
    og3data = "Turnus[]=a&Turnus[]=b&Turnus[]=jede+Woche&cbxAlleTurnusse=1&Fach[]=DE31&Fach[]=EN31&Fach[]=IT31&Fach[]=MA31&Fach[]=MI31&Fach[]=ch31&Fach[]=de31&Fach[]=en31&Fach[]=ge31&Fach[]=ku31&Fach[]=ma31&Fach[]=ph31&Fach[]=ph32&Fach[]=pw31&Fach[]=sn31&Fach[]=sp11&Fach[]=sp12&Fach[]=sp13&Fach[]=sp31&Fach[]=sp32&Fach[]=wa&Fach[]=ww31&cbxAlleFaecher=1&Klasse=OG+3&Version="

    
    // ids = [];
    arr=[];
    function asyncCall() { 
	$.ajax({
	    type:     "POST",
	    url:      'https://cors-anywhere.herokuapp.com/http://www.oszimt.de/stundenplan/KPlan1.php',
	    data: og3data+unixdate,
	    dataType: "html",
	    async: false,
	    success: function(data) {
		result=data;
	    }
	})
	return result
    };

    //this will remove any images from the HTML _before_ putting it in a DOM object, so that they won't be requested. less bandwidth.
    data = asyncCall();
    data = data.replace(/<img[^>]+>/gi, "");
	
    $(data).find( "table.plan td.plan_inhalt > table" ).map(function() {
	var obj = {},
	    td = $(this).find('td'),
	    tr = $(this).find('tr'),
	    block = tr.parent().parent().parent().parent().index() - 1;
	wochentag = td.parent().parent().parent().parent().index() - 1;
	info = td.parent().parent().parent();
	if (info.hasClass("kplan_inhalt_bg_normal")) {		
	    obj["Fach"] = td.eq(0).text();
	    //TODO add wochenlogik // yea maybe not. fu webuntis
	    obj["Raum"]       = td.eq(1).text();
	    obj["id"]       = wochentag +""+ block;
	    // ids.push(wochentag +""+ block);
	    obj["Lehrer"]     = td.eq(2).text().substr(4);
	    obj["_Block"]     = tr.parent().parent().parent().parent().index() - 1;
	    // obj["_Block"]     = $(this).closest("td.plan_inhalt").index();
	    obj["_Wochentag"] = td.parent().parent().parent().parent().index() - 1;
	}
	// else if (info.hasClass("kplan_inhalt_bg_vertretung")) {
	  //  this could need fixing
	    // obj["Fach"]      = td.eq(1).text();
	    // obj["Raum"]      = td.eq(2).text();
	    // obj["Lehrer"]    = td.eq(3).text().substr(4);
	   // ids.push(wochentag +""+ block);
	    // obj["id"]       = wochentag +""+ block;
	    // obj["Vertetung"] = true;
	// } else if (info.hasClass("kplan_inhalt_bg_ausfall")) {
	    //LEHRER NISCHT GEFUNDEN....
	   // naja trotzdem adden...
	    // obj["Fach"]      = td.eq(1).text();
	    // obj["Raum"]      = td.eq(2).text();
	  //  ids.push(wochentag +""+ block);
	    // obj["id"]       = wochentag +""+ block;
	    // obj["Lehrer"]    = td.eq(3).text().substr(4);
	    // obj["Ausfall"] = true;
	//}
	arr.push(obj);
	//CHANGE
	//var curr = store.getItem(obj.id+"OG3")
	//if (curr != null) {
	store.setItem(obj.id+"OG3",JSON.stringify(obj));
	//}
	//o1[0] = obj;
	//o1[1] = obj;
	//store.setItem(obj.id+"OG3",JSON.stringify(o1));
    });
	
    function findBlock(idv) {
		var result = $.grep(arr, function(e){ return (e.id == idv); });
		if (result.length == 0) {
			// not found
			alert("no info!" + lehrer + e.Lehrer);
		} else if (result.length == 1) {
			console.log("one");
			return result;
			// $.each(result[0], function( key, value ) {
			// ul.append($(document.createElement('li')).text(value));
			// });  
		} else {
			console.log("multi");
			return result;
			// multiple items found
		}
    };
	
    function findLehrerBlock(idv, lehrer) {
	var result = $.grep(arr, function(e){ return (e.id == idv) && (e.Lehrer == lehrer); });
	if (result.length == 0) {
	    // not found
	    alert("no info!" + lehrer + e.Lehrer);
	} else if (result.length == 1) {
	    console.log("one");
	    return result[0];
	    // $.each(result[0], function( key, value ) {
	    // ul.append($(document.createElement('li')).text(value));
	    // });  
	} else {
	    console.log("multi");
	    return result;
	    // multiple items found
	}
    };

    function findLehrer(lehrer) {
	var result = $.grep(arr, function(e){ return (e.Lehrer == lehrer); });
	if (result.length == 0) {
	    // not found
	    alert("no info!" + lehrer + e.Lehrer);
	} else if (result.length == 1) {
	    console.log("one");
	    return result[0];
	    // $.each(result[0], function( key, value ) {
	    // ul.append($(document.createElement('li')).text(value));
	    // });  
	} else {
	    console.log("multi");
	    return result;
	    // multiple items found
	}
    };
    
    // console.log(JSON.stringify(bloecke[0]));
    // bloecke = getData(og3data);
    console.log(arr);
	//mon1 = JSON.parse(store.getItem('11OG3'));
	mon1 = findBlock(11)[0];
	document.getElementById('k11').innerHTML = mon1.Fach;
	document.getElementById('r11').innerHTML = mon1.Raum;
	document.getElementById('l11').innerHTML = mon1.Lehrer;
	mon2 = findBlock(12)[0];
	document.getElementById('k12').innerHTML = mon2.Fach;
	document.getElementById('r12').innerHTML = mon2.Raum;
	document.getElementById('l12').innerHTML = mon2.Lehrer;
	mon3 = findBlock(13)[0];
	document.getElementById('k13').innerHTML = mon3.Fach;
	document.getElementById('r13').innerHTML = mon3.Raum;
	document.getElementById('l13').innerHTML = mon3.Lehrer;
	mon4 = findBlock(14)[0];
	document.getElementById('k14').innerHTML = mon4.Fach;
	document.getElementById('r14').innerHTML = mon4.Raum;
	document.getElementById('l14').innerHTML = mon4.Lehrer;
	mon5 = findBlock(15)[0];
	document.getElementById('k15').innerHTML = mon5.Fach;
	document.getElementById('r15').innerHTML = mon5.Raum;
	document.getElementById('l15').innerHTML = mon5.Lehrer;
	
    console.log("AH");
    console.log(findLehrerBlock("11","Sowa"));
    console.log(findLehrer("Sowa"));
    console.log(store.getItem("42Buntebart"));
   
});
// console.log(bloecke.sort());
// console.log(bloecke);
// console.log(bloecke[10]);
// console.log(ids);
// var result = $.grep(bloecke, function(e){ return e.id == "11"; });
// console.log(result);
// console.log(JSON.stringify(bloecke[0]));
// var lookup = {};
// for (var i = 0, len = bloecke.length; i < len; i++) {
// lookup[bloecke[i].id] = bloecke[i];
// }


// function sortByKey(array, key) {
//     return array.sort(function(a, b) {
//         var x = a[key]; var y = b[key];
//         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//     });
// }
// b = sortByKey(bloecke,"id");
// console.log(b);
// // console.log(lookup[11]);
// // console.log(lookup);

//     var ul = $('<ul>').appendTo('body');
//     var json = { items: ['item 1', 'item 2', 'item 3'] };
// // var json = bloecke;
//     $(json.items).each(function(index, item) {
//         ul.append($(document.createElement('li')).text(item));
//     });
// $.each($(bloecke[0]), function( key, value ) {
// alert( index + ": " + value );
// ul.append($(document.createElement('li')).text(value));


// console.log(bloecke[3]);
