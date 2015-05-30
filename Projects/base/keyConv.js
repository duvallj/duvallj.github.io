M =51;
P =299;
D =3;
function toKey(n, mod, po){
  return Math.pow(n, po%mod)%mod;
}
function fromKey(n, mod, depo){
  return Math.pow(n, depo%mod)%mod;
}
function stringToKey(s, m, p){
  var out = [];
  for(x=0; x<s.length; x++){
    console.log(x);
    console.log(s.charCodeAt(x));
    out[x] = toKey(s.charCodeAt(x), m, p);
  }
  return out;
}
function listFromKey(l, m, d){
  var sOut = '';
  for(x=0; x<l.length; x++){
    sOut.concat(String.fromCharCode(fromKey(l[x], m, d)));
  }
}