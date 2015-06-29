var x, y;
x = 0;
y = 0;
function render(){
  var out = '';
  for(a=0; a<y; a++){
    out+='<br>';
  }
  for(b=0; b<x; b++){
    out+='<b>&nbsp;&nbsp;&nbsp;&nbsp;</b>';
  }
  out+='[]';
  document.getElementById('Workspace').innerHTML = out;
  console.log(x);
  console.log(y);
}
function Right(num){
  if(x+num<15){
    x+=num;
    render();
  }
}
function Left(num){
  if(x-num>=0){
    x-=num;
    render();
  }
}
function up(num){
  if(y-num>=0){
    y-=num;
    render();
  }
}
function down(num){
  if(y+num<15){
    y+=num;
    render();
  }
}