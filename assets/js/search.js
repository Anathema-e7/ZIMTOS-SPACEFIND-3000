
$( document ).ready(function() {
// $(".dropdown-menu li a").click(function(){
$("#go").click(function(){

    alert($("#dropdownMenu2").text());
});

$("#b li a").click(function(){

      $("#dropdownMenu2:first-child").text($(this).text());
      // $(".btn:first-child").val($(this).text());
      // $(".btn:first-child").text($(this).text());
      // $(".btn:first-child").val($(this).text());

   });

});
