"use strict";
exports.__esModule = true;
var createStore_1 = require("../../redux/createStore");
var reducer_1 = require("../../redux/reducer");
var actionCreators_1 = require("../../redux/actionCreators");
var Model = /** @class */ (function () {
    function Model(value) {
        var _this = this;
        this.getDataFromController = function (options) {
            _this.store.dispatch(actionCreators_1.loadFirstData(options));
            //console.log(store.getState())
        };
        this.subscribe = function (f) {
            _this.store.subscribe(function () { return f(_this.store.getState()); });
        };
        this.dispatchBallValueFirst = function (left) { return _this.store.dispatch(actionCreators_1.changeBallValueFirst(left)); };
        this.dispatchBallValueSecond = function (right) { return _this.store.dispatch(actionCreators_1.changeBallValueSecond(right)); };
        this.dispatchMin = function (min) { return _this.store.dispatch(actionCreators_1.changeMin(min)); };
        this.dispatchMax = function (max) { return _this.store.dispatch(actionCreators_1.changeMax(max)); };
        this.dispatchValueFirst = function (value) { return _this.store.dispatch(actionCreators_1.changeValueFirst(value)); };
        this.dispatchValueSecond = function (value) { return _this.store.dispatch(actionCreators_1.changeValueSecond(value)); };
        this.dispatchDisableValues = function () { return _this.store.dispatch(actionCreators_1.disableRunnersValues()); };
        this.dispatchVerticalView = function () { return _this.store.dispatch(actionCreators_1.toggleVerticalPosition()); };
        this.wrapper = value;
        this.store = createStore_1["default"](reducer_1["default"]);
    }
    return Model;
}());
exports["default"] = Model;
