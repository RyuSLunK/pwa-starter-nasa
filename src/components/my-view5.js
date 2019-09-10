/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { increment, decrement, double, halve, triple, third } from '../actions/myCounter';

// We are lazy loading its reducer.
import myCounter from '../reducers/myCounter';
store.addReducers({
    myCounter
});

// These are the elements needed by this element.
import './my-counter.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView5 extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // This is the data from the store.
      _clicks: { type: Number },
      _value: { type: Number }
    };
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        .red {
          background-color: red;
        }

        .blue {
          background-color: blue;
        }

        .red.blue {
          background-color: purple;
        }
      `
    ];
  }

  render() {
    let circleClasses = {red: this._value % 3 === 0, blue: this._value % 5 === 0, circle: true}
    return html`
      <section>
        <h2>Redux example: simple counter</h2>
        <div class="${classMap(circleClasses)}">${this._value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>. The
        element is not built in a Redux-y way (you can think of it as being a
        third-party element you got from someone else), but this page is connected to the
        Redux store. When the element updates its counter, this page updates the values
        in the Redux store, and you can see the current value of the counter reflected in
        the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <my-counter
              value="${this._value}"
              clicks="${this._clicks}"
              @myCounter-incremented="${this._myCounterIncremented}"
              @myCounter-decremented="${this._myCounterDecremented}"
              @myCounter-doubled="${this._myCounterDoubled}"
              @myCounter-halved="${this._myCounterHalved}"
              @myCounter-tripled="${this._myCounterTripled}"
              @myCounter-thirded="${this._myCounterThirded}"
              >
        </my-counter>
        </p>
      </section>
    `;
  }

  _myCounterIncremented() {
    store.dispatch(increment());
  }

  _myCounterDecremented() {
    store.dispatch(decrement());
  }

  _myCounterDoubled() {
    store.dispatch(double());
  }

  _myCounterHalved() {
    store.dispatch(halve());
  }

  _myCounterTripled() {
    store.dispatch(triple());
  }

  _myCounterThirded() {
    store.dispatch(third());
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._clicks = state.myCounter.clicks;
    this._value = state.myCounter.value;
  }
}

window.customElements.define('my-clicker', MyView5);
