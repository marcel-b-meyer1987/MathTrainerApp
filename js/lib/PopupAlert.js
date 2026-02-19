class PopupAlert extends HTMLDivElement {

    title;
    msg;

    constructor(title, msg) {
        this.title = title;
        this.msg = msg;

        //generate Popover HTML element with "display: none" attribute
    }

    show() {
        this.showPopover();
    }

    
}