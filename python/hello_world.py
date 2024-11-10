def greet():
    message = 'Hello world'
    print(message)

def some_strings():
    string1 = 'A simple string'
    string2 = "That's awesome"
    string3 = """That's even more "awesome" in a string"""
    string4 = '''Look at
this multiline
string'''
    uppercase = 'lowercase'.upper()
    lowercase = 'UPPERCASE'.lower()
    stripped = '  sdk   '.strip()
    sliced = 'abcde'[0:1] # ab
    sliced2 = 'abcde'[:2] # abc
    sliced3 = 'abcde'[3:] # de
    template1 = "%(lang)s is %(times)ix fun!" % {"lang":"Python", "times": 100}
    print(template1)

def type_casts():
    my_number = 23
    number_string = str(my_number)
    number_again = int(number_string)

greet()
some_strings()