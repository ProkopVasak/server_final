pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive)
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive)
radio.setGroup(69)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)
let enabled = false
let list_cisla = [control.deviceSerialNumber()]
let hlasy = [0]
let pouzite_cisla = [control.deviceSerialNumber()]
let hlas = null
let a = 0
let b = 0
let c = 0
let d = 0
let counter = 0
let seriove_cislo = radio.receivedPacket(RadioPacketProperty.SerialNumber)
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (enabled == false) {
        radio.sendValue("enabled", 1)
        enabled = true
    } else if (enabled == true) {
        radio.sendValue("enabled", 0)
        enabled = false
    }
    
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    if (name == "vote") {
        radio.sendValue("ack", seriove_cislo)
        console.log(seriove_cislo)
        list_cisla.push(seriove_cislo)
        if (value == 1) {
            hlasy.push(1)
        }
        
        if (value == 2) {
            hlasy.push(2)
        }
        
        if (value == 3) {
            hlasy.push(3)
        }
        
        if (value == 4) {
            hlasy.push(4)
        }
        
    }
    
})
input.onButtonPressed(Button.A, function vysledky() {
    let hlas2: number;
    
    for (let i of list_cisla) {
        while (list_cisla.length != counter) {
            if (list_cisla[i] != pouzite_cisla[counter]) {
                counter += 1
            } else {
                _py.py_array_pop(list_cisla, i)
                _py.py_array_pop(hlasy, i)
                list_cisla.insertAt(i, 0)
                hlasy.insertAt(i, 0)
            }
            
            counter = 0
        }
        for (let g of list_cisla) {
            pouzite_cisla.push(list_cisla[i])
            if (list_cisla[i] == list_cisla[g]) {
                hlas2 = hlasy[g]
            }
            
        }
        hlasy.push(hlas2)
        counter = 0
    }
    a = _py.py_array_count(hlasy, 1)
    b = _py.py_array_count(hlasy, 2)
    c = _py.py_array_count(hlasy, 3)
    d = _py.py_array_count(hlasy, 4)
    console.log("hlasy A = " + a)
    console.log("hlasy B = " + b)
    console.log("hlasy C = " + c)
    console.log("hlasy D = " + d)
})
input.onButtonPressed(Button.AB, function reset() {
    
    a = 0
    b = 0
    c = 0
    d = 0
    list_cisla = [control.deviceSerialNumber()]
    hlasy = [0]
    pouzite_cisla = [control.deviceSerialNumber()]
})
