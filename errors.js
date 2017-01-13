'use strict';

// This module contains three custom error types.
// Just doing what https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
// told me to do.

function FooError(message) {
  this.message = message;
  const lastPart = new Error().stack.match(/[^\s]+$/);
  this.stack = `${this.name} at ${lastPart}`;
}

function BarError(message) {
  this.message = message;
  this.stack = `${this.name} at ${new Error().stack.match(/[^\s]+$/)}`;
}

function BizzError(message) {
  this.message = message;
  this.stack = `${this.name} at ${new Error().stack.match(/[^\s]+$/)}`;
}

[[FooError, 'FooError'], [BarError, 'BarError'], [BizzError, 'BizzError']].forEach(
  (pair) => {
    Object.setPrototypeOf(pair[0], Error);
    pair[0].prototype = Object.create(Error.prototype);
    pair[0].prototype.name = pair[1];
    pair[0].prototype.message = "";
    pair[0].prototype.constructor = pair[0];
});

module.exports = {FooError, BarError, BizzError};
