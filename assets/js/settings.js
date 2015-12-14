$( document ).ready(function() {

    //load settings
    $(":checkbox").parent().each(function() {
	t = $(this).text();
	localStorage.getItem(t)=="true" ? $("#"+t).prop("checked", true) : $("#"+t).prop("checked",false);
    });

    //reset settings
    $("#reset").click(function() {
	localStorage.clear();
	localStorage.setItem("filled","0");
	$(":checkbox").prop("checked",false);
    });

    //save settings and go to stundenplan
    $("#settingsbtn").click(function() {
	fillStorageWithCourses();
	window.location.href = "stundenplan.html";
    });

    //switch selection
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
