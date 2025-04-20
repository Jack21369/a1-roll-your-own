// importing local code, code we have written
import { Polyline } from "@svgdotjs/svg.js";
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class CheckBox extends Widget{
    private _rect: Rect;
    private _text: Text;
    private _input: string = "Check me!";
    private _checkMark: Polyline;
    private _check: (checked: boolean) => void = () => {};
    private _isChecked: boolean = false;

    constructor(parent:Window){
        super(parent);
        this.role = RoleType.button;
        this.render();
        this.setState(new IdleUpWidgetState());
        this.selectable = false;
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(20, 20).fill("white").stroke("black").radius(5);
        this._text = this._group.text(this._input).move(30, 0);
        this._checkMark = this._group.polyline("4,12 9,17 18,5").fill("none").stroke({ color: "black", width: 2 }).opacity(0).move(3, 4);
        this.outerSvg = this._group;
        let eventrect = this._group.rect(150, 20).opacity(0).attr('id', 0);
        this.registerEvent(eventrect);
    }

    override update(): void {
        this._checkMark.opacity(this._isChecked ? 1 : 0);
        super.update();
    }
    
    pressReleaseState(): void{

        if (this.previousState instanceof PressedWidgetState) {
            this._isChecked = !this._isChecked;
            this._check(this._isChecked);
            this.update();
            this.raise(new EventArgs(this));
        }
    }

    check(callback: (checked: boolean) => void): void {
        this._check = callback;
    }

    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(keyEvent?: KeyboardEvent): void {}
}

export {CheckBox}