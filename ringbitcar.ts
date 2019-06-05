



//% weight=0 color=#0fbc11  icon="\uf207" block="RingbitCar"
namespace RingbitCar {
    
    export enum TrackingStateType {
        //% block="● ●" enumval=0
        Tracking_State_0,

        //% block="● ◌" enumval=1
        Tracking_State_1,

        //% block="◌ ●" enumval=2
        Tracking_State_2,

        //% block="◌ ◌" enumval=3
        Tracking_State_3
    }


    export enum Distance_Unit {
        //% block="mm" enumval=0
        Distance_Unit_mm,

        //% block="cm" enumval=1
        Distance_Unit_cm,

        //% block="inch" enumval=2
        Distance_Unit_inch
    }
    let left_wheel_offset = 0
    let right_wheel_offset = 0
    let pin_left_wheel = AnalogPin.P1
    let pin_right_wheel = AnalogPin.P2


    /**
    * TODO: initialization ring:bit car
    * @param left describe parameter here, eg: AnalogPin.P1
    * @param right describe parameter here, eg: AnalogPin.P2
    */
    //% weight=10
    //% blockId=ringbitcar_init block="set left wheel at pin %left|right wheel at pin %right"
    export function init_wheel(left: AnalogPin, right: AnalogPin): void {
        // Add code here
        pin_left_wheel = left
        pin_right_wheel = right

    }

    /**
    * TODO: set wheel offset
    * @param left_offset describe parameter here, eg: left_wheel_offset
    * @param right_offset describe parameter here, eg: right_wheel_offset
    */
    //% weight=10
    //% blockId=ringbitcar_offset block="set left wheel offset %left_offset|right wheel offset %right_offset"
    //% left_offset.min=-12 left_offset.max=12
    //% right_offset.min=-12 right_offset.max=12
    export function set_offset(left_offset: number, right_offset: number): void {
        // Add code here
        left_wheel_offset = left_offset * 8
        right_wheel_offset = right_offset * 8

    }


    /**
    * TODO: full speed move forward
    */
    //% weight=9
    //% blockId=ringbitcar_forward block="go straight at full speed"
    export function forward(): void {
        // Add code here

        pins.servoSetPulse(pin_left_wheel, 2300 + left_wheel_offset)
        pins.servoSetPulse(pin_right_wheel, 700 - right_wheel_offset)

    }



    /**
    * TODO: full speed move back
    */
    //% weight=8
    //% blockId=ringbitcar_back block="reverse at full speed"
    export function back(): void {
        // Add code here

        pins.servoSetPulse(pin_left_wheel, 700 + left_wheel_offset)
        pins.servoSetPulse(pin_right_wheel, 2300 + right_wheel_offset)

    }



    /**
    * TODO: full speed turn left
    */
    //% weight=7
    //% blockId=ringbitcar_left block="turn left at full speed"
    export function turnleft(): void {
        // Add code here

        pins.servoSetPulse(pin_left_wheel, 700 - left_wheel_offset)
        pins.servoSetPulse(pin_right_wheel, 700 - right_wheel_offset)

    }


    /**
    * TODO: full speed turn right
    */
    //% weight=6
    //% blockId=ringbitcar_right block="turn right at full speed"
    export function turnright(): void {
        // Add code here

        pins.servoSetPulse(pin_left_wheel, 2300 + left_wheel_offset)
        pins.servoSetPulse(pin_right_wheel, 2300 + right_wheel_offset)

    }


    /**
    * TODO: stop
    */
    //% weight=5
    //% blockId=ringbitcar_brake block="brake"
    export function brake(): void {
        // Add code here

        //pins.servoSetPulse(pin_left_wheel, 1500)
        //pins.servoSetPulse(pin_right_wheel, 1500)
        pins.digitalWritePin(<number>pin_left_wheel, 0)
        pins.digitalWritePin(<number>pin_right_wheel, 0)

    }



    /**
    * TODO: self setting speed
    * @param m the m from -100 (min) to 100 (max), eg:0
    * @param n the n from -100 (min) to 100 (max), eg:0
    */
    //% weight=4
    //% blockId=ringbitcar_freestyle block="set left wheel speed %m| right wheel speed %n"
    //% m.min=-100 m.max=100
    //% n.min=-100 n.max=100
    export function freestyle(m: number, n: number): void {
        // Add code here

        if (m > 0) {
            pins.servoSetPulse(pin_left_wheel, 1600 + m * 8 + left_wheel_offset)
        } else if (m < 0) {
            pins.servoSetPulse(pin_left_wheel, 1400 + m * 8 - left_wheel_offset)
        } else pins.servoSetPulse(pin_left_wheel, 1500)


        if (n > 0) {
            pins.servoSetPulse(pin_right_wheel, 1400 - n * 8 + right_wheel_offset)
        } else if (n < 0) {
            pins.servoSetPulse(pin_right_wheel, 1600 - n * 8 + right_wheel_offset)
        } else pins.servoSetPulse(pin_right_wheel, 1500)

    }



    /**
    * TODO: line following
    */
    //% weight=10
    //% advanced=true
    //% blockId=ringbitcar_tracking block="tracking state is %state"
    export function tracking(state: TrackingStateType): boolean {
        let sensor_pin = AnalogPin.P0

        if (pin_left_wheel != AnalogPin.P1 && pin_right_wheel != AnalogPin.P1) {
            sensor_pin = AnalogPin.P1
        } else if (pin_left_wheel != AnalogPin.P2 && pin_right_wheel != AnalogPin.P2) {
            sensor_pin = AnalogPin.P2
        }

        let i = pins.analogReadPin(sensor_pin)

        if (i < 150 && state == 0) {
            return true;
        } else if (i >= 150 && i < 235 && state == 1) {
            return true;
        } else if (i >= 235 && i < 310 && state == 2) {
            return true;
        } else if (i >= 310 && i < 500 && state == 3) {
            return true;
        } else return false;

    }



    /**
    * TODO: get ultrasonic distance
    */
    //% weight=9
    //% advanced=true
    //% blockId=ringbitcar_sonarbit block="ultrasonic distance in unit %distance_unit"
    export function ringbitcar_sonarbit(distance_unit: Distance_Unit): number {

        let sensor_pin = AnalogPin.P0

        if (pin_left_wheel != AnalogPin.P1 && pin_right_wheel != AnalogPin.P1) {
            sensor_pin = AnalogPin.P1
        } else if (pin_left_wheel != AnalogPin.P2 && pin_right_wheel != AnalogPin.P2) {
            sensor_pin = AnalogPin.P2
        }

        // send pulse
        pins.setPull(<number>sensor_pin, PinPullMode.PullNone)
        pins.digitalWritePin(<number>sensor_pin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(<number>sensor_pin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(<number>sensor_pin, 0)

        // read pulse
        let d = pins.pulseIn(<number>sensor_pin, PulseValue.High, 23000)  // 8 / 340 = 
        let distance = d * 10 * 5 / 3 / 58

        if (distance > 4000) distance = 0

        switch (distance_unit) {
            case 0:
                return distance //mm
                break
            case 1:
                return distance / 10  //cm
                break
            case 2:
                return distance / 25  //inch
                break
            default:
                return 0

        }

    }





}

