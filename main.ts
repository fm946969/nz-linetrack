function trackstate () {
    if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_1)) {
        led.plot(1, 0)
    } else {
        led.unplot(1, 0)
    }
    if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Two, PlanetX_Basic.TrackbitType.State_1)) {
        led.plot(2, 0)
    } else {
        led.unplot(2, 0)
    }
    if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Three, PlanetX_Basic.TrackbitType.State_1)) {
        led.plot(3, 0)
    } else {
        led.unplot(3, 0)
    }
    if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_1)) {
        led.plot(4, 0)
    } else {
        led.unplot(4, 0)
    }
}
input.onButtonPressed(Button.A, function () {
    run = !(run)
    if (!(run)) {
        basic.showIcon(IconNames.Asleep)
        neZha.stopAllMotor()
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            . # # # .
            `)
    }
})
let run = false
basic.showIcon(IconNames.No)
let spd = 15
let spddelta = 5
run = false
basic.showIcon(IconNames.Yes)
loops.everyInterval(50, function () {
    if (run) {
        PlanetX_Basic.Trackbit_get_state_value()
        trackstate()
        if (PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_1)) {
            neZha.setMotorSpeed(neZha.MotorList.M1, spd)
            neZha.setMotorSpeed(neZha.MotorList.M4, spd)
        } else if (PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_12) || PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_2)) {
            neZha.setMotorSpeed(neZha.MotorList.M1, spd - spddelta)
            neZha.setMotorSpeed(neZha.MotorList.M4, spd + spddelta)
        } else if (PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_8) || PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_3)) {
            neZha.setMotorSpeed(neZha.MotorList.M1, spd + spddelta)
            neZha.setMotorSpeed(neZha.MotorList.M4, spd - spddelta)
        } else if (PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_11) || PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_9)) {
            neZha.setMotorSpeed(neZha.MotorList.M1, spd)
            neZha.setMotorSpeed(neZha.MotorList.M4, spd * -0.5)
            basic.pause(500)
        } else if (PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_14) || PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_13)) {
            neZha.setMotorSpeed(neZha.MotorList.M1, spd * -0.5)
            neZha.setMotorSpeed(neZha.MotorList.M4, spd)
            basic.pause(500)
        } else {
            neZha.stopAllMotor()
        }
    }
})
