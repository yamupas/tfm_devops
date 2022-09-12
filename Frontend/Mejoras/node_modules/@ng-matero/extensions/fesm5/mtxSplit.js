import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, NgZone, ElementRef, ChangeDetectorRef, Renderer2, Input, Output, ViewChildren, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __spread } from 'tslib';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: interface.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MtxSplitPoint() { }
if (false) {
    /** @type {?} */
    MtxSplitPoint.prototype.x;
    /** @type {?} */
    MtxSplitPoint.prototype.y;
}
/**
 * @record
 */
function MtxSplitArea() { }
if (false) {
    /** @type {?} */
    MtxSplitArea.prototype.component;
    /** @type {?} */
    MtxSplitArea.prototype.order;
    /** @type {?} */
    MtxSplitArea.prototype.size;
    /** @type {?} */
    MtxSplitArea.prototype.minSize;
    /** @type {?} */
    MtxSplitArea.prototype.maxSize;
}
/**
 * @record
 */
function MtxSplitSnapshot() { }
if (false) {
    /** @type {?} */
    MtxSplitSnapshot.prototype.gutterNum;
    /** @type {?} */
    MtxSplitSnapshot.prototype.allAreasSizePixel;
    /** @type {?} */
    MtxSplitSnapshot.prototype.allInvolvedAreasSizePercent;
    /** @type {?} */
    MtxSplitSnapshot.prototype.lastSteppedOffset;
    /** @type {?} */
    MtxSplitSnapshot.prototype.areasBeforeGutter;
    /** @type {?} */
    MtxSplitSnapshot.prototype.areasAfterGutter;
}
/**
 * @record
 */
function MtxSplitAreaSnapshot() { }
if (false) {
    /** @type {?} */
    MtxSplitAreaSnapshot.prototype.area;
    /** @type {?} */
    MtxSplitAreaSnapshot.prototype.sizePixelAtStart;
    /** @type {?} */
    MtxSplitAreaSnapshot.prototype.sizePercentAtStart;
}
/**
 * @record
 */
function MtxSplitSideAbsorptionCapacity() { }
if (false) {
    /** @type {?} */
    MtxSplitSideAbsorptionCapacity.prototype.remain;
    /** @type {?} */
    MtxSplitSideAbsorptionCapacity.prototype.list;
}
/**
 * @record
 */
function MtxSplitAreaAbsorptionCapacity() { }
if (false) {
    /** @type {?} */
    MtxSplitAreaAbsorptionCapacity.prototype.areaSnapshot;
    /** @type {?} */
    MtxSplitAreaAbsorptionCapacity.prototype.pixelAbsorb;
    /** @type {?} */
    MtxSplitAreaAbsorptionCapacity.prototype.percentAfterAbsorption;
    /** @type {?} */
    MtxSplitAreaAbsorptionCapacity.prototype.pixelRemain;
}
/**
 * @record
 */
function MtxSplitOutputData() { }
if (false) {
    /** @type {?} */
    MtxSplitOutputData.prototype.gutterNum;
    /** @type {?} */
    MtxSplitOutputData.prototype.sizes;
}
/**
 * @record
 */
function MtxSplitOutputAreaSizes() { }

/**
 * @fileoverview added by tsickle
 * Generated from: utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} event
 * @return {?}
 */
function getPointFromEvent(event) {
    // TouchEvent
    if (((/** @type {?} */ (event))).changedTouches !== undefined &&
        ((/** @type {?} */ (event))).changedTouches.length > 0) {
        return {
            x: ((/** @type {?} */ (event))).changedTouches[0].clientX,
            y: ((/** @type {?} */ (event))).changedTouches[0].clientY,
        };
    }
    // MouseEvent
    // tslint:disable-next-line: one-line
    else if (((/** @type {?} */ (event))).clientX !== undefined &&
        ((/** @type {?} */ (event))).clientY !== undefined) {
        return {
            x: ((/** @type {?} */ (event))).clientX,
            y: ((/** @type {?} */ (event))).clientY,
        };
    }
    return null;
}
/**
 * @param {?} elRef
 * @param {?} direction
 * @return {?}
 */
function getElementPixelSize(elRef, direction) {
    /** @type {?} */
    var rect = ((/** @type {?} */ (elRef.nativeElement))).getBoundingClientRect();
    return direction === 'horizontal' ? rect.width : rect.height;
}
/**
 * @param {?} v
 * @return {?}
 */
function getInputBoolean(v) {
    return typeof v === 'boolean' ? v : v === 'false' ? false : true;
}
/**
 * @template T
 * @param {?} v
 * @param {?} defaultValue
 * @return {?}
 */
function getInputPositiveNumber(v, defaultValue) {
    if (v === null || v === undefined) {
        return defaultValue;
    }
    v = Number(v);
    return !isNaN(v) && v >= 0 ? v : defaultValue;
}
/**
 * @param {?} unit
 * @param {?} sizes
 * @return {?}
 */
function isUserSizesValid(unit, sizes) {
    // All sizes have to be not null and total should be 100
    if (unit === 'percent') {
        /** @type {?} */
        var total = sizes.reduce((/**
         * @param {?} _total
         * @param {?} s
         * @return {?}
         */
        function (_total, s) { return (s !== null ? _total + s : _total); }), 0);
        return sizes.every((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s !== null; })) && total > 99.9 && total < 100.1;
    }
    // A size at null is mandatory but only one.
    if (unit === 'pixel') {
        return sizes.filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s === null; })).length === 1;
    }
}
/**
 * @param {?} a
 * @return {?}
 */
function getAreaMinSize(a) {
    if (a.size === null) {
        return null;
    }
    if (a.component.lockSize === true) {
        return a.size;
    }
    if (a.component.minSize === null) {
        return null;
    }
    if (a.component.minSize > a.size) {
        return a.size;
    }
    return a.component.minSize;
}
/**
 * @param {?} a
 * @return {?}
 */
function getAreaMaxSize(a) {
    if (a.size === null) {
        return null;
    }
    if (a.component.lockSize === true) {
        return a.size;
    }
    if (a.component.maxSize === null) {
        return null;
    }
    if (a.component.maxSize < a.size) {
        return a.size;
    }
    return a.component.maxSize;
}
/**
 * @param {?} unit
 * @param {?} sideAreas
 * @param {?} pixels
 * @param {?} allAreasSizePixel
 * @return {?}
 */
function getGutterSideAbsorptionCapacity(unit, sideAreas, pixels, allAreasSizePixel) {
    return sideAreas.reduce((/**
     * @param {?} acc
     * @param {?} area
     * @return {?}
     */
    function (acc, area) {
        /** @type {?} */
        var res = getAreaAbsorptionCapacity(unit, area, acc.remain, allAreasSizePixel);
        acc.list.push(res);
        acc.remain = res.pixelRemain;
        return acc;
    }), { remain: pixels, list: [] });
}
/**
 * @param {?} unit
 * @param {?} areaSnapshot
 * @param {?} pixels
 * @param {?} allAreasSizePixel
 * @return {?}
 */
function getAreaAbsorptionCapacity(unit, areaSnapshot, pixels, allAreasSizePixel) {
    // No pain no gain
    if (pixels === 0) {
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: 0,
            percentAfterAbsorption: areaSnapshot.sizePercentAtStart,
            pixelRemain: 0,
        };
    }
    // Area start at zero and need to be reduced, not possible
    if (areaSnapshot.sizePixelAtStart === 0 && pixels < 0) {
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: 0,
            percentAfterAbsorption: 0,
            pixelRemain: pixels,
        };
    }
    if (unit === 'percent') {
        return getAreaAbsorptionCapacityPercent(areaSnapshot, pixels, allAreasSizePixel);
    }
    if (unit === 'pixel') {
        return getAreaAbsorptionCapacityPixel(areaSnapshot, pixels, allAreasSizePixel);
    }
}
/**
 * @param {?} areaSnapshot
 * @param {?} pixels
 * @param {?} allAreasSizePixel
 * @return {?}
 */
function getAreaAbsorptionCapacityPercent(areaSnapshot, pixels, allAreasSizePixel) {
    /** @type {?} */
    var tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    /** @type {?} */
    var tempPercentSize = (tempPixelSize / allAreasSizePixel) * 100;
    // ENLARGE AREA
    if (pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels
        if (areaSnapshot.area.maxSize !== null && tempPercentSize > areaSnapshot.area.maxSize) {
            // Use area.area.maxSize as newPercentSize and return calculate pixels remaining
            /** @type {?} */
            var maxSizePixel = (areaSnapshot.area.maxSize / 100) * allAreasSizePixel;
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: maxSizePixel,
                percentAfterAbsorption: areaSnapshot.area.maxSize,
                pixelRemain: areaSnapshot.sizePixelAtStart + pixels - maxSizePixel,
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: tempPercentSize > 100 ? 100 : tempPercentSize,
            pixelRemain: 0,
        };
    }
    // REDUCE AREA
    // tslint:disable-next-line: one-line
    else if (pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels
        if (areaSnapshot.area.minSize !== null && tempPercentSize < areaSnapshot.area.minSize) {
            // Use area.area.minSize as newPercentSize and return calculate pixels remaining
            /** @type {?} */
            var minSizePixel = (areaSnapshot.area.minSize / 100) * allAreasSizePixel;
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: minSizePixel,
                percentAfterAbsorption: areaSnapshot.area.minSize,
                pixelRemain: areaSnapshot.sizePixelAtStart + pixels - minSizePixel,
            };
        }
        // If reduced under zero > return remaining pixels
        // tslint:disable-next-line: one-line
        else if (tempPercentSize < 0) {
            // Use 0 as newPercentSize and return calculate pixels remaining
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: 0,
                pixelRemain: pixels + areaSnapshot.sizePixelAtStart,
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: tempPercentSize,
            pixelRemain: 0,
        };
    }
}
/**
 * @param {?} areaSnapshot
 * @param {?} pixels
 * @param {?} containerSizePixel
 * @return {?}
 */
function getAreaAbsorptionCapacityPixel(areaSnapshot, pixels, containerSizePixel) {
    /** @type {?} */
    var tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    // ENLARGE AREA
    if (pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels
        if (areaSnapshot.area.maxSize !== null && tempPixelSize > areaSnapshot.area.maxSize) {
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: areaSnapshot.area.maxSize - areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.maxSize,
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: -1,
            pixelRemain: 0,
        };
    }
    // REDUCE AREA
    // tslint:disable-next-line: one-line
    else if (pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels
        if (areaSnapshot.area.minSize !== null && tempPixelSize < areaSnapshot.area.minSize) {
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: areaSnapshot.area.minSize + pixels - tempPixelSize,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.minSize,
            };
        }
        // If reduced under zero > return remaining pixels
        // tslint:disable-next-line: one-line
        else if (tempPixelSize < 0) {
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: -1,
                pixelRemain: pixels + areaSnapshot.sizePixelAtStart,
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: -1,
            pixelRemain: 0,
        };
    }
}
/**
 * @param {?} unit
 * @param {?} item
 * @return {?}
 */
function updateAreaSize(unit, item) {
    if (unit === 'percent') {
        item.areaSnapshot.area.size = item.percentAfterAbsorption;
    }
    else if (unit === 'pixel') {
        // Update size except for the wildcard size area
        if (item.areaSnapshot.area.size !== null) {
            item.areaSnapshot.area.size = item.areaSnapshot.sizePixelAtStart + item.pixelAbsorb;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: split.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * mtx-split
 *
 *
 *  PERCENT MODE ([unit]="'percent'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |       20                 30                 20                 15                 15      | <-- [size]="x"
 * |               10px               10px               10px               10px               | <-- [gutterSize]="10"
 * |calc(20% - 8px)    calc(30% - 12px)   calc(20% - 8px)    calc(15% - 6px)    calc(15% - 6px)| <-- CSS flex-basis property (with flex-grow&shrink at 0)
 * |     152px              228px              152px              114px              114px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <-- el.getBoundingClientRect().width
 *  flex-basis = calc( { area.size }% - { area.size/100 * nbGutter*gutterSize }px );
 *
 *
 *  PIXEL MODE ([unit]="'pixel'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |      100                250                 *                 150                100      | <-- [size]="y"
 * |               10px               10px               10px               10px               | <-- [gutterSize]="10"
 * |   0 0 100px          0 0 250px           1 1 auto          0 0 150px          0 0 100px   | <-- CSS flex property (flex-grow/flex-shrink/flex-basis)
 * |     100px              250px              200px              150px              100px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <-- el.getBoundingClientRect().width
 *
 */
var MtxSplitComponent = /** @class */ (function () {
    function MtxSplitComponent(ngZone, elRef, cdRef, renderer) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this._direction = 'horizontal';
        ////
        this._unit = 'percent';
        ////
        this._gutterSize = 12;
        ////
        this._gutterStep = 1;
        ////
        this._restrictMove = false;
        ////
        this._useTransition = false;
        ////
        this._disabled = false;
        ////
        this._dir = 'ltr';
        ////
        this._gutterDblClickDuration = 0;
        ////
        this.dragStart = new EventEmitter(false);
        this.dragEnd = new EventEmitter(false);
        this.gutterClick = new EventEmitter(false);
        this.gutterDblClick = new EventEmitter(false);
        this.dragProgressSubject = new Subject();
        this.dragProgress$ = this.dragProgressSubject.asObservable();
        ////
        this.isDragging = false;
        this.dragListeners = [];
        this.snapshot = null;
        this.startPoint = null;
        this.endPoint = null;
        this.displayedAreas = [];
        this.hidedAreas = [];
        this._clickTimeout = null;
        // To force adding default class, could be override by user @Input() or not
        this.direction = this._direction;
    }
    Object.defineProperty(MtxSplitComponent.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._direction = v === 'vertical' ? 'vertical' : 'horizontal';
            this.renderer.addClass(this.elRef.nativeElement, "mtx-split-" + this._direction);
            this.renderer.removeClass(this.elRef.nativeElement, "mtx-split-" + (this._direction === 'vertical' ? 'horizontal' : 'vertical'));
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "unit", {
        get: /**
         * @return {?}
         */
        function () {
            return this._unit;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._unit = v === 'pixel' ? 'pixel' : 'percent';
            this.renderer.addClass(this.elRef.nativeElement, "mtx-split-" + this._unit);
            this.renderer.removeClass(this.elRef.nativeElement, "mtx-split-" + (this._unit === 'pixel' ? 'percent' : 'pixel'));
            this.build(false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "gutterSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._gutterSize = getInputPositiveNumber(v, 11);
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "gutterStep", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterStep;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._gutterStep = getInputPositiveNumber(v, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "restrictMove", {
        get: /**
         * @return {?}
         */
        function () {
            return this._restrictMove;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._restrictMove = getInputBoolean(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "useTransition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._useTransition;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._useTransition = getInputBoolean(v);
            if (this._useTransition) {
                this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-transition');
            }
            else {
                this.renderer.removeClass(this.elRef.nativeElement, 'mtx-split-transition');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = getInputBoolean(v);
            if (this._disabled) {
                this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-disabled');
            }
            else {
                this.renderer.removeClass(this.elRef.nativeElement, 'mtx-split-disabled');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "dir", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dir;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._dir = v === 'rtl' ? 'rtl' : 'ltr';
            this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "gutterDblClickDuration", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterDblClickDuration;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._gutterDblClickDuration = getInputPositiveNumber(v, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtxSplitComponent.prototype, "transitionEnd", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return new Observable((/**
             * @param {?} subscriber
             * @return {?}
             */
            function (subscriber) { return (_this.transitionEndSubscriber = subscriber); })).pipe(debounceTime(20));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MtxSplitComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            // To avoid transition at first rendering
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.renderer.addClass(_this.elRef.nativeElement, 'mtx-split-init'); }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    MtxSplitComponent.prototype.getNbGutters = /**
     * @private
     * @return {?}
     */
    function () {
        return this.displayedAreas.length === 0 ? 0 : this.displayedAreas.length - 1;
    };
    /**
     * @param {?} component
     * @return {?}
     */
    MtxSplitComponent.prototype.addArea = /**
     * @param {?} component
     * @return {?}
     */
    function (component) {
        /** @type {?} */
        var newArea = {
            component: component,
            order: 0,
            size: 0,
            minSize: null,
            maxSize: null,
        };
        if (component.visible === true) {
            this.displayedAreas.push(newArea);
            this.build(true, true);
        }
        else {
            this.hidedAreas.push(newArea);
        }
    };
    /**
     * @param {?} component
     * @return {?}
     */
    MtxSplitComponent.prototype.removeArea = /**
     * @param {?} component
     * @return {?}
     */
    function (component) {
        if (this.displayedAreas.some((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component === component; }))) {
            /** @type {?} */
            var area = this.displayedAreas.find((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return a.component === component; }));
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component === component; }))) {
            /** @type {?} */
            var area = this.hidedAreas.find((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return a.component === component; }));
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    };
    /**
     * @param {?} component
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    MtxSplitComponent.prototype.updateArea = /**
     * @param {?} component
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    function (component, resetOrders, resetSizes) {
        if (component.visible === true) {
            this.build(resetOrders, resetSizes);
        }
    };
    /**
     * @param {?} component
     * @return {?}
     */
    MtxSplitComponent.prototype.showArea = /**
     * @param {?} component
     * @return {?}
     */
    function (component) {
        var _a;
        /** @type {?} */
        var area = this.hidedAreas.find((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component === component; }));
        if (area === undefined) {
            return;
        }
        /** @type {?} */
        var areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        (_a = this.displayedAreas).push.apply(_a, __spread(areas));
        this.build(true, true);
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    MtxSplitComponent.prototype.hideArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        var _a;
        /** @type {?} */
        var area = this.displayedAreas.find((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component === comp; }));
        if (area === undefined) {
            return;
        }
        /** @type {?} */
        var areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
        areas.forEach((/**
         * @param {?} _area
         * @return {?}
         */
        function (_area) {
            _area.order = 0;
            _area.size = 0;
        }));
        (_a = this.hidedAreas).push.apply(_a, __spread(areas));
        this.build(true, true);
    };
    /**
     * @return {?}
     */
    MtxSplitComponent.prototype.getVisibleAreaSizes = /**
     * @return {?}
     */
    function () {
        return this.displayedAreas.map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return (a.size === null ? '*' : a.size); }));
    };
    /**
     * @param {?} sizes
     * @return {?}
     */
    MtxSplitComponent.prototype.setVisibleAreaSizes = /**
     * @param {?} sizes
     * @return {?}
     */
    function (sizes) {
        if (sizes.length !== this.displayedAreas.length) {
            return false;
        }
        /** @type {?} */
        var formatedSizes = sizes.map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return getInputPositiveNumber(s, null); }));
        /** @type {?} */
        var isValid = isUserSizesValid(this.unit, formatedSizes);
        if (isValid === false) {
            return false;
        }
        // @ts-ignore
        this.displayedAreas.forEach((/**
         * @param {?} area
         * @param {?} i
         * @return {?}
         */
        function (area, i) { return (area.component._size = formatedSizes[i]); }));
        this.build(false, true);
        return true;
    };
    /**
     * @private
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    MtxSplitComponent.prototype.build = /**
     * @private
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    function (resetOrders, resetSizes) {
        this.stopDragging();
        // ¤ AREAS ORDER
        if (resetOrders === true) {
            // If user provided 'order' for each area, use it to sort them.
            if (this.displayedAreas.every((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return a.component.order !== null; }))) {
                this.displayedAreas.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return (/** @type {?} */ ((((/** @type {?} */ (a.component.order))) - b.component.order))); }));
            }
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach((/**
             * @param {?} area
             * @param {?} i
             * @return {?}
             */
            function (area, i) {
                area.order = i * 2;
                area.component.setStyleOrder(area.order);
            }));
        }
        // ¤ AREAS SIZE
        if (resetSizes === true) {
            /** @type {?} */
            var useUserSizes_1 = isUserSizesValid(this.unit, this.displayedAreas.map((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return a.component.size; })));
            switch (this.unit) {
                case 'percent': {
                    /** @type {?} */
                    var defaultSize_1 = 100 / this.displayedAreas.length;
                    this.displayedAreas.forEach((/**
                     * @param {?} area
                     * @return {?}
                     */
                    function (area) {
                        area.size = useUserSizes_1 ? ((/** @type {?} */ (area.component.size))) : defaultSize_1;
                        area.minSize = getAreaMinSize(area);
                        area.maxSize = getAreaMaxSize(area);
                    }));
                    break;
                }
                case 'pixel': {
                    if (useUserSizes_1) {
                        this.displayedAreas.forEach((/**
                         * @param {?} area
                         * @return {?}
                         */
                        function (area) {
                            area.size = area.component.size;
                            area.minSize = getAreaMinSize(area);
                            area.maxSize = getAreaMaxSize(area);
                        }));
                    }
                    else {
                        /** @type {?} */
                        var wildcardSizeAreas = this.displayedAreas.filter((/**
                         * @param {?} a
                         * @return {?}
                         */
                        function (a) { return a.component.size === null; }));
                        // No wildcard area > Need to select one arbitrarily > first
                        if (wildcardSizeAreas.length === 0 && this.displayedAreas.length > 0) {
                            this.displayedAreas.forEach((/**
                             * @param {?} area
                             * @param {?} i
                             * @return {?}
                             */
                            function (area, i) {
                                area.size = i === 0 ? null : area.component.size;
                                area.minSize = i === 0 ? null : getAreaMinSize(area);
                                area.maxSize = i === 0 ? null : getAreaMaxSize(area);
                            }));
                        }
                        // More than one wildcard area > Need to keep only one arbitrarly > first
                        // tslint:disable-next-line: one-line
                        else if (wildcardSizeAreas.length > 1) {
                            /** @type {?} */
                            var alreadyGotOne_1 = false;
                            this.displayedAreas.forEach((/**
                             * @param {?} area
                             * @return {?}
                             */
                            function (area) {
                                if (area.component.size === null) {
                                    if (alreadyGotOne_1 === false) {
                                        area.size = null;
                                        area.minSize = null;
                                        area.maxSize = null;
                                        alreadyGotOne_1 = true;
                                    }
                                    else {
                                        area.size = 100;
                                        area.minSize = null;
                                        area.maxSize = null;
                                    }
                                }
                                else {
                                    area.size = area.component.size;
                                    area.minSize = getAreaMinSize(area);
                                    area.maxSize = getAreaMaxSize(area);
                                }
                            }));
                        }
                    }
                    break;
                }
            }
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    MtxSplitComponent.prototype.refreshStyleSizes = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        ///////////////////////////////////////////
        // PERCENT MODE
        if (this.unit === 'percent') {
            // Only one area > flex-basis 100%
            if (this.displayedAreas.length === 1) {
                this.displayedAreas[0].component.setStyleFlex(0, 0, "100%", false, false);
            }
            // Multiple areas > use each percent basis
            // tslint:disable-next-line: one-line
            else {
                /** @type {?} */
                var sumGutterSize_1 = this.getNbGutters() * this.gutterSize;
                this.displayedAreas.forEach((/**
                 * @param {?} area
                 * @return {?}
                 */
                function (area) {
                    area.component.setStyleFlex(0, 0, "calc( " + area.size + "% - " + (((/** @type {?} */ (area.size))) / 100) * sumGutterSize_1 + "px )", area.minSize !== null && area.minSize === area.size ? true : false, area.maxSize !== null && area.maxSize === area.size ? true : false);
                }));
            }
        }
        ///////////////////////////////////////////
        // PIXEL MODE
        // tslint:disable-next-line: one-line
        else if (this.unit === 'pixel') {
            this.displayedAreas.forEach((/**
             * @param {?} area
             * @return {?}
             */
            function (area) {
                // Area with wildcard size
                if (area.size === null) {
                    if (_this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(1, 1, "100%", false, false);
                    }
                    else {
                        area.component.setStyleFlex(1, 1, "auto", false, false);
                    }
                }
                // Area with pixel size
                // tslint:disable-next-line: one-line
                else {
                    // Only one area > flex-basis 100%
                    if (_this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(0, 0, "100%", false, false);
                    }
                    // Multiple areas > use each pixel basis
                    // tslint:disable-next-line: one-line
                    else {
                        area.component.setStyleFlex(0, 0, area.size + "px", area.minSize !== null && area.minSize === area.size ? true : false, area.maxSize !== null && area.maxSize === area.size ? true : false);
                    }
                }
            }));
        }
    };
    /**
     * @param {?} event
     * @param {?} gutterNum
     * @return {?}
     */
    MtxSplitComponent.prototype.clickGutter = /**
     * @param {?} event
     * @param {?} gutterNum
     * @return {?}
     */
    function (event, gutterNum) {
        var _this = this;
        /** @type {?} */
        var tempPoint = getPointFromEvent(event);
        // Be sure mouseup/touchend happened at same point as mousedown/touchstart to trigger click/dblclick
        if (this.startPoint && this.startPoint.x === tempPoint.x && this.startPoint.y === tempPoint.y) {
            // If timeout in progress and new click > clearTimeout & dblClickEvent
            if (this._clickTimeout !== null) {
                window.clearTimeout(this._clickTimeout);
                this._clickTimeout = null;
                this.notify('dblclick', gutterNum);
                this.stopDragging();
            }
            // Else start timeout to call clickEvent at end
            // tslint:disable-next-line: one-line
            else {
                this._clickTimeout = window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._clickTimeout = null;
                    _this.notify('click', gutterNum);
                    _this.stopDragging();
                }), this.gutterDblClickDuration);
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} gutterOrder
     * @param {?} gutterNum
     * @return {?}
     */
    MtxSplitComponent.prototype.startDragging = /**
     * @param {?} event
     * @param {?} gutterOrder
     * @param {?} gutterNum
     * @return {?}
     */
    function (event, gutterOrder, gutterNum) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        this.startPoint = getPointFromEvent(event);
        if (this.startPoint === null || this.disabled === true) {
            return;
        }
        this.snapshot = {
            gutterNum: gutterNum,
            lastSteppedOffset: 0,
            allAreasSizePixel: getElementPixelSize(this.elRef, this.direction) - this.getNbGutters() * this.gutterSize,
            allInvolvedAreasSizePercent: 100,
            areasBeforeGutter: [],
            areasAfterGutter: [],
        };
        this.displayedAreas.forEach((/**
         * @param {?} area
         * @return {?}
         */
        function (area) {
            /** @type {?} */
            var areaSnapshot = {
                area: area,
                sizePixelAtStart: getElementPixelSize(area.component.elRef, _this.direction),
                sizePercentAtStart: _this.unit === 'percent' ? area.size : -1,
            };
            if (area.order < gutterOrder) {
                if (_this.restrictMove === true) {
                    _this.snapshot.areasBeforeGutter = [areaSnapshot];
                }
                else {
                    _this.snapshot.areasBeforeGutter.unshift(areaSnapshot);
                }
            }
            else if (area.order > gutterOrder) {
                if (_this.restrictMove === true) {
                    if (_this.snapshot.areasAfterGutter.length === 0) {
                        _this.snapshot.areasAfterGutter = [areaSnapshot];
                    }
                }
                else {
                    _this.snapshot.areasAfterGutter.push(areaSnapshot);
                }
            }
        }));
        this.snapshot.allInvolvedAreasSizePercent = __spread(this.snapshot.areasBeforeGutter, this.snapshot.areasAfterGutter).reduce((/**
         * @param {?} t
         * @param {?} a
         * @return {?}
         */
        function (t, a) { return t + a.sizePercentAtStart; }), 0);
        if (this.snapshot.areasBeforeGutter.length === 0 ||
            this.snapshot.areasAfterGutter.length === 0) {
            return;
        }
        this.dragListeners.push(this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)));
        this.dragListeners.push(this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)));
        this.dragListeners.push(this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)));
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.dragListeners.push(_this.renderer.listen('document', 'mousemove', _this.dragEvent.bind(_this)));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchmove', _this.dragEvent.bind(_this)));
        }));
        this.displayedAreas.forEach((/**
         * @param {?} area
         * @return {?}
         */
        function (area) { return area.component.lockEvents(); }));
        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'mtx-dragging');
        this.renderer.addClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'mtx-dragged');
        this.notify('start', this.snapshot.gutterNum);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    MtxSplitComponent.prototype.dragEvent = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        if (this._clickTimeout !== null) {
            window.clearTimeout(this._clickTimeout);
            this._clickTimeout = null;
        }
        if (this.isDragging === false) {
            return;
        }
        this.endPoint = getPointFromEvent(event);
        if (this.endPoint === null) {
            return;
        }
        // Calculate steppedOffset
        /** @type {?} */
        var offset = this.direction === 'horizontal'
            ? this.startPoint.x - this.endPoint.x
            : this.startPoint.y - this.endPoint.y;
        if (this.dir === 'rtl') {
            offset = -offset;
        }
        /** @type {?} */
        var steppedOffset = Math.round(offset / this.gutterStep) * this.gutterStep;
        if (steppedOffset === this.snapshot.lastSteppedOffset) {
            return;
        }
        this.snapshot.lastSteppedOffset = steppedOffset;
        // Need to know if each gutter side areas could reacts to steppedOffset
        /** @type {?} */
        var areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -steppedOffset, this.snapshot.allAreasSizePixel);
        /** @type {?} */
        var areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset, this.snapshot.allAreasSizePixel);
        // Each gutter side areas can't absorb all offset
        if (areasBefore.remain !== 0 && areasAfter.remain !== 0) {
            if (Math.abs(areasBefore.remain) === Math.abs(areasAfter.remain)) {
            }
            else if (Math.abs(areasBefore.remain) > Math.abs(areasAfter.remain)) {
                areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset + areasBefore.remain, this.snapshot.allAreasSizePixel);
            }
            else {
                areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -(steppedOffset - areasAfter.remain), this.snapshot.allAreasSizePixel);
            }
        }
        // Areas before gutter can't absorbs all offset > need to recalculate sizes for areas after gutter.
        // tslint:disable-next-line: one-line
        else if (areasBefore.remain !== 0) {
            areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset + areasBefore.remain, this.snapshot.allAreasSizePixel);
        }
        // Areas after gutter can't absorbs all offset > need to recalculate sizes for areas before gutter.
        // tslint:disable-next-line: one-line
        else if (areasAfter.remain !== 0) {
            areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -(steppedOffset - areasAfter.remain), this.snapshot.allAreasSizePixel);
        }
        if (this.unit === 'percent') {
            // Hack because of browser messing up with sizes using calc(X% - Ypx) -> el.getBoundingClientRect()
            // If not there, playing with gutters makes total going down to 99.99875% then 99.99286%, 99.98986%,..
            /** @type {?} */
            var all = __spread(areasBefore.list, areasAfter.list);
            /** @type {?} */
            var areaToReset_1 = all.find((/**
             * @param {?} a
             * @return {?}
             */
            function (a) {
                return a.percentAfterAbsorption !== 0 &&
                    a.percentAfterAbsorption !== a.areaSnapshot.area.minSize &&
                    a.percentAfterAbsorption !== a.areaSnapshot.area.maxSize;
            }));
            if (areaToReset_1) {
                areaToReset_1.percentAfterAbsorption =
                    this.snapshot.allInvolvedAreasSizePercent -
                        all
                            .filter((/**
                         * @param {?} a
                         * @return {?}
                         */
                        function (a) { return a !== areaToReset_1; }))
                            .reduce((/**
                         * @param {?} total
                         * @param {?} a
                         * @return {?}
                         */
                        function (total, a) { return total + a.percentAfterAbsorption; }), 0);
            }
        }
        // Now we know areas could absorb steppedOffset, time to really update sizes
        areasBefore.list.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return updateAreaSize(_this.unit, item); }));
        areasAfter.list.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return updateAreaSize(_this.unit, item); }));
        this.refreshStyleSizes();
        this.notify('progress', this.snapshot.gutterNum);
    };
    /**
     * @private
     * @param {?=} event
     * @return {?}
     */
    MtxSplitComponent.prototype.stopDragging = /**
     * @private
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.isDragging === false) {
            return;
        }
        this.displayedAreas.forEach((/**
         * @param {?} area
         * @return {?}
         */
        function (area) { return area.component.unlockEvents(); }));
        while (this.dragListeners.length > 0) {
            /** @type {?} */
            var fct = this.dragListeners.pop();
            if (fct) {
                fct();
            }
        }
        // Warning: Have to be before "notify('end')"
        // because "notify('end')"" can be linked to "[size]='x'" > "build()" > "stopDragging()"
        this.isDragging = false;
        // If moved from starting point, notify end
        if (this.endPoint &&
            (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y)) {
            this.notify('end', this.snapshot.gutterNum);
        }
        this.renderer.removeClass(this.elRef.nativeElement, 'mtx-dragging');
        this.renderer.removeClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'mtx-dragged');
        this.snapshot = null;
        // Needed to let (click)="clickGutter(...)" event run and verify if mouse moved or not
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.startPoint = null;
                _this.endPoint = null;
            }));
        }));
    };
    /**
     * @param {?} type
     * @param {?} gutterNum
     * @return {?}
     */
    MtxSplitComponent.prototype.notify = /**
     * @param {?} type
     * @param {?} gutterNum
     * @return {?}
     */
    function (type, gutterNum) {
        var _this = this;
        /** @type {?} */
        var sizes = this.getVisibleAreaSizes();
        if (type === 'start') {
            this.dragStart.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'end') {
            this.dragEnd.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'click') {
            this.gutterClick.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'dblclick') {
            this.gutterDblClick.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'transitionEnd') {
            if (this.transitionEndSubscriber) {
                this.ngZone.run((/**
                 * @return {?}
                 */
                function () { return _this.transitionEndSubscriber.next(sizes); }));
            }
        }
        else if (type === 'progress') {
            // Stay outside zone to allow users do what they want about change detection mechanism.
            this.dragProgressSubject.next({ gutterNum: gutterNum, sizes: sizes });
        }
    };
    /**
     * @return {?}
     */
    MtxSplitComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopDragging();
    };
    MtxSplitComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mtx-split',
                    exportAs: 'mtxSplit',
                    host: {
                        class: 'mtx-split',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<ng-content></ng-content>\r\n<ng-template ngFor [ngForOf]=\"displayedAreas\" let-index=\"index\" let-last=\"last\">\r\n  <div #gutterEls class=\"mtx-split-gutter\"\r\n       *ngIf=\"last === false\"\r\n       [style.flex-basis.px]=\"gutterSize\"\r\n       [style.order]=\"index * 2 + 1\"\r\n       (mousedown)=\"startDragging($event, index * 2 + 1, index + 1)\"\r\n       (touchstart)=\"startDragging($event, index * 2 + 1, index + 1)\"\r\n       (mouseup)=\"clickGutter($event, index + 1)\"\r\n       (touchend)=\"clickGutter($event, index + 1)\">\r\n    <div class=\"mtx-split-gutter-handle\"></div>\r\n  </div>\r\n</ng-template>\r\n",
                    styles: [".mtx-split{display:flex;flex-wrap:nowrap;justify-content:flex-start;align-items:stretch;overflow:hidden;width:100%;height:100%}.mtx-split>.mtx-split-gutter{display:flex;flex-grow:0;flex-shrink:0;align-items:center;justify-content:center;background-color:rgba(150,150,150,.15)}.mtx-split>.mtx-split-gutter>.mtx-split-gutter-handle{width:100%;height:100%;background-position:center center;background-repeat:no-repeat}.mtx-split>.mtx-split-pane{flex-grow:0;flex-shrink:0;overflow-x:hidden;overflow-y:auto}.mtx-split>.mtx-split-pane.mtx-split-pane-hidden{flex:0 1 0!important;overflow-x:hidden;overflow-y:hidden}.mtx-split.mtx-split-horizontal{flex-direction:row}.mtx-split.mtx-split-horizontal>.mtx-split-gutter{flex-direction:row;height:100%;cursor:col-resize}.mtx-split.mtx-split-horizontal>.mtx-split-pane{height:100%}.mtx-split.mtx-split-vertical{flex-direction:column}.mtx-split.mtx-split-vertical>.mtx-split-gutter{flex-direction:column;width:100%;cursor:row-resize}.mtx-split.mtx-split-vertical>.mtx-split-pane{width:100%}.mtx-split.mtx-split-vertical>.mtx-split-pane.mtx-split-pane-hidden{max-width:0}.mtx-split.mtx-split-disabled>.mtx-split-gutter{cursor:default}.mtx-split.mtx-split-disabled>.mtx-split-gutter .mtx-split-gutter-handle{background-image:none}.mtx-split.mtx-split-transition.mtx-split-init:not(.mtx-dragging)>.mtx-split-gutter,.mtx-split.mtx-split-transition.mtx-split-init:not(.mtx-dragging)>.mtx-split-pane{transition:flex-basis .3s}"]
                }] }
    ];
    /** @nocollapse */
    MtxSplitComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    MtxSplitComponent.propDecorators = {
        direction: [{ type: Input }],
        unit: [{ type: Input }],
        gutterSize: [{ type: Input }],
        gutterStep: [{ type: Input }],
        restrictMove: [{ type: Input }],
        useTransition: [{ type: Input }],
        disabled: [{ type: Input }],
        dir: [{ type: Input }],
        gutterDblClickDuration: [{ type: Input }],
        dragStart: [{ type: Output }],
        dragEnd: [{ type: Output }],
        gutterClick: [{ type: Output }],
        gutterDblClick: [{ type: Output }],
        transitionEnd: [{ type: Output }],
        gutterEls: [{ type: ViewChildren, args: ['gutterEls',] }]
    };
    return MtxSplitComponent;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._direction;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._unit;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._gutterSize;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._gutterStep;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._restrictMove;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._useTransition;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype._gutterDblClickDuration;
    /** @type {?} */
    MtxSplitComponent.prototype.dragStart;
    /** @type {?} */
    MtxSplitComponent.prototype.dragEnd;
    /** @type {?} */
    MtxSplitComponent.prototype.gutterClick;
    /** @type {?} */
    MtxSplitComponent.prototype.gutterDblClick;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.transitionEndSubscriber;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.dragProgressSubject;
    /** @type {?} */
    MtxSplitComponent.prototype.dragProgress$;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.isDragging;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.dragListeners;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.snapshot;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.startPoint;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.endPoint;
    /** @type {?} */
    MtxSplitComponent.prototype.displayedAreas;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.hidedAreas;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.gutterEls;
    /** @type {?} */
    MtxSplitComponent.prototype._clickTimeout;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    MtxSplitComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: split-pane.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * Generated from: split.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MtxSplitModule = /** @class */ (function () {
    function MtxSplitModule() {
    }
    MtxSplitModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [MtxSplitComponent, MtxSplitPaneDirective],
                    exports: [MtxSplitComponent, MtxSplitPaneDirective],
                },] }
    ];
    return MtxSplitModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: mtxSplit.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MtxSplitComponent, MtxSplitModule, MtxSplitPaneDirective, getAreaMaxSize, getAreaMinSize, getElementPixelSize, getGutterSideAbsorptionCapacity, getInputBoolean, getInputPositiveNumber, getPointFromEvent, isUserSizesValid, updateAreaSize };
//# sourceMappingURL=mtxSplit.js.map
