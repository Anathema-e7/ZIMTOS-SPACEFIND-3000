$( document ).ready(function() {


    //nav to site
    //window.location.replace('http://www.oszimt.de/stundenplan/KPlan1.php?Klasse=OG+3');
    //are there checkboxes here?
    //if yes check all and click button, then collect data
    //if no collect data

    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://www.oszimt.de/stundenplan/KPlan1.php?Klasse=OG+3') + '&callback=?', function(data){
	alert(data.contents);
    });
    
    // check boxes
    $(':checkbox').prop('checked', true);

    //click button
    $( ":submit" ).click(function() {
	alert( "Handler for .click() called." );
    });

//data collection
var json = [];
$( "table.plan td.plan_inhalt > table" ).map(function(index) {
	    var obj = {},
			$td = $(this).find('td');
			//console.log($td);
			//$td = $(this).$("td");
			info = $td.parent().parent().parent();
	if (info.hasClass("kplan_inhalt_bg_normal")) {		
		obj["Fach"] = $td.eq(0).text();
		//TODO add woche
		obj["Raum"] = $td.eq(1).text();
		obj["Lehrer"] = $td.eq(2).text();
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
	
  //return index +": "+$(this).toArray().join(",");
  //return $(this).append("|").text();
  //console.log( index + ": " + $( this ).text() );
  //var y = $("td").each(function(index){
	//return index +": "+$(this).text(); 
  //});
  //return y; 

 });
 //});
//console.log(x.toString());
console.log(json);

//console.debug(x);

});



//now.... push to db?
