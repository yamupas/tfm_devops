/**
 * @fileoverview added by tsickle
 * Generated from: split-pane.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { MtxSplitComponent } from './split.component';
import { getInputPositiveNumber, getInputBoolean } from './utils';
var MtxSplitPaneDirective = /** @class */ (function () {
    function MtxSplitPaneDirective(ngZone, elRef, renderer, split) {
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
    Object.defineProperty(MtxSplitPaneDirective.prototype, "order", {
        get: /**
         * @return {?}
         */
        function () {
            return this._order;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._order = getInputPositiveNumber(v, null);
            this.split.updateArea(this, true, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitPaneDirective.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._size = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitPaneDirective.prototype, "minSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._minSize = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitPaneDirective.prototype, "maxSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._maxSize = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitPaneDirective.prototype, "lockSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lockSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._lockSize = getInputBoolean(v);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitPaneDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._visible = getInputBoolean(v);
            if (this._visible) {
                this.split.showArea(this);
                this.renderer.removeClass(this.elRef.nativeElement, 'mtx-split-pane-hidden');
            }
            else {
                this.split.hideArea(this);
                this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-pane-hidden');
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MtxSplitPaneDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.split.addArea(this);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.transitionListener = _this.renderer.listen(_this.elRef.nativeElement, 'transitionend', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                // Limit only flex-basis transition to trigger the event
                if (event.propertyName === 'flex-basis') {
                    _this.split.notify('transitionEnd', -1);
                }
            }));
        }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MtxSplitPaneDirective.prototype.setStyleOrder = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    };
    /**
     * @param {?} grow
     * @param {?} shrink
     * @param {?} basis
     * @param {?} isMin
     * @param {?} isMax
     * @return {?}
     */
    MtxSplitPaneDirective.prototype.setStyleFlex = /**
     * @param {?} grow
     * @param {?} shrink
     * @param {?} basis
     * @param {?} isMin
     * @param {?} isMax
     * @return {?}
     */
    function (grow, shrink, basis, isMin, isMax) {
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
    };
    /**
     * @return {?}
     */
    MtxSplitPaneDirective.prototype.lockEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'selectstart', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return false; })));
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'dragstart', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return false; })));
        }));
    };
    /**
     * @return {?}
     */
    MtxSplitPaneDirective.prototype.unlockEvents = /**
     * @return {?}
     */
    function () {
        while (this.lockListeners.length > 0) {
            /** @type {?} */
            var fct = this.lockListeners.pop();
            if (fct) {
                fct();
            }
        }
    };
    /**
     * @return {?}
     */
    MtxSplitPaneDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
    };
    MtxSplitPaneDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'mtx-split-pane, [mtx-split-pane]',
                    exportAs: 'mtxSplitPane',
                },] }
    ];
    /** @nocollapse */
    MtxSplitPaneDirective.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 },
        { type: MtxSplitComponent }
    ]; };
    MtxSplitPaneDirective.propDecorators = {
        order: [{ type: Input }],
        size: [{ type: Input }],
        minSize: [{ type: Input }],
        maxSize: [{ type: Input }],
        lockSize: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return MtxSplitPaneDirective;
}());
export { MtxSplitPaneDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtcGFuZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctbWF0ZXJvL2V4dGVuc2lvbnMvc3BsaXQtcGFuZS8iLCJzb3VyY2VzIjpbInNwbGl0LXBhbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbEU7SUFrR0UsK0JBQ1UsTUFBYyxFQUNmLEtBQWlCLEVBQ2hCLFFBQW1CLEVBQ25CLEtBQXdCO1FBSHhCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFqRzFCLFdBQU0sR0FBa0IsSUFBSSxDQUFDOztRQWM3QixVQUFLLEdBQWtCLElBQUksQ0FBQzs7UUFjNUIsYUFBUSxHQUFrQixJQUFJLENBQUM7O1FBYy9CLGFBQVEsR0FBa0IsSUFBSSxDQUFDOztRQWMvQixjQUFTLEdBQUcsS0FBSyxDQUFDOztRQWNsQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBcUJQLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQVFyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFsR0Qsc0JBQWEsd0NBQUs7Ozs7UUFNbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFSRCxVQUFtQixDQUFnQjtZQUNqQyxJQUFJLENBQUMs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QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dCQXJMRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7O2dCQVJvRSxNQUFNO2dCQUFoRCxVQUFVO2dCQUFFLFNBQVM7Z0JBRXZDLGlCQUFpQjs7O3dCQVV2QixLQUFLO3VCQWNMLEtBQUs7MEJBY0wsS0FBSzswQkFjTCxLQUFLOzJCQWNMLEtBQUs7MEJBY0wsS0FBSzs7SUF5R1IsNEJBQUM7Q0FBQSxBQXRMRCxJQXNMQztTQWxMWSxxQkFBcUI7Ozs7OztJQUNoQyx1Q0FBcUM7Ozs7O0lBY3JDLHNDQUFvQzs7Ozs7SUFjcEMseUNBQXVDOzs7OztJQWN2Qyx5Q0FBdUM7Ozs7O0lBY3ZDLDBDQUEwQjs7Ozs7SUFjMUIseUNBQXdCOzs7OztJQW9CeEIsbURBQXVDOzs7OztJQUN2Qyw4Q0FBdUQ7Ozs7O0lBR3JELHVDQUFzQjs7SUFDdEIsc0NBQXdCOzs7OztJQUN4Qix5Q0FBMkI7Ozs7O0lBQzNCLHNDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTXR4U3BsaXRDb21wb25lbnQgfSBmcm9tICcuL3NwbGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGdldElucHV0UG9zaXRpdmVOdW1iZXIsIGdldElucHV0Qm9vbGVhbiB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdtdHgtc3BsaXQtcGFuZSwgW210eC1zcGxpdC1wYW5lXScsXHJcbiAgZXhwb3J0QXM6ICdtdHhTcGxpdFBhbmUnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXR4U3BsaXRQYW5lRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX29yZGVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQElucHV0KCkgc2V0IG9yZGVyKHY6IG51bWJlciB8IG51bGwpIHtcclxuICAgIHRoaXMuX29yZGVyID0gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcih2LCBudWxsKTtcclxuXHJcbiAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgdHJ1ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9yZGVyKCk6IG51bWJlciB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX29yZGVyO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF9zaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQElucHV0KCkgc2V0IHNpemUodjogbnVtYmVyIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fc2l6ZSA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgbnVsbCk7XHJcblxyXG4gICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldCBzaXplKCk6IG51bWJlciB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX21pblNpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICBASW5wdXQoKSBzZXQgbWluU2l6ZSh2OiBudW1iZXIgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW5TaXplID0gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcih2LCBudWxsKTtcclxuXHJcbiAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pblNpemUoKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluU2l6ZTtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfbWF4U2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBtYXhTaXplKHY6IG51bWJlciB8IG51bGwpIHtcclxuICAgIHRoaXMuX21heFNpemUgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIG51bGwpO1xyXG5cclxuICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4U2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXhTaXplO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF9sb2NrU2l6ZSA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBzZXQgbG9ja1NpemUodjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fbG9ja1NpemUgPSBnZXRJbnB1dEJvb2xlYW4odik7XHJcblxyXG4gICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldCBsb2NrU2l6ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9sb2NrU2l6ZTtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfdmlzaWJsZSA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIHNldCB2aXNpYmxlKHY6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Zpc2libGUgPSBnZXRJbnB1dEJvb2xlYW4odik7XHJcblxyXG4gICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcclxuICAgICAgdGhpcy5zcGxpdC5zaG93QXJlYSh0aGlzKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtc3BsaXQtcGFuZS1oaWRkZW4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3BsaXQuaGlkZUFyZWEodGhpcyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LXNwbGl0LXBhbmUtaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIHRyYW5zaXRpb25MaXN0ZW5lcjogKCkgPT4gdm9pZDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGxvY2tMaXN0ZW5lcnM6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgc3BsaXQ6IE10eFNwbGl0Q29tcG9uZW50XHJcbiAgKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ210eC1zcGxpdC1wYW5lJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNwbGl0LmFkZEFyZWEodGhpcyk7XHJcblxyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLnRyYW5zaXRpb25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxyXG4gICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAndHJhbnNpdGlvbmVuZCcsXHJcbiAgICAgICAgKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpID0+IHtcclxuICAgICAgICAgIC8vIExpbWl0IG9ubHkgZmxleC1iYXNpcyB0cmFuc2l0aW9uIHRvIHRyaWdnZXIgdGhlIGV2ZW50XHJcbiAgICAgICAgICBpZiAoZXZlbnQucHJvcGVydHlOYW1lID09PSAnZmxleC1iYXNpcycpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGxpdC5ub3RpZnkoJ3RyYW5zaXRpb25FbmQnLCAtMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0U3R5bGVPcmRlcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ29yZGVyJywgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFN0eWxlRmxleChcclxuICAgIGdyb3c6IG51bWJlcixcclxuICAgIHNocmluazogbnVtYmVyLFxyXG4gICAgYmFzaXM6IHN0cmluZyxcclxuICAgIGlzTWluOiBib29sZWFuLFxyXG4gICAgaXNNYXg6IGJvb2xlYW5cclxuICApOiB2b2lkIHtcclxuICAgIC8vIE5lZWQgMyBzZXBhcmF0ZWQgcHJvcGVydGllcyB0byB3b3JrIG9uIElFMTEgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2ZsZXgtbGF5b3V0L2lzc3Vlcy8zMjMpXHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtZ3JvdycsIGdyb3cpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LXNocmluaycsIHNocmluayk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtYmFzaXMnLCBiYXNpcyk7XHJcblxyXG4gICAgaWYgKGlzTWluID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LW1pbicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtbWluJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTWF4ID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LW1heCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtbWF4Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9ja0V2ZW50cygpOiB2b2lkIHtcclxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2goXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmxvY2tMaXN0ZW5lcnMucHVzaChcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnc3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5sb2NrRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgd2hpbGUgKHRoaXMubG9ja0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGZjdCA9IHRoaXMubG9ja0xpc3RlbmVycy5wb3AoKTtcclxuICAgICAgaWYgKGZjdCkge1xyXG4gICAgICAgIGZjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnVubG9ja0V2ZW50cygpO1xyXG5cclxuICAgIGlmICh0aGlzLnRyYW5zaXRpb25MaXN0ZW5lcikge1xyXG4gICAgICB0aGlzLnRyYW5zaXRpb25MaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3BsaXQucmVtb3ZlQXJlYSh0aGlzKTtcclxuICB9XHJcbn1cclxuIl19