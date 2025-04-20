// importing local code, code we have written
import { Polygon } from "@svgdotjs/svg.js";
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box, Circle} from "../core/ui";

class ScrollBar extends Widget{
    private _rect: Rect;
    private _innerRect: Rect;
    private _upArrowBox: Rect;
    private _downArrowBox: Rect;
    private _upArrow: Polygon;
    private _downArrow: Polygon;
    private _height: number = 200;
    private _scroll: (direction: string) => void = () => {};
    

    constructor(parent:Window){
        super(parent);
        this.role = RoleType.button;
        this.render();
        this.setState(new IdleUpWidgetState());
        this.selectable = false;
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(20, this._height).fill("white").stroke("black").move(12, 450);
        this._innerRect = this._group.rect(20, 50).fill("gray").move(12, 470);
        this._upArrowBox = this._group.rect(20, 20).fill("white").stroke("black").move(12, 450);
        this._upArrow = this._group.polygon(`0,5 5,0 10,5`).fill("gray").move(17, 455);
        this._downArrowBox = this._group.rect(20, 20).fill("white").stroke("black").move(12, 630);
        this._downArrow = this._group.polygon(`0,0 5,5 10,0`).fill("gray").move(17, 640);
            
        this._upArrowBox.click(() => {
            let y = +this._innerRect.y();
            if (y > +this._rect.y() + 20) {
                this._innerRect.y(y - 5);
            }
            this._scroll("up");
        });

        this._upArrow.click(() => {
            let y = +this._innerRect.y();
            if (y > +this._rect.y() + 20) {
                this._innerRect.y(y - 5);
            }
            this._scroll("up");
        });

        this._downArrowBox.click(() => {
            let y = +this._innerRect.y();
            if (y < +this._rect.y() + (+this._rect.height()) - (+this._innerRect.height()) - 20) {
                this._innerRect.y(y + 5);
            }
            this._scroll("down");
        });

        this._downArrow.click(() => {
            let y = +this._innerRect.y();
            if (y < +this._rect.y() + (+this._rect.height()) - (+this._innerRect.height()) - 20) {
                this._innerRect.y(y + 5);
            }
            this._scroll("down");
        });

        this._rect.click((event: MouseEvent) => {
            const rectY = (+this._rect.y());
            const mouseClickCoordinates= event.clientY + rectY - this._rect.bbox().y;
            const previousInnerRectY = +this._innerRect.y();
            const minYboundary = rectY + 30;
            const maxYboundary = rectY + (+this._rect.height()) - (+this._innerRect.height()) - 20;
            let newY = mouseClickCoordinates - (+this._innerRect.height() / 2);
        
            if (mouseClickCoordinates < minYboundary) {
              newY = minYboundary;
            }
            if (mouseClickCoordinates > maxYboundary) {
              newY = maxYboundary;
            }
            if (newY < previousInnerRectY) {
                this._scroll("up");
            } else {
                this._scroll("down");
            }
            
            this._innerRect.y(newY);
          });          

        this.outerSvg = this._group;
    }

    scroll(callback: (direction: string) => void): void {
        this._scroll = callback;
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

    get scrollBarheight(): number {
        return +this._rect.height();
    }

    set scrollBarheight(value: number) {
        if (value < +this._innerRect.height()) {
            value = +this._innerRect.height();
        }

        this._rect.height(value);
        this._height = value;
        this._downArrowBox.move(+this._rect.x(), +this._rect.y() - 20 + value);
        this._downArrow.move(+this._rect.x() + 5, +this._rect.y()-10 + value);
        this.update();
    }

    get scrollThumbPosition(): number {
        return +this._innerRect.y();
    }


}

export {ScrollBar}