import "@babel/polyfill";

import "./styles.css";
import "./styles.scss";

console.log('hello from main bundle js');

class CustomWebComponent extends HTMLElement   {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = this._render();;
    }

    _render() {
        const style = `
            <style>

            </style>
        `;

        const template = `
            <div>
                <p>---> Write your HTML template here <---</p>
                <slot>Slotted content gets shown here. This is some default text if it is missing.</slot>
            </div>
        `;

        return style + template;
    }
}

customElements.define('wp-custom-web-component', CustomWebComponent);

