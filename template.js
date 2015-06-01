var heading = document.getElementById("heading").innerHTML;
var pghead = document.getElementById("pghead").innerHTML;
var pgtext = document.getElementById("pgtext").innerHTML;
var template = function () {
  var tmp = null;
  $.ajax({
      'async': false,
      'dataType': 'html',
      'url': "/template.html",
      'success': function (data) {
          tmp = data;
      }
  });
  return tmp.split("derp");
}();
document.write(template[0] + heading + template[1] + pghead + template[2] + pgtext + template[3]);
document.getElementById("heading").innerHTML = "";
document.getElementById("pghead").innerHTML = "";
document.getElementById("pgtext").innerHTML = "";
