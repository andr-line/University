word = str(input("beliebiges wort: "))
length = len(word)
print("Das Wort ist " + str(length) + " Zeichen lang.")

primzahlen = "2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47".split(", ")
print("Es gibt " + str(len(primzahlen)) + " Primzahlen die kleiner sind als 50.")
print("Die zwölfte Primzahl ist " + str(primzahlen[11]) + ".")
primzahlen.append("53")
primzahlen.pop()
primzahlen = primzahlen[-1::-1]
print(primzahlen)