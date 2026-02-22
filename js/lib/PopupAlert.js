class PopupAlert extends HTMLElement {

    title;
    msg;
    xButton;
    okButton;

    constructor(title, msg) {

        super();
        this.title = title;
        this.msg = msg;

        //generate Popover HTML element with "display: none" attribute

        this.outerHTML = `
            <dialog closedby="any" class="popup-alert">
                <div class="title-bar">
                    <span class="title">${title}</span>
                    <span class="x-button">X</span>
                </div>
                <div class="msg-box">
                    <span class="msg">${msg}</span>
                    <div>
                        <button>OK</button>
                    </div>
                </div>
            </dialog>
        `;

        this.xButton = this.querySelector(".x-button");
        this.okButton = this.querySelector(".msg button");  
    }

    show() {
        document.appendChild(this);
    }

    
}