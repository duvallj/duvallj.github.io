#! /usr/bin/python3
# -*- coding: UTF-8 -*-
import cgitb
#enable debugging
cgitb.enable()
print("Content-Type: text/html;charset=utf-8")
print()
print('''<html>
<head>
<title>RSA generator</title>
<meta charset='UTF-8'>
<meta width='device-width'>
<link rel="icon" type="image/vnd.microsoft.icon" href="../logo.ico">
<link rel="stylesheet" type="text/css" href="../Universal.css">
</head>
<body>
  <div class='title'>
    <img src='../name.jpg' class='left_pic flip'/>
    <img src='../logo.png' class='right_pic' width='60' height = '60'/>
  </div>
  <div class='top'><h1>RSA in Python</h1>
  </div>
  <table style="width:100%">
    <tr>
      <td valign='top' width=130px>
        <div class='linkbar'>
          <a href='../'>Home</a>
          <a href='../?page=About.html'>About</a>
          <a href='../?page=Projects.html'>Projects</a>
          <a href='../?page=Downloads.html'>Downloads</a>
          <a href='../?page=Videos.html'>Videos</a>
          <a href='../?page=Comments.html'>Comments</a>
        </div>
      </td>
      <td align='left'>
        <div class='main'>''')

import random
import cgi

def prime_factors(num):
    n = num
    l = []
    d = 2
    while d*d <= n:
        while (n % d) == 0:
            l.append(d)
            n /= d
        d += 1
    if n > 1:
        l.append(n)
    if l == [n]:
        return "prime"
    else:
        return l

prime_nums = []
a = 0
b = 0
P = 0
M = 999999
D = 0
for x in range(2, 1000):
    if prime_factors(x)=="prime":
        prime_nums.append(x)

big_primes = prime_nums[31:]
small_primes = prime_nums[:10]

a = big_primes[random.randint(0, len(big_primes)-1)]
b = big_primes[random.randint(0, len(big_primes)-1)]
M = a*b
n1 = (a-1)*(b-1)
ln = prime_factors(n1)
pl = []

for x in small_primes:
    if ln.count(x) == 0:
        pl.append(x)

P = pl[random.randint(0, len(pl)-1)]*pl[random.randint(0, len(pl)-1)]

while (n1*x+1) % P != 0:
    x += 1

D = (n1*x+1)/P

print("M = %s" %M)
print("P = %s" %P)
print("D = %s" %D)
print("<br><br><a href='../?page=Projects.html'>Back</a>")
print(open("../base2.html", 'r').read())
