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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppView__ = __webpack_require__(10);





const App = __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default.a.Application.extend({
  region: {
    el: '[data-js-region-app]',
    replaceElement: true
  },

  onStart() {
    const appView = new __WEBPACK_IMPORTED_MODULE_2__AppView__["a" /* default */]();
    this.showView(appView);
    if (!__WEBPACK_IMPORTED_MODULE_0_backbone___default.a.History.started) {
      __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.history.start();
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(15);






const applicationTemplate = __webpack_require__(23);

const AppView = __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default.a.View.extend({
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

  onRender() {
    __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_2__services__["a" /* default */], BaseService => {
      const Service = BaseService.extend({
        region: this.getRegion(BaseService.prototype.serviceName)
      });
      return new Service();
    });
    __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_3__components__["a" /* default */], BaseComponent => {
      if (this.hasRegion(BaseComponent.prototype.componentName)) {
        const Component = BaseComponent.extend({
          region: this.getRegion(BaseComponent.prototype.componentName)
        });
        return new Component();
      }
      return null;
    });
  }
});

/* harmony default export */ __webpack_exports__["a"] = (AppView);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EditorRouter__ = __webpack_require__(13);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





const EditorComponent = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Object.extend({
  componentName: 'editor',

  region: null,

  Router: __WEBPACK_IMPORTED_MODULE_1__EditorRouter__["a" /* default */],

  initialize(options = {}) {
    this.router = new this.Router(_extends({}, options, { region: this.region }));
  }
});

/* harmony default export */ __webpack_exports__["a"] = (EditorComponent);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);


const EditorModel = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Model.extend({
  defaults: {
    image: null
  }
});

/* harmony default export */ __webpack_exports__["a"] = (EditorModel);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EditorModel__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EditorView__ = __webpack_require__(14);





const EditorController = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Object.extend({
  initialize(options = {}) {
    this.region = options.region;
  },

  showEditor() {
    const model = new __WEBPACK_IMPORTED_MODULE_1__EditorModel__["a" /* default */]();
    this.region.show(new __WEBPACK_IMPORTED_MODULE_2__EditorView__["a" /* default */]({ model }));
  }
});

const EditorRouter = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.AppRouter.extend({
  initialize(options = {}) {
    this.controller = new EditorController(options);
  },

  appRoutes: {
    '(/)': 'showEditor'
  }
});

/* harmony default export */ __webpack_exports__["a"] = (EditorRouter);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone_marionette__);



const editorTemplate = __webpack_require__(24);

const EditorView = __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default.a.View.extend({
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

  onTargetDragOver(e) {
    e.preventDefault();
  },

  onTargetDragEnter(e) {
    e.preventDefault();
    this.ui.target.addClass('Editor-target--dragover');
    this.ui.targetBox.addClass('Editor-targetBox--dragover');
  },

  onTargetDragLeave(e) {
    e.preventDefault();
    this.ui.target.removeClass('Editor-target--dragover');
    this.ui.targetBox.removeClass('Editor-targetBox--dragover');
  },

  onTargetDrop(e) {
    e.preventDefault();
    const dataTransfer = e.originalEvent.dataTransfer;
    if (__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isObject(dataTransfer) && __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isArray(dataTransfer.files)) {
      this.model.trigger('drop', e.dataTransfer.files[0]);
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (EditorView);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Editor_EditorComponent__ = __webpack_require__(11);


/* harmony default export */ __webpack_exports__["a"] = ([__WEBPACK_IMPORTED_MODULE_0__Editor_EditorComponent__["a" /* default */]]);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_App__ = __webpack_require__(9);


const app = new __WEBPACK_IMPORTED_MODULE_0__application_App__["a" /* default */]();
window.app = app;
app.start();

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToastModel__ = __webpack_require__(19);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





const ToastCollection = __WEBPACK_IMPORTED_MODULE_0_backbone___default.a.Collection.extend({
  model(attributes, options = {}) {
    const autoStart = options.collection.autoStart;
    const modelOptions = _extends({}, options, { autoStart });
    return new __WEBPACK_IMPORTED_MODULE_1__ToastModel__["a" /* default */](attributes, modelOptions);
  },

  initialize(models, options = {}) {
    this.autoStart = options.autoStart;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (ToastCollection);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToastView__ = __webpack_require__(20);




const ToastCollectionView = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.CollectionView.extend({
  childView: __WEBPACK_IMPORTED_MODULE_1__ToastView__["a" /* default */]
});

/* harmony default export */ __webpack_exports__["a"] = (ToastCollectionView);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone__);



const ToastModel = __WEBPACK_IMPORTED_MODULE_1_backbone___default.a.Model.extend({
  defaults: {
    message: '',
    flavor: 'default',
    alive: true,
    ttl: 10,
    timeoutID: null,
    dismissable: true
  },

  initialize(attributes, options = {}) {
    if (options.autoStart === true) {
      this.start();
    }
  },

  start() {
    if (this.get('ttl') > 0) {
      this.set('timeoutID', window.setTimeout(() => {
        this.unset('timeoutID');
        this.dismiss();
      }, this.get('ttl') * 1000));
    }
  },

  dismiss() {
    this.set('alive', false);
    this.stop();
    if (!__WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isUndefined(this.collection)) {
      this.collection.remove(this);
    }
  },

  stop() {
    if (this.has('timeoutID') && __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.isNumber(this.get('timeoutID'))) {
      window.clearTimeout(this.get('timeoutID'));
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (ToastModel);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);


const toastTemplate = __webpack_require__(25);

const ToastView = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.View.extend({
  template: toastTemplate,

  ui: {
    dismiss: '[data-js-ui-button-dismiss]'
  },

  events: {
    'click @ui.dismiss': 'onClickDismiss'
  },

  onClickDismiss() {
    this.model.dismiss();
  }
});

/* harmony default export */ __webpack_exports__["a"] = (ToastView);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_radio__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_radio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone_radio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ToastCollectionView__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToastCollection__ = __webpack_require__(17);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







const ToasterService = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Object.extend({
  initialize() {
    this.collection = new __WEBPACK_IMPORTED_MODULE_3__ToastCollection__["a" /* default */]();
    this.channel = __WEBPACK_IMPORTED_MODULE_1_backbone_radio___default.a.channel('toaster');
    this.view = new __WEBPACK_IMPORTED_MODULE_2__ToastCollectionView__["a" /* default */]({ collection: this.collection });
    this.region.show(this.view);
  },

  serviceName: 'toaster',

  region: null,

  channelName: 'toaster',

  radioEvents: {
    toast: 'onToast',
    clean: 'onClean'
  },

  onToast(flavor, message, options = {}) {
    this.collection.add(_extends({
      flavor,
      message,
      ttl: 10
    }, options));
  },

  onClean() {
    this.collection.reset();
  }
});

/* harmony default export */ __webpack_exports__["a"] = (ToasterService);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toaster_ToasterService__ = __webpack_require__(21);


/* harmony default export */ __webpack_exports__["a"] = ([__WEBPACK_IMPORTED_MODULE_0__Toaster_ToasterService__["a" /* default */]]);

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