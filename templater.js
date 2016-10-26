$(document).ready(function(){
  var query = window.location.search.substring(1);
  if(!(query===''))
  {
    var fname = query.split('.')[0];
    goto(fname+'.json');
  }
});

function parse(key,value)
{
  if(key==='title')
  {
    document.getElementById('title').innerHTML = value;
  }
  else if (key==='header')
  {
    document.getElementById('header').innerHTML = value;
  }
  else if (key==='text')
  {
    document.getElementById('text').innerHTML = value;
  }
}

function goto(page){
  $.ajax(
    {
    'async': true,
    'dataType': 'json',
    'url': "https://jediguy13.github.io/"+page,
    'success': function (data)
    {
      JSON.parse(data,parse);
    },
    'error': function()
    {
      JSON.parse('{"title": "404",\
      "header": "404",\
      "text": "<p>So sorry. Either this page does not exist, or it has been changed.\
      <a href=\\"#\\" onclick=\\"goto(\'index.json\');\\">Back</a></p>"}',parse);
    }
  });
}
