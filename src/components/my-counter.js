/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';

// These are the elements needed by this element.
import { plusIcon, minusIcon, timesIcon, divideIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class MyCounter extends LitElement {
  static get properties() {
    return {
      /* The total number of clicks you've done. */
      clicks: { type: Number },
      /* The current value of the counter. */
      value: { type: Number }
    }
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        span {
          width: 20px;
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }
      `
    ];
  }

  render() {
    return html`
      <div>
        <p>
          Clicked: <span>${this.clicks}</span> times.
          Value is <span>${this.value}</span>.
          <button @click="${this._onIncrement}" title="Add 1">${plusIcon}</button>
          <button @click="${this._onDecrement}" title="Minus 1">${minusIcon}</button>
          <button @click="${this._onDouble}" title="Double">${timesIcon}2</button>
          <button @click="${this._onHalve}" title="Halve">${divideIcon}2</button>
          <button @click="${this._onTriple}" title="Triple">${timesIcon}3</button>
          <button @click="${this._onThird}" title="Third">${divideIcon}3</button>
        </p>
      </div>
    `;
  }

  constructor() {
    super();
    this.clicks = 0;
    this.value = 0;
  }

  _onIncrement() {
    this.value++;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('myCounter-incremented'));
  }

  _onDecrement() {
    this.value--;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('myCounter-decremented'));
  }

  _onDouble() {
    this.value = this.value * 2;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('myCounter-doubled'));
  }

  _onHalve() {
    this.value = Math.floor(this.value / 2);
    this.clicks++;
    this.dispatchEvent(new CustomEvent('myCounter-halved'));
  }

  _onTriple() {
    this.value *= 3;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('myCounter-tripled'));
  }

  _onThird() {
    this.value = Math.floor(this.value / 3);
    this.clicks++;
    this.dispatchEvent(new CustomEvent('myCounter-thirded'));
  }
}

window.customElements.define('my-counter', MyCounter);
