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

function drawBoard(rCanvas, bSize, bArray){
  if(bSize === rCanvas.bSize) {
    for(var i=0; i<bSize*bSize; i++){
      rCanvas.board[i].fill = NM2CO[bArray[i]];
    }
  } else {
    var bdWidth = rCanvas.rWidth/(11*bSize+1); //from sq*s+bd*(s+1)=w, sq=10*bd
    var bdHeight = rCanvas.rHeight/(11*bSize+1);
    var sqWidth = 10*bdWidth;
    var sqHeight = 10*bdHeight;
    var uWidth = bdWidth + sqWidth;
    var uHeight = bdHeight + sqHeight;

    rCanvas.objects = [];

    for(var i=0; i<=bSize; i++){
      rCanvas.add(new RRect(uWidth*i, 0, bdWidth, rCanvas.rHeight,BORDER_CO));
      rCanvas.add(new RRect(0, uHeight*i,rCanvas.rWidth, bdHeight,BORDER_CO));
    }

    rCanvas.board = [];

    for(var y=0; y<bSize; y++){
      for(var x=0; x<bSize; x++){
        var index = bSize*y+x;
        var toAdd = new RRect(uWidth*x+bdWidth, uHeight*y+bdHeight, sqWidth, sqHeight, NM2CO[bArray[index]])
        rCanvas.add(toAdd);
        rCanvas.board[index] = toAdd;
      }
    }
  }
  // add code to show player scores as well
  rCanvas.draw();
}

function bStringToBArray(bString){
  var bArray = [];
  for(var i=0; i<bString.length; i++){
      bArray[i] = CH2NM[bString.charAt(i)];
  }
  return bArray;
}

function resize(canvas){
  var oWidth = canvas.width;
  canvas.width = canvas.parentNode.offsetWidth*9/10;
  canvas.height = canvas.height * canvas.width / oWidth;
}

function init(socket, delay){
  document.getElementById('canvasContainer').innerHTML =
    '<canvas id="canvas" width="400" height="400"></canvas>';
  var canvas = document.getElementById('canvas');
  resize(canvas);
  var rCanvas = new RCanvas(canvas, 890, 890);
  window.addEventListener('resize', function(){ resize(canvas); rCanvas.resize(); });
  drawBoard(rCanvas,5,[1,1,0,1,1,1,2,0,2,1,0,0,0,0,0,2,0,0,0,2,0,2,2,2,0]);
  rCanvas.resize();
  socket.on('reply', function(data){
    if(data.type === 'board'){
      drawBoard(rCanvas, data.bSize, bStringtoBArray(data.board));
    }
    elif(data.type === 'playerSwitch'){
      //switch player turn
    }
    elif(data.type === 'playerWin'){
      //display which player won
    }
  });
  window.setInterval(function(){socket.emit('refresh',{});}, delay);
}

function makeSocketFromPage(){
  var socket = "derp";//io('http://'+document.getElementById('addr').value+':'+document.getElementById('port').value);
  var delay = parseInt(document.getElementById('delay').value);
  init(socket, delay);
}
