#! /usr/bin/python3
# -*- coding: UTF-8 -*-
import cgitb
#enable debugging
cgitb.enable()
print("Content-Type: text/html;charset=utf-8")
print()
print('''<html>
<head>
<title>RSA encrypter</title>
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
<div class='top'><h1>RSA in Python</h1></div>
<table style="width:100%"><tr><td valign='top' width=130px><div class='linkbar'>
  <a href='../'>Home</a>
  <a href='../?page=About.html'>About</a>
  <a href='../?page=Projects.html'>Projects</a>
  <a href='../?page=Downloads.html'>Downloads</a>
  <a href='../?page=Videos.html'>Videos</a>
  <a href='../?page=Comments.html'>Comments</a>
</div></td>
<td align='left'><div class='main'>''')

'''def encodeString( string, m, p ):
    l = list(string)
    char = []
    for c in l:
        char.append(ord(c))
    code = []
    for n in char:
        code.append((n**p) % m)
    return code

def decodeList( num_list ):
    D = int(form["storedD"].value)
    M = int(form["storedM"].value)
    trans_nums = []
    word = []
    for q in num_list:
        trans_nums.append((q**D) % M )
    for r in trans_nums:
        word.append(chr(r))
    return word

def toBinary( integer ) :
    return "{0:b}".format(integer)

def fromBinary( binary ):
  return int(binary, 2)'''

import random

def encode_list( string, m, p ):
    l = list(string)
    code = []
    for c in l:
        code.append(encode(c, m, p))
    return code

def encode( ch, m, p ):
    return (ord(ch)**p) % m

def decode_list( num_list ):
    trans_nums = []
    word = []
    for r in num_list:
        word.append(chr(decode(r)))
    return word

def decode( num ):
    return (num**D) % M

def to_binary( number, base ):
    r = ""
    temp = number
    powlis = []
    for power in range(base-1, -1, -1):
        n = pow(2, power)
        powlis.append(n)
    for p in powlis:
        if temp-p >= 0:
            r+="1"
            temp-=p
        else:
            r+="0"
    return r

def from_binary( bi_string, base ):
    r = 0
    bitlist = []
    for bit in bi_string:
        bitlist.append(int(bit))
    bitlist.reverse()
    for add in range(base-1, -1, -1):
        r += pow(2, add)*bitlist[add]
    return r

import cgi
form = cgi.FieldStorage()

def encode_text( string ):
    code = encode_list( string, M, P )
    key_list = []
    for thi in range(0, len(code)):
        key_list.append(random.randint(0, 31))
        code[thi] += key_list[thi]
    binary = ""
    for counter in range(0, len(key_list)):
        binary += str(to_binary(key_list[counter], 5))
        binary += str(to_binary(code[counter], 19))
    return binary

def decode_text( h ):
    if not(len(h) % 24 == 0):
        return "Error: wrong number of bits"
    teh = []
    key_list = []
    for q in range(0, int(len(h)/24)+1):
        key_list.append(h[q*24:q*24+5])
        teh.append(h[q*24+5:(q+1)*24])
    #del teh[len(teh)-1]
    #del(key_list[len(key_list)-1])
    dec1 = []
    for counter in range(0, len(key_list)-1):
        dec1.append(from_binary(teh[counter], 19))
        key_list[counter] = from_binary(key_list[counter], 5)
        dec1[counter] -= key_list[counter]
    return "".join(decode_list(dec1))

def split_to( string, spliter ):
    '''end_of_big_chunks = len(string)-len(string)%spliter
    split_string = []
    for chunk in range(0, int(end_of_big_chunks/spliter)+1):
        split_string.append(string[chunk*spliter:(chunk+1)*spliter])
    return split_string'''

#import ast
#posted_list = ast.literal_eval(form['hash'].value)

if "storedD" not in form:
  print("<br><p>Here is your hash:</p>")
  M = int(form['storedM'].value)
  P = int(form['storedP'].value)
  output = encode_text(form['message'].value)
  print('<textarea rows="10" cols="75">' + encode_text(form['message'].value) + '</textarea>')
  print("<br><br><a href='../?page=Projects/RSA%20Hashing.html'>Back</a>")
elif "storedP" not in form:
  print("<br><p>Here is your decoded message:</p>")
  M = int(form['storedM'].value)
  D = int(form['storedD'].value)
  print(decode_text(form['hash'].value))
  print("<br><br><a href='../?page=Projects/RSA%20Hashing.html'>Back</a>")
else:
  print("Please don't confuse me.")
  print("<br><br><a href='../?page=Projects/RSA%20Hashing.html'>Back</a>")

print(open("../base2.html", 'r').read())
