function replacePage(){
  var heading = document.getElementById("heading").innerHTML;
  var pghead = document.getElementById("pghead").innerHTML;
  var pgtext = document.getElementById("pgtext").innerHTML;
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
    
  var sptemp = template.split("derp");
  document.write(sptemp[0] + heading + sptemp[1] + pghead + sptemp[2] + pgtext + sptemp[3]);
}
replacePage();
