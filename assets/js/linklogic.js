$( document ).ready(function() {

    //go to stundenplan only when storage is populated
    //could add a message to the user here...
    $("#plan").click(function() {
	isStorageFilled() ? window.location.href = "stundenplan.html" : window.location.href = "planwahl.html";
    });
    function isStorageFilled() {
	return localStorage.getItem("filled")=="1";
    }
});
