var heading = document.getElementById("heading").innerHTML;
var pghead = document.getElementById("pghead").innerHTML;
var pgtext = document.getElementById("pgtext").innerHTML;
console.log(heading);
console.log(pghead);
console.log(pgtext);
var template = function () {
  var tmp = null;
  $.ajax({
      'async': false,
      'type': "POST",
      'global': false,
      'dataType': 'html',
      'url': "/template.html",
      'data': { 'request': "", 'target': 'arrange_url', 'method': 'method_target' },
      'success': function (data) {
          tmp = data;
      }
  });
  return tmp;
}();
console.log(template);
 
var sptemp = template.split("derp");
