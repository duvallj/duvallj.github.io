function printList( l ) {
	var end = "";
	for ( c = 0; c < l.length; c++ ) {
		end += l[c] + "<br>";
	}
	return end;
}

function factor( num ){
	var temp, divisor, num_list, x;
	temp = num;
	divisor = 2;
	x = 0;
	num_list = [];
	while (divisor*divisor <= temp) {
		while(temp%divisor == 0) {
			num_list[x] = divisor;
			temp /= divisor;
			x++;
		}
		divisor++;
	}
	if(temp>1){ num_list[num_list.length] = temp; }
	return num_list;
}

function isPrime( number ) {
	if(factor(number)[0]==number){return true;}
	else{return false;}
}

function findPrimes( upToHere ) {
	var primes, primeList, test;
	primes = 0;
	test = 2;
	primeList= [];
	while (test <= upToHere) {
		if(isPrime(test)){primeList[primeList.length]=test; primes++;}
		test++;
	}
	return primeList;
}