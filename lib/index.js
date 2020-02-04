"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPageList(options) {
    var store = new PaginationStore(options);
    return store.getCurrentList();
}
exports.getPageList = getPageList;
var PaginationStore = /** @class */ (function () {
    function PaginationStore(options) {
        if (options === void 0) { options = { total: 0 }; }
        this.total = options.total || 0;
        this.current = options.current || 1;
        this.pageSize = options.pageSize || 20;
        this.pageRange = options.pageRange || 5;
    }
    PaginationStore.prototype.getPageTotal = function () {
        var _a = this, total = _a.total, pageSize = _a.pageSize;
        return Math.max(Math.ceil(total / pageSize), 1);
    };
    PaginationStore.prototype.getPrevious = function () {
        var current = this.current;
        return current <= 1 ? null : current - 1;
    };
    PaginationStore.prototype.getNext = function () {
        var total = this.getPageTotal();
        var current = this.current;
        return current >= total ? null : current + 1;
    };
    PaginationStore.prototype.previous = function () {
        var prev = this.getPrevious();
        return prev ? ((this.current = prev), true) : false;
    };
    PaginationStore.prototype.next = function () {
        var next = this.getNext();
        return next ? ((this.current = next), true) : false;
    };
    PaginationStore.prototype.isFirstPage = function (current) {
        return current <= 1;
    };
    PaginationStore.prototype.isLastPage = function (current) {
        var total = this.getPageTotal();
        return current >= total;
    };
    PaginationStore.prototype.getCurrentList = function () {
        var _a = this, pageRange = _a.pageRange, current = _a.current;
        var pageTotal = this.getPageTotal();
        var p = ~~(pageRange / 2); //Math.floor
        var list = [];
        var end = Math.min(current + p, pageTotal - 1);
        var start = Math.max(end - pageRange + 1, 2);
        list.push({
            page: 1,
            isCurrent: current === 1,
        });
        //showPrevMore
        if (start > 2) {
            list.push({
                page: null,
                isPreviousMore: true,
            });
        }
        var cpn = end - start + 1;
        if (cpn < pageRange) {
            end = Math.min(pageTotal - 1, end + pageRange - cpn);
        }
        for (var page = start; page <= end; page++) {
            list.push({
                page: page,
                isCurrent: current === page,
            });
        }
        //showNextMore
        if (end < pageTotal - 1) {
            list.push({
                page: null,
                isNextMore: true,
            });
        }
        if (pageTotal > 1) {
            list.push({
                page: pageTotal,
                isCurrent: current === pageTotal,
            });
        }
        return list;
    };
    return PaginationStore;
}());
exports.PaginationStore = PaginationStore;
exports.default = PaginationStore;
