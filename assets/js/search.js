$( document ).ready(function() {

    $("#go").click(function(){
	w = $("#dropdownMenu1").val(); //wochentag
	b = $("#dropdownMenu2").val(); //block
	l = $("#lname").val();         //lehrer
	s = w+b+l;                     //full storage string
	f = JSON.parse(localStorage.getItem(s));
	if (f!=null) {
	    $("#outputLehrer").text(l + " ist im Raum "+ f.raum);
	} else { 
	    $("#outputLehrer").text("Lehrer nicht gefunden");
	}
    });

    //set dropdown-menu text and value to selection
    $("#b li a").click(function(){
	$("#dropdownMenu2:first-child").text($(this).text());
	$("#dropdownMenu2:first-child").val($(this).attr("id")); //set value so that #go can access it
    });

    $("#w li a").click(function(){
	$("#dropdownMenu1:first-child").text($(this).text());
	$("#dropdownMenu1:first-child").val($(this).attr("id"));

    });
});
