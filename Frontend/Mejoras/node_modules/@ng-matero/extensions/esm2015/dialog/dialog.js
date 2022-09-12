/**
 * @fileoverview added by tsickle
 * Generated from: dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxDialogComponent } from './dialog.component';
const ɵ0 = /**
 * @return {?}
 */
() => { }, ɵ1 = /**
 * @return {?}
 */
() => { };
/** @type {?} */
const defaults = {
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
export class MtxDialog {
    /**
     * @param {?} dialog
     */
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?=} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    originalOpen(componentOrTemplateRef = MtxDialogComponent, config) {
        return this.dialog.open(componentOrTemplateRef, config);
    }
    /**
     * @param {?} config
     * @param {?=} componentOrTemplateRef
     * @return {?}
     */
    open(config, componentOrTemplateRef = MtxDialogComponent) {
        /** @type {?} */
        const data = Object.assign({}, defaults, config);
        return this.dialog.open(componentOrTemplateRef, Object.assign(Object.assign({}, data), { data }));
    }
    /**
     * @param {?} title
     * @param {?=} onOk
     * @return {?}
     */
    alert(title, onOk = (/**
     * @return {?}
     */
    () => { })) {
        this.open({
            title,
            buttons: [
                {
                    type: 'warn',
                    text: 'OK',
                    onClick: (/**
                     * @return {?}
                     */
                    () => onOk()),
                },
            ],
            disableClose: true,
        });
    }
    /**
     * @param {?} title
     * @param {?=} onOk
     * @param {?=} onClose
     * @return {?}
     */
    confirm(title, onOk = (/**
     * @return {?}
     */
    () => { }), onClose = (/**
     * @return {?}
     */
    () => { })) {
        this.open({
            title,
            buttons: [
                {
                    type: '',
                    text: 'CLOSE',
                    onClick: (/**
                     * @return {?}
                     */
                    () => onClose()),
                },
                {
                    type: 'warn',
                    text: 'OK',
                    onClick: (/**
                     * @return {?}
                     */
                    () => onOk()),
                },
            ],
            disableClose: true,
        });
    }
}
MtxDialog.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MtxDialog.ctorParameters = () => [
    { type: MatDialog }
];
if (false) {
    /** @type {?} */
    MtxDialog.prototype.dialog;
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLW1hdGVyby9leHRlbnNpb25zL2RpYWxvZy8iLCJzb3VyY2VzIjpbImRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFFeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBVXpDLEdBQUcsRUFBRSxHQUFHLENBQUM7OztBQUtULEdBQUcsRUFBRSxHQUFHLENBQUM7O01BWmxCLFFBQVEsR0FBa0I7SUFDOUIsS0FBSyxFQUFFLEVBQUU7SUFDVCxXQUFXLEVBQUUsRUFBRTtJQUNmLE9BQU8sRUFBRTtRQUNQO1lBQ0UsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sTUFBVztTQUNuQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sTUFBVztTQUNuQjtLQUNGO0lBQ0QsS0FBSyxFQUFFLE9BQU87Q0FDZjtBQUdELE1BQU0sT0FBTyxTQUFTOzs7O0lBQ3BCLFlBQW1CLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBSSxDQUFDOzs7Ozs7SUFFekMsWUFBWSxDQUNWLHlCQUFnRSxrQkFBa0IsRUFDbEYsTUFBVztRQUVYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxDQUNGLE1BQXFCLEVBQ3JCLHlCQUFnRSxrQkFBa0I7O2NBRTVFLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLGtDQUN6QyxJQUFJLEtBQ1AsSUFBSSxJQUNKLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFRCxLQUFLLENBQUMsS0FBYSxFQUFFLElBQUk7OztJQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1IsS0FBSztZQUNMLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPOzs7b0JBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7aUJBRXRCO2FBQ0Y7WUFDRCxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQWEsRUFBRSxJQUFJOzs7SUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUEsRUFBRSxPQUFPOzs7SUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNSLEtBQUs7WUFDTCxPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTzs7O29CQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO2lCQUN6QjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPOzs7b0JBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7aUJBQ3RCO2FBQ0Y7WUFDRCxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF0REYsVUFBVTs7OztZQXZCRixTQUFTOzs7O0lBeUJKLDJCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQgeyBNdHhEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXR4RGlhbG9nRGF0YSB9IGZyb20gJy4vZGlhbG9nLmNvbmZpZyc7XG5cbmNvbnN0IGRlZmF1bHRzOiBNdHhEaWFsb2dEYXRhID0ge1xuICB0aXRsZTogJycsXG4gIGRlc2NyaXB0aW9uOiAnJyxcbiAgYnV0dG9uczogW1xuICAgIHtcbiAgICAgIHR5cGU6ICcnLFxuICAgICAgdGV4dDogJ0NMT1NFJyxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHsgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICd3YXJuJyxcbiAgICAgIHRleHQ6ICdPSycsXG4gICAgICBvbkNsaWNrOiAoKSA9PiB7IH0sXG4gICAgfSxcbiAgXSxcbiAgd2lkdGg6ICczMDBweCcsXG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTXR4RGlhbG9nIHtcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBvcmlnaW5hbE9wZW4oXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxhbnk+IHwgVGVtcGxhdGVSZWY8YW55PiA9IE10eERpYWxvZ0NvbXBvbmVudCxcbiAgICBjb25maWc6IGFueVxuICApIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2cub3Blbihjb21wb25lbnRPclRlbXBsYXRlUmVmLCBjb25maWcpO1xuICB9XG5cbiAgb3BlbihcbiAgICBjb25maWc6IE10eERpYWxvZ0RhdGEsXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxhbnk+IHwgVGVtcGxhdGVSZWY8YW55PiA9IE10eERpYWxvZ0NvbXBvbmVudFxuICApIHtcbiAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH1cblxuICBhbGVydCh0aXRsZTogc3RyaW5nLCBvbk9rID0gKCkgPT4geyB9KSB7XG4gICAgdGhpcy5vcGVuKHtcbiAgICAgIHRpdGxlLFxuICAgICAgYnV0dG9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxuICAgICAgICAgIHRleHQ6ICdPSycsXG4gICAgICAgICAgb25DbGljazogKCkgPT4gb25PaygpXG4gICAgICAgICAgLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbmZpcm0odGl0bGU6IHN0cmluZywgb25PayA9ICgpID0+IHsgfSwgb25DbG9zZSA9ICgpID0+IHsgfSkge1xuICAgIHRoaXMub3Blbih7XG4gICAgICB0aXRsZSxcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgIHRleHQ6ICdDTE9TRScsXG4gICAgICAgICAgb25DbGljazogKCkgPT4gb25DbG9zZSgpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxuICAgICAgICAgIHRleHQ6ICdPSycsXG4gICAgICAgICAgb25DbGljazogKCkgPT4gb25PaygpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxufVxuIl19