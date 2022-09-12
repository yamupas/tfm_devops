/**
 * @fileoverview added by tsickle
 * Generated from: split-pane.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { MtxSplitComponent } from './split.component';
import { getInputPositiveNumber, getInputBoolean } from './utils';
export class MtxSplitPaneDirective {
    /**
     * @param {?} ngZone
     * @param {?} elRef
     * @param {?} renderer
     * @param {?} split
     */
    constructor(ngZone, elRef, renderer, split) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        ////
        this._size = null;
        ////
        this._minSize = null;
        ////
        this._maxSize = null;
        ////
        this._lockSize = false;
        ////
        this._visible = true;
        this.lockListeners = [];
        this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-pane');
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set order(v) {
        this._order = getInputPositiveNumber(v, null);
        this.split.updateArea(this, true, false);
    }
    /**
     * @return {?}
     */
    get order() {
        return this._order;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set size(v) {
        this._size = getInputPositiveNumber(v, null);
        this.split.updateArea(this, false, true);
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set minSize(v) {
        this._minSize = getInputPositiveNumber(v, null);
        this.split.updateArea(this, false, true);
    }
    /**
     * @return {?}
     */
    get minSize() {
        return this._minSize;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set maxSize(v) {
        this._maxSize = getInputPositiveNumber(v, null);
        this.split.updateArea(this, false, true);
    }
    /**
     * @return {?}
     */
    get maxSize() {
        return this._maxSize;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set lockSize(v) {
        this._lockSize = getInputBoolean(v);
        this.split.updateArea(this, false, true);
    }
    /**
     * @return {?}
     */
    get lockSize() {
        return this._lockSize;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set visible(v) {
        this._visible = getInputBoolean(v);
        if (this._visible) {
            this.split.showArea(this);
            this.renderer.removeClass(this.elRef.nativeElement, 'mtx-split-pane-hidden');
        }
        else {
            this.split.hideArea(this);
            this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-pane-hidden');
        }
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.split.addArea(this);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                // Limit only flex-basis transition to trigger the event
                if (event.propertyName === 'flex-basis') {
                    this.split.notify('transitionEnd', -1);
                }
            }));
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setStyleOrder(value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    }
    /**
     * @param {?} grow
     * @param {?} shrink
     * @param {?} basis
     * @param {?} isMin
     * @param {?} isMax
     * @return {?}
     */
    setStyleFlex(grow, shrink, basis, isMin, isMax) {
        // Need 3 separated properties to work on IE11 (https://github.com/angular/flex-layout/issues/323)
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', grow);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', shrink);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', basis);
        if (isMin === true) {
            this.renderer.addClass(this.elRef.nativeElement, 'mtx-min');
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, 'mtx-min');
        }
        if (isMax === true) {
            this.renderer.addClass(this.elRef.nativeElement, 'mtx-max');
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, 'mtx-max');
        }
    }
    /**
     * @return {?}
     */
    lockEvents() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'selectstart', (/**
             * @param {?} e
             * @return {?}
             */
            (e) => false)));
            this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'dragstart', (/**
             * @param {?} e
             * @return {?}
             */
            (e) => false)));
        }));
    }
    /**
     * @return {?}
     */
    unlockEvents() {
        while (this.lockListeners.length > 0) {
            /** @type {?} */
            const fct = this.lockListeners.pop();
            if (fct) {
                fct();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
    }
}
MtxSplitPaneDirective.decorators = [
    { type: Directive, args: [{
                selector: 'mtx-split-pane, [mtx-split-pane]',
                exportAs: 'mtxSplitPane',
            },] }
];
/** @nocollapse */
MtxSplitPaneDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: MtxSplitComponent }
];
MtxSplitPaneDirective.propDecorators = {
    order: [{ type: Input }],
    size: [{ type: Input }],
    minSize: [{ type: Input }],
    maxSize: [{ type: Input }],
    lockSize: [{ type: Input }],
    visible: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype._order;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype._size;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype._minSize;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype._maxSize;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype._lockSize;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype._visible;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype.transitionListener;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype.lockListeners;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype.ngZone;
    /** @type {?} */
    MtxSplitPaneDirective.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MtxSplitPaneDirective.prototype.split;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtcGFuZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctbWF0ZXJvL2V4dGVuc2lvbnMvc3BsaXQtcGFuZS8iLCJzb3VyY2VzIjpbInNwbGl0LXBhbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFNbEUsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7OztJQThGaEMsWUFDVSxNQUFjLEVBQ2YsS0FBaUIsRUFDaEIsUUFBbUIsRUFDbkIsS0FBd0I7UUFIeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQWpHMUIsV0FBTSxHQUFrQixJQUFJLENBQUM7O1FBYzdCLFVBQUssR0FBa0IsSUFBSSxDQUFDOztRQWM1QixhQUFRLEdBQWtCLElBQUksQ0FBQzs7UUFjL0IsYUFBUSxHQUFrQixJQUFJLENBQUM7O1FBYy9CLGNBQVMsR0FBRyxLQUFLLENBQUM7O1FBY2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFxQlAsa0JBQWEsR0FBc0IsRUFBRSxDQUFDO1FBUXJELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDckUsQ0FBQzs7Ozs7SUFsR0QsSUFBYSxLQUFLLENBQUMsQ0FBZ0I7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBTUQsSUFBYSxJQUFJLENBQUMsQ0FBZ0I7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBTUQsSUFBYSxPQUFPLENBQUMsQ0FBZ0I7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBTUQsSUFBYSxPQUFPLENBQUMsQ0FBZ0I7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBTUQsSUFBYSxRQUFRLENBQUMsQ0FBVTtRQUM5QixJQUFJLENBQUMs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QUMsQ0FBQztJQUM5QixDQUFDOzs7WUFyTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7O1lBUm9FLE1BQU07WUFBaEQsVUFBVTtZQUFFLFNBQVM7WUFFdkMsaUJBQWlCOzs7b0JBVXZCLEtBQUs7bUJBY0wsS0FBSztzQkFjTCxLQUFLO3NCQWNMLEtBQUs7dUJBY0wsS0FBSztzQkFjTCxLQUFLOzs7Ozs7O0lBeEVOLHVDQUFxQzs7Ozs7SUFjckMsc0NBQW9DOzs7OztJQWNwQyx5Q0FBdUM7Ozs7O0lBY3ZDLHlDQUF1Qzs7Ozs7SUFjdkMsMENBQTBCOzs7OztJQWMxQix5Q0FBd0I7Ozs7O0lBb0J4QixtREFBdUM7Ozs7O0lBQ3ZDLDhDQUF1RDs7Ozs7SUFHckQsdUNBQXNCOztJQUN0QixzQ0FBd0I7Ozs7O0lBQ3hCLHlDQUEyQjs7Ozs7SUFDM0Isc0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNdHhTcGxpdENvbXBvbmVudCB9IGZyb20gJy4vc3BsaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZ2V0SW5wdXRQb3NpdGl2ZU51bWJlciwgZ2V0SW5wdXRCb29sZWFuIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ210eC1zcGxpdC1wYW5lLCBbbXR4LXNwbGl0LXBhbmVdJyxcclxuICBleHBvcnRBczogJ210eFNwbGl0UGFuZScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdHhTcGxpdFBhbmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICBASW5wdXQoKSBzZXQgb3JkZXIodjogbnVtYmVyIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fb3JkZXIgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIG51bGwpO1xyXG5cclxuICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCB0cnVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgb3JkZXIoKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3JkZXI7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX3NpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICBASW5wdXQoKSBzZXQgc2l6ZSh2OiBudW1iZXIgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zaXplID0gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcih2LCBudWxsKTtcclxuXHJcbiAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNpemUoKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfbWluU2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBtaW5TaXplKHY6IG51bWJlciB8IG51bGwpIHtcclxuICAgIHRoaXMuX21pblNpemUgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIG51bGwpO1xyXG5cclxuICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgbWluU2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9taW5TaXplO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF9tYXhTaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQElucHV0KCkgc2V0IG1heFNpemUodjogbnVtYmVyIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4U2l6ZSA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgbnVsbCk7XHJcblxyXG4gICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldCBtYXhTaXplKCk6IG51bWJlciB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heFNpemU7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX2xvY2tTaXplID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBsb2NrU2l6ZSh2OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9sb2NrU2l6ZSA9IGdldElucHV0Qm9vbGVhbih2KTtcclxuXHJcbiAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvY2tTaXplKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvY2tTaXplO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF92aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgc2V0IHZpc2libGUodjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdmlzaWJsZSA9IGdldElucHV0Qm9vbGVhbih2KTtcclxuXHJcbiAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xyXG4gICAgICB0aGlzLnNwbGl0LnNob3dBcmVhKHRoaXMpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ210eC1zcGxpdC1wYW5lLWhpZGRlbicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zcGxpdC5oaWRlQXJlYSh0aGlzKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtc3BsaXQtcGFuZS1oaWRkZW4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgdHJhbnNpdGlvbkxpc3RlbmVyOiAoKSA9PiB2b2lkO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbG9ja0xpc3RlbmVyczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHVibGljIGVsUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBzcGxpdDogTXR4U3BsaXRDb21wb25lbnRcclxuICApIHtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LXNwbGl0LXBhbmUnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3BsaXQuYWRkQXJlYSh0aGlzKTtcclxuXHJcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXHJcbiAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICd0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICAoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkgPT4ge1xyXG4gICAgICAgICAgLy8gTGltaXQgb25seSBmbGV4LWJhc2lzIHRyYW5zaXRpb24gdG8gdHJpZ2dlciB0aGUgZXZlbnRcclxuICAgICAgICAgIGlmIChldmVudC5wcm9wZXJ0eU5hbWUgPT09ICdmbGV4LWJhc2lzJykge1xyXG4gICAgICAgICAgICB0aGlzLnNwbGl0Lm5vdGlmeSgndHJhbnNpdGlvbkVuZCcsIC0xKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRTdHlsZU9yZGVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3JkZXInLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0U3R5bGVGbGV4KFxyXG4gICAgZ3JvdzogbnVtYmVyLFxyXG4gICAgc2hyaW5rOiBudW1iZXIsXHJcbiAgICBiYXNpczogc3RyaW5nLFxyXG4gICAgaXNNaW46IGJvb2xlYW4sXHJcbiAgICBpc01heDogYm9vbGVhblxyXG4gICk6IHZvaWQge1xyXG4gICAgLy8gTmVlZCAzIHNlcGFyYXRlZCBwcm9wZXJ0aWVzIHRvIHdvcmsgb24gSUUxMSAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvZmxleC1sYXlvdXQvaXNzdWVzLzMyMylcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1ncm93JywgZ3Jvdyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtc2hyaW5rJywgc2hyaW5rKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIGJhc2lzKTtcclxuXHJcbiAgICBpZiAoaXNNaW4gPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtbWluJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ210eC1taW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNNYXggPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtbWF4Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ210eC1tYXgnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2NrRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLmxvY2tMaXN0ZW5lcnMucHVzaChcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RzdGFydCcsIChlOiBFdmVudCkgPT4gZmFsc2UpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubG9ja0xpc3RlbmVycy5wdXNoKFxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RyYWdzdGFydCcsIChlOiBFdmVudCkgPT4gZmFsc2UpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bmxvY2tFdmVudHMoKTogdm9pZCB7XHJcbiAgICB3aGlsZSAodGhpcy5sb2NrTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZmN0ID0gdGhpcy5sb2NrTGlzdGVuZXJzLnBvcCgpO1xyXG4gICAgICBpZiAoZmN0KSB7XHJcbiAgICAgICAgZmN0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudW5sb2NrRXZlbnRzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyKSB7XHJcbiAgICAgIHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zcGxpdC5yZW1vdmVBcmVhKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iXX0=