// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class Button extends Widget{
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private _clickFunction: () => void;
    private defaultText: string= "Button";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 150;
    private defaultHeight: number = 40;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height()/2)) - (box.height/2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("black");
        this._rect.radius(10);
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).move(this._rect.x(), this._rect.y()).opacity(0).attr('id', 0);
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText();

        if(this._rect != null)
            this._rect.fill(this.backcolor);
        
        super.update();
    }
    
    pressReleaseState(): void{

        if (this.previousState instanceof PressedWidgetState) {
            this.raise(new EventArgs(this));
            if (this._clickFunction) {
                this._clickFunction();
            }
        }
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: () => void):void{
        this._clickFunction = callback;
    }

    
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this._rect.fill('pink');
        this._text.text('Press me!');
        this._text.font('family', 'Monaco');
        this._text.font('weight', 'bold');
    }
    idledownState(): void {
        this._rect.fill('lightgreen');
        this._text.text('Pressed!');
        this._text.font('family', 'Monaco');
        this._text.font('weight', 'bold');
    }
    pressedState(): void {
        this._rect.fill('white');
        this._text.text('Fully Pressed!');
        this._text.font('family', 'Arial');
        this._text.font('weight', 'bold');
    }
    hoverState(): void {
        this._rect.fill('lightblue');
        this._text.text('Hovering...');
        this._text.font('family', 'Monaco');
        this._text.font('weight', 'bold');
    }
    hoverPressedState(): void {
        this._rect.fill('blue');
        this._text.text('Pressed while Hovering!');
        this._text.font('family', 'Arial');
        this._text.font('weight', 'bold');
    }
    pressedoutState(): void {
        this._rect.fill('yellow');
        this._text.text('Pressed, but moved out!');
        this._text.font('family', 'Monaco');
        this._text.font('weight', 'bold');
    }
    moveState(): void {
        this._rect.fill('green');
        this._text.text('Moving while pressed...');
        this._text.font('family', 'Arial');
        this._text.font('weight', 'bold');
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        this._rect.fill('lavender');
        this._text.text('Key up!');
        this._text.font('family', 'Monaco');
        this._text.font('weight', 'bold');
        if (keyEvent) {
            this._input = keyEvent.key;
        }
    }

    get label(): string {
        return this._input;
    }

    set label(value: string) {
        this._input = value;
        this.update();
    }

    get size(): number[] {
        return [this.width, this.height];
    }

    set size(dimensions: number[]) {
        if (dimensions.length !== 2) {
            throw new Error("Size inputs should follow the format: [width, height]");
        }
        this.width = dimensions[0];
        this.height = dimensions[1];
        this._rect.width(this.width);
        this._rect.height(this.height);
        this.update();
    }
}

export {Button}