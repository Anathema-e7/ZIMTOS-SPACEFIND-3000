$( document ).ready(function() {

//data collection
var json = [];
$( "table.plan td.plan_inhalt > table" ).map(function(index) {
	    var obj = {},
			$td = $(this).find('td');
			$tr = $(this).find('tr');
			info = $td.parent().parent().parent();
	if (info.hasClass("kplan_inhalt_bg_normal")) {		
		obj["Fach"] = $td.eq(0).text();
		//TODO add wochenlogik
		obj["Raum"] = $td.eq(1).text();
		obj["Lehrer"] = $td.eq(2).text();
		obj["_Block"] = $tr.parent().parent().parent().parent().index() - 1;
		obj["_Wochentag"] = $td.parent().parent().parent().parent().index() - 1;
	} else if (info.hasClass("kplan_inhalt_bg_vertretung")) {
		obj["Fach"] = $td.eq(1).text();
	    obj["Raum"] = $td.eq(2).text();
		obj["Lehrer"] = $td.eq(3).text();
		obj["Vertetung"] = true;
	} else if (info.hasClass("kplan_inhalt_bg_ausfall")) {
	    //LEHRER NISCHT GEFUNDEN....
	    // naja trotzdem adden...
	    	obj["Fach"] = $td.eq(1).text();
		obj["Raum"] = $td.eq(2).text();
		obj["Lehrer"] = $td.eq(3).text();
		obj["Vertetung"] = true;
	}
    json.push(obj);
 });
    console.log(json);
	
});

/*
    x = $.post('http://whateverorigin.org/get?url=' + encodeURIComponent('http://www.oszimt.de/stundenplan/KPlan.php'), {Klaasse: "OG 3"})
        .done(function(data) {
	    console.log(data, data.type);
	    alert(data);
	})
	.fail(function() {
	    alert("error");
	});

    console.log(x);
   */ 

/*
x = $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://google.com') + '&callback=?', function(data){
	alert(data.contents);
});

    /*
var xhr = $.ajax({
    type:     "post",
    data:     {Klasse: "OG 3"},
    crossDomain: true,
    dataType: "html",
   // async: false,
  //  cache:    false,
    url:   'http://whateverorigin.org/get?url=' + encodeURIComponent('http://www.oszimt.de/stundenplan/KPlan.php')   ,
  //  dataType: "text",
    error: function (xhr, status, error) {
      //  var err = eval("(" + xhr.responseText + ")");
	//	alert(eval("(" + xhr.responseText + ")").Message);
//	alert(xhr);
	console.log(xhr);
	console.log(status);
	console.log(error);
    },
    success: function () {
        alert(" Done ! ");
    }
}).done(function(data){
            console.log("xhr",xhr);
            console.log("xhr.responseText",xhr.responseText);
            console.log("data",data);
})
    ;



});

*/

//now.... push to db?
