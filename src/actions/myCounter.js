/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const DOUBLE = 'DOUBLE';
export const HALVE = 'HALVE';
export const TRIPLE = 'TRIPLE';
export const THIRD = 'THIRD';

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};

export const double = () => {
  return {
    type: DOUBLE
  };
};

export const halve = () => {
  return {
    type: HALVE
  };
};

export const triple = () => {
  return {
    type: TRIPLE
  };
};

export const third = () => {
  return {
    type: THIRD
  };
};