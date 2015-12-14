$( document ).ready(function() {
    $("#plan").click(function() {
	isStorageFilled() ? window.location.href = "stundenplan.html" : window.location.href = "planwahl.html";
    });
    function isStorageFilled() {
	return localStorage.getItem("filled")=="1";
    }
});
