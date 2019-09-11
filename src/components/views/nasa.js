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
import { PageViewElement } from '../page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../../store.js';

//External Elements
import '../elements/nasa-image-list-element';

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
import { refresh } from '../my-icons.js';

class Nasa extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // This is the data from the store.
      _search: { type: String },
      _loading: { type: Boolean },
      _data: { type: Object },
      _error: { type: Object },
      _list: { type: Array },
      _hits: { type: Number },
      _cols: { type: Number }
    };
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        .controls{
          background-color: lightblue;
          padding: 1em;
          border-radius: 1em;
          display: flex;
          justify-content: space-around;
        }

        input {
          text-align: center;
          border-radius: 0.5em;
        }
      `
    ];
  }

  constructor() {
    super();
    this._cols = 1;
  }

  render() {
    return html`
      <section>
        <h2>Nasa Image Search</h2>
        <div class="controls">
          <label for="search">Search:
            <input id="search" value="${this._search}" ?disabled="${this._loading}" type="text" @change="${(evt) => store.dispatch(searchChanged(evt.target.value))}" placeholder="Search Text" />
          </label>
          <label for="cols">Column Count
            <input id="cols" type="number" @change="${(evt) => { this._cols = evt.target.value }}" step="1" min="1" max="100" value="${this._cols || 1}"/>
          </label>
          <label>Results: ${this._hits}</label>
        </div>
        ${this._loading ? html`<div class="loader">${refresh}</div>` : ''}
        <nasa-image-list-element cols=${this._cols} .list=${this._list}></nasa-image-list-element>
      </section>
    `;
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._loading = state.nasa.loading;
    this._data = state.nasa.data;
    this._error = state.nasa.error;
    this._search = state.nasa.search;
    this._hits = state.nasa.hits;
    this._list = state.nasa.list;
  }
}

window.customElements.define('my-nasa', Nasa);
