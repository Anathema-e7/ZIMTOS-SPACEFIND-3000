var json = [];

jqhxr = $.ajax({
    type:     "POST",
    url:      'https://cors-anywhere.herokuapp.com/http://www.oszimt.de/stundenplan/KPlan1.php',
    data:     'Klasse=OG+3&Version=1447930237&Turnus[]=jede+Woche&Fach[]=ma31',
    dataType: "html",
    success: function(data) {
	$(data).find( "table.plan td.plan_inhalt > table" ).map(function() {
	    var obj = {},
		td = $(this).find('td'),
		tr = $(this).find('tr'),
		info = td.parent().parent().parent();
	    if (info.hasClass("kplan_inhalt_bg_normal")) {		
		obj["Fach"] = td.eq(0).text();
		//TODO add wochenlogik // yea maybe not. fu webuntis
		obj["Raum"]       = td.eq(1).text();
		obj["Lehrer"]     = td.eq(2).text();
		obj["_Block"]     = tr.parent().parent().parent().parent().index() - 1;
		obj["_Wochentag"] = td.parent().parent().parent().parent().index() - 1;
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
	    json.push(obj);
	})   
    }});
console.log(json);
    
