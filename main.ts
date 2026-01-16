/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Alexander
 * Created on: Jan 2026
 * This program moves a tank forward on A button pressed, then 
 * stops before it hits a wall
 *  
*/

// variable
let sendSignalStoped: number = 0
let wallCounter: number = 0
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

while (true) {
    // gets the distance to the object
    distanceToObject = sonar.ping(
        DigitalPin.P14,
        DigitalPin.P15,
        PingUnit.Centimeters
    )

    if (distanceToObject > 5) {
        xandersNeopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        xandersNeopixelStrip.show()

        robotbit.StpCarMove(5, 48)
    }

    if (distanceToObject < 5) {
        xandersNeopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        xandersNeopixelStrip.show()

        robotbit.StpCarTurn(-90, 48, 105)
        basic.pause(50)
    }
}
