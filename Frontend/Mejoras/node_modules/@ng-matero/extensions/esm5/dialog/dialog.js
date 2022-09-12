/**
 * @fileoverview added by tsickle
 * Generated from: dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxDialogComponent } from './dialog.component';
var ɵ0 = /**
 * @return {?}
 */
function () { }, ɵ1 = /**
 * @return {?}
 */
function () { };
/** @type {?} */
var defaults = {
    title: '',
    description: '',
    buttons: [
        {
            type: '',
            text: 'CLOSE',
            onClick: (ɵ0),
        },
        {
            type: 'warn',
            text: 'OK',
            onClick: (ɵ1),
        },
    ],
    width: '300px',
};
var MtxDialog = /** @class */ (function () {
    function MtxDialog(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?=} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    MtxDialog.prototype.originalOpen = /**
     * @param {?=} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    function (componentOrTemplateRef, config) {
        if (componentOrTemplateRef === void 0) { componentOrTemplateRef = MtxDialogComponent; }
        return this.dialog.open(componentOrTemplateRef, config);
    };
    /**
     * @param {?} config
     * @param {?=} componentOrTemplateRef
     * @return {?}
     */
    MtxDialog.prototype.open = /**
     * @param {?} config
     * @param {?=} componentOrTemplateRef
     * @return {?}
     */
    function (config, componentOrTemplateRef) {
        if (componentOrTemplateRef === void 0) { componentOrTemplateRef = MtxDialogComponent; }
        /** @type {?} */
        var data = Object.assign({}, defaults, config);
        return this.dialog.open(componentOrTemplateRef, __assign(__assign({}, data), { data: data }));
    };
    /**
     * @param {?} title
     * @param {?=} onOk
     * @return {?}
     */
    MtxDialog.prototype.alert = /**
     * @param {?} title
     * @param {?=} onOk
     * @return {?}
     */
    function (title, onOk) {
        if (onOk === void 0) { onOk = (/**
         * @return {?}
         */
        function () { }); }
        this.open({
            title: title,
            buttons: [
                {
                    type: 'warn',
                    text: 'OK',
                    onClick: (/**
                     * @return {?}
                     */
                    function () { return onOk(); }),
                },
            ],
            disableClose: true,
        });
    };
    /**
     * @param {?} title
     * @param {?=} onOk
     * @param {?=} onClose
     * @return {?}
     */
    MtxDialog.prototype.confirm = /**
     * @param {?} title
     * @param {?=} onOk
     * @param {?=} onClose
     * @return {?}
     */
    function (title, onOk, onClose) {
        if (onOk === void 0) { onOk = (/**
         * @return {?}
         */
        function () { }); }
        if (onClose === void 0) { onClose = (/**
         * @return {?}
         */
        function () { }); }
        this.open({
            title: title,
            buttons: [
                {
                    type: '',
                    text: 'CLOSE',
                    onClick: (/**
                     * @return {?}
                     */
                    function () { return onClose(); }),
                },
                {
                    type: 'warn',
                    text: 'OK',
                    onClick: (/**
                     * @return {?}
                     */
                    function () { return onOk(); }),
                },
            ],
            disableClose: true,
        });
    };
    MtxDialog.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MtxDialog.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return MtxDialog;
}());
export { MtxDialog };
if (false) {
    /** @type {?} */
    MtxDialog.prototype.dialog;
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLW1hdGVyby9leHRlbnNpb25zL2RpYWxvZy8iLCJzb3VyY2VzIjpbImRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQVV6QyxjQUFRLENBQUM7OztBQUtULGNBQVEsQ0FBQzs7SUFabEIsUUFBUSxHQUFrQjtJQUM5QixLQUFLLEVBQUUsRUFBRTtJQUNULFdBQVcsRUFBRSxFQUFFO0lBQ2YsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxNQUFXO1NBQ25CO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxNQUFXO1NBQ25CO0tBQ0Y7SUFDRCxLQUFLLEVBQUUsT0FBTztDQUNmO0FBRUQ7SUFFRSxtQkFBbUIsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUFJLENBQUM7Ozs7OztJQUV6QyxnQ0FBWTs7Ozs7SUFBWixVQUNFLHNCQUFrRixFQUNsRixNQUFXO1FBRFgsdUNBQUEsRUFBQSwyQ0FBa0Y7UUFHbEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7Ozs7SUFFRCx3QkFBSTs7Ozs7SUFBSixVQUNFLE1BQXFCLEVBQ3JCLHNCQUFrRjtRQUFsRix1Q0FBQSxFQUFBLDJDQUFrRjs7WUFFNUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0Isd0JBQ3pDLElBQUksS0FDUCxJQUFJLE1BQUEsSUFDSixDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQseUJBQUs7Ozs7O0lBQUwsVUFBTSxLQUFhLEVBQUUsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQTs7O1FBQU8sY0FBUSxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNSLEtBQUssT0FBQTtZQUNMLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPOzs7b0JBQUUsY0FBTSxPQUFBLElBQUksRUFBRSxFQUFOLENBQU0sQ0FBQTtpQkFFdEI7YUFDRjtZQUNELFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFRCwyQkFBTzs7Ozs7O0lBQVAsVUFBUSxLQUFhLEVBQUUsSUFBZ0IsRUFBRSxPQUFtQjtRQUFyQyxxQkFBQSxFQUFBOzs7UUFBTyxjQUFRLENBQUMsQ0FBQTtRQUFFLHdCQUFBLEVBQUE7OztRQUFVLGNBQVEsQ0FBQyxDQUFBO1FBQzFELElBQUksQ0FBQyxJQUFJLENBQUM7WUFDUixLQUFLLE9BQUE7WUFDTCxPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTzs7O29CQUFFLGNBQU0sT0FBQSxPQUFPLEVBQUUsRUFBVCxDQUFTLENBQUE7aUJBQ3pCO2dCQUNEO29CQUNFLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU87OztvQkFBRSxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFBO2lCQUN0QjthQUNGO1lBQ0QsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBdERGLFVBQVU7Ozs7Z0JBdkJGLFNBQVM7O0lBOEVsQixnQkFBQztDQUFBLEFBdkRELElBdURDO1NBdERZLFNBQVM7OztJQUNSLDJCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQgeyBNdHhEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXR4RGlhbG9nRGF0YSB9IGZyb20gJy4vZGlhbG9nLmNvbmZpZyc7XG5cbmNvbnN0IGRlZmF1bHRzOiBNdHhEaWFsb2dEYXRhID0ge1xuICB0aXRsZTogJycsXG4gIGRlc2NyaXB0aW9uOiAnJyxcbiAgYnV0dG9uczogW1xuICAgIHtcbiAgICAgIHR5cGU6ICcnLFxuICAgICAgdGV4dDogJ0NMT1NFJyxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHsgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICd3YXJuJyxcbiAgICAgIHRleHQ6ICdPSycsXG4gICAgICBvbkNsaWNrOiAoKSA9PiB7IH0sXG4gICAgfSxcbiAgXSxcbiAgd2lkdGg6ICczMDBweCcsXG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTXR4RGlhbG9nIHtcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBvcmlnaW5hbE9wZW4oXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxhbnk+IHwgVGVtcGxhdGVSZWY8YW55PiA9IE10eERpYWxvZ0NvbXBvbmVudCxcbiAgICBjb25maWc6IGFueVxuICApIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2cub3Blbihjb21wb25lbnRPclRlbXBsYXRlUmVmLCBjb25maWcpO1xuICB9XG5cbiAgb3BlbihcbiAgICBjb25maWc6IE10eERpYWxvZ0RhdGEsXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxhbnk+IHwgVGVtcGxhdGVSZWY8YW55PiA9IE10eERpYWxvZ0NvbXBvbmVudFxuICApIHtcbiAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH1cblxuICBhbGVydCh0aXRsZTogc3RyaW5nLCBvbk9rID0gKCkgPT4geyB9KSB7XG4gICAgdGhpcy5vcGVuKHtcbiAgICAgIHRpdGxlLFxuICAgICAgYnV0dG9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxuICAgICAgICAgIHRleHQ6ICdPSycsXG4gICAgICAgICAgb25DbGljazogKCkgPT4gb25PaygpXG4gICAgICAgICAgLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbmZpcm0odGl0bGU6IHN0cmluZywgb25PayA9ICgpID0+IHsgfSwgb25DbG9zZSA9ICgpID0+IHsgfSkge1xuICAgIHRoaXMub3Blbih7XG4gICAgICB0aXRsZSxcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgIHRleHQ6ICdDTE9TRScsXG4gICAgICAgICAgb25DbGljazogKCkgPT4gb25DbG9zZSgpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxuICAgICAgICAgIHRleHQ6ICdPSycsXG4gICAgICAgICAgb25DbGljazogKCkgPT4gb25PaygpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxufVxuIl19