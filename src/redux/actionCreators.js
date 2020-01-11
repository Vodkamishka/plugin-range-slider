"use strict";
exports.__esModule = true;
var actions_1 = require("./actions");
var loadFirstData = function (data) {
    return {
        type: actions_1.LOAD_FIRST_DATA,
        amount: data
    };
};
exports.loadFirstData = loadFirstData;
var changeMin = function (min) {
    return {
        type: actions_1.CHANGE_MIN,
        amount: min
    };
};
exports.changeMin = changeMin;
var changeMax = function (max) {
    return {
        type: actions_1.CHANGE_MAX,
        amount: max
    };
};
exports.changeMax = changeMax;
var changeValueFirst = function (value) {
    return {
        type: actions_1.CHANGE_VALUE_FIRST,
        amount: value
    };
};
exports.changeValueFirst = changeValueFirst;
var changeValueSecond = function (value) {
    return {
        type: actions_1.CHANGE_VALUE_SECOND,
        amount: value
    };
};
exports.changeValueSecond = changeValueSecond;
var disableRunnersValues = function (disable) {
    return {
        type: actions_1.DISABLE_RUNNERS_VALUES,
        amount: disable
    };
};
exports.disableRunnersValues = disableRunnersValues;
var toggleVerticalPosition = function (toggle) {
    return {
        type: actions_1.TOGGLE_VERTICAL_POSITION,
        amount: toggle
    };
};
exports.toggleVerticalPosition = toggleVerticalPosition;
var enableOneRunner = function (enable) {
    return {
        type: actions_1.ENABLE_ONE_RUNNER,
        amount: enable
    };
};
exports.enableOneRunner = enableOneRunner;
var changeStep = function (step) {
    return {
        type: actions_1.CHANGE_STEP,
        amount: step
    };
};
exports.changeStep = changeStep;
