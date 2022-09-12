/**
 * @fileoverview added by tsickle
 * Generated from: split.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { Component, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ElementRef, NgZone, ViewChildren, QueryList, EventEmitter, ViewEncapsulation, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { getInputPositiveNumber, getInputBoolean, isUserSizesValid, getAreaMinSize, getAreaMaxSize, getPointFromEvent, getElementPixelSize, getGutterSideAbsorptionCapacity, updateAreaSize, } from './utils';
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
export { MtxSplitComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLW1hdGVyby9leHRlbnNpb25zL3NwbGl0LXBhbmUvIiwic291cmNlcyI6WyJzcGxpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUdULFVBQVUsRUFDVixNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVc5QyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLCtCQUErQixFQUMvQixjQUFjLEdBQ2YsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDakI7SUFvTEUsMkJBQ1UsTUFBYyxFQUNkLEtBQWlCLEVBQ2pCLEtBQXdCLEVBQ3hCLFFBQW1CO1FBSG5CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUE1S3JCLGVBQVUsR0FBOEIsWUFBWSxDQUFDOztRQW9CckQsVUFBSyxHQUF3QixTQUFTLENBQUM7O1FBb0J2QyxnQkFBVyxHQUFHLEVBQUUsQ0FBQzs7UUFjakIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7O1FBWWhCLGtCQUFhLEdBQUcsS0FBSyxDQUFDOztRQVl0QixtQkFBYyxHQUFHLEtB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Ozs7SUFrQjFCLGlDQUFvQzs7Ozs7SUFjcEMsb0RBQW9DOztJQVlwQyxzQ0FBa0U7O0lBQ2xFLG9DQUFnRTs7SUFDaEUsd0NBQW9FOztJQUNwRSwyQ0FBdUU7Ozs7O0lBRXZFLG9EQUFxRTs7Ozs7SUFPckUsZ0RBQXlFOztJQUN6RSwwQ0FBd0Y7Ozs7O0lBSXhGLHVDQUEyQjs7Ozs7SUFDM0IsMENBQThDOzs7OztJQUM5QyxxQ0FBaUQ7Ozs7O0lBQ2pELHVDQUFnRDs7Ozs7SUFDaEQscUNBQThDOztJQUU5QywyQ0FBeUQ7Ozs7O0lBQ3pELHVDQUFzRDs7Ozs7SUFFdEQsc0NBQW9FOztJQXdRcEUsMENBQW9DOzs7OztJQXJRbEMsbUNBQXNCOzs7OztJQUN0QixrQ0FBeUI7Ozs7O0lBQ3pCLGtDQUFnQzs7Ozs7SUFDaEMscUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIFJlbmRlcmVyMixcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBFbGVtZW50UmVmLFxyXG4gIE5nWm9uZSxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbiAgUXVlcnlMaXN0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE10eFNwbGl0QXJlYSxcclxuICBNdHhTcGxpdFBvaW50LFxyXG4gIE10eFNwbGl0U25hcHNob3QsXHJcbiAgTXR4U3BsaXRBcmVhU25hcHNob3QsXHJcbiAgTXR4U3BsaXRPdXRwdXREYXRhLFxyXG4gIE10eFNwbGl0T3V0cHV0QXJlYVNpemVzLFxyXG59IGZyb20gJy4vaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTXR4U3BsaXRQYW5lRGlyZWN0aXZlIH0gZnJvbSAnLi9zcGxpdC1wYW5lLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7XHJcbiAgZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcixcclxuICBnZXRJbnB1dEJvb2xlYW4sXHJcbiAgaXNVc2VyU2l6ZXNWYWxpZCxcclxuICBnZXRBcmVhTWluU2l6ZSxcclxuICBnZXRBcmVhTWF4U2l6ZSxcclxuICBnZXRQb2ludEZyb21FdmVudCxcclxuICBnZXRFbGVtZW50UGl4ZWxTaXplLFxyXG4gIGdldEd1dHRlclNpZGVBYnNvcnB0aW9uQ2FwYWNpdHksXHJcbiAgdXBkYXRlQXJlYVNpemUsXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcblxyXG4vKipcclxuICogbXR4LXNwbGl0XHJcbiAqXHJcbiAqXHJcbiAqICBQRVJDRU5UIE1PREUgKFt1bml0XT1cIidwZXJjZW50J1wiKVxyXG4gKiAgX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1xyXG4gKiB8ICAgICAgIEEgICAgICAgW2cxXSAgICAgICBCICAgICAgIFtnMl0gICAgICAgQyAgICAgICBbZzNdICAgICAgIEQgICAgICAgW2c0XSAgICAgICBFICAgICAgIHxcclxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XHJcbiAqIHwgICAgICAgMjAgICAgICAgICAgICAgICAgIDMwICAgICAgICAgICAgICAgICAyMCAgICAgICAgICAgICAgICAgMTUgICAgICAgICAgICAgICAgIDE1ICAgICAgfCA8LS0gW3NpemVdPVwieFwiXHJcbiAqIHwgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgfCA8LS0gW2d1dHRlclNpemVdPVwiMTBcIlxyXG4gKiB8Y2FsYygyMCUgLSA4cHgpICAgIGNhbGMoMzAlIC0gMTJweCkgICBjYWxjKDIwJSAtIDhweCkgICAgY2FsYygxNSUgLSA2cHgpICAgIGNhbGMoMTUlIC0gNnB4KXwgPC0tIENTUyBmbGV4LWJhc2lzIHByb3BlcnR5ICh3aXRoIGZsZXgtZ3JvdyZzaHJpbmsgYXQgMClcclxuICogfCAgICAgMTUycHggICAgICAgICAgICAgIDIyOHB4ICAgICAgICAgICAgICAxNTJweCAgICAgICAgICAgICAgMTE0cHggICAgICAgICAgICAgIDExNHB4ICAgICB8IDwtLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gKiB8X19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX3xcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4MDBweCAgICAgICAgIDwtLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gKiAgZmxleC1iYXNpcyA9IGNhbGMoIHsgYXJlYS5zaXplIH0lIC0geyBhcmVhLnNpemUvMTAwICogbmJHdXR0ZXIqZ3V0dGVyU2l6ZSB9cHggKTtcclxuICpcclxuICpcclxuICogIFBJWEVMIE1PREUgKFt1bml0XT1cIidwaXhlbCdcIilcclxuICogIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cclxuICogfCAgICAgICBBICAgICAgIFtnMV0gICAgICAgQiAgICAgICBbZzJdICAgICAgIEMgICAgICAgW2czXSAgICAgICBEICAgICAgIFtnNF0gICAgICAgRSAgICAgICB8XHJcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxyXG4gKiB8ICAgICAgMTAwICAgICAgICAgICAgICAgIDI1MCAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgMTUwICAgICAgICAgICAgICAgIDEwMCAgICAgIHwgPC0tIFtzaXplXT1cInlcIlxyXG4gKiB8ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIHwgPC0tIFtndXR0ZXJTaXplXT1cIjEwXCJcclxuICogfCAgIDAgMCAxMDBweCAgICAgICAgICAwIDAgMjUwcHggICAgICAgICAgIDEgMSBhdXRvICAgICAgICAgIDAgMCAxNTBweCAgICAgICAgICAwIDAgMTAwcHggICB8IDwtLSBDU1MgZmxleCBwcm9wZXJ0eSAoZmxleC1ncm93L2ZsZXgtc2hyaW5rL2ZsZXgtYmFzaXMpXHJcbiAqIHwgICAgIDEwMHB4ICAgICAgICAgICAgICAyNTBweCAgICAgICAgICAgICAgMjAwcHggICAgICAgICAgICAgIDE1MHB4ICAgICAgICAgICAgICAxMDBweCAgICAgfCA8LS0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICogfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODAwcHggICAgICAgICA8LS0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICpcclxuICovXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ210eC1zcGxpdCcsXHJcbiAgZXhwb3J0QXM6ICdtdHhTcGxpdCcsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdtdHgtc3BsaXQnLFxyXG4gIH0sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBzdHlsZVVybHM6IFtgLi9zcGxpdC5jb21wb25lbnQuc2Nzc2BdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGxpdC5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdHhTcGxpdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xyXG5cclxuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKHY6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpIHtcclxuICAgIHRoaXMuX2RpcmVjdGlvbiA9IHYgPT09ICd2ZXJ0aWNhbCcgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCBgbXR4LXNwbGl0LSR7dGhpcy5fZGlyZWN0aW9ufWApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhcclxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICBgbXR4LXNwbGl0LSR7dGhpcy5fZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ31gXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGdldCBkaXJlY3Rpb24oKTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF91bml0OiAncGVyY2VudCcgfCAncGl4ZWwnID0gJ3BlcmNlbnQnO1xyXG5cclxuICBASW5wdXQoKSBzZXQgdW5pdCh2OiAncGVyY2VudCcgfCAncGl4ZWwnKSB7XHJcbiAgICB0aGlzLl91bml0ID0gdiA9PT0gJ3BpeGVsJyA/ICdwaXhlbCcgOiAncGVyY2VudCc7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBtdHgtc3BsaXQtJHt0aGlzLl91bml0fWApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhcclxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICBgbXR4LXNwbGl0LSR7dGhpcy5fdW5pdCA9PT0gJ3BpeGVsJyA/ICdwZXJjZW50JyA6ICdwaXhlbCd9YFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKGZhbHNlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldCB1bml0KCk6ICdwZXJjZW50JyB8ICdwaXhlbCcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VuaXQ7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX2d1dHRlclNpemUgPSAxMjtcclxuXHJcbiAgQElucHV0KCkgc2V0IGd1dHRlclNpemUodjogbnVtYmVyIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fZ3V0dGVyU2l6ZSA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgMTEpO1xyXG5cclxuICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGdldCBndXR0ZXJTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfZ3V0dGVyU3RlcCA9IDE7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBndXR0ZXJTdGVwKHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZ3V0dGVyU3RlcCA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgMSk7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3V0dGVyU3RlcCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2d1dHRlclN0ZXA7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX3Jlc3RyaWN0TW92ZSA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBzZXQgcmVzdHJpY3RNb3ZlKHY6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Jlc3RyaWN0TW92ZSA9IGdldElucHV0Qm9vbGVhbih2KTtcclxuICB9XHJcblxyXG4gIGdldCByZXN0cmljdE1vdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdHJpY3RNb3ZlO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF91c2VUcmFuc2l0aW9uID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHNldCB1c2VUcmFuc2l0aW9uKHY6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3VzZVRyYW5zaXRpb24gPSBnZXRJbnB1dEJvb2xlYW4odik7XHJcblxyXG4gICAgaWYgKHRoaXMuX3VzZVRyYW5zaXRpb24pIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtc3BsaXQtdHJhbnNpdGlvbicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtc3BsaXQtdHJhbnNpdGlvbicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHVzZVRyYW5zaXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlVHJhbnNpdGlvbjtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gZ2V0SW5wdXRCb29sZWFuKHYpO1xyXG5cclxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ210eC1zcGxpdC1kaXNhYmxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtc3BsaXQtZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfZGlyOiAnbHRyJyB8ICdydGwnID0gJ2x0cic7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBkaXIodjogJ2x0cicgfCAncnRsJykge1xyXG4gICAgdGhpcy5fZGlyID0gdiA9PT0gJ3J0bCcgPyAncnRsJyA6ICdsdHInO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RpcicsIHRoaXMuX2Rpcik7XHJcbiAgfVxyXG5cclxuICBnZXQgZGlyKCk6ICdsdHInIHwgJ3J0bCcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpcjtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfZ3V0dGVyRGJsQ2xpY2tEdXJhdGlvbiA9IDA7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBndXR0ZXJEYmxDbGlja0R1cmF0aW9uKHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZ3V0dGVyRGJsQ2xpY2tEdXJhdGlvbiA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgMCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3V0dGVyRGJsQ2xpY2tEdXJhdGlvbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2d1dHRlckRibENsaWNrRHVyYXRpb247XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE10eFNwbGl0T3V0cHV0RGF0YT4oZmFsc2UpO1xyXG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNdHhTcGxpdE91dHB1dERhdGE+KGZhbHNlKTtcclxuICBAT3V0cHV0KCkgZ3V0dGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE10eFNwbGl0T3V0cHV0RGF0YT4oZmFsc2UpO1xyXG4gIEBPdXRwdXQoKSBndXR0ZXJEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TXR4U3BsaXRPdXRwdXREYXRhPihmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgdHJhbnNpdGlvbkVuZFN1YnNjcmliZXI6IFN1YnNjcmliZXI8TXR4U3BsaXRPdXRwdXRBcmVhU2l6ZXM+O1xyXG4gIEBPdXRwdXQoKSBnZXQgdHJhbnNpdGlvbkVuZCgpOiBPYnNlcnZhYmxlPE10eFNwbGl0T3V0cHV0QXJlYVNpemVzPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiAodGhpcy50cmFuc2l0aW9uRW5kU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpKS5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWU8TXR4U3BsaXRPdXRwdXRBcmVhU2l6ZXM+KDIwKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZHJhZ1Byb2dyZXNzU3ViamVjdDogU3ViamVjdDxNdHhTcGxpdE91dHB1dERhdGE+ID0gbmV3IFN1YmplY3QoKTtcclxuICBkcmFnUHJvZ3Jlc3MkOiBPYnNlcnZhYmxlPE10eFNwbGl0T3V0cHV0RGF0YT4gPSB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBpc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBkcmFnTGlzdGVuZXJzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xyXG4gIHByaXZhdGUgc25hcHNob3Q6IE10eFNwbGl0U25hcHNob3QgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIHN0YXJ0UG9pbnQ6IE10eFNwbGl0UG9pbnQgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIGVuZFBvaW50OiBNdHhTcGxpdFBvaW50IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBkaXNwbGF5ZWRBcmVhczogQXJyYXk8TXR4U3BsaXRBcmVhPiA9IFtdO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgaGlkZWRBcmVhczogQXJyYXk8TXR4U3BsaXRBcmVhPiA9IFtdO1xyXG5cclxuICBAVmlld0NoaWxkcmVuKCdndXR0ZXJFbHMnKSBwcml2YXRlIGd1dHRlckVsczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHtcclxuICAgIC8vIFRvIGZvcmNlIGFkZGluZyBkZWZhdWx0IGNsYXNzLCBjb3VsZCBiZSBvdmVycmlkZSBieSB1c2VyIEBJbnB1dCgpIG9yIG5vdFxyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLl9kaXJlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAvLyBUbyBhdm9pZCB0cmFuc2l0aW9uIGF0IGZpcnN0IHJlbmRlcmluZ1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LXNwbGl0LWluaXQnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TmJHdXR0ZXJzKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDAgPyAwIDogdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEFyZWEoY29tcG9uZW50OiBNdHhTcGxpdFBhbmVEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5ld0FyZWE6IE10eFNwbGl0QXJlYSA9IHtcclxuICAgICAgY29tcG9uZW50LFxyXG4gICAgICBvcmRlcjogMCxcclxuICAgICAgc2l6ZTogMCxcclxuICAgICAgbWluU2l6ZTogbnVsbCxcclxuICAgICAgbWF4U2l6ZTogbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNvbXBvbmVudC52aXNpYmxlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaChuZXdBcmVhKTtcclxuXHJcbiAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhpZGVkQXJlYXMucHVzaChuZXdBcmVhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVBcmVhKGNvbXBvbmVudDogTXR4U3BsaXRQYW5lRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCkpIHtcclxuICAgICAgY29uc3QgYXJlYSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xyXG4gICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnNwbGljZSh0aGlzLmRpc3BsYXllZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xyXG5cclxuICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5oaWRlZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KSkge1xyXG4gICAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcclxuICAgICAgdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQXJlYShcclxuICAgIGNvbXBvbmVudDogTXR4U3BsaXRQYW5lRGlyZWN0aXZlLFxyXG4gICAgcmVzZXRPcmRlcnM6IGJvb2xlYW4sXHJcbiAgICByZXNldFNpemVzOiBib29sZWFuXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoY29tcG9uZW50LnZpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5idWlsZChyZXNldE9yZGVycywgcmVzZXRTaXplcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0FyZWEoY29tcG9uZW50OiBNdHhTcGxpdFBhbmVEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgIGNvbnN0IGFyZWEgPSB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xyXG4gICAgaWYgKGFyZWEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXJlYXMgPSB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcclxuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaCguLi5hcmVhcyk7XHJcblxyXG4gICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlQXJlYShjb21wOiBNdHhTcGxpdFBhbmVEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcCk7XHJcbiAgICBpZiAoYXJlYSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcmVhcyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XHJcbiAgICBhcmVhcy5mb3JFYWNoKF9hcmVhID0+IHtcclxuICAgICAgX2FyZWEub3JkZXIgPSAwO1xyXG4gICAgICBfYXJlYS5zaXplID0gMDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5oaWRlZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xyXG5cclxuICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmlzaWJsZUFyZWFTaXplcygpOiBNdHhTcGxpdE91dHB1dEFyZWFTaXplcyB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5tYXAoYSA9PiAoYS5zaXplID09PSBudWxsID8gJyonIDogYS5zaXplKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmlzaWJsZUFyZWFTaXplcyhzaXplczogTXR4U3BsaXRPdXRwdXRBcmVhU2l6ZXMpOiBib29sZWFuIHtcclxuICAgIGlmIChzaXplcy5sZW5ndGggIT09IHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtYXRlZFNpemVzID0gc2l6ZXMubWFwKHMgPT4gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcihzLCBudWxsKSk7XHJcbiAgICBjb25zdCBpc1ZhbGlkID0gaXNVc2VyU2l6ZXNWYWxpZCh0aGlzLnVuaXQsIGZvcm1hdGVkU2l6ZXMpO1xyXG5cclxuICAgIGlmIChpc1ZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKChhcmVhLCBpKSA9PiAoYXJlYS5jb21wb25lbnQuX3NpemUgPSBmb3JtYXRlZFNpemVzW2ldKSk7XHJcblxyXG4gICAgdGhpcy5idWlsZChmYWxzZSwgdHJ1ZSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGQocmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XHJcblxyXG4gICAgLy8gwqQgQVJFQVMgT1JERVJcclxuXHJcbiAgICBpZiAocmVzZXRPcmRlcnMgPT09IHRydWUpIHtcclxuICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnb3JkZXInIGZvciBlYWNoIGFyZWEsIHVzZSBpdCB0byBzb3J0IHRoZW0uXHJcbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wb25lbnQub3JkZXIgIT09IG51bGwpKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zb3J0KFxyXG4gICAgICAgICAgKGEsIGIpID0+ICgoYS5jb21wb25lbnQub3JkZXIgYXMgbnVtYmVyKSAtIGIuY29tcG9uZW50Lm9yZGVyKSBhcyBudW1iZXJcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBUaGVuIHNldCByZWFsIG9yZGVyIHdpdGggbXVsdGlwbGVzIG9mIDIsIG51bWJlcnMgYmV0d2VlbiB3aWxsIGJlIHVzZWQgYnkgZ3V0dGVycy5cclxuICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKChhcmVhLCBpKSA9PiB7XHJcbiAgICAgICAgYXJlYS5vcmRlciA9IGkgKiAyO1xyXG4gICAgICAgIGFyZWEuY29tcG9uZW50LnNldFN0eWxlT3JkZXIoYXJlYS5vcmRlcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIMKkIEFSRUFTIFNJWkVcclxuXHJcbiAgICBpZiAocmVzZXRTaXplcyA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCB1c2VVc2VyU2l6ZXMgPSBpc1VzZXJTaXplc1ZhbGlkKFxyXG4gICAgICAgIHRoaXMudW5pdCxcclxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLm1hcChhID0+IGEuY29tcG9uZW50LnNpemUpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBzd2l0Y2ggKHRoaXMudW5pdCkge1xyXG4gICAgICAgIGNhc2UgJ3BlcmNlbnQnOiB7XHJcbiAgICAgICAgICBjb25zdCBkZWZhdWx0U2l6ZSA9IDEwMCAvIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcclxuICAgICAgICAgICAgYXJlYS5zaXplID0gdXNlVXNlclNpemVzID8gKGFyZWEuY29tcG9uZW50LnNpemUgYXMgbnVtYmVyKSA6IGRlZmF1bHRTaXplO1xyXG4gICAgICAgICAgICBhcmVhLm1pblNpemUgPSBnZXRBcmVhTWluU2l6ZShhcmVhKTtcclxuICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gZ2V0QXJlYU1heFNpemUoYXJlYSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdwaXhlbCc6IHtcclxuICAgICAgICAgIGlmICh1c2VVc2VyU2l6ZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xyXG4gICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IGFyZWEuY29tcG9uZW50LnNpemU7XHJcbiAgICAgICAgICAgICAgYXJlYS5taW5TaXplID0gZ2V0QXJlYU1pblNpemUoYXJlYSk7XHJcbiAgICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gZ2V0QXJlYU1heFNpemUoYXJlYSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRTaXplQXJlYXMgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuY29tcG9uZW50LnNpemUgPT09IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgLy8gTm8gd2lsZGNhcmQgYXJlYSA+IE5lZWQgdG8gc2VsZWN0IG9uZSBhcmJpdHJhcmlseSA+IGZpcnN0XHJcbiAgICAgICAgICAgIGlmICh3aWxkY2FyZFNpemVBcmVhcy5sZW5ndGggPT09IDAgJiYgdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKChhcmVhLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSBpID09PSAwID8gbnVsbCA6IGFyZWEuY29tcG9uZW50LnNpemU7XHJcbiAgICAgICAgICAgICAgICBhcmVhLm1pblNpemUgPSBpID09PSAwID8gbnVsbCA6IGdldEFyZWFNaW5TaXplKGFyZWEpO1xyXG4gICAgICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gaSA9PT0gMCA/IG51bGwgOiBnZXRBcmVhTWF4U2l6ZShhcmVhKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBNb3JlIHRoYW4gb25lIHdpbGRjYXJkIGFyZWEgPiBOZWVkIHRvIGtlZXAgb25seSBvbmUgYXJiaXRyYXJseSA+IGZpcnN0XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICAgICAgICAgICAgZWxzZSBpZiAod2lsZGNhcmRTaXplQXJlYXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgIGxldCBhbHJlYWR5R290T25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZWEuY29tcG9uZW50LnNpemUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGFscmVhZHlHb3RPbmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBhcmVhLm1pblNpemUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZWEubWF4U2l6ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeUdvdE9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZWEubWluU2l6ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gYXJlYS5jb21wb25lbnQuc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgYXJlYS5taW5TaXplID0gZ2V0QXJlYU1pblNpemUoYXJlYSk7XHJcbiAgICAgICAgICAgICAgICAgIGFyZWEubWF4U2l6ZSA9IGdldEFyZWFNYXhTaXplKGFyZWEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XHJcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoU3R5bGVTaXplcygpOiB2b2lkIHtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIFBFUkNFTlQgTU9ERVxyXG4gICAgaWYgKHRoaXMudW5pdCA9PT0gJ3BlcmNlbnQnKSB7XHJcbiAgICAgIC8vIE9ubHkgb25lIGFyZWEgPiBmbGV4LWJhc2lzIDEwMCVcclxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhc1swXS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KDAsIDAsIGAxMDAlYCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBNdWx0aXBsZSBhcmVhcyA+IHVzZSBlYWNoIHBlcmNlbnQgYmFzaXNcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzdW1HdXR0ZXJTaXplID0gdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xyXG4gICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBgY2FsYyggJHthcmVhLnNpemV9JSAtICR7KChhcmVhLnNpemUgYXMgbnVtYmVyKSAvIDEwMCkgKiBzdW1HdXR0ZXJTaXplfXB4IClgLFxyXG4gICAgICAgICAgICBhcmVhLm1pblNpemUgIT09IG51bGwgJiYgYXJlYS5taW5TaXplID09PSBhcmVhLnNpemUgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWEubWF4U2l6ZSAhPT0gbnVsbCAmJiBhcmVhLm1heFNpemUgPT09IGFyZWEuc2l6ZSA/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gUElYRUwgTU9ERVxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gICAgZWxzZSBpZiAodGhpcy51bml0ID09PSAncGl4ZWwnKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcclxuICAgICAgICAvLyBBcmVhIHdpdGggd2lsZGNhcmQgc2l6ZVxyXG4gICAgICAgIGlmIChhcmVhLnNpemUgPT09IG51bGwpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZUZsZXgoMSwgMSwgYDEwMCVgLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KDEsIDEsIGBhdXRvYCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQXJlYSB3aXRoIHBpeGVsIHNpemVcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAvLyBPbmx5IG9uZSBhcmVhID4gZmxleC1iYXNpcyAxMDAlXHJcbiAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KDAsIDAsIGAxMDAlYCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIE11bHRpcGxlIGFyZWFzID4gdXNlIGVhY2ggcGl4ZWwgYmFzaXNcclxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZUZsZXgoXHJcbiAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgIGAke2FyZWEuc2l6ZX1weGAsXHJcbiAgICAgICAgICAgICAgYXJlYS5taW5TaXplICE9PSBudWxsICYmIGFyZWEubWluU2l6ZSA9PT0gYXJlYS5zaXplID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGFyZWEubWF4U2l6ZSAhPT0gbnVsbCAmJiBhcmVhLm1heFNpemUgPT09IGFyZWEuc2l6ZSA/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY2xpY2tUaW1lb3V0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHVibGljIGNsaWNrR3V0dGVyKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZ3V0dGVyTnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRlbXBQb2ludCA9IGdldFBvaW50RnJvbUV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAvLyBCZSBzdXJlIG1vdXNldXAvdG91Y2hlbmQgaGFwcGVuZWQgYXQgc2FtZSBwb2ludCBhcyBtb3VzZWRvd24vdG91Y2hzdGFydCB0byB0cmlnZ2VyIGNsaWNrL2RibGNsaWNrXHJcbiAgICBpZiAodGhpcy5zdGFydFBvaW50ICYmIHRoaXMuc3RhcnRQb2ludC54ID09PSB0ZW1wUG9pbnQueCAmJiB0aGlzLnN0YXJ0UG9pbnQueSA9PT0gdGVtcFBvaW50LnkpIHtcclxuICAgICAgLy8gSWYgdGltZW91dCBpbiBwcm9ncmVzcyBhbmQgbmV3IGNsaWNrID4gY2xlYXJUaW1lb3V0ICYgZGJsQ2xpY2tFdmVudFxyXG4gICAgICBpZiAodGhpcy5fY2xpY2tUaW1lb3V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9jbGlja1RpbWVvdXQpO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ2RibGNsaWNrJywgZ3V0dGVyTnVtKTtcclxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEVsc2Ugc3RhcnQgdGltZW91dCB0byBjYWxsIGNsaWNrRXZlbnQgYXQgZW5kXHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY2xpY2tUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fY2xpY2tUaW1lb3V0ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMubm90aWZ5KCdjbGljaycsIGd1dHRlck51bSk7XHJcbiAgICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xyXG4gICAgICAgIH0sIHRoaXMuZ3V0dGVyRGJsQ2xpY2tEdXJhdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGFydERyYWdnaW5nKFxyXG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LFxyXG4gICAgZ3V0dGVyT3JkZXI6IG51bWJlcixcclxuICAgIGd1dHRlck51bTogbnVtYmVyXHJcbiAgKTogdm9pZCB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5zdGFydFBvaW50ID0gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xyXG4gICAgaWYgKHRoaXMuc3RhcnRQb2ludCA9PT0gbnVsbCB8fCB0aGlzLmRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNuYXBzaG90ID0ge1xyXG4gICAgICBndXR0ZXJOdW0sXHJcbiAgICAgIGxhc3RTdGVwcGVkT2Zmc2V0OiAwLFxyXG4gICAgICBhbGxBcmVhc1NpemVQaXhlbDpcclxuICAgICAgICBnZXRFbGVtZW50UGl4ZWxTaXplKHRoaXMuZWxSZWYsIHRoaXMuZGlyZWN0aW9uKSAtIHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemUsXHJcbiAgICAgIGFsbEludm9sdmVkQXJlYXNTaXplUGVyY2VudDogMTAwLFxyXG4gICAgICBhcmVhc0JlZm9yZUd1dHRlcjogW10sXHJcbiAgICAgIGFyZWFzQWZ0ZXJHdXR0ZXI6IFtdLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XHJcbiAgICAgIGNvbnN0IGFyZWFTbmFwc2hvdDogTXR4U3BsaXRBcmVhU25hcHNob3QgPSB7XHJcbiAgICAgICAgYXJlYSxcclxuICAgICAgICBzaXplUGl4ZWxBdFN0YXJ0OiBnZXRFbGVtZW50UGl4ZWxTaXplKGFyZWEuY29tcG9uZW50LmVsUmVmLCB0aGlzLmRpcmVjdGlvbiksXHJcbiAgICAgICAgc2l6ZVBlcmNlbnRBdFN0YXJ0OiB0aGlzLnVuaXQgPT09ICdwZXJjZW50JyA/IGFyZWEuc2l6ZSA6IC0xLCAvLyBJZiBwaXhlbCBtb2RlLCBhbnl3YXksIHdpbGwgbm90IGJlIHVzZWQuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoYXJlYS5vcmRlciA8IGd1dHRlck9yZGVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdHJpY3RNb3ZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQmVmb3JlR3V0dGVyID0gW2FyZWFTbmFwc2hvdF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNCZWZvcmVHdXR0ZXIudW5zaGlmdChhcmVhU25hcHNob3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChhcmVhLm9yZGVyID4gZ3V0dGVyT3JkZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yZXN0cmljdE1vdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnNuYXBzaG90LmFyZWFzQWZ0ZXJHdXR0ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlciA9IFthcmVhU25hcHNob3RdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQWZ0ZXJHdXR0ZXIucHVzaChhcmVhU25hcHNob3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zbmFwc2hvdC5hbGxJbnZvbHZlZEFyZWFzU2l6ZVBlcmNlbnQgPSBbXHJcbiAgICAgIC4uLnRoaXMuc25hcHNob3QuYXJlYXNCZWZvcmVHdXR0ZXIsXHJcbiAgICAgIC4uLnRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlcixcclxuICAgIF0ucmVkdWNlKCh0LCBhKSA9PiB0ICsgYS5zaXplUGVyY2VudEF0U3RhcnQsIDApO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0JlZm9yZUd1dHRlci5sZW5ndGggPT09IDAgfHxcclxuICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0FmdGVyR3V0dGVyLmxlbmd0aCA9PT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaChcclxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNldXAnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKFxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hlbmQnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKFxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hjYW5jZWwnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKFxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZW1vdmUnLCB0aGlzLmRyYWdFdmVudC5iaW5kKHRoaXMpKVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaChcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2htb3ZlJywgdGhpcy5kcmFnRXZlbnQuYmluZCh0aGlzKSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IGFyZWEuY29tcG9uZW50LmxvY2tFdmVudHMoKSk7XHJcblxyXG4gICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LWRyYWdnaW5nJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKFxyXG4gICAgICB0aGlzLmd1dHRlckVscy50b0FycmF5KClbdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0gLSAxXS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnbXR4LWRyYWdnZWQnXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubm90aWZ5KCdzdGFydCcsIHRoaXMuc25hcHNob3QuZ3V0dGVyTnVtKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIGlmICh0aGlzLl9jbGlja1RpbWVvdXQgIT09IG51bGwpIHtcclxuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9jbGlja1RpbWVvdXQpO1xyXG4gICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVuZFBvaW50ID0gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xyXG4gICAgaWYgKHRoaXMuZW5kUG9pbnQgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBzdGVwcGVkT2Zmc2V0XHJcblxyXG4gICAgbGV0IG9mZnNldCA9XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCdcclxuICAgICAgICA/IHRoaXMuc3RhcnRQb2ludC54IC0gdGhpcy5lbmRQb2ludC54XHJcbiAgICAgICAgOiB0aGlzLnN0YXJ0UG9pbnQueSAtIHRoaXMuZW5kUG9pbnQueTtcclxuICAgIGlmICh0aGlzLmRpciA9PT0gJ3J0bCcpIHtcclxuICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0ZXBwZWRPZmZzZXQgPSBNYXRoLnJvdW5kKG9mZnNldCAvIHRoaXMuZ3V0dGVyU3RlcCkgKiB0aGlzLmd1dHRlclN0ZXA7XHJcblxyXG4gICAgaWYgKHN0ZXBwZWRPZmZzZXQgPT09IHRoaXMuc25hcHNob3QubGFzdFN0ZXBwZWRPZmZzZXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc25hcHNob3QubGFzdFN0ZXBwZWRPZmZzZXQgPSBzdGVwcGVkT2Zmc2V0O1xyXG5cclxuICAgIC8vIE5lZWQgdG8ga25vdyBpZiBlYWNoIGd1dHRlciBzaWRlIGFyZWFzIGNvdWxkIHJlYWN0cyB0byBzdGVwcGVkT2Zmc2V0XHJcblxyXG4gICAgbGV0IGFyZWFzQmVmb3JlID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eShcclxuICAgICAgdGhpcy51bml0LFxyXG4gICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQmVmb3JlR3V0dGVyLFxyXG4gICAgICAtc3RlcHBlZE9mZnNldCxcclxuICAgICAgdGhpcy5zbmFwc2hvdC5hbGxBcmVhc1NpemVQaXhlbFxyXG4gICAgKTtcclxuICAgIGxldCBhcmVhc0FmdGVyID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eShcclxuICAgICAgdGhpcy51bml0LFxyXG4gICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQWZ0ZXJHdXR0ZXIsXHJcbiAgICAgIHN0ZXBwZWRPZmZzZXQsXHJcbiAgICAgIHRoaXMuc25hcHNob3QuYWxsQXJlYXNTaXplUGl4ZWxcclxuICAgICk7XHJcblxyXG4gICAgLy8gRWFjaCBndXR0ZXIgc2lkZSBhcmVhcyBjYW4ndCBhYnNvcmIgYWxsIG9mZnNldFxyXG4gICAgaWYgKGFyZWFzQmVmb3JlLnJlbWFpbiAhPT0gMCAmJiBhcmVhc0FmdGVyLnJlbWFpbiAhPT0gMCkge1xyXG4gICAgICBpZiAoTWF0aC5hYnMoYXJlYXNCZWZvcmUucmVtYWluKSA9PT0gTWF0aC5hYnMoYXJlYXNBZnRlci5yZW1haW4pKSB7XHJcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoYXJlYXNCZWZvcmUucmVtYWluKSA+IE1hdGguYWJzKGFyZWFzQWZ0ZXIucmVtYWluKSkge1xyXG4gICAgICAgIGFyZWFzQWZ0ZXIgPSBnZXRHdXR0ZXJTaWRlQWJzb3JwdGlvbkNhcGFjaXR5KFxyXG4gICAgICAgICAgdGhpcy51bml0LFxyXG4gICAgICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0FmdGVyR3V0dGVyLFxyXG4gICAgICAgICAgc3RlcHBlZE9mZnNldCArIGFyZWFzQmVmb3JlLnJlbWFpbixcclxuICAgICAgICAgIHRoaXMuc25hcHNob3QuYWxsQXJlYXNTaXplUGl4ZWxcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFyZWFzQmVmb3JlID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eShcclxuICAgICAgICAgIHRoaXMudW5pdCxcclxuICAgICAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNCZWZvcmVHdXR0ZXIsXHJcbiAgICAgICAgICAtKHN0ZXBwZWRPZmZzZXQgLSBhcmVhc0FmdGVyLnJlbWFpbiksXHJcbiAgICAgICAgICB0aGlzLnNuYXBzaG90LmFsbEFyZWFzU2l6ZVBpeGVsXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQXJlYXMgYmVmb3JlIGd1dHRlciBjYW4ndCBhYnNvcmJzIGFsbCBvZmZzZXQgPiBuZWVkIHRvIHJlY2FsY3VsYXRlIHNpemVzIGZvciBhcmVhcyBhZnRlciBndXR0ZXIuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgICBlbHNlIGlmIChhcmVhc0JlZm9yZS5yZW1haW4gIT09IDApIHtcclxuICAgICAgYXJlYXNBZnRlciA9IGdldEd1dHRlclNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkoXHJcbiAgICAgICAgdGhpcy51bml0LFxyXG4gICAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlcixcclxuICAgICAgICBzdGVwcGVkT2Zmc2V0ICsgYXJlYXNCZWZvcmUucmVtYWluLFxyXG4gICAgICAgIHRoaXMuc25hcHNob3QuYWxsQXJlYXNTaXplUGl4ZWxcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIC8vIEFyZWFzIGFmdGVyIGd1dHRlciBjYW4ndCBhYnNvcmJzIGFsbCBvZmZzZXQgPiBuZWVkIHRvIHJlY2FsY3VsYXRlIHNpemVzIGZvciBhcmVhcyBiZWZvcmUgZ3V0dGVyLlxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gICAgZWxzZSBpZiAoYXJlYXNBZnRlci5yZW1haW4gIT09IDApIHtcclxuICAgICAgYXJlYXNCZWZvcmUgPSBnZXRHdXR0ZXJTaWRlQWJzb3JwdGlvbkNhcGFjaXR5KFxyXG4gICAgICAgIHRoaXMudW5pdCxcclxuICAgICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQmVmb3JlR3V0dGVyLFxyXG4gICAgICAgIC0oc3RlcHBlZE9mZnNldCAtIGFyZWFzQWZ0ZXIucmVtYWluKSxcclxuICAgICAgICB0aGlzLnNuYXBzaG90LmFsbEFyZWFzU2l6ZVBpeGVsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudW5pdCA9PT0gJ3BlcmNlbnQnKSB7XHJcbiAgICAgIC8vIEhhY2sgYmVjYXVzZSBvZiBicm93c2VyIG1lc3NpbmcgdXAgd2l0aCBzaXplcyB1c2luZyBjYWxjKFglIC0gWXB4KSAtPiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAvLyBJZiBub3QgdGhlcmUsIHBsYXlpbmcgd2l0aCBndXR0ZXJzIG1ha2VzIHRvdGFsIGdvaW5nIGRvd24gdG8gOTkuOTk4NzUlIHRoZW4gOTkuOTkyODYlLCA5OS45ODk4NiUsLi5cclxuICAgICAgY29uc3QgYWxsID0gWy4uLmFyZWFzQmVmb3JlLmxpc3QsIC4uLmFyZWFzQWZ0ZXIubGlzdF07XHJcbiAgICAgIGNvbnN0IGFyZWFUb1Jlc2V0ID0gYWxsLmZpbmQoXHJcbiAgICAgICAgYSA9PlxyXG4gICAgICAgICAgYS5wZXJjZW50QWZ0ZXJBYnNvcnB0aW9uICE9PSAwICYmXHJcbiAgICAgICAgICBhLnBlcmNlbnRBZnRlckFic29ycHRpb24gIT09IGEuYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSAmJlxyXG4gICAgICAgICAgYS5wZXJjZW50QWZ0ZXJBYnNvcnB0aW9uICE9PSBhLmFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemVcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChhcmVhVG9SZXNldCkge1xyXG4gICAgICAgIGFyZWFUb1Jlc2V0LnBlcmNlbnRBZnRlckFic29ycHRpb24gPVxyXG4gICAgICAgICAgdGhpcy5zbmFwc2hvdC5hbGxJbnZvbHZlZEFyZWFzU2l6ZVBlcmNlbnQgLVxyXG4gICAgICAgICAgYWxsXHJcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhICE9PSBhcmVhVG9SZXNldClcclxuICAgICAgICAgICAgLnJlZHVjZSgodG90YWwsIGEpID0+IHRvdGFsICsgYS5wZXJjZW50QWZ0ZXJBYnNvcnB0aW9uLCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vdyB3ZSBrbm93IGFyZWFzIGNvdWxkIGFic29yYiBzdGVwcGVkT2Zmc2V0LCB0aW1lIHRvIHJlYWxseSB1cGRhdGUgc2l6ZXNcclxuXHJcbiAgICBhcmVhc0JlZm9yZS5saXN0LmZvckVhY2goaXRlbSA9PiB1cGRhdGVBcmVhU2l6ZSh0aGlzLnVuaXQsIGl0ZW0pKTtcclxuICAgIGFyZWFzQWZ0ZXIubGlzdC5mb3JFYWNoKGl0ZW0gPT4gdXBkYXRlQXJlYVNpemUodGhpcy51bml0LCBpdGVtKSk7XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoU3R5bGVTaXplcygpO1xyXG4gICAgdGhpcy5ub3RpZnkoJ3Byb2dyZXNzJywgdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiBhcmVhLmNvbXBvbmVudC51bmxvY2tFdmVudHMoKSk7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMuZHJhZ0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGZjdCA9IHRoaXMuZHJhZ0xpc3RlbmVycy5wb3AoKTtcclxuICAgICAgaWYgKGZjdCkge1xyXG4gICAgICAgIGZjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2FybmluZzogSGF2ZSB0byBiZSBiZWZvcmUgXCJub3RpZnkoJ2VuZCcpXCJcclxuICAgIC8vIGJlY2F1c2UgXCJub3RpZnkoJ2VuZCcpXCJcIiBjYW4gYmUgbGlua2VkIHRvIFwiW3NpemVdPSd4J1wiID4gXCJidWlsZCgpXCIgPiBcInN0b3BEcmFnZ2luZygpXCJcclxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIElmIG1vdmVkIGZyb20gc3RhcnRpbmcgcG9pbnQsIG5vdGlmeSBlbmRcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5lbmRQb2ludCAmJlxyXG4gICAgICAodGhpcy5zdGFydFBvaW50LnggIT09IHRoaXMuZW5kUG9pbnQueCB8fCB0aGlzLnN0YXJ0UG9pbnQueSAhPT0gdGhpcy5lbmRQb2ludC55KVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubm90aWZ5KCdlbmQnLCB0aGlzLnNuYXBzaG90Lmd1dHRlck51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtZHJhZ2dpbmcnKTtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoXHJcbiAgICAgIHRoaXMuZ3V0dGVyRWxzLnRvQXJyYXkoKVt0aGlzLnNuYXBzaG90Lmd1dHRlck51bSAtIDFdLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdtdHgtZHJhZ2dlZCdcclxuICAgICk7XHJcbiAgICB0aGlzLnNuYXBzaG90ID0gbnVsbDtcclxuXHJcbiAgICAvLyBOZWVkZWQgdG8gbGV0IChjbGljayk9XCJjbGlja0d1dHRlciguLi4pXCIgZXZlbnQgcnVuIGFuZCB2ZXJpZnkgaWYgbW91c2UgbW92ZWQgb3Igbm90XHJcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb2ludCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lbmRQb2ludCA9IG51bGw7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbm90aWZ5KFxyXG4gICAgdHlwZTogJ3N0YXJ0JyB8ICdwcm9ncmVzcycgfCAnZW5kJyB8ICdjbGljaycgfCAnZGJsY2xpY2snIHwgJ3RyYW5zaXRpb25FbmQnLFxyXG4gICAgZ3V0dGVyTnVtOiBudW1iZXJcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0IHNpemVzID0gdGhpcy5nZXRWaXNpYmxlQXJlYVNpemVzKCk7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICdzdGFydCcpIHtcclxuICAgICAgdGhpcy5kcmFnU3RhcnQuZW1pdCh7IGd1dHRlck51bSwgc2l6ZXMgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlbmQnKSB7XHJcbiAgICAgIHRoaXMuZHJhZ0VuZC5lbWl0KHsgZ3V0dGVyTnVtLCBzaXplcyB9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xyXG4gICAgICB0aGlzLmd1dHRlckNsaWNrLmVtaXQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZGJsY2xpY2snKSB7XHJcbiAgICAgIHRoaXMuZ3V0dGVyRGJsQ2xpY2suZW1pdCh7IGd1dHRlck51bSwgc2l6ZXMgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0cmFuc2l0aW9uRW5kJykge1xyXG4gICAgICBpZiAodGhpcy50cmFuc2l0aW9uRW5kU3Vic2NyaWJlcikge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnRyYW5zaXRpb25FbmRTdWJzY3JpYmVyLm5leHQoc2l6ZXMpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncHJvZ3Jlc3MnKSB7XHJcbiAgICAgIC8vIFN0YXkgb3V0c2lkZSB6b25lIHRvIGFsbG93IHVzZXJzIGRvIHdoYXQgdGhleSB3YW50IGFib3V0IGNoYW5nZSBkZXRlY3Rpb24gbWVjaGFuaXNtLlxyXG4gICAgICB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QubmV4dCh7IGd1dHRlck51bSwgc2l6ZXMgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xyXG4gIH1cclxufVxyXG4iXX0=