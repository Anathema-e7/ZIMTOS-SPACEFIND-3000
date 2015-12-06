    var bloecke = [];
$( document ).ready(function() {
ids = [];
jqhxr = $.ajax({
    type:     "POST",
    url:      'https://cors-anywhere.herokuapp.com/http://www.oszimt.de/stundenplan/KPlan1.php',
    // data:     'Klasse=OG+3&Version=1447930237&Turnus[]=jede+Woche&Fach[]=ma31',
data: "Turnus[]=jede+Woche&cbxAlleTurnusse=1&Fach[]=DE31&Fach[]=EN31&Fach[]=IT31&Fach[]=MA31&Fach[]=MI31&Fach[]=ch31&Fach[]=de31&Fach[]=en31&Fach[]=ge31&Fach[]=ku31&Fach[]=ma31&Fach[]=ph31&Fach[]=ph32&Fach[]=pw31&Fach[]=sn31&Fach[]=sp11&Fach[]=sp12&Fach[]=sp13&Fach[]=sp31&Fach[]=sp32&Fach[]=wa&Fach[]=ww31&cbxAlleFaecher=1&Klasse=OG+3&Version=1449069041",
// data: "cbxAlleTurnusse=1&cbxAlleFaecher=1&Klasse=OG+3&Version=1449069041",
    dataType: "html",
    // async: false,
    success: function(data) {
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
		obj["id"]       = wochentag +""+ block +"r"+td.eq(1).text();
		ids.push(wochentag +""+ block);
		obj["Lehrer"]     = td.eq(2).text();
		// obj["_Block"]     = tr.parent().parent().parent().parent().index() - 1;
		obj["_Block"]     = $(this).closest("td.plan_inhalt").index();
		obj["_Wochentag"] = td.parent().parent().parent().parent().index() - 1;
	    }
	    else if (info.hasClass("kplan_inhalt_bg_vertretung")) {
		//this could need fixing
		obj["Fach"]      = td.eq(1).text();
		obj["Raum"]      = td.eq(2).text();
		obj["Lehrer"]    = td.eq(3).text();
		ids.push(wochentag +""+ block);
		obj["id"]       = wochentag +""+ block +"r"+td.eq(1).text();
		obj["Vertetung"] = true;
	    } else if (info.hasClass("kplan_inhalt_bg_ausfall")) {
		//LEHRER NISCHT GEFUNDEN....
		// naja trotzdem adden...
		obj["Fach"]      = td.eq(1).text();
		obj["Raum"]      = td.eq(2).text();
		ids.push(wochentag +""+ block);
		obj["id"]       = wochentag +""+ block +"r"+td.eq(1).text();
		obj["Lehrer"]    = td.eq(3).text();
		obj["Vertetung"] = true;
	    }
	    bloecke.push(obj);
	});
	
    console.log(JSON.stringify(bloecke[0]));
    console.log((bloecke[0]));
    var ul = $('<ul>').appendTo('body');
  $.each(bloecke[0], function( key, value ) {
	// alert( index + ": " + value );
        ul.append($(document.createElement('li')).text(value));
	
    });  

    }});
// console.log(bloecke.sort());
    console.log(bloecke);
// console.log(bloecke[10]);
    console.log(ids);
// var result = $.grep(bloecke, function(e){ return e.id == "11"; });
// console.log(result);
    console.log(JSON.stringify(bloecke[0]));
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
    $.each($(bloecke[0]), function( key, value ) {
	// alert( index + ": " + value );
        ul.append($(document.createElement('li')).text(value));
	
    });  
});

    console.log(bloecke[3]);
