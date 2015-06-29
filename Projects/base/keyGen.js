function getKeys() {
	var a, b, P, M, D, primeNumbers;
	primeNumbers = findPrimes(1000);
	a = primeNumbers[Math.floor(Math.random()*primeNumbers.length)];
	b = primeNumbers[Math.floor(Math.random()*primeNumbers.length)];
	M = a*b;
	n = (a-1)*(b-1);
	listN = factor(n);
	var primesNotInList = [];
	for(x = 0; x < primeNumbers.length; x++ ) {
		if (listN.indexOf(primeNumbers[x]) == -1) {
			primesNotInList[primesNotInList.length] = primeNumbers[x];
		}
	}
	p1 = primesNotInList[Math.floor(Math.random()*primesNotInList.length)];
	p2 = primesNotInList[Math.floor(Math.random()*primesNotInList.length)];
	while (p1==p2) {
		p1 = primesNotInList[Math.floor(Math.random()*primesNotInList.length)];
		p2 = primesNotInList[Math.floor(Math.random()*primesNotInList.length)];
	}
	P = p1*p2;
	var x = 0;
	while ((n*x+1)%P !== 0) {
		x++;
	}
	D = (n*x+1)/P;
	return [M, P, D];
}
