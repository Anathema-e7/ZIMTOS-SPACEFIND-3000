$( document ).ready(function() {
    // your code here


var x = $( "table.plan td.plan_inhalt td" ).map(function() {
  return $(this).text();
}).get();
console.log(x.toString());
console.log(x);
console.debug(x);

});
