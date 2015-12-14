$( document ).ready(function() {

    $(":checkbox").parent().each(function() {
	t = $(this).text();
	localStorage.getItem(t)=="true" ? $("#"+t).prop("checked", true) : $("#"+t).prop("checked",false);
    });

    $("#reset").click(function() {
	localStorage.clear();
	localStorage.setItem("filled","0");
    });

    $("#settingsbtn").click(function() {
	fillStorageWithCourses();
	window.location.href = "stundenplan.html";
    });

    $("#switchall").click(function() {
	$(":checkbox").click();
    });

    function fillStorageWithCourses() {
	$(":checkbox").each(function() {
	    var id = $(this).attr("id");
	    var val = $(this).prop("checked");
	    localStorage.setItem(id, val);
	    localStorage.setItem("filled","1");
	});
    }



});
