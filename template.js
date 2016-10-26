var heading, pghead, pgtext;



$("body").hide();



heading = $("#heading").html();

pghead = $("#pghead").html();

pgtext = $("#pgtext").html();

$("#heading").html("");

$("#pghead").html("");

$("#pgtext").html("");



$.ajax({

  'async': true,

  'dataType': 'html',

  'url': "https://jediguy13.github.io/template.html",

  'success': function (data) {

      template = data.split("derp");

      $("html").html(template[0] + heading + template[1] + pghead + template[2] + pgtext + template[3]);

      $("body").fadeIn();

  }

});
