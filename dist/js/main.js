webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppView__ = __webpack_require__(9);





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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(14);






const applicationTemplate = __webpack_require__(20);

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
        region: this.getRegion(BaseService.name)
      });
      return new Service();
    });
    __WEBPACK_IMPORTED_MODULE_0_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_3__components__["a" /* default */], BaseComponent => {
      if (this.hasRegion(BaseComponent.name)) {
        const Component = BaseComponent.extend({
          region: this.getRegion(BaseComponent.name)
        });
        return new Component();
      }
      return null;
    });
  }
});

/* harmony default export */ __webpack_exports__["a"] = (AppView);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EditorRouter__ = __webpack_require__(12);




const EditorComponent = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Object.extend({
  name: 'editor',

  region: __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Region,

  Router: __WEBPACK_IMPORTED_MODULE_1__EditorRouter__["a" /* default */],

  initialize(options = {}) {
    this.router = new this.Router(options);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (EditorComponent);

/***/ }),
/* 11 */
/***/ (function(module, exports) {



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EditorModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EditorModel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__EditorModel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EditorView__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EditorView___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__EditorView__);





const EditorController = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Object.extend({
  initialize(options = {}) {
    this.region = options.region;
  },

  showEditor() {
    const model = new __WEBPACK_IMPORTED_MODULE_1__EditorModel___default.a();
    this.region.show(new __WEBPACK_IMPORTED_MODULE_2__EditorView___default.a({ model }));
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
/* 13 */
/***/ (function(module, exports) {



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Editor_EditorComponent__ = __webpack_require__(10);


/* harmony default export */ __webpack_exports__["a"] = ([__WEBPACK_IMPORTED_MODULE_0__Editor_EditorComponent__["a" /* default */]]);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_App__ = __webpack_require__(8);


const app = new __WEBPACK_IMPORTED_MODULE_0__application_App__["a" /* default */]();
window.app = app;
app.start();

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),
/* 16 */
/***/ (function(module, exports) {



/***/ }),
/* 17 */
/***/ (function(module, exports) {



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_radio__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_backbone_radio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_backbone_radio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ToastCollectionView__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ToastCollectionView___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ToastCollectionView__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToastCollection__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToastCollection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ToastCollection__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







const ToasterService = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Object.extend({
  initialize(options = {}) {
    this.region = options.region;
    this.collection = new __WEBPACK_IMPORTED_MODULE_3__ToastCollection___default.a();
    this.channel = __WEBPACK_IMPORTED_MODULE_1_backbone_radio___default.a.channel('toaster');
    this.view = new __WEBPACK_IMPORTED_MODULE_2__ToastCollectionView___default.a({ collection: this.collection });
    this.region.show(this.view);
  },

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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toaster_ToasterService__ = __webpack_require__(18);


/* harmony default export */ __webpack_exports__["a"] = ([__WEBPACK_IMPORTED_MODULE_0__Toaster_ToasterService__["a" /* default */]]);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(36);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"Application-body\">\n  <main class=\"Application-main\" data-js-region-edit></main>\n  <aside class=\"Application-aside Application-aside--left\" data-js-region-settings></aside>\n  <aside class=\"Application-aside\" data-js-region-help></aside>\n</div>\n";
},"useData":true});

/***/ })
],[15]);
//# sourceMappingURL=main.js.map