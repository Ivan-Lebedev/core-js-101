/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
// class Rectangle {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   getArea() {
//     return this.width * this.height;
//   }
// }
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype = {
  getArea: function getArea() {
    return this.width * this.height;
  },
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}
// function fromJSON(proto, json) {
//   const obj = JSON.parse(json);
//   obj.__proto__ = proto;
//   return obj;
// }

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// const cssSelectorBuilder = {
//   selectors: [],

//   element(value) {
//     this.selectors.push(value);
//     return this;
//   },

//   id(value) {
//     this.selectors.push(`#${value}`);
//     return this;
//   },

//   class(value) {
//     this.selectors.push(`.${value}`);
//     return this;
//   },

//   attr(value) {
//     this.selectors.push(`[${value}]`);
//     return this;
//   },

//   pseudoClass(value) {
//     this.selectors.push(`:${value}`);
//     return this;
//   },

//   pseudoElement(value) {
//     this.selectors.push(`::${value}`);
//     return this;
//   },

//   stringify() {
//     let res = this.selectors.join('');
//     this.selectors = [];
//     return res;
//   },

//   combine(selector1, combinator, selector2) {
//     console.log(selector1.value);
//     // const num = String(selector1).match(/\./).length;
//     // this.selectors.splice(num, 0, ` ${combinator} `);
//     return this;
//   },
// };
class Selector {
  constructor() {
    this.elementValue = '';
    this.idValue = '';
    this.classValue = '';
    this.attrValue = '';
    this.pseudoClassValue = '';
    this.pseudoElementValue = '';
    this.stringifyValue = '';
    this.combineValue = '';
  }

  element(value) {
    if (this.elementValue) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }

    if (
      this.idValue
      || this.classValue
      || this.attrValue
      || this.pseudoClassValue
      || this.pseudoElementValue
    ) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
      );
    }
    this.elementValue += value;
    return this;
  }

  id(value) {
    if (this.idValue) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    if (
      this.classValue
      || this.attrValue
      || this.pseudoClassValue
      || this.pseudoElementValue
    ) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
      );
    }
    this.idValue += `#${value}`;
    return this;
  }

  class(value) {
    if (this.attrValue || this.pseudoClassValue || this.pseudoElementValue) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
      );
    }
    this.classValue += `.${value}`;
    return this;
  }

  attr(value) {
    if (this.pseudoClassValue || this.pseudoElementValue) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
      );
    }
    this.attrValue += `[${value}]`;
    return this;
  }

  pseudoClass(value) {
    if (this.pseudoElementValue) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
      );
    }
    this.pseudoClassValue += `:${value}`;
    return this;
  }

  pseudoElement(value) {
    if (this.pseudoElementValue) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    this.pseudoElementValue += `::${value}`;
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.combineValue
    += `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  }

  stringify() {
    return (
      this.combineValue
      + this.elementValue
      + this.idValue
      + this.classValue
      + this.attrValue
      + this.pseudoClassValue
      + this.pseudoElementValue
    );
  }
}

const cssSelectorBuilder = {
  selectors: [],

  element(value) {
    return new Selector().element(value);
  },

  id(value) {
    return new Selector().id(value);
  },

  class(value) {
    return new Selector().class(value);
  },

  attr(value) {
    return new Selector().attr(value);
  },

  pseudoClass(value) {
    return new Selector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new Selector().pseudoElement(value);
  },

  stringify() {
    return new Selector().stringify();
  },

  combine(selector1, combinator, selector2) {
    return new Selector().combine(selector1, combinator, selector2);
  },
};

// console.log(
//   cssSelectorBuilder
//     .combine(
//       cssSelectorBuilder.element('p').pseudoClass('focus'),
//       '>',
//       cssSelectorBuilder.element('a').attr('href$=".png"')
//     )
//     .stringify()
// );

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
