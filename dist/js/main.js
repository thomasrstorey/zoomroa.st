webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backbone = __webpack_require__(2);

var _backbone2 = _interopRequireDefault(_backbone);

var _backbone3 = __webpack_require__(1);

var _backbone4 = _interopRequireDefault(_backbone3);

var _AppView = __webpack_require__(10);

var _AppView2 = _interopRequireDefault(_AppView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _backbone4.default.Application.extend({
  region: {
    el: '[data-js-region-app]',
    replaceElement: true
  },

  onStart: function onStart() {
    var appView = new _AppView2.default();
    this.showView(appView);
    if (!_backbone2.default.History.started) {
      _backbone2.default.history.start();
    }
  }
});

exports.default = App;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(3);

var _underscore2 = _interopRequireDefault(_underscore);

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _services = __webpack_require__(22);

var _services2 = _interopRequireDefault(_services);

var _components = __webpack_require__(15);

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicationTemplate = __webpack_require__(23);

var AppView = _backbone2.default.View.extend({
  className: 'Application',
  template: applicationTemplate,
  regions: {
    editor: {
      el: '[data-js-region-editor]',
      replaceElement: false
    },
    toaster: {
      el: '[data-js-region-toaster]',
      replaceElement: false
    }
  },

  onRender: function onRender() {
    var _this = this;

    _underscore2.default.each(_services2.default, function (BaseService) {
      var Service = BaseService.extend({
        region: _this.getRegion(BaseService.prototype.serviceName)
      });
      return new Service();
    });
    _underscore2.default.each(_components2.default, function (BaseComponent) {
      if (_this.hasRegion(BaseComponent.prototype.componentName)) {
        var Component = BaseComponent.extend({
          region: _this.getRegion(BaseComponent.prototype.componentName)
        });
        return new Component();
      }
      return null;
    });
  }
});

exports.default = AppView;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _EditorRouter = __webpack_require__(13);

var _EditorRouter2 = _interopRequireDefault(_EditorRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorComponent = _backbone2.default.Object.extend({
  componentName: 'editor',

  region: null,

  Router: _EditorRouter2.default,

  initialize: function initialize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.router = new this.Router(_extends({}, options, { region: this.region }));
  }
});

exports.default = EditorComponent;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backbone = __webpack_require__(2);

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorModel = _backbone2.default.Model.extend({
  defaults: {
    image: null
  }
});

exports.default = EditorModel;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _EditorModel = __webpack_require__(12);

var _EditorModel2 = _interopRequireDefault(_EditorModel);

var _EditorView = __webpack_require__(14);

var _EditorView2 = _interopRequireDefault(_EditorView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorController = _backbone2.default.Object.extend({
  initialize: function initialize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.region = options.region;
  },
  showEditor: function showEditor() {
    var model = new _EditorModel2.default();
    this.region.show(new _EditorView2.default({ model: model }));
  }
});

var EditorRouter = _backbone2.default.AppRouter.extend({
  initialize: function initialize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.controller = new EditorController(options);
  },


  appRoutes: {
    '(/)': 'showEditor'
  }
});

exports.default = EditorRouter;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(3);

var _underscore2 = _interopRequireDefault(_underscore);

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editorTemplate = __webpack_require__(24);

var EditorView = _backbone2.default.View.extend({
  className: 'Editor',
  template: editorTemplate,
  ui: {
    canvas: '[data-js-ui-canvas]',
    target: '[data-js-ui-target]',
    targetBox: '[data-js-ui-targetbox]'
  },

  events: {
    'dragover @ui.target': 'onTargetDragOver',
    'dragleave @ui.target': 'onTargetDragLeave',
    'dragenter @ui.target': 'onTargetDragEnter',
    'drop @ui.target': 'onTargetDrop'
  },

  onTargetDragOver: function onTargetDragOver(e) {
    e.preventDefault();
  },
  onTargetDragEnter: function onTargetDragEnter(e) {
    e.preventDefault();
    this.ui.target.addClass('Editor-target--dragover');
    this.ui.targetBox.addClass('Editor-targetBox--dragover');
  },
  onTargetDragLeave: function onTargetDragLeave(e) {
    e.preventDefault();
    this.ui.target.removeClass('Editor-target--dragover');
    this.ui.targetBox.removeClass('Editor-targetBox--dragover');
  },
  onTargetDrop: function onTargetDrop(e) {
    e.preventDefault();
    var dataTransfer = e.originalEvent.dataTransfer;
    if (_underscore2.default.isObject(dataTransfer) && _underscore2.default.isArray(dataTransfer.files)) {
      this.model.trigger('drop', e.dataTransfer.files[0]);
    }
  }
});

exports.default = EditorView;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EditorComponent = __webpack_require__(11);

var _EditorComponent2 = _interopRequireDefault(_EditorComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_EditorComponent2.default];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = __webpack_require__(9);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default();
window.app = app;
app.start();

exports.default = app;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _backbone = __webpack_require__(2);

var _backbone2 = _interopRequireDefault(_backbone);

var _ToastModel = __webpack_require__(19);

var _ToastModel2 = _interopRequireDefault(_ToastModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToastCollection = _backbone2.default.Collection.extend({
  model: function model(attributes) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var autoStart = options.collection.autoStart;
    var modelOptions = _extends({}, options, { autoStart: autoStart });
    return new _ToastModel2.default(attributes, modelOptions);
  },
  initialize: function initialize(models) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.autoStart = options.autoStart;
  }
});

exports.default = ToastCollection;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _ToastView = __webpack_require__(20);

var _ToastView2 = _interopRequireDefault(_ToastView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToastCollectionView = _backbone2.default.CollectionView.extend({
  childView: _ToastView2.default
});

exports.default = ToastCollectionView;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(3);

var _underscore2 = _interopRequireDefault(_underscore);

var _backbone = __webpack_require__(2);

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToastModel = _backbone2.default.Model.extend({
  defaults: {
    message: '',
    flavor: 'default',
    alive: true,
    ttl: 10,
    timeoutID: null,
    dismissable: true
  },

  initialize: function initialize(attributes) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (options.autoStart === true) {
      this.start();
    }
  },
  start: function start() {
    var _this = this;

    if (this.get('ttl') > 0) {
      this.set('timeoutID', window.setTimeout(function () {
        _this.unset('timeoutID');
        _this.dismiss();
      }, this.get('ttl') * 1000));
    }
  },
  dismiss: function dismiss() {
    this.set('alive', false);
    this.stop();
    if (!_underscore2.default.isUndefined(this.collection)) {
      this.collection.remove(this);
    }
  },
  stop: function stop() {
    if (this.has('timeoutID') && _underscore2.default.isNumber(this.get('timeoutID'))) {
      window.clearTimeout(this.get('timeoutID'));
    }
  }
});

exports.default = ToastModel;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toastTemplate = __webpack_require__(25);

var ToastView = _backbone2.default.View.extend({
  template: toastTemplate,

  ui: {
    dismiss: '[data-js-ui-button-dismiss]'
  },

  events: {
    'click @ui.dismiss': 'onClickDismiss'
  },

  onClickDismiss: function onClickDismiss() {
    this.model.dismiss();
  }
});

exports.default = ToastView;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _backbone3 = __webpack_require__(6);

var _backbone4 = _interopRequireDefault(_backbone3);

var _ToastCollectionView = __webpack_require__(18);

var _ToastCollectionView2 = _interopRequireDefault(_ToastCollectionView);

var _ToastCollection = __webpack_require__(17);

var _ToastCollection2 = _interopRequireDefault(_ToastCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToasterService = _backbone2.default.Object.extend({
  initialize: function initialize() {
    this.collection = new _ToastCollection2.default();
    this.channel = _backbone4.default.channel('toaster');
    this.view = new _ToastCollectionView2.default({ collection: this.collection });
    this.region.show(this.view);
  },


  serviceName: 'toaster',

  region: null,

  channelName: 'toaster',

  radioEvents: {
    toast: 'onToast',
    clean: 'onClean'
  },

  onToast: function onToast(flavor, message) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    this.collection.add(_extends({
      flavor: flavor,
      message: message,
      ttl: 10
    }, options));
  },
  onClean: function onClean() {
    this.collection.reset();
  }
});

exports.default = ToasterService;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ToasterService = __webpack_require__(21);

var _ToasterService2 = _interopRequireDefault(_ToasterService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_ToasterService2.default];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(5);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"Application-body\">\n  <main class=\"Application-main\" data-js-region-editor></main>\n  <aside class=\"Application-aside Application-aside--left\" data-js-region-settings></aside>\n  <aside class=\"Application-aside\" data-js-region-help></aside>\n</div>\n<div class=\"Application-toaster\" data-js-region-toaster></div>\n";
},"useData":true});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(5);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"Editor-target\" data-js-ui-target>\n  <div class=\"Editor-targetBox\" data-js-ui-targetbox>\n    <span class=\"Editor-targetIcon typcn typcn-upload\"></span>\n    <p class=\"Editor-targetText\">Drop a file or click to upload.</p>\n  </div>\n</div>\n<canvas class=\"Editor-canvas\" data-js-ui-canvas></canvas>\n";
},"useData":true});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(5);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<alert class=\"Toast Toast--"
    + alias4(((helper = (helper = helpers.flavor || (depth0 != null ? depth0.flavor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flavor","hash":{},"data":data}) : helper)))
    + "\">\n  <p>"
    + alias4(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n  <span class=\"typcn typcn-times\" data-js-ui-dismiss></span>\n</alert>\n";
},"useData":true});

/***/ })
],[16]);
//# sourceMappingURL=main.js.map