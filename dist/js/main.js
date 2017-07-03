webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppView__ = __webpack_require__(8);




const App = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.Application.extend({
  region: {
    el: '[data-js-region-app]',
    replaceElement: true
  },

  onStart() {
    const appView = new __WEBPACK_IMPORTED_MODULE_1__AppView__["a" /* default */]();
    this.showView(appView);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_backbone_marionette__);


const applicationTemplate = __webpack_require__(11);

const AppView = __WEBPACK_IMPORTED_MODULE_0_backbone_marionette___default.a.View.extend({
  className: 'Application',
  template: applicationTemplate
});

/* harmony default export */ __webpack_exports__["a"] = (AppView);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_App__ = __webpack_require__(7);


const app = new __WEBPACK_IMPORTED_MODULE_0__application_App__["a" /* default */]();
window.app = app;
app.start();

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(27);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Zoomroast</h1>\n";
},"useData":true});

/***/ })
],[9]);
//# sourceMappingURL=main.js.map