import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"


let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 18;
btn.onClick(() => {
    alert("Button clicked");
    lbl1.text = "Button clicked";
});
btn.label = "Click Me";
btn.size = [150, 50];
btn.move(12, 50)
