//$( document ).ready(function() {


// var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
// var options = {
//     method: 'POST',
//     url: 'http://www.oszimt.de/stundenplan/KPlan1.php',
//     data: 'Klasse=OG+3&Version=1447930237&Turnus[]=jede+Woche&Fach[]=ma31'
// };

//this isnt even needed is it?
//$.ajaxPrefilter(function(options) {
//    if (options.crossDomain && jQuery.support.cors) {
//        options.url =  cors_api_url + options.url;
//    }
//});

// var x = new XMLHttpRequest();
// x.open(options.method, cors_api_url + options.url);
// x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// x.send(options.data);
// var y;
// x.onload = x.onerror = function() {
//     alert(
// 	(x.responseText || ''));
//     y = x.responseText;
//     };

//var parsed  = $.parseHTML(y.responseText); 
//var parsedResponse = $('<div />').append(parsed);
//console.log(parsedResponse);
//z = parsedResponse.find( "table.plan");
//console.log(z);
//console.log(x.responseText);

//console.log(x.responseText);
//console.log(this);
//data collection
var json = [];
//$(x.responseText).find( "table.plan td.plan_inhalt > table" ).map(function() {
// x.onload = x.onerror = function() {

jqhxr = $.ajax({
    type:     "POST",
    url:      'https://cors-anywhere.herokuapp.com/http://www.oszimt.de/stundenplan/KPlan1.php',
    data:     'Klasse=OG+3&Version=1447930237&Turnus[]=jede+Woche&Fach[]=ma31',
    dataType: "html",
    success: function(data) {
	$(data).find( "table.plan td.plan_inhalt > table" ).map(function() {
	    //    parsedResponse.find( "table.plan td.plan_inhalt > table" ).map(function() {
	    // console.log("wat");
	    var obj = {},
		$td = $(this).find('td');
	    $tr = $(this).find('tr');
	    // console.log($tr);
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
	})   
    }});
console.log(json);
    
