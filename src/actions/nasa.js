/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const FAIL_ITEMS = 'FAIL_ITEMS';
export const SEARCH_CHANGED = 'SEARCH_CHANGED';

export const searchChanged = (payload) => (dispatch) => {
  dispatch({
    type: SEARCH_CHANGED,
    payload
  });
  dispatch(fetchItems(payload));
}

export const fetchItems = (payload) => (dispatch) => {
  dispatch(requestItems());
  fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(payload)}&media_type=image`)
    .then(res => res.json())
    .then(data => dispatch(receiveItems(data)))
    .catch(() => dispatch(fail))
}

export const requestItems = () => ({
  type: REQUEST_ITEMS
});

export const receiveItems = (payload) => (
  {
    type: RECEIVE_ITEMS,
    payload
  }
);

export const failItems = (payload) => (
  {
    type: FAIL_ITEMS,
    payload
  }
);