var template = "";

function replacePage(){
  var heading = $("#heading").innerHTML;
  var pghead = $("#pghead").innerHTML;
  var pgtext = $("#pgtext").innerHTML;
  $.get("/template.html", function(data){template=data;});
  var sptemp = template.split("{{}}");
  document.write(sptemp[0] + heading + sptemp[1] + pghead + sptemp[2] + pgtext + sptemp[3]);
}
replacePage();
