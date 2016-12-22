function convert(number, base1, base2){
  if(base1<2 || base1>36 || base2<2 || base2>36)
  {
    return "Nan";
  }
  return parseInt(number, base1).toString(base2);
}
function switchBox(inputbox1, inputbox2){
  var tempval = inputbox1.value;
  inputbox1.value = inputbox2.value;
  inputbox2.value = tempval;
}
