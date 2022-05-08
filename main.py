pins.touch_set_mode(TouchTarget.P1, TouchTargetMode.CAPACITIVE)
pins.touch_set_mode(TouchTarget.P2, TouchTargetMode.CAPACITIVE)
radio.set_group(69)
radio.set_transmit_serial_number(True)
radio.set_transmit_power(7)
enabled = False
list_cisla = [control.device_serial_number()]
hlasy = [0]
pouzite_cisla = [control.device_serial_number()]
hlas = None
a = 0
b = 0
c = 0
d = 0
counter = 0
seriove_cislo = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)

def on_button_pressed_b():
    global enabled
    if enabled == False:
        radio.send_value("enabled", 1)
        enabled = True
    elif enabled == True:
        radio.send_value("enabled", 0)
        enabled = False
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global list_cisla, hlasy, seriove_cislo
    if name == "vote":
        radio.send_value("ack", seriove_cislo)
        print(seriove_cislo)
        list_cisla.append(seriove_cislo)
        if value == 1:
            hlasy.append(1)
        if value == 2:
            hlasy.append(2)
        if value == 3:
            hlasy.append(3)
        if value == 4:
            hlasy.append(4)
radio.on_received_value(on_received_value)

def vysledky():
    global a, b, c, d, list_cisla, hlasy, pouzite_cisla, counter
    for i in list_cisla:
        while len(list_cisla) != counter: 
            if list_cisla[i] != pouzite_cisla[counter]:
                counter += 1
            else: 
                list_cisla.pop(i)
                hlasy.pop(i)
        for g in list_cisla:
            pouzite_cisla.append(list_cisla[i])    
            if list_cisla[i] == list_cisla[g]:
                hlas2 = hlasy[g]
        hlasy.append(hlas2)
        counter = 0
    a = hlasy.count(1)
    b = hlasy.count(2)
    c = hlasy.count(3)
    d = hlasy.count(4)
    print("hlasy A = " + a)
    print("hlasy B = " + b)
    print("hlasy C = " + c)
    print("hlasy D = " + d)
input.on_button_pressed(Button.A, vysledky)

def reset():
    global a, b, c, d, hlasy
    a = 0
    b = 0
    c = 0
    d = 0
    seriova_cisla = []
    hlasy = []
input.on_button_pressed(Button.AB, reset)
