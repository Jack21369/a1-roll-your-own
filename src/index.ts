import { Window } from "./core/ui";
import { Button } from "./widgets/button";
import { Heading } from "./widgets/heading";
import { CheckBox } from "./widgets/checkbox";
import { RadioButton } from "./widgets/radiobutton";
import { ScrollBar } from "./widgets/scrollbar";
import { ProgressBar } from "./widgets/progressbar";
import { DropDown } from "./widgets/dropdown";

let w = new Window(window.innerHeight - 10, '100%');

let lbl1 = new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10, 20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 18;
btn.onClick(() => {
    lbl1.text = "Button clicked";
    console.log(lbl1.text);
});
btn.label = "Click Me";
btn.move(12, 50);

let lbl2 = new Heading(w);
lbl2.text = "Not Checked";
lbl2.tabindex = 1;
lbl2.fontSize = 16;
lbl2.move(10, 120);

let chkBox = new CheckBox(w);
chkBox.move(12, 150);
chkBox.check((checked) => {
    lbl2.text = checked ? "Checked" : "Not Checked";
    console.log(lbl2.text);
});

let lbl3 = new Heading(w);
lbl3.text = "Select an Option!";
lbl3.tabindex = 1;
lbl3.fontSize = 16;
lbl3.move(10, 200);

let radioBtn = new RadioButton(w);
radioBtn.move(12, 250);
radioBtn.select((index, text) => {
    lbl3.text = `Selected: ${text}`;
    console.log(lbl3.text);
});

let lbl4 = new Heading(w);
lbl4.text = "Move the Scrollbar!";
lbl4.tabindex = 1;
lbl4.fontSize = 16;
lbl4.move(10, 400);

let scrollBar = new ScrollBar(w);
scrollBar.move(90, 430);

scrollBar.scrollBarheight = 300;
scrollBar.scroll((direction) => {
    lbl4.text = `Scrolled: ${direction}`;
    console.log(lbl4.text);
});



let lbl5 = new Heading(w);
lbl5.text = "Increment the Progress Bar by clicking it!";
lbl5.tabindex = 1;
lbl5.fontSize = 16;
lbl5.move(200, 20);

let lbl6 = new Heading(w);
lbl6.text = "No State Changes";
lbl6.tabindex = 1;
lbl6.fontSize = 16;
lbl6.move(200, 50);

let progressBar = new ProgressBar(w);
progressBar.move(200, 75);
progressBar.totalWidth = 400;
progressBar.increment((value) => {
    lbl5.text = `Incremented by: ${(value / progressBar.totalWidth) * 100}% Total: ${progressBar.incrementValue}%`;
    console.log(lbl5.text);
});
progressBar.stateChange((state) => {
    lbl6.text = `State: ${state}`;
    console.log(lbl6.text);
});

let lbl7 = new Heading(w);
lbl7.text = "Pick an Option!";
lbl7.tabindex = 1;
lbl7.fontSize = 16;
lbl7.move(200, 120);

let dropDown = new DropDown(w);
dropDown.move(200, 145);
dropDown.onSelection((index, text) => {
    lbl7.text = `Selected: ${text}`;
    console.log(lbl7.text);
});
