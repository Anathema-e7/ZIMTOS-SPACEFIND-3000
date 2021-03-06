$( document ).ready(function() {

    unixdate = "1449671354"
    og3data = "Turnus[]=a&Turnus[]=b&Turnus[]=jede+Woche&cbxAlleTurnusse=1&Fach[]=DE31&Fach[]=EN31&Fach[]=IT31&Fach[]=MA31&Fach[]=MI31&Fach[]=ch31&Fach[]=de31&Fach[]=en31&Fach[]=ge31&Fach[]=ku31&Fach[]=ma31&Fach[]=ph31&Fach[]=ph32&Fach[]=pw31&Fach[]=sn31&Fach[]=sp11&Fach[]=sp12&Fach[]=sp13&Fach[]=sp31&Fach[]=sp32&Fach[]=wa&Fach[]=ww31&cbxAlleFaecher=1&Klasse=OG+3&Version="
    arr=[];

    function asyncCall() { 
	$.ajax({
	    type:     "POST",
	    url:      'https://cors-anywhere.herokuapp.com/http://www.oszimt.de/stundenplan/KPlan1.php',
	    data: og3data+unixdate,
	    dataType: "html",
	    crossDomain: true,
	    async: false,
	    success: function(data) {
		result=data;
	    },
	    error: function() {
		alert("yay everything broke");
	    }
	})
	return result;
    };

    data = asyncCall();
    //this will remove any images from the HTML _before_ putting it in a DOM object, so that they won't be requested. less bandwidth.
    data = data.replace(/<img[^>]+>/gi, "");
    
    //fancy jQuery selectors
    $(data).find( "table.plan td.plan_inhalt > table" ).map(function() {
	var obj = {},
	    td = $(this).find('td'),
	    tr = $(this).find('tr'),
	    block = tr.parent().parent().parent().parent().index() - 1, //this could be better
	    wochentag = td.parent().parent().parent().parent().index() - 1,
	    info = td.parent().parent().parent();

	if (info.hasClass("kplan_inhalt_bg_normal")) {		
	    obj.fach      = td.eq(0).text().replace(/\s\((a|b)\)/,""); //removing wochenlogik
	    obj.raum   = td.eq(1).text();
	    obj.id     = wochentag +""+ block;
	    obj.lehrer = td.eq(2).text().substr(4);
	} else if (info.hasClass("kplan_inhalt_bg_vertretung")) {
	    obj.fach      = td.eq(1).text().replace(/\s\((a|b)\)/,"");
	    obj.raum      = td.eq(2).text();
	    obj.id        = wochentag +""+ block;
	    obj.lehrer    = info.find(".kplan_lehrer").text().substr(4);
	    obj.vertretung = true;
	} else if (info.hasClass("kplan_inhalt_bg_ausfall")) {
	    obj.fach      = td.eq(2).text().replace(/\w \((a|b)\)/,"$1");
	    obj.raum    = td.eq(3).text();
	    obj.id      = wochentag +""+ block;
	    obj.lehrer  = td.eq(4).text().substr(4);
	    obj.ausfall = true;
	}

	arr.push(obj);
	//writing storage
	localStorage.setItem(obj.id+obj.lehrer,JSON.stringify(obj));
    });
    
    function findBlock(idv) {
	//linux intensifies
	var result = $.grep(arr, function(e){ return (e.id == idv); });
	if (result.length == 0) {
	    return [null];
	} else if (result.length == 1) {
	    return result;
	} else {
	    return result;
	}
    };
    function fillBlock(idv) {
	t = findBlock(idv);
	if (t[0] !=null) {
	    for(var i=0; i<t.length; i++) {
		tc=t[i];
		//leaving this for historical reasons
		// if (typeof tc === "undefined") {
		// } else { 
		if(localStorage.getItem(tc.fach)=="true") {
		    $("#b"+idv).show();

		    //colorize block
		    if(tc.ausfall==true) {
			$("#b"+idv + " > div").attr("class","panel panel-warning");
		    } else if(tc.vertretung==true) {
			$("#b"+idv + " > div").attr("class","panel panel-info");
		    }

		    //set block text
		    document.getElementById('k'+idv).innerHTML = tc.fach;
		    document.getElementById('r'+idv).innerHTML = tc.raum;
		    document.getElementById('l'+idv).innerHTML = tc.lehrer;
		} else {
		    $("#b"+idv).hide();
		}
	    }
	} else {
	    $("#b"+idv).hide();
	}
    }

    function fillPlan() {
	for (i=1; i<=5; i++) {
	    for (j=1; j<=5; j++) {
		fillBlock(i+""+j);
	    }
	}
    }
    

    fillPlan();
});

