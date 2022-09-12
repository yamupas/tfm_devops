/**
 * @fileoverview added by tsickle
 * Generated from: grid.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class MtxGridService {
    constructor() { }
    /**
     * Get cell value from column key
     * @param {?} data row data
     * @param {?} col  column definition e.g. `a.b.c`
     * @return {?}
     */
    getCellValue(data, col) {
        /** @type {?} */
        const keyArr = col.field ? col.field.split('.') : [];
        /** @type {?} */
        let tmp = '';
        keyArr.forEach((/**
         * @param {?} key
         * @param {?} i
         * @return {?}
         */
        (key, i) => {
            if (i === 0) {
                tmp = data[key];
            }
            else {
                tmp = tmp && tmp[key];
            }
        }));
        return tmp;
    }
    /**
     * Remove white spaces in a string and convert string to array
     * @param {?} str string
     * @return {?}
     */
    str2arr(str) {
        return str.replace(/[\r\n\s]/g, '').split(',');
    }
}
MtxGridService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MtxGridService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLW1hdGVyby9leHRlbnNpb25zL2RhdGEtZ3JpZC8iLCJzb3VyY2VzIjpbImdyaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsTUFBTSxPQUFPLGNBQWM7SUFDekIsZ0JBQWUsQ0FBQzs7Ozs7OztJQU9oQixZQUFZLENBQUMsSUFBUSxFQUFFLEdBQWtCOztjQUNqQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBRWhELEdBQUcsR0FBRyxFQUFFO1FBRVosTUFBTSxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxHQUFXLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNYLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7aUJBQU07Z0JBQ0wsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBTUQsT0FBTyxDQUFDLEdBQVc7UUFDakIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7O1lBOUJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE10eEdyaWRDb2x1bW4gfSBmcm9tICcuL2dyaWQuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE10eEdyaWRTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBjZWxsIHZhbHVlIGZyb20gY29sdW1uIGtleVxyXG4gICAqIEBwYXJhbSBkYXRhIHJvdyBkYXRhXHJcbiAgICogQHBhcmFtIGNvbCAgY29sdW1uIGRlZmluaXRpb24gZS5nLiBgYS5iLmNgXHJcbiAgICovXHJcbiAgZ2V0Q2VsbFZhbHVlKGRhdGE6IHt9LCBjb2w6IE10eEdyaWRDb2x1bW4pIHtcclxuICAgIGNvbnN0IGtleUFyciA9IGNvbC5maWVsZCA/IGNvbC5maWVsZC5zcGxpdCgnLicpIDogW107XHJcblxyXG4gICAgbGV0IHRtcCA9ICcnO1xyXG5cclxuICAgIGtleUFyci5mb3JFYWNoKChrZXk6IHN0cmluZywgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgdG1wID0gZGF0YVtrZXldO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRtcCA9IHRtcCAmJiB0bXBba2V5XTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdG1wO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHdoaXRlIHNwYWNlcyBpbiBhIHN0cmluZyBhbmQgY29udmVydCBzdHJpbmcgdG8gYXJyYXlcclxuICAgKiBAcGFyYW0gc3RyIHN0cmluZ1xyXG4gICAqL1xyXG4gIHN0cjJhcnIoc3RyOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcclxcblxcc10vZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==