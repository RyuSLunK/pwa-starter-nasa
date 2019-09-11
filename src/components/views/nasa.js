/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from '../page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../../store.js';

// These are the actions needed by this element.
import { searchChanged } from '../../actions/nasa';

// We are lazy loading its reducer.
import nasa from '../../reducers/nasa';
store.addReducers({
  nasa
});

// These are the elements needed by this element.

// These are the shared styles needed by this element.
import { SharedStyles } from '../shared-styles.js';

class Nasa extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // This is the data from the store.
      _search: {type: String },
      _loading: {type: Boolean},
      _data: {type: Object},
      _error: {type: Object}
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Nasa Thingy</h2>
        <input ?disabled="${this._loading}" type="text" @input="${(evt) => console.log('evt',evt)/*store.dispatch(searchChanged(evt.target.value))*/}" placeholder="Search Text" />

        <div ?active="${this.data}">
          ${this._data}
        </div>
      
      </section>
    `;
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._loading = state.nasa.loading;
    this._data = state.nasa.data;
    this._error = state.nasa.error;
    this._search = state.nasa.search;
  }
}

window.customElements.define('my-nasa', Nasa);
