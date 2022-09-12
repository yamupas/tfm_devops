/**
 * @fileoverview added by tsickle
 * Generated from: grid.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var MtxGridService = /** @class */ (function () {
    function MtxGridService() {
    }
    /**
     * Get cell value from column key
     * @param data row data
     * @param col  column definition e.g. `a.b.c`
     */
    /**
     * Get cell value from column key
     * @param {?} data row data
     * @param {?} col  column definition e.g. `a.b.c`
     * @return {?}
     */
    MtxGridService.prototype.getCellValue = /**
     * Get cell value from column key
     * @param {?} data row data
     * @param {?} col  column definition e.g. `a.b.c`
     * @return {?}
     */
    function (data, col) {
        /** @type {?} */
        var keyArr = col.field ? col.field.split('.') : [];
        /** @type {?} */
        var tmp = '';
        keyArr.forEach((/**
         * @param {?} key
         * @param {?} i
         * @return {?}
         */
        function (key, i) {
            if (i === 0) {
                tmp = data[key];
            }
            else {
                tmp = tmp && tmp[key];
            }
        }));
        return tmp;
    };
    /**
     * Remove white spaces in a string and convert string to array
     * @param str string
     */
    /**
     * Remove white spaces in a string and convert string to array
     * @param {?} str string
     * @return {?}
     */
    MtxGridService.prototype.str2arr = /**
     * Remove white spaces in a string and convert string to array
     * @param {?} str string
     * @return {?}
     */
    function (str) {
        return str.replace(/[\r\n\s]/g, '').split(',');
    };
    MtxGridService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MtxGridService.ctorParameters = function () { return []; };
    return MtxGridService;
}());
export { MtxGridService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLW1hdGVyby9leHRlbnNpb25zL2RhdGEtZ3JpZC8iLCJzb3VyY2VzIjpbImdyaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFFRTtJQUFlLENBQUM7SUFFaEI7Ozs7T0FJRzs7Ozs7OztJQUNILHFDQUFZOzs7Ozs7SUFBWixVQUFhLElBQVEsRUFBRSxHQUFrQjs7WUFDakMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUVoRCxHQUFHLEdBQUcsRUFBRTtRQUVaLE1BQU0sQ0FBQyxPQUFPOzs7OztRQUFDLFVBQUMsR0FBVyxFQUFFLENBQVM7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNYLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7aUJBQU07Z0JBQ0wsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsZ0NBQU87Ozs7O0lBQVAsVUFBUSxHQUFXO1FBQ2pCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7O2dCQTlCRixVQUFVOzs7O0lBK0JYLHFCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0E5QlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTXR4R3JpZENvbHVtbiB9IGZyb20gJy4vZ3JpZC5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTXR4R3JpZFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGNlbGwgdmFsdWUgZnJvbSBjb2x1bW4ga2V5XHJcbiAgICogQHBhcmFtIGRhdGEgcm93IGRhdGFcclxuICAgKiBAcGFyYW0gY29sICBjb2x1bW4gZGVmaW5pdGlvbiBlLmcuIGBhLmIuY2BcclxuICAgKi9cclxuICBnZXRDZWxsVmFsdWUoZGF0YToge30sIGNvbDogTXR4R3JpZENvbHVtbikge1xyXG4gICAgY29uc3Qga2V5QXJyID0gY29sLmZpZWxkID8gY29sLmZpZWxkLnNwbGl0KCcuJykgOiBbXTtcclxuXHJcbiAgICBsZXQgdG1wID0gJyc7XHJcblxyXG4gICAga2V5QXJyLmZvckVhY2goKGtleTogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICB0bXAgPSBkYXRhW2tleV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG1wID0gdG1wICYmIHRtcFtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0bXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgd2hpdGUgc3BhY2VzIGluIGEgc3RyaW5nIGFuZCBjb252ZXJ0IHN0cmluZyB0byBhcnJheVxyXG4gICAqIEBwYXJhbSBzdHIgc3RyaW5nXHJcbiAgICovXHJcbiAgc3RyMmFycihzdHI6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFxyXFxuXFxzXS9nLCAnJykuc3BsaXQoJywnKTtcclxuICB9XHJcbn1cclxuIl19