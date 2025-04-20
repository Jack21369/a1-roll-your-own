// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text} from "../core/ui";

class DropDown extends Widget {
    private _options: string[];
    private buttonOptions: { text: Text, eventRect: Rect }[] = [];
    private _selectedOption: number = -1;
    private _optionsBox: Rect;
    private _rect: Rect;
    private _text: Text;
    private _input: string = "Select an option";
    private _onSelection: (index: number, text: string) => void = () => {};
    private _isOpen: boolean = false;

    constructor(parent: Window, options: string[] = ["Option 1", "Option 2", "Option 3"]) {
        super(parent);
        if (options.length < 2) {
            throw new Error("DropDown must have at least 2 options");
        }
        this._options = options;
        this.role = RoleType.button;
        this.render();
        this.setState(new IdleUpWidgetState());
        this.selectable = false;
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(150, 30).fill("white").stroke("black");
        this._text = this._group.text(this._input).move(5, 2);
        const arrow = this._group.polyline("0,0 4,5 8,0").fill("none").stroke({ color: "black", width: 2 }).move(130, 10);
        const dropDownEventRect = this._group.rect(150, 30).opacity(0).attr('id', 0);
        this.registerEvent(dropDownEventRect);

        dropDownEventRect.click(() => {
            this._isOpen = !this._isOpen;
            this._optionsBox.opacity(this._isOpen ? 1 : 0);
            for (let i = 0; i < this.buttonOptions.length; i++) {
                this.buttonOptions[i].text.opacity(this._isOpen ? 1 : 0);
            }
        });

        this._optionsBox = this._group.rect(150, 90).fill("white").stroke("black").move(0, 32).opacity(0);

        for (let i = 0; i < this._options.length; i++) {
            const option = this._options[i];
            const yOffset = 32 + (i * 32);

            const text = this._group.text(option).move(5, yOffset).fill("black").opacity(0);

            const eventRect = this._group.rect(150, 30)
                .move(0, yOffset)
                .opacity(0);

            this.registerEvent(eventRect);

            eventRect.click(() => {
                if (i === this._selectedOption || !this._isOpen) return;

                this._selectedOption = i;
                this._text.text(this._options[i]);
                this._onSelection(i, this._options[i]);

                this._isOpen = false;
                this._optionsBox.opacity(0);
                for (let btn of this.buttonOptions) {
                    btn.text.opacity(0);
                    btn.eventRect.opacity(0);
                }
            });

            this.buttonOptions.push({ text, eventRect });
        }

        this.outerSvg = this._group;
    }

    onSelection(callback: (index: number, label: string) => void) {
        this._onSelection = callback;
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

export { DropDown };
