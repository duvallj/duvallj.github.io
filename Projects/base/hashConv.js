//this script needs my baseConv script before it.
//Made to be used in conjuction with the keyConv script.

function listToHash(l){
  var out = '';
  for(x=0; x<l.length; x++){
    var change = Math.floor(Math.random()*32);
    out = out.concat(toBinaryFixed(change, 5));
    out = out.concat(toBinaryFixed((l[x]-change), 19));
    console.log(change, out);
  }
  return toTrec(fromBinary(out));
}

function hashToList(h){
  var out = [];
  var biHash = toBinary(fromTrec(h));
  for(x=0; x<h.length/24; x++){
    var place = x*24;
    var change = fromBinary(biHash.substr(place, place + 5));
    var num = fromBinary(biHash.substr(place + 5, place + 24));
    num += change;
    out[out.length] = num;
  }
  return out;
}