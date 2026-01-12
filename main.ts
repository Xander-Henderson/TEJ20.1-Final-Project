/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Alexander
 * Created on: Jan 2026
 * This program moves a tank forward on a sound, then will stop
 *  
*/

// variable
let sendSignalStoped: number = 0
let wallCounter: number = 0
let soundLevel: number = 0
let distanceToObject: number = 10
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
    if (distanceToObject >= 5) {
        xandersNeopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.show()
         robotbit.StpCarMove(2, 2.5)
    }
        
    if (distanceToObject <= 5) {
        sendSignalStoped = 1
    }
}

while (true) {
    // gets the distance and sound level
    soundLevel = input.soundLevel()
    distanceToObject = sonar.ping(
        DigitalPin.P14,
        DigitalPin.P15,
        PingUnit.Centimeters
    )

    basic.showString(distanceToObject.toString())

    if (soundLevel >= 10) {
        wallCounter = 1
    }
    if (wallCounter = 1 ) {
        moveUntilWall
    }
    if (sendSignalStoped = 1) {
        xandersNeopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.show()

        input.onButtonPressed(Button.A, function() {
             robotbit.StpCarTurn(-90, 2.5, 105)
            sendSignalStoped = 0
        })

        input.onButtonPressed(Button.B, function() {
             robotbit.StpCarTurn(90, 2.5, 105)
            sendSignalStoped = 0
        })
    }
}
