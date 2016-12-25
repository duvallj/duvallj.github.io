EMPTY_NM = 0;
WHITE_NM = 1
BLACK_NM = 2;

EMPTY_CH = '.';
WHITE_CH = 'o';
BLACK_CH = '@';

EMPTY_CO = '#117711';
WHITE_CO = '#ffffff';
BLACK_CO = '#000000';
BORDER_CO = '#663300';

CH2NM = {};
CH2NM[EMPTY_CH] = EMPTY_NM;
CH2NM[WHITE_CH] = WHITE_NM;
CH2NM[BLACK_CH] = BLACK_NM;

NM2CO = [];
NM2CO[EMPTY_NM] = EMPTY_CO;
NM2CO[WHITE_NM] = WHITE_CO;
NM2CO[BLACK_NM] = BLACK_CO;

function drawBoard(ctx, cWidth, cHeight, bSize, bArray){
  var bdWidth = cWidth/(11*bSize+1); //from sq*s+bd*(s+1)=w, sq=10*bd
  var bdHeight = cHeight/(11*bSize+1);
  var sqWidth = 10*bdWidth;
  var sqHeight = 10*bdHeight;
  var uWidth = bdWidth + sqWidth;
  var uHeight = bdHeight + sqHeight;

  ctx.fillStyle = EMPTY_CO;
  ctx.fillRect(0, 0, cWidth, cHeight);

  ctx.fillStyle = BORDER_CO;
  for(var i=0; i<=bSize; i++){
    ctx.fillRect(uWidth*i, 0, bdWidth, cHeight);
    ctx.fillRect(0, uHeight*i, cWidth, bdHeight);
  }

  for(var y=0; y<bSize; y++){
    for(var x=0; x<bSize; x++){
      var check = bArray[bSize*y+x];
      if(check !== EMPTY_NM){
        ctx.fillStyle = NM2CO[check];
        ctx.fillRect(uWidth*x+bdWidth, uHeight*y+bdHeight, sqWidth, sqHeight);
      }
    }
  }
}

function bStringToBArray(bString){
  var bArray = [];
  for(var i=0; i<bString.length; i++){
      bArray[i] = CH2NM[bString.charAt(i)];
  }
  return bArray;
}

function resize(canvas){
  canvas.width = canvas.parentNode.offsetWidth*9/10;
  canvas.height = canvas.width;
}

function draw(canvas){
  resize(canvas);
  var ctx = canvas.getContext('2d');
  drawBoard(ctx,canvas.width,canvas.height,3,[0,1,2,1,2,0,2,0,1]);
}

function init(){
  var canvas = document.getElementById('canvas');
  window.addEventListener('resize', function(){ draw(canvas); })
}
init();
draw(document.getElementById('canvas'));
