// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box, Circle} from "../core/ui";

class RadioButton extends Widget{
    private _buttonOptions: string[];
    private buttonGroups: {circle: Circle, text: Text, eventRect: Rect}[] = [];
    private _selectedOption: number = -1;
    private _input: string = "Check me!";
    private _select: (index: number, text: string) => void = () => {};
    private _isChecked: boolean = false;

    constructor(parent:Window, buttonOptions: string[] = ["Option 1", "Option 2", "Option 3"]){
        super(parent);
        this.role = RoleType.button;
        if (buttonOptions.length < 2) {
            throw new Error("RadioButton must have at least 2 options");
        }
        this._buttonOptions = buttonOptions;
        this.render();
        this.selectable = false;
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();

        for (let i = 0; i < this._buttonOptions.length; i++) {
            let option = this._buttonOptions[i];
            let yOffset = +this._group.y() + (i * 50);
            const circle = this._group.circle(15).stroke({ color: "black", width: 1 }).fill("white").move(12, yOffset);
            const text = this._group.text(option).move(30, yOffset);
            const eventRect = this._group.rect(150, 20).opacity(0).attr('id', i).move(0, yOffset);
            this.registerEvent(eventRect);
            this.buttonGroups.push({ circle, text, eventRect });
            eventRect.click(() => {
                if (i === this._selectedOption) {
                    return;
                }
                this._selectedOption = i;
                for (let j = 0; j < this.buttonGroups.length; j++) {
                    if (j === i) {
                        this.buttonGroups[j].circle.fill("black");
                        this.buttonGroups[j].text.text("I've been selected!");
                    }
                    else {
                        this.buttonGroups[j].circle.fill("white");
                        this.buttonGroups[j].text.text("Option " + (j + 1));
                    }
                }
                this._select(i, this._buttonOptions[i]);
            });
        }
        this.outerSvg = this._group; 
    }

    select(callback: (index: number, label: string) => void) {
        this._select = callback;
    }

    set buttonOptions(options: string[]) {
        this._buttonOptions = options;
        this.buttonGroups.forEach((group, index) => {
            group.text.text(options[index]);
        });
    }

    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(keyEvent?: KeyboardEvent): void {}
    pressReleaseState(): void {}
}

export {RadioButton}