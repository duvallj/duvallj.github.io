function toBinary(n){
  return parseInt(n, 10).toString(2);
}

function toBinaryFixed(number, base){
  var binary = toBinary(number);
  var zeros = '';
  for(x=(base-binary.length); x>0; x--){
    zeros += '0';
  }
  return zeros.concat(binary);
}

function fromBinary(number){
  return parseInt(number, 2);
}

function toHex(n){
  return parseInt(n, 10).toString(16);
}

function fromHex(number){
  return parseInt(number, 16);
}

function toTrec(n){
  return parseInt(n, 10).toString(36);
}

function fromTrec(number){
  return parseInt(number, 36);
}

/** These functions are deprecated
 * function toBinaryOld(number, base){
  var output, temp;
  output = '';
  temp = number;
  for(x=base; x>=0; x--){
    var power = Math.pow(2, x);
    if(temp-power>=0){
      output+='1';
      temp-=power;
    }else{
      output+='0';
    }
  }
  return output
}

function fromBinaryOld(biString, base){
  var output = 0;
  var bitlist = [];
  for(x=0; x<biString.length; x++){
    bitlist[bitlist.length] = biString[x];
  }
  bitlist.reverse()
  for(x=base-1; x>=0; x--){
    output += Math.pow(2, x)*parseInt(bitlist[x]);
  }
  return output;
}
function toHexOld(decNum){
  var temp, n, hexNum;
  hexNum='';
  temp = decNum;
  n=0;
  while(decNum>=Math.pow(16, n)){
    n++;
  }
  n--;
  for(x=n; x>=0; x--){
    var counter = 0;
    while(temp-Math.pow(16, x)>=0){
      temp -= Math.pow(16, x);
      counter++;
    }
    switch(counter){
      case 10:
        hexNum+='a';
        break;
      case 11:
        hexNum+='b';
        break;
      case 12:
        hexNum+='c';
        break;
      case 13:
        hexNum+='d';
        break;
      case 14:
        hexNum+='e';
        break;
      case 15:
        hexNum+='f';
        break;
      default:
        hexNum+=counter;
    }
  }
  return hexNum;
}

function fromHexOld(hexNum){
  var n, decNum;
  decNum = 0;
  n = 0;
  for(x=hexNum.length-1; x>=0; x--){
    var multiplier;
    switch(hexNum.charAt(n)){
      case 'a':
        multiplier = 10;
        break;
      case 'b':
        multiplier = 11;
        break;
      case 'c':
        multiplier = 12;
        break;
      case 'd':
        multiplier = 13;
        break;
      case 'e':
        multiplier = 14;
        break;
      case 'f':
        multiplier = 15;
        break;
      default:
        multiplier = parseInt(hexNum.charAt(n));
    }
    decNum += multiplier*Math.pow(16, x);
    n++;
  }
  return decNum;
}*/