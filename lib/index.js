"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var redux_actions_helpers_1 = require("redux-actions-helpers");
// actions
exports.start = redux_actions_helpers_1.createAction('@@router/START', function (payload) { return ({ payload: payload }); });
exports.end = redux_actions_helpers_1.createAction('@@router/END', function (payload) { return ({ payload: payload }); });
exports.error = redux_actions_helpers_1.createAction('@@router/ERROR', function (payload) { return ({ payload: payload }); });
// export const cancel = createAction('@@router/CANCEL');
// reducer
var initialState = {
    path: null,
    location: null,
    route: null,
    status: null,
    params: {},
    redirect: null,
    error: null,
    isTransition: false,
    ctx: {}
};
exports.reducer = redux_actions_helpers_1.handleActions((_a = {},
    _a[exports.start + exports.end + exports.error] = function (state, _a) {
        var payload = _a.payload;
        return __assign({}, state, payload);
    } /*,
    [cancel]: () => {
        return initialState;
    }*/,
    _a), { initialState: initialState });
// hook
exports.hookRedux = function (_a) {
    var dispatch = _a.dispatch, server = _a.server;
    return ({
        start: function (_a) {
            var path = _a.path, location = _a.location, ctx = _a.ctx;
            var plainCtx = ctx.toObject();
            dispatch(exports.start({ path: path, location: location, isTransition: true, ctx: plainCtx }));
        },
        resolve: function (_a) {
            var route = _a.route, status = _a.status, params = _a.params, redirect = _a.redirect, ctx = _a.ctx;
            var plainCtx = ctx.toObject();
            server && dispatch(exports.end({ route: route, status: status, params: params, redirect: redirect, isTransition: false, ctx: plainCtx }));
        },
        render: function (_a) {
            var route = _a.route, status = _a.status, params = _a.params, redirect = _a.redirect, ctx = _a.ctx;
            var plainCtx = ctx.toObject();
            dispatch(exports.end({ route: route, status: status, params: params, redirect: redirect, isTransition: false, ctx: plainCtx }));
        },
        error: function (_a) {
            var err = _a.error, ctx = _a.ctx;
            var plainCtx = ctx.toObject();
            dispatch(exports.error({ error: err, isTransition: false, ctx: plainCtx }));
        },
        cancel: function () {
            console.warn('router cancel transition');
            // dispatch(cancel());
        }
    });
};
var _a;
