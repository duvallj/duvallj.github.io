$(document).ready(function(){
  var query = window.location.search.substring(1);
  if(query===''){query='index.json';}
  var fname = query.split('.')[0];
  goto(fname+'.json');
});

function parse(data)
{
    document.getElementById('title').innerHTML = data.title;
    document.getElementById('header').innerHTML = data.header;
    document.getElementById('text').innerHTML = data.text;
}

function goto(page){
  console.log("https://jediguy13.github.io/"+page);
  $.ajax(
    {
    'async': true,
    'dataType': 'json',
    'url': "https://jediguy13.github.io/"+page,
    'success': function (data)
    {
      console.log(data);
      parse(data);
    },
    'error': function()
    {
      var v = {};
      v.title = '404';
      v.header = '404';
      v.text = "<p>So sorry. Either this page does not exist, or it has been changed.\<a href=\"#\" onclick=\"goto(\'index.json\');\">Back</a></p>";
      parse(v);
    }
  });
}
