
$( document ).ready(function() {
// $(".dropdown-menu li a").click(function(){
$("#go").click(function(){

    // alert($("#dropdownMenu2").text().substr(0,1));
    w = $("#dropdownMenu2").val();
    b = $("#dropdownMenu1").val();
    l = $("#lname").val();
    s = w+b+l;
    f = JSON.parse(localStorage.getItem(s));
    if (f!=null) {
    $("#outputLehrer").text(f.raum);
    } else { 
	$("#outputLehrer").text("Lehrer nicht gefunden");
    }
});

$("#b li a").click(function(){
      $("#dropdownMenu2:first-child").text($(this).text());
      $("#dropdownMenu2:first-child").val($(this).attr("id"));

   });

$("#w li a").click(function(){
      $("#dropdownMenu1:first-child").text($(this).text());
      $("#dropdownMenu1:first-child").val($(this).attr("id"));

});
});
