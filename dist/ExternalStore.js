var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useSyncExternalStore } from "react";
export var useCursor = function (store) {
    var subscribe = function (listener) { return store.subscribe(listener); };
    var getSnapshot = function () { return store.get(); };
    return useSyncExternalStore(subscribe, getSnapshot);
};
var ExternalStore = (function () {
    function ExternalStore(initState) {
        this.initState = initState;
        this.listeners = [];
        this.state = __assign({}, this.initState);
    }
    ExternalStore.prototype.subscribe = function (listener) {
        var _this = this;
        this.listeners = __spreadArray(__spreadArray([], this.listeners, true), [listener], false);
        return function () {
            _this.listeners = _this.listeners.filter(function (l) { return l !== listener; });
        };
    };
    ExternalStore.prototype.get = function (fn) {
        return fn ? fn(this.state) : this.state;
    };
    ExternalStore.prototype.set = function (state) {
        this.state = state;
        return this;
    };
    ExternalStore.prototype.getSnapshot = function () {
        return this.get();
    };
    ExternalStore.prototype.update = function (fn) {
        this.state = fn(this.state);
        return this;
    };
    ExternalStore.prototype.push = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    ExternalStore.prototype.createCursorOn = function (key) {
        return new ExternalStoreCursor(this, function (state) { return state[key]; }, function (state, newValue) {
            var _a;
            return Array.isArray(state)
                ? state
                    .slice()
                    .map(function (o, i) { return (i === key ? newValue : o); })
                : __assign(__assign({}, state), (_a = {}, _a[key] = newValue, _a));
        });
    };
    return ExternalStore;
}());
export { ExternalStore };
var ExternalStoreCursor = (function () {
    function ExternalStoreCursor(cursor, getSnapshotAt, updateAt) {
        this.cursor = cursor;
        this.getSnapshotAt = getSnapshotAt;
        this.updateAt = updateAt;
        this.listeners = [];
    }
    ExternalStoreCursor.prototype.get = function (fn) {
        var snapshot = this.getSnapshotAt(this.cursor.get());
        return fn ? fn(snapshot) : snapshot;
    };
    ExternalStoreCursor.prototype.set = function (state) {
        return this.update(function () { return state; });
    };
    ExternalStoreCursor.prototype.update = function (fn) {
        var _this = this;
        this.cursor.update(function (state) {
            return _this.updateAt(state, fn(_this.getSnapshotAt(state)));
        });
        return this;
    };
    ExternalStoreCursor.prototype.subscribe = function (listener2) {
        var _this = this;
        this.listeners = __spreadArray(__spreadArray([], this.listeners, true), [listener2], false);
        return function () {
            _this.listeners = _this.listeners.filter(function (l) { return l !== listener2; });
        };
    };
    ExternalStoreCursor.prototype.push = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    ExternalStoreCursor.prototype.createCursorOn = function (key) {
        return new ExternalStoreCursor(this, function (state) { return state[key]; }, function (state, newValue) {
            var _a;
            return Array.isArray(state)
                ? state
                    .slice()
                    .map(function (o, i) { return (i === key ? newValue : o); })
                : __assign(__assign({}, state), (_a = {}, _a[key] = newValue, _a));
        });
    };
    return ExternalStoreCursor;
}());
export { ExternalStoreCursor };
//# sourceMappingURL=ExternalStore.js.map