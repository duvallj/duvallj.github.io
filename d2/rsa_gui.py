#! /usr/bin/python3.4

import random

M, P, D = 0, 0, 0
try:
    with open("secret.rsaC", 'r') as initcodes:
        '''read keys from file'''
        init_numbers = initcodes.read().split(";")
        M = int(init_numbers[0])
        P = int(init_numbers[1])
        D = int(init_numbers[2])
    if M<=D:
        raise(FileNotFoundError)

except FileNotFoundError:
    '''make new keys'''
    import random

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
    for x in range(2, 1000):
        if prime_factors(x)=="prime":
            prime_nums.append(x)
    big_primes = prime_nums[31:]
    small_primes = prime_nums[:10]

    M=-1
    D=0
    while M<D:
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

        D = int((n1*x+1)/P)

    with open("secret.rsaC", 'w') as writefile:
        '''write new keys to file'''
        writefile.write("%s;%s;%s;" %(M, P, D))

def update_progressbar():
    prog.step()
    win.update()

def encode_list(string, modulator, power):
    list_of_string = list(string)
    code = []
    for character in list_of_string:
        thing = encode(character, modulator, power)
        code.append(thing)
    return code


def encode(character, modulator, power):
    '''Here is where RSA encryption happens'''
    return pow(ord(character), power, modulator)


def decode_list(num_list, mod, power):
    trans_nums = []
    word = []
    for num in num_list:
        thing = decode(num, mod, power)
        trans_nums.append(thing)
    for character in trans_nums:
        word.append(chr(character))
    return word


def decode(number, modulation, power):
    '''This is where the actual RSA decryption happens'''
    return pow(number, power, modulation)


def to_binary(number, base):
    return '{:0{}b}'.format(number, base)


def from_binary(bi_string):
    return int(bi_string, 2)

ALL_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '~', '!', '@', '#', '$', '%', '^', '&', '[', ']', '{', '}', '|', ';', ':', ',', '.', '?']


def to_everyletter( num ):
    '''everyletter is a name I made up for base-80'''
    if num == 0: return ALL_CHARS[0]
    digits = []
    while num:
        num = int(num)
        digits.append(ALL_CHARS[num % 80])
        num /= 80
    digits.reverse()
    del digits[0]
    return ''.join(digits)

def from_everyletter( letters ):
    output = 0
    reversed_letters = letters[::-1]
    for letter in reversed_letters:
        index = reversed_letters.index(letter)
        output+=ALL_CHARS.index(letter)*pow(80, index)
        #This is necesary for strings w/ more than one of the same character
        reversed_letters = reversed_letters[:index] + '_' + reversed_letters[index+1:]
    return output


def encode_text( string, modulation, power ):

    code = encode_list( string, modulation, power )

    key_list = []

    for thing in range(0, len(code)):
        key_list.append(random.randint(0, 31))
        code[thing] += key_list[thing]
        
    output = ""

    for counter in range(0, len(key_list)):
        binary = to_binary(key_list[counter], 5)
        binary += to_binary(code[counter], 19)
        output += to_everyletter(from_binary(binary))+'_'
    return output

def decode_text( all_char_string, mod, power ):

    all_char_things=all_char_string.split('_')
    binary_list=[]

    for thing in all_char_things:
        binary_list.append(to_binary(from_everyletter(thing), 24))
    binary_file=''.join(binary_list)

    if not(len(binary_file) % 24 == 0):
        return "Error: wrong number of bits"

    encoded = []
    key_list = []

    for index_start in range(0, int(len(binary_file)/24)+1):
        key_list.append(binary_file[index_start*24:index_start*24+5])
        encoded.append(binary_file[index_start*24+5:(index_start+1)*24])

    del encoded[len(encoded)-1]
    del key_list[len(key_list)-1]

    decoded_first_stage = []

    for counter in range(0, len(key_list)):
        decoded_first_stage.append(from_binary(encoded[counter]))
        key_list[counter] = from_binary(key_list[counter])
        decoded_first_stage[counter] -= key_list[counter]

    decoded_stage_two = decode_list(decoded_first_stage, mod, power)
    return "".join(decoded_stage_two)


computers = {
    "myself":[M, P]             #usually contains more, as if you could send to other people
}

from tkinter import *
import tkinter.ttk as ttk
import tkinter.filedialog as filedialog
from time import sleep
import os

win = Tk()
win.title("RSA encryption-python")
entrybar = Frame(win)
buttons = Frame(win)
file_list = Frame(win)

s_entry = Text(entrybar, width=25, height=5)
input_label = Label(entrybar, text="Input")
prog = ttk.Progressbar(entrybar, mode="determinate")
input_label.pack(pady=5)
s_entry.pack(expand=1,fill=BOTH,padx=5)
prog.pack(padx=20, side=BOTTOM, expand=1, fill=X)

filename = StringVar()
f_entry = Entry(buttons, textvariable=filename)
people = Listbox(buttons, selectmode=BROWSE)
for person in computers:
    people.insert(END, person)

en_files = Listbox(file_list, selectmode=BROWSE)

class I_have_to:
    def __init__(self):
        self.path=os.getcwd()
derp = I_have_to()

def refresh():
    files=[]
    en_files.delete(0, END)
    for file in os.listdir(derp.path):
        if file.endswith(".bef3"):
            files.append(file)
    for file in files:
        en_files.insert(END, file)

def refresh_path():
    root = Tk()
    root.withdraw()
    directory = filedialog.askdirectory(parent=root, initialdir="/", title="Select the folder with Encrypted files")
    derp.path = str(directory)
    root.destroy()
    refresh()

file_label = Label(file_list, text="Select file:")
file_list2 = Frame(file_list)
path_refresh = Button(file_list2, text="Choose folder", command=refresh_path)
file_label.pack(pady=3)
en_files.pack()
path_refresh.pack(padx=5,pady=2)
file_list2.pack()

def encode_click():
    with open(derp.path + "/" + filename.get() + ".bef3", 'w') as writefile:
        writefile.write(encode_text(s_entry.get(1.0, END)[0:len(s_entry.get(1.0, END))-1],\
                  computers[people.get(ACTIVE)][0],computers[people.get(ACTIVE)][1]))                   
    refresh()

def decode_click():
    with open(derp.path + "/" + en_files.get(ACTIVE)) as readfile:
        s_entry.insert(END, decode_text( readfile.read(), M, D ))
    refresh()

encrypt = Button(buttons, text="Encode", command=encode_click)
decrypt = Button(buttons, text="Decode", command=decode_click)
encrypt.pack(padx=10, pady=2)
decrypt.pack(padx=10, pady=2)
f_entry.pack()
people.pack()

entrybar.pack(side=LEFT, expand=1, fill=BOTH, pady=5, padx=5)
buttons.pack(side=LEFT)
file_list.pack(side=LEFT, padx=5)
refresh()
win.mainloop()
quit()
