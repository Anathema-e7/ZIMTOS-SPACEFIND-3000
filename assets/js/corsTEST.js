var bloecke = [];

jqhxr = $.ajax({
    type:     "POST",
    url:      'https://cors-anywhere.herokuapp.com/http://www.oszimt.de/stundenplan/KPlan1.php',
    // data:     'Klasse=OG+3&Version=1447930237&Turnus[]=jede+Woche&Fach[]=ma31',
data: "Turnus[]=jede+Woche&cbxAlleTurnusse=1&Fach[]=DE31&Fach[]=EN31&Fach[]=IT31&Fach[]=MA31&Fach[]=MI31&Fach[]=ch31&Fach[]=de31&Fach[]=en31&Fach[]=ge31&Fach[]=ku31&Fach[]=ma31&Fach[]=ph31&Fach[]=ph32&Fach[]=pw31&Fach[]=sn31&Fach[]=sp11&Fach[]=sp12&Fach[]=sp13&Fach[]=sp31&Fach[]=sp32&Fach[]=wa&Fach[]=ww31&cbxAlleFaecher=1&Klasse=OG+3&Version=1449069041",
// data: "cbxAlleTurnusse=1&cbxAlleFaecher=1&Klasse=OG+3&Version=1449069041",
    dataType: "html",
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
		obj["ID"]       = wochentag +""+ block;
		obj["Lehrer"]     = td.eq(2).text();
		// obj["_Block"]     = tr.parent().parent().parent().parent().index() - 1;
		// obj["_Wochentag"] = td.parent().parent().parent().parent().index() - 1;
	    }
	    else if (info.hasClass("kplan_inhalt_bg_vertretung")) {
		//this could need fixing
		obj["Fach"]      = td.eq(1).text();
		obj["Raum"]      = td.eq(2).text();
		obj["Lehrer"]    = td.eq(3).text();
		obj["Vertetung"] = true;
	    } else if (info.hasClass("kplan_inhalt_bg_ausfall")) {
		//LEHRER NISCHT GEFUNDEN....
		// naja trotzdem adden...
		obj["Fach"]      = td.eq(1).text();
		obj["Raum"]      = td.eq(2).text();
		obj["Lehrer"]    = td.eq(3).text();
		obj["Vertetung"] = true;
	    }
	    bloecke.push(obj);
	})   
    }});
console.log(bloecke);


    
