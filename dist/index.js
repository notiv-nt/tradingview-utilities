// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOnInput = exports.isAnyMetaKey = exports.prevent = exports.runInWindow = exports.log = void 0;

var log = function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.log.apply(console, ['\x1b[34m%s\x1b[0m', "--> [TW Utilities]"].concat(args));
};

exports.log = log;

var runInWindow = function runInWindow(str) {
  var script = document.createElement('script');
  script.innerText = str;
  document.body.appendChild(script);
  setTimeout(function () {
    document.body.removeChild(script);
  }, 400);
};

exports.runInWindow = runInWindow;

var prevent = function prevent(e) {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();
};

exports.prevent = prevent;

var isAnyMetaKey = function isAnyMetaKey(e) {
  return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
};

exports.isAnyMetaKey = isAnyMetaKey;

var isOnInput = function isOnInput(e) {
  return e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName);
};

exports.isOnInput = isOnInput;
},{}],"Mode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MODES = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MODES = {
  DEFAULT: 'DEFAULT',
  REPLY: 'REPLY'
};
exports.MODES = MODES;

var Mode = /*#__PURE__*/function () {
  function Mode() {
    _classCallCheck(this, Mode);

    this.mode = null;
    this.onChangeEvents = [];
    this.interval = null;
    this.intervalDelay = 200;
    this.setMode();
    this.startTimer();
  }

  _createClass(Mode, [{
    key: "setMode",
    value: function setMode(mode) {
      var _this = this;

      this.mode = mode || this.getCurrentMode();
      this.onChangeEvents.forEach(function (event) {
        return event(_this.mode);
      });
      return this.mode;
    }
  }, {
    key: "getCurrentMode",
    value: function getCurrentMode() {
      var toolbar = document.querySelector('.tv-replay-toolbar');

      if (toolbar && !toolbar.classList.contains('i-hidden')) {
        return MODES.REPLY;
      } else {
        return MODES.DEFAULT;
      }
    }
  }, {
    key: "onChange",
    value: function onChange(fn) {
      this.onChangeEvents.push(fn);
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this2 = this;

      this.interval = setInterval(function () {
        var newMode = _this2.getCurrentMode();

        if (_this2.mode === MODES.DEFAULT && newMode === MODES.REPLY) {
          _this2.setMode(MODES.REPLY);
        }

        if (_this2.mode === MODES.REPLY && newMode === MODES.DEFAULT) {
          _this2.setMode(MODES.DEFAULT);
        }
      }, this.intervalDelay);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      clearInterval(this.interval);
    }
  }]);

  return Mode;
}();

var _default = new Mode();

exports.default = _default;
},{}],"fullscreen-patcher.js":[function(require,module,exports) {
var interval = setInterval(function () {
  var el = document.querySelector('div[data-name="fullscreen"]');

  if (!el) {
    return;
  }

  clearInterval(interval);

  if (el && !el.className.toLowerCase().includes('isactive')) {
    el.click(0);
  }
}, 20);
},{}],"styles.js":[function(require,module,exports) {
var styles = "\n#overlap-manager-root [data-id=\"Change Interval\"],\n#overlap-manager-root [data-name=\"load-layout-dialog\"]\n{\n  display: none !important;\n}\n";
var el = document.createElement('style');
el.innerHTML = styles;
document.body.appendChild(el); // Patch for KeyW (. on dvorak)

(function () {
  var selector = '[data-name="load-layout-dialog"]';

  function check() {
    var el = document.querySelector(selector);

    if (el) {
      console.log('removed');
      el.parentElement.parentElement.parentElement.remove();
    }

    requestAnimationFrame(check);
  }

  check();
})();
},{}],"commands-list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPLY_COMMANDS = exports.UI_COMMANDS = exports.OBJECT_COMMANDS = exports.TOOLBAR_COMMANDS = void 0;

var _utils = require("./utils");

var TOOLBAR_COMMANDS = {
  // Horizontal line
  KeyA: '.tv-floating-toolbar__widget:nth-child(1) span',
  // Horizontal ray
  KeyS: '.tv-floating-toolbar__widget:nth-child(2) span',
  // Rectangle
  KeyD: '.tv-floating-toolbar__widget:nth-child(3) span',
  // Expanded channel
  KeyF: '.tv-floating-toolbar__widget:nth-child(4) span',
  // Vertical line
  KeyG: '.tv-floating-toolbar__widget:nth-child(5) span',
  // Ray
  KeyZ: '.tv-floating-toolbar__widget:nth-child(6) span',
  // Trend line
  KeyX: '.tv-floating-toolbar__widget:nth-child(7) span'
};
exports.TOOLBAR_COMMANDS = TOOLBAR_COMMANDS;
var OBJECT_COMMANDS = {
  KeyQ: '[data-name="remove"]'
};
exports.OBJECT_COMMANDS = OBJECT_COMMANDS;
var UI_COMMANDS = [// Reset scale
{
  check: function check(e) {
    return e.code === 'KeyR' && !(0, _utils.isAnyMetaKey)(e);
  },
  fn: function fn() {
    return document.querySelector('.chart-container.active .js-btn-group-reset-scale > div').click();
  }
}, // Remove all shapes
{
  check: function check(e) {
    return e.code === 'KeyQ' && e.shiftKey;
  },
  fn: function fn() {
    return (0, _utils.runInWindow)('TradingViewApi.activeChart().removeAllShapes()');
  }
}];
exports.UI_COMMANDS = UI_COMMANDS;
var REPLY_COMMANDS = [{
  check: function check(e) {
    return e.code === 'KeyW' && !(0, _utils.isAnyMetaKey)(e);
  },
  fn: function fn() {
    return document.querySelector(".tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(1) > div").click();
  }
}, {
  check: function check(e) {
    return e.code === 'KeyE' && !(0, _utils.isAnyMetaKey)(e);
  },
  fn: function fn() {
    return document.querySelector(".tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(3) > div").click();
  }
}, {
  check: function check(e) {
    return e.code === 'KeyT' && !(0, _utils.isAnyMetaKey)(e);
  },
  fn: function fn() {
    return document.querySelector(".tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(2) > div").click();
  }
}];
exports.REPLY_COMMANDS = REPLY_COMMANDS;
},{"./utils":"utils.js"}],"Command.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _commandsList = require("./commands-list");

var _Mode = require("./Mode");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Commands = /*#__PURE__*/function () {
  function Commands(mode) {
    _classCallCheck(this, Commands);

    this.mode = mode;
    this.onKeyDown = this.onKeyDown.bind(this);
    window.addEventListener('keydown', this.onKeyDown, false);
  }

  _createClass(Commands, [{
    key: "setMode",
    value: function setMode(mode) {
      this.mode = mode;
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      // Skip input
      if ((0, _utils.isOnInput)(e)) {
        return;
      }

      if (e.code.match('Digit') && !(0, _utils.isAnyMetaKey)(e)) {
        this.checkDigit(e);
      }

      this.checkElementsToolbar(e);
      this.checkObjectCommands(e);
      this.checkUiCommands(e);

      if (this.mode === _Mode.MODES.REPLY) {
        this.checkReplyCommands(e);
      }
    }
  }, {
    key: "checkDigit",
    value: function checkDigit(e) {
      (0, _utils.prevent)(e);

      if (!document.querySelector('#header-toolbar-intervals')) {
        return (0, _utils.log)('#header-toolbar-intervals not found');
      }

      var index = e.code.replace('Digit', '');
      var elem = document.querySelector('#header-toolbar-intervals').children[index - 1];

      if (!elem) {
        return (0, _utils.log)('Element was not found', index);
      }

      elem.click();
    }
  }, {
    key: "checkElementsToolbar",
    value: function checkElementsToolbar(e) {
      Object.entries(_commandsList.TOOLBAR_COMMANDS).forEach(function (cmd) {
        if (e.code === cmd[0] && !(0, _utils.isAnyMetaKey)(e)) {
          (0, _utils.prevent)(e);
          var btn = document.querySelector(".tv-floating-toolbar ".concat(cmd[1]));
          btn && btn.click();
        }
      });
    }
  }, {
    key: "checkObjectCommands",
    value: function checkObjectCommands(e) {
      Object.entries(_commandsList.OBJECT_COMMANDS).forEach(function (cmd) {
        if (e.code === cmd[0] && !(0, _utils.isAnyMetaKey)(e)) {
          (0, _utils.prevent)(e);
          var btn = document.querySelector(".tv-floating-toolbar.tv-linetool-properties-toolbar .tv-floating-toolbar__widget ".concat(cmd[1]));
          btn && btn.click();
        }
      });
    }
  }, {
    key: "checkUiCommands",
    value: function checkUiCommands(e) {
      _commandsList.UI_COMMANDS.forEach(function (cmd) {
        if (cmd.check(e)) {
          (0, _utils.prevent)(e);
          cmd.fn();
        }
      });
    }
  }, {
    key: "checkReplyCommands",
    value: function checkReplyCommands(e) {
      _commandsList.REPLY_COMMANDS.forEach(function (cmd) {
        if (cmd.check(e)) {
          (0, _utils.prevent)(e);
          cmd.fn();
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown, false);
    }
  }]);

  return Commands;
}();

exports.default = Commands;
},{"./utils":"utils.js","./commands-list":"commands-list.js","./Mode":"Mode.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");

var _Mode = _interopRequireDefault(require("./Mode"));

require("./fullscreen-patcher");

require("./styles");

var _Command = _interopRequireDefault(require("./Command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  (0, _utils.log)('Current MODE:', _Mode.default.getCurrentMode());
  var command = new _Command.default(_Mode.default.getCurrentMode());

  _Mode.default.onChange(function (mode) {
    (0, _utils.log)('Changed MODE to', mode);
    command.setMode(mode);
  });
});
},{"./utils":"utils.js","./Mode":"Mode.js","./fullscreen-patcher":"fullscreen-patcher.js","./styles":"styles.js","./Command":"Command.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map