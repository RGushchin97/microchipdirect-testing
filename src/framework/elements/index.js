// const baseElement = require('./baseElement');
// const textBox = require('./textBox');
// const checkbox = require('./checkBox');
// const dropdown = require('./dropdown');
const ElementState = require('./elementState');
const { Button } = require('./button');
const { DropDown } = require('./dropdown');
const { CheckBox } = require('./checkBox');
const { TextBox } = require('./textBox');
const { BaseElement } = require('./baseElement');

module.exports = {
  BaseElement,
  TextBox,
  CheckBox,
  DropDown,
  Button,
  // ...baseElement,
  // ...textBox,
  // ...checkbox,
  // ...dropdown,
  ...ElementState,
};
