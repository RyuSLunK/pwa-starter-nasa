/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  REQUEST_ITEMS,
  RECEIVE_ITEMS, FAIL_ITEMS, SEARCH_CHANGED
} from '../actions/nasa.js';

const INITIAL_STATE = {
  clicks: 0,
  value: 0,
  search: '',
  loading: false,
  data: null,
  error: null,
  hits: 0,
  list: []
};

const nasa = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_ITEMS:
      return {
        loading: true,
        error: null,
        hits: 0
      };
    case RECEIVE_ITEMS:
      return {
        loading: false,
        data: action.payload,
        error: null,
        hits: extractHits(action.payload),
        list: extractList(action.payload)
      };
    case FAIL_ITEMS:
      return {
        loading: false,
        error: action.payload
      };
    case SEARCH_CHANGED:
      return {
        search: action.payload
      };
    default:
      return state;
  }
};

const extractHits = (data) => {
  return data.collection.metadata.total_hits;
}

const extractList = (data) => {
  return data.collection.items.map((item) => {
    return item.links[0].href;
  })
}

export default nasa;
