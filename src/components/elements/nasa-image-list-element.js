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

// Lit html directives
import {repeat} from 'lit-html/directives/repeat';
import {cache} from 'lit-html/directives/cache';
import {styleMap} from 'lit-html/directives/style-map';
// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class NasaImageListElement extends LitElement {
  static get properties() {
    return {
      /* Array of strings that are urls to pictures */
      list: { type: Array },
      cols: {type: Number}
    }
  }

  static get styles() {
    return [
      css`
      .photos{
        /* Prevent vertical gaps */
        line-height: 0;
        
        -webkit-column-gap:   0px;
        -moz-column-gap:      0px;
        column-gap:           0px;  
        border-radius: 1em;
        overflow: hidden;
        margin-top: 1em;
        background-color: black;
      }
      .photos img {
        /* Just in case there are inline attributes */
        width: 100% !important;
        height: auto !important;
        transition: all 0.2s;
      }

      .photos img:hover {
          opacity: 0.2
      }

      `
    ];
  }

  render() {
    let photosStyles = {'-webkit-column-count': this.cols, '-moz-column-count': this.cols, 'column-count': this.cols};
    return html`
        ${this.list.length > 0 ? html`
                <div 
                    style=${styleMap(photosStyles)}
                    class="photos">
                    ${ repeat(this.list, (i) => html`<img src=${i} />`) }
                </div>
            ` : html`<p>No results</p>`
        }

      
    `;
  }

  constructor() {
    super();
    this.list = [];
    this.cols = 1;
  }

}

window.customElements.define('nasa-image-list-element', NasaImageListElement);
