/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Alexander
 * Created on: Jan 2026
 * This program moves a tank forward on a sound, then will stop
 * before it hits a wall. When A or B pressed after the tank stops, 
 * it will turn left or right. Neopixels light up red when stopped
 * and green when driving.
 *  
*/

// variable
let sendSignalStoped: number = 0
let wallCounter: number = 0
let soundLevel: number = 0
let distanceToObject: number = 0
let xandersNeopixelStrip: neopixel.Strip = null

// setup
basic.clearScreen()
xandersNeopixelStrip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
xandersNeopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
xandersNeopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Black))
xandersNeopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
xandersNeopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Black))
xandersNeopixelStrip.show()
basic.showIcon(IconNames.Cow)

// main function, makes the tank move forward
function moveUntilWall() {
    if (distanceToObject > 5) {
        xandersNeopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.show()
         robotbit.StpCarMove(5, 48)
    } 
    
    if (distanceToObject < 5) {
        sendSignalStoped = 1
        wallCounter = 0
    }
}

while (true) {
    // gets the distance and the sound level
    soundLevel = input.soundLevel()

    distanceToObject = sonar.ping(
        DigitalPin.P14,
        DigitalPin.P15,
        PingUnit.Centimeters
    )

    if (soundLevel > 100) {
        wallCounter = 1
    }
    
    if (wallCounter = 1 ) {
        moveUntilWall()
    }

    if (sendSignalStoped = 1) {
        xandersNeopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.show()

        wallCounter = 0
        sendSignalStoped = 0

        input.onButtonPressed(Button.A, function() {
             robotbit.StpCarTurn(-90, 48, 105)
            wallCounter = 1
        })

        input.onButtonPressed(Button.B, function() {
             robotbit.StpCarTurn(90, 48, 105)
            wallCounter = 1
        })
        basic.pause(50)
    }
}
