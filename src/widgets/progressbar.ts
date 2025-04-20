// importing local code, code we have written
import { Polygon } from "@svgdotjs/svg.js";
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box, Circle} from "../core/ui";

class ProgressBar extends Widget{
    private _rect: Rect;
    private _eventRect: Rect;
    private _innerRect: Rect;
    private _stepValue: number;
    private _incrementValue: number = 0;
    private _width: number = 200; 
    private _increment: (value: number) => void = () => {};
    private _stateChange: (state: string) => void = () => {};

    constructor(parent:Window){
        super(parent);
        this.role = RoleType.button;
        this.render();
        this.setState(new IdleUpWidgetState());
        this.selectable = false;
        this._stepValue = 0.1*this._width;
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this._width, 20).fill("white").stroke("black");
        this._innerRect = this._group.rect(0, 20).fill("green");
        this.outerSvg = this._group;

        this._eventRect = this._group.rect(this._width, 20).opacity(0).attr('id', 0);
        this.registerEvent(this._eventRect);
        this._eventRect.click(() => {
            this.incrementProgressBar(this._stepValue);
            this._increment(this._stepValue);
            this.raise(new EventArgs(this));
            this.update();
        }
        );
    }

    get totalWidth(): number {
        return this._width;
    }

    set totalWidth(width: number) {
        this._width = width;
        this._rect.width(width);
        this._eventRect.width(width);
        this.update();
    }

    get incrementValue(): number {
        return +this._innerRect.width() / this._width * 100;
    }

    set incrementValue(value: number) {
        this._incrementValue = this._width * (value / 100);
        this._innerRect.width(this._incrementValue);
        this.update();
    }

    incrementProgressBar(increment: number) {
        if (increment < 0) {
            throw new Error("Increment value must be positive");
        }
        if (increment > 100) {
            throw new Error("Increment value must be less than or equal to 100");
        }
        this._innerRect.width(+this._innerRect.width() + increment);
        if (+this._innerRect.width() > this._width) {
            this._innerRect.width(0);
        }
    }

    increment(callback: (value: number) => void): void {
        this._increment = callback;
    }

    stateChange(callback: (state: string) => void): void {
        this._stateChange = callback;
    }

    idleupState(): void {
        this._stateChange("idleup");
    }
    idledownState(): void {
        this._stateChange("idleup");
    }
    pressedState(): void {
        this._stateChange("pressed");
    }
    hoverState(): void {
        this._stateChange("hover");
    }
    hoverPressedState(): void {
        this._stateChange("hoverpressed");
    }
    pressedoutState(): void {
        this._stateChange("pressedout");
    }
    moveState(): void {
        this._stateChange("move");
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        this._stateChange("keyup");
    }
    pressReleaseState(): void {
        this._stateChange("pressrelease");
    }


}

export {ProgressBar}