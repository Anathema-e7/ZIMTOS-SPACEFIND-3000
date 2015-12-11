
var store = localStorage;
$( document ).ready(function() {

function isStorageFilled() {
    // store.getItem("MA31")==null ? alert("empty") : alert ("full");
    return    store.getItem("MA31")!=null;
}

   
    $("#plan").click(function() {
	// checkStorage() ? $("#stundenplan").click() : $("#planwahl").click();
	isStorageFilled() ? window.open("stundenplan.html") : $("#planwahl").click();
    });

    $("#settingsbtn").click(function() {
	fillStorageWithCourses();
	window.open("stundenplan.html","_self");
    });

    $("#switchall").click(function() {
	$(":checkbox").click();
    });

function fillStorageWithCourses() {
    // alert("yes");
    $(":checkbox").each(function() {
	// alert($(this).attr("id"));
	var id = $(this).attr("id");
	var val = $(this).prop("checked");
	store.setItem(id, val);
	// alert( id + val);
    });
}

});
