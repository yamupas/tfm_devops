/**
 * @fileoverview added by tsickle
 * Generated from: split.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class MtxSplitComponent {
    /**
     * @param {?} ngZone
     * @param {?} elRef
     * @param {?} cdRef
     * @param {?} renderer
     */
    constructor(ngZone, elRef, cdRef, renderer) {
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
    /**
     * @param {?} v
     * @return {?}
     */
    set direction(v) {
        this._direction = v === 'vertical' ? 'vertical' : 'horizontal';
        this.renderer.addClass(this.elRef.nativeElement, `mtx-split-${this._direction}`);
        this.renderer.removeClass(this.elRef.nativeElement, `mtx-split-${this._direction === 'vertical' ? 'horizontal' : 'vertical'}`);
        this.build(false, false);
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._direction;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set unit(v) {
        this._unit = v === 'pixel' ? 'pixel' : 'percent';
        this.renderer.addClass(this.elRef.nativeElement, `mtx-split-${this._unit}`);
        this.renderer.removeClass(this.elRef.nativeElement, `mtx-split-${this._unit === 'pixel' ? 'percent' : 'pixel'}`);
        this.build(false, true);
    }
    /**
     * @return {?}
     */
    get unit() {
        return this._unit;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set gutterSize(v) {
        this._gutterSize = getInputPositiveNumber(v, 11);
        this.build(false, false);
    }
    /**
     * @return {?}
     */
    get gutterSize() {
        return this._gutterSize;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set gutterStep(v) {
        this._gutterStep = getInputPositiveNumber(v, 1);
    }
    /**
     * @return {?}
     */
    get gutterStep() {
        return this._gutterStep;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set restrictMove(v) {
        this._restrictMove = getInputBoolean(v);
    }
    /**
     * @return {?}
     */
    get restrictMove() {
        return this._restrictMove;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set useTransition(v) {
        this._useTransition = getInputBoolean(v);
        if (this._useTransition) {
            this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-transition');
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, 'mtx-split-transition');
        }
    }
    /**
     * @return {?}
     */
    get useTransition() {
        return this._useTransition;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set disabled(v) {
        this._disabled = getInputBoolean(v);
        if (this._disabled) {
            this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-disabled');
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, 'mtx-split-disabled');
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dir(v) {
        this._dir = v === 'rtl' ? 'rtl' : 'ltr';
        this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
    }
    /**
     * @return {?}
     */
    get dir() {
        return this._dir;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set gutterDblClickDuration(v) {
        this._gutterDblClickDuration = getInputPositiveNumber(v, 0);
    }
    /**
     * @return {?}
     */
    get gutterDblClickDuration() {
        return this._gutterDblClickDuration;
    }
    /**
     * @return {?}
     */
    get transitionEnd() {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        subscriber => (this.transitionEndSubscriber = subscriber))).pipe(debounceTime(20));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            // To avoid transition at first rendering
            setTimeout((/**
             * @return {?}
             */
            () => this.renderer.addClass(this.elRef.nativeElement, 'mtx-split-init')));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    getNbGutters() {
        return this.displayedAreas.length === 0 ? 0 : this.displayedAreas.length - 1;
    }
    /**
     * @param {?} component
     * @return {?}
     */
    addArea(component) {
        /** @type {?} */
        const newArea = {
            component,
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
    }
    /**
     * @param {?} component
     * @return {?}
     */
    removeArea(component) {
        if (this.displayedAreas.some((/**
         * @param {?} a
         * @return {?}
         */
        a => a.component === component))) {
            /** @type {?} */
            const area = this.displayedAreas.find((/**
             * @param {?} a
             * @return {?}
             */
            a => a.component === component));
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some((/**
         * @param {?} a
         * @return {?}
         */
        a => a.component === component))) {
            /** @type {?} */
            const area = this.hidedAreas.find((/**
             * @param {?} a
             * @return {?}
             */
            a => a.component === component));
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    }
    /**
     * @param {?} component
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    updateArea(component, resetOrders, resetSizes) {
        if (component.visible === true) {
            this.build(resetOrders, resetSizes);
        }
    }
    /**
     * @param {?} component
     * @return {?}
     */
    showArea(component) {
        /** @type {?} */
        const area = this.hidedAreas.find((/**
         * @param {?} a
         * @return {?}
         */
        a => a.component === component));
        if (area === undefined) {
            return;
        }
        /** @type {?} */
        const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        this.displayedAreas.push(...areas);
        this.build(true, true);
    }
    /**
     * @param {?} comp
     * @return {?}
     */
    hideArea(comp) {
        /** @type {?} */
        const area = this.displayedAreas.find((/**
         * @param {?} a
         * @return {?}
         */
        a => a.component === comp));
        if (area === undefined) {
            return;
        }
        /** @type {?} */
        const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
        areas.forEach((/**
         * @param {?} _area
         * @return {?}
         */
        _area => {
            _area.order = 0;
            _area.size = 0;
        }));
        this.hidedAreas.push(...areas);
        this.build(true, true);
    }
    /**
     * @return {?}
     */
    getVisibleAreaSizes() {
        return this.displayedAreas.map((/**
         * @param {?} a
         * @return {?}
         */
        a => (a.size === null ? '*' : a.size)));
    }
    /**
     * @param {?} sizes
     * @return {?}
     */
    setVisibleAreaSizes(sizes) {
        if (sizes.length !== this.displayedAreas.length) {
            return false;
        }
        /** @type {?} */
        const formatedSizes = sizes.map((/**
         * @param {?} s
         * @return {?}
         */
        s => getInputPositiveNumber(s, null)));
        /** @type {?} */
        const isValid = isUserSizesValid(this.unit, formatedSizes);
        if (isValid === false) {
            return false;
        }
        // @ts-ignore
        this.displayedAreas.forEach((/**
         * @param {?} area
         * @param {?} i
         * @return {?}
         */
        (area, i) => (area.component._size = formatedSizes[i])));
        this.build(false, true);
        return true;
    }
    /**
     * @private
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    build(resetOrders, resetSizes) {
        this.stopDragging();
        // ¤ AREAS ORDER
        if (resetOrders === true) {
            // If user provided 'order' for each area, use it to sort them.
            if (this.displayedAreas.every((/**
             * @param {?} a
             * @return {?}
             */
            a => a.component.order !== null))) {
                this.displayedAreas.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => (/** @type {?} */ ((((/** @type {?} */ (a.component.order))) - b.component.order)))));
            }
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach((/**
             * @param {?} area
             * @param {?} i
             * @return {?}
             */
            (area, i) => {
                area.order = i * 2;
                area.component.setStyleOrder(area.order);
            }));
        }
        // ¤ AREAS SIZE
        if (resetSizes === true) {
            /** @type {?} */
            const useUserSizes = isUserSizesValid(this.unit, this.displayedAreas.map((/**
             * @param {?} a
             * @return {?}
             */
            a => a.component.size)));
            switch (this.unit) {
                case 'percent': {
                    /** @type {?} */
                    const defaultSize = 100 / this.displayedAreas.length;
                    this.displayedAreas.forEach((/**
                     * @param {?} area
                     * @return {?}
                     */
                    area => {
                        area.size = useUserSizes ? ((/** @type {?} */ (area.component.size))) : defaultSize;
                        area.minSize = getAreaMinSize(area);
                        area.maxSize = getAreaMaxSize(area);
                    }));
                    break;
                }
                case 'pixel': {
                    if (useUserSizes) {
                        this.displayedAreas.forEach((/**
                         * @param {?} area
                         * @return {?}
                         */
                        area => {
                            area.size = area.component.size;
                            area.minSize = getAreaMinSize(area);
                            area.maxSize = getAreaMaxSize(area);
                        }));
                    }
                    else {
                        /** @type {?} */
                        const wildcardSizeAreas = this.displayedAreas.filter((/**
                         * @param {?} a
                         * @return {?}
                         */
                        a => a.component.size === null));
                        // No wildcard area > Need to select one arbitrarily > first
                        if (wildcardSizeAreas.length === 0 && this.displayedAreas.length > 0) {
                            this.displayedAreas.forEach((/**
                             * @param {?} area
                             * @param {?} i
                             * @return {?}
                             */
                            (area, i) => {
                                area.size = i === 0 ? null : area.component.size;
                                area.minSize = i === 0 ? null : getAreaMinSize(area);
                                area.maxSize = i === 0 ? null : getAreaMaxSize(area);
                            }));
                        }
                        // More than one wildcard area > Need to keep only one arbitrarly > first
                        // tslint:disable-next-line: one-line
                        else if (wildcardSizeAreas.length > 1) {
                            /** @type {?} */
                            let alreadyGotOne = false;
                            this.displayedAreas.forEach((/**
                             * @param {?} area
                             * @return {?}
                             */
                            area => {
                                if (area.component.size === null) {
                                    if (alreadyGotOne === false) {
                                        area.size = null;
                                        area.minSize = null;
                                        area.maxSize = null;
                                        alreadyGotOne = true;
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
    }
    /**
     * @private
     * @return {?}
     */
    refreshStyleSizes() {
        ///////////////////////////////////////////
        // PERCENT MODE
        if (this.unit === 'percent') {
            // Only one area > flex-basis 100%
            if (this.displayedAreas.length === 1) {
                this.displayedAreas[0].component.setStyleFlex(0, 0, `100%`, false, false);
            }
            // Multiple areas > use each percent basis
            // tslint:disable-next-line: one-line
            else {
                /** @type {?} */
                const sumGutterSize = this.getNbGutters() * this.gutterSize;
                this.displayedAreas.forEach((/**
                 * @param {?} area
                 * @return {?}
                 */
                area => {
                    area.component.setStyleFlex(0, 0, `calc( ${area.size}% - ${(((/** @type {?} */ (area.size))) / 100) * sumGutterSize}px )`, area.minSize !== null && area.minSize === area.size ? true : false, area.maxSize !== null && area.maxSize === area.size ? true : false);
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
            area => {
                // Area with wildcard size
                if (area.size === null) {
                    if (this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(1, 1, `100%`, false, false);
                    }
                    else {
                        area.component.setStyleFlex(1, 1, `auto`, false, false);
                    }
                }
                // Area with pixel size
                // tslint:disable-next-line: one-line
                else {
                    // Only one area > flex-basis 100%
                    if (this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(0, 0, `100%`, false, false);
                    }
                    // Multiple areas > use each pixel basis
                    // tslint:disable-next-line: one-line
                    else {
                        area.component.setStyleFlex(0, 0, `${area.size}px`, area.minSize !== null && area.minSize === area.size ? true : false, area.maxSize !== null && area.maxSize === area.size ? true : false);
                    }
                }
            }));
        }
    }
    /**
     * @param {?} event
     * @param {?} gutterNum
     * @return {?}
     */
    clickGutter(event, gutterNum) {
        /** @type {?} */
        const tempPoint = getPointFromEvent(event);
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
                () => {
                    this._clickTimeout = null;
                    this.notify('click', gutterNum);
                    this.stopDragging();
                }), this.gutterDblClickDuration);
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} gutterOrder
     * @param {?} gutterNum
     * @return {?}
     */
    startDragging(event, gutterOrder, gutterNum) {
        event.preventDefault();
        event.stopPropagation();
        this.startPoint = getPointFromEvent(event);
        if (this.startPoint === null || this.disabled === true) {
            return;
        }
        this.snapshot = {
            gutterNum,
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
        area => {
            /** @type {?} */
            const areaSnapshot = {
                area,
                sizePixelAtStart: getElementPixelSize(area.component.elRef, this.direction),
                sizePercentAtStart: this.unit === 'percent' ? area.size : -1,
            };
            if (area.order < gutterOrder) {
                if (this.restrictMove === true) {
                    this.snapshot.areasBeforeGutter = [areaSnapshot];
                }
                else {
                    this.snapshot.areasBeforeGutter.unshift(areaSnapshot);
                }
            }
            else if (area.order > gutterOrder) {
                if (this.restrictMove === true) {
                    if (this.snapshot.areasAfterGutter.length === 0) {
                        this.snapshot.areasAfterGutter = [areaSnapshot];
                    }
                }
                else {
                    this.snapshot.areasAfterGutter.push(areaSnapshot);
                }
            }
        }));
        this.snapshot.allInvolvedAreasSizePercent = [
            ...this.snapshot.areasBeforeGutter,
            ...this.snapshot.areasAfterGutter,
        ].reduce((/**
         * @param {?} t
         * @param {?} a
         * @return {?}
         */
        (t, a) => t + a.sizePercentAtStart), 0);
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
        () => {
            this.dragListeners.push(this.renderer.listen('document', 'mousemove', this.dragEvent.bind(this)));
            this.dragListeners.push(this.renderer.listen('document', 'touchmove', this.dragEvent.bind(this)));
        }));
        this.displayedAreas.forEach((/**
         * @param {?} area
         * @return {?}
         */
        area => area.component.lockEvents()));
        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'mtx-dragging');
        this.renderer.addClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'mtx-dragged');
        this.notify('start', this.snapshot.gutterNum);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    dragEvent(event) {
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
        let offset = this.direction === 'horizontal'
            ? this.startPoint.x - this.endPoint.x
            : this.startPoint.y - this.endPoint.y;
        if (this.dir === 'rtl') {
            offset = -offset;
        }
        /** @type {?} */
        const steppedOffset = Math.round(offset / this.gutterStep) * this.gutterStep;
        if (steppedOffset === this.snapshot.lastSteppedOffset) {
            return;
        }
        this.snapshot.lastSteppedOffset = steppedOffset;
        // Need to know if each gutter side areas could reacts to steppedOffset
        /** @type {?} */
        let areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -steppedOffset, this.snapshot.allAreasSizePixel);
        /** @type {?} */
        let areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset, this.snapshot.allAreasSizePixel);
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
            const all = [...areasBefore.list, ...areasAfter.list];
            /** @type {?} */
            const areaToReset = all.find((/**
             * @param {?} a
             * @return {?}
             */
            a => a.percentAfterAbsorption !== 0 &&
                a.percentAfterAbsorption !== a.areaSnapshot.area.minSize &&
                a.percentAfterAbsorption !== a.areaSnapshot.area.maxSize));
            if (areaToReset) {
                areaToReset.percentAfterAbsorption =
                    this.snapshot.allInvolvedAreasSizePercent -
                        all
                            .filter((/**
                         * @param {?} a
                         * @return {?}
                         */
                        a => a !== areaToReset))
                            .reduce((/**
                         * @param {?} total
                         * @param {?} a
                         * @return {?}
                         */
                        (total, a) => total + a.percentAfterAbsorption), 0);
            }
        }
        // Now we know areas could absorb steppedOffset, time to really update sizes
        areasBefore.list.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => updateAreaSize(this.unit, item)));
        areasAfter.list.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => updateAreaSize(this.unit, item)));
        this.refreshStyleSizes();
        this.notify('progress', this.snapshot.gutterNum);
    }
    /**
     * @private
     * @param {?=} event
     * @return {?}
     */
    stopDragging(event) {
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
        area => area.component.unlockEvents()));
        while (this.dragListeners.length > 0) {
            /** @type {?} */
            const fct = this.dragListeners.pop();
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
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.startPoint = null;
                this.endPoint = null;
            }));
        }));
    }
    /**
     * @param {?} type
     * @param {?} gutterNum
     * @return {?}
     */
    notify(type, gutterNum) {
        /** @type {?} */
        const sizes = this.getVisibleAreaSizes();
        if (type === 'start') {
            this.dragStart.emit({ gutterNum, sizes });
        }
        else if (type === 'end') {
            this.dragEnd.emit({ gutterNum, sizes });
        }
        else if (type === 'click') {
            this.gutterClick.emit({ gutterNum, sizes });
        }
        else if (type === 'dblclick') {
            this.gutterDblClick.emit({ gutterNum, sizes });
        }
        else if (type === 'transitionEnd') {
            if (this.transitionEndSubscriber) {
                this.ngZone.run((/**
                 * @return {?}
                 */
                () => this.transitionEndSubscriber.next(sizes)));
            }
        }
        else if (type === 'progress') {
            // Stay outside zone to allow users do what they want about change detection mechanism.
            this.dragProgressSubject.next({ gutterNum, sizes });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stopDragging();
    }
}
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
MtxSplitComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLW1hdGVyby9leHRlbnNpb25zL3NwbGl0LXBhbmUvIiwic291cmNlcyI6WyJzcGxpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBR1QsVUFBVSxFQUNWLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVzlDLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsK0JBQStCLEVBQy9CLGNBQWMsR0FDZixNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkNqQixNQUFNLE9BQU8saUJBQWlCOzs7Ozs7O0lBeUs1QixZQUNVLE1BQWMsRUFDZCxLQUFpQixFQUNqQixLQUF3QixFQUN4QixRQUFtQjtRQUhuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBNUtyQixlQUFVLEdBQThCLFlBQVksQ0FBQzs7UUFvQnJELFVBQUssR0FBd0IsU0FBUyxDQUFDOztRQW9CdkMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7O1FBY2pCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOztRQVloQixrQkFBYSxHQUFHLEtBQUssQ0FB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QXRFQyxNQUFNO1lBRE4sVUFBVTtZQUpWLGlCQUFpQjtZQUNqQixTQUFTOzs7d0JBOEVSLEtBQUs7bUJBb0JMLEtBQUs7eUJBb0JMLEtBQUs7eUJBY0wsS0FBSzsyQkFZTCxLQUFLOzRCQVlMLEtBQUs7dUJBa0JMLEtBQUs7a0JBa0JMLEtBQUs7cUNBY0wsS0FBSzt3QkFVTCxNQUFNO3NCQUNOLE1BQU07MEJBQ04sTUFBTTs2QkFDTixNQUFNOzRCQUdOLE1BQU07d0JBb0JOLFlBQVksU0FBQyxXQUFXOzs7Ozs7O0lBdEt6Qix1Q0FBNkQ7Ozs7O0lBb0I3RCxrQ0FBK0M7Ozs7O0lBb0IvQyx3Q0FBeUI7Ozs7O0lBY3pCLHdDQUF3Qjs7Ozs7SUFZeEIsMENBQThCOzs7OztJQVk5QiwyQ0FBK0I7Ozs7O0lBa0IvQixzQ0FBMEI7Ozs7O0lBa0IxQixpQ0FBb0M7Ozs7O0lBY3BDLG9EQUFvQzs7SUFZcEMsc0NBQWtFOztJQUNsRSxvQ0FBZ0U7O0lBQ2hFLHdDQUFvRTs7SUFDcEUsMkNBQXVFOzs7OztJQUV2RSxvREFBcUU7Ozs7O0lBT3JFLGdEQUF5RTs7SUFDekUsMENBQXdGOzs7OztJQUl4Rix1Q0FBMkI7Ozs7O0lBQzNCLDBDQUE4Qzs7Ozs7SUFDOUMscUNBQWlEOzs7OztJQUNqRCx1Q0FBZ0Q7Ozs7O0lBQ2hELHFDQUE4Qzs7SUFFOUMsMkNBQXlEOzs7OztJQUN6RCx1Q0FBc0Q7Ozs7O0lBRXRELHNDQUFvRTs7SUF3UXBFLDBDQUFvQzs7Ozs7SUFyUWxDLG1DQUFzQjs7Ozs7SUFDdEIsa0NBQXlCOzs7OztJQUN6QixrQ0FBZ0M7Ozs7O0lBQ2hDLHFDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBSZW5kZXJlcjIsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgRWxlbWVudFJlZixcclxuICBOZ1pvbmUsXHJcbiAgVmlld0NoaWxkcmVuLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBNdHhTcGxpdEFyZWEsXHJcbiAgTXR4U3BsaXRQb2ludCxcclxuICBNdHhTcGxpdFNuYXBzaG90LFxyXG4gIE10eFNwbGl0QXJlYVNuYXBzaG90LFxyXG4gIE10eFNwbGl0T3V0cHV0RGF0YSxcclxuICBNdHhTcGxpdE91dHB1dEFyZWFTaXplcyxcclxufSBmcm9tICcuL2ludGVyZmFjZSc7XHJcbmltcG9ydCB7IE10eFNwbGl0UGFuZURpcmVjdGl2ZSB9IGZyb20gJy4vc3BsaXQtcGFuZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge1xyXG4gIGdldElucHV0UG9zaXRpdmVOdW1iZXIsXHJcbiAgZ2V0SW5wdXRCb29sZWFuLFxyXG4gIGlzVXNlclNpemVzVmFsaWQsXHJcbiAgZ2V0QXJlYU1pblNpemUsXHJcbiAgZ2V0QXJlYU1heFNpemUsXHJcbiAgZ2V0UG9pbnRGcm9tRXZlbnQsXHJcbiAgZ2V0RWxlbWVudFBpeGVsU2l6ZSxcclxuICBnZXRHdXR0ZXJTaWRlQWJzb3JwdGlvbkNhcGFjaXR5LFxyXG4gIHVwZGF0ZUFyZWFTaXplLFxyXG59IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIG10eC1zcGxpdFxyXG4gKlxyXG4gKlxyXG4gKiAgUEVSQ0VOVCBNT0RFIChbdW5pdF09XCIncGVyY2VudCdcIilcclxuICogIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cclxuICogfCAgICAgICBBICAgICAgIFtnMV0gICAgICAgQiAgICAgICBbZzJdICAgICAgIEMgICAgICAgW2czXSAgICAgICBEICAgICAgIFtnNF0gICAgICAgRSAgICAgICB8XHJcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxyXG4gKiB8ICAgICAgIDIwICAgICAgICAgICAgICAgICAzMCAgICAgICAgICAgICAgICAgMjAgICAgICAgICAgICAgICAgIDE1ICAgICAgICAgICAgICAgICAxNSAgICAgIHwgPC0tIFtzaXplXT1cInhcIlxyXG4gKiB8ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIHwgPC0tIFtndXR0ZXJTaXplXT1cIjEwXCJcclxuICogfGNhbGMoMjAlIC0gOHB4KSAgICBjYWxjKDMwJSAtIDEycHgpICAgY2FsYygyMCUgLSA4cHgpICAgIGNhbGMoMTUlIC0gNnB4KSAgICBjYWxjKDE1JSAtIDZweCl8IDwtLSBDU1MgZmxleC1iYXNpcyBwcm9wZXJ0eSAod2l0aCBmbGV4LWdyb3cmc2hyaW5rIGF0IDApXHJcbiAqIHwgICAgIDE1MnB4ICAgICAgICAgICAgICAyMjhweCAgICAgICAgICAgICAgMTUycHggICAgICAgICAgICAgIDExNHB4ICAgICAgICAgICAgICAxMTRweCAgICAgfCA8LS0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICogfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODAwcHggICAgICAgICA8LS0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICogIGZsZXgtYmFzaXMgPSBjYWxjKCB7IGFyZWEuc2l6ZSB9JSAtIHsgYXJlYS5zaXplLzEwMCAqIG5iR3V0dGVyKmd1dHRlclNpemUgfXB4ICk7XHJcbiAqXHJcbiAqXHJcbiAqICBQSVhFTCBNT0RFIChbdW5pdF09XCIncGl4ZWwnXCIpXHJcbiAqICBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAqIHwgICAgICAgQSAgICAgICBbZzFdICAgICAgIEIgICAgICAgW2cyXSAgICAgICBDICAgICAgIFtnM10gICAgICAgRCAgICAgICBbZzRdICAgICAgIEUgICAgICAgfFxyXG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcclxuICogfCAgICAgIDEwMCAgICAgICAgICAgICAgICAyNTAgICAgICAgICAgICAgICAgICogICAgICAgICAgICAgICAgIDE1MCAgICAgICAgICAgICAgICAxMDAgICAgICB8IDwtLSBbc2l6ZV09XCJ5XCJcclxuICogfCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICB8IDwtLSBbZ3V0dGVyU2l6ZV09XCIxMFwiXHJcbiAqIHwgICAwIDAgMTAwcHggICAgICAgICAgMCAwIDI1MHB4ICAgICAgICAgICAxIDEgYXV0byAgICAgICAgICAwIDAgMTUwcHggICAgICAgICAgMCAwIDEwMHB4ICAgfCA8LS0gQ1NTIGZsZXggcHJvcGVydHkgKGZsZXgtZ3Jvdy9mbGV4LXNocmluay9mbGV4LWJhc2lzKVxyXG4gKiB8ICAgICAxMDBweCAgICAgICAgICAgICAgMjUwcHggICAgICAgICAgICAgIDIwMHB4ICAgICAgICAgICAgICAxNTBweCAgICAgICAgICAgICAgMTAwcHggICAgIHwgPC0tIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXHJcbiAqIHxfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19ffFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDgwMHB4ICAgICAgICAgPC0tIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXHJcbiAqXHJcbiAqL1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdHgtc3BsaXQnLFxyXG4gIGV4cG9ydEFzOiAnbXR4U3BsaXQnLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbXR4LXNwbGl0JyxcclxuICB9LFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVVcmxzOiBbYC4vc3BsaXQuY29tcG9uZW50LnNjc3NgXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3BsaXQuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXR4U3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcclxuXHJcbiAgQElucHV0KCkgc2V0IGRpcmVjdGlvbih2OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSB7XHJcbiAgICB0aGlzLl9kaXJlY3Rpb24gPSB2ID09PSAndmVydGljYWwnID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgYG10eC1zcGxpdC0ke3RoaXMuX2RpcmVjdGlvbn1gKTtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoXHJcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgYG10eC1zcGxpdC0ke3RoaXMuX2RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCd9YFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgZGlyZWN0aW9uKCk6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfdW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJyA9ICdwZXJjZW50JztcclxuXHJcbiAgQElucHV0KCkgc2V0IHVuaXQodjogJ3BlcmNlbnQnIHwgJ3BpeGVsJykge1xyXG4gICAgdGhpcy5fdW5pdCA9IHYgPT09ICdwaXhlbCcgPyAncGl4ZWwnIDogJ3BlcmNlbnQnO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCBgbXR4LXNwbGl0LSR7dGhpcy5fdW5pdH1gKTtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoXHJcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgYG10eC1zcGxpdC0ke3RoaXMuX3VuaXQgPT09ICdwaXhlbCcgPyAncGVyY2VudCcgOiAncGl4ZWwnfWBcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5idWlsZChmYWxzZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgdW5pdCgpOiAncGVyY2VudCcgfCAncGl4ZWwnIHtcclxuICAgIHJldHVybiB0aGlzLl91bml0O1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF9ndXR0ZXJTaXplID0gMTI7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBndXR0ZXJTaXplKHY6IG51bWJlciB8IG51bGwpIHtcclxuICAgIHRoaXMuX2d1dHRlclNpemUgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIDExKTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3V0dGVyU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2d1dHRlclNpemU7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX2d1dHRlclN0ZXAgPSAxO1xyXG5cclxuICBASW5wdXQoKSBzZXQgZ3V0dGVyU3RlcCh2OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2d1dHRlclN0ZXAgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIDEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGd1dHRlclN0ZXAoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9ndXR0ZXJTdGVwO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBwcml2YXRlIF9yZXN0cmljdE1vdmUgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgc2V0IHJlc3RyaWN0TW92ZSh2OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9yZXN0cmljdE1vdmUgPSBnZXRJbnB1dEJvb2xlYW4odik7XHJcbiAgfVxyXG5cclxuICBnZXQgcmVzdHJpY3RNb3ZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc3RyaWN0TW92ZTtcclxuICB9XHJcblxyXG4gIC8vLy9cclxuXHJcbiAgcHJpdmF0ZSBfdXNlVHJhbnNpdGlvbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBzZXQgdXNlVHJhbnNpdGlvbih2OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl91c2VUcmFuc2l0aW9uID0gZ2V0SW5wdXRCb29sZWFuKHYpO1xyXG5cclxuICAgIGlmICh0aGlzLl91c2VUcmFuc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LXNwbGl0LXRyYW5zaXRpb24nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LXNwbGl0LXRyYW5zaXRpb24nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCB1c2VUcmFuc2l0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VzZVRyYW5zaXRpb247XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGdldElucHV0Qm9vbGVhbih2KTtcclxuXHJcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtdHgtc3BsaXQtZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LXNwbGl0LWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX2RpcjogJ2x0cicgfCAncnRsJyA9ICdsdHInO1xyXG5cclxuICBASW5wdXQoKSBzZXQgZGlyKHY6ICdsdHInIHwgJ3J0bCcpIHtcclxuICAgIHRoaXMuX2RpciA9IHYgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkaXInLCB0aGlzLl9kaXIpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRpcigpOiAnbHRyJyB8ICdydGwnIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXI7XHJcbiAgfVxyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgX2d1dHRlckRibENsaWNrRHVyYXRpb24gPSAwO1xyXG5cclxuICBASW5wdXQoKSBzZXQgZ3V0dGVyRGJsQ2xpY2tEdXJhdGlvbih2OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2d1dHRlckRibENsaWNrRHVyYXRpb24gPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIDApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGd1dHRlckRibENsaWNrRHVyYXRpb24oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9ndXR0ZXJEYmxDbGlja0R1cmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgLy8vL1xyXG5cclxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNdHhTcGxpdE91dHB1dERhdGE+KGZhbHNlKTtcclxuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TXR4U3BsaXRPdXRwdXREYXRhPihmYWxzZSk7XHJcbiAgQE91dHB1dCgpIGd1dHRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNdHhTcGxpdE91dHB1dERhdGE+KGZhbHNlKTtcclxuICBAT3V0cHV0KCkgZ3V0dGVyRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE10eFNwbGl0T3V0cHV0RGF0YT4oZmFsc2UpO1xyXG5cclxuICBwcml2YXRlIHRyYW5zaXRpb25FbmRTdWJzY3JpYmVyOiBTdWJzY3JpYmVyPE10eFNwbGl0T3V0cHV0QXJlYVNpemVzPjtcclxuICBAT3V0cHV0KCkgZ2V0IHRyYW5zaXRpb25FbmQoKTogT2JzZXJ2YWJsZTxNdHhTcGxpdE91dHB1dEFyZWFTaXplcz4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gKHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIgPSBzdWJzY3JpYmVyKSkucGlwZShcclxuICAgICAgZGVib3VuY2VUaW1lPE10eFNwbGl0T3V0cHV0QXJlYVNpemVzPigyMClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYWdQcm9ncmVzc1N1YmplY3Q6IFN1YmplY3Q8TXR4U3BsaXRPdXRwdXREYXRhPiA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgZHJhZ1Byb2dyZXNzJDogT2JzZXJ2YWJsZTxNdHhTcGxpdE91dHB1dERhdGE+ID0gdGhpcy5kcmFnUHJvZ3Jlc3NTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAvLy8vXHJcblxyXG4gIHByaXZhdGUgaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgZHJhZ0xpc3RlbmVyczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuICBwcml2YXRlIHNuYXBzaG90OiBNdHhTcGxpdFNuYXBzaG90IHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBzdGFydFBvaW50OiBNdHhTcGxpdFBvaW50IHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBlbmRQb2ludDogTXR4U3BsaXRQb2ludCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgZGlzcGxheWVkQXJlYXM6IEFycmF5PE10eFNwbGl0QXJlYT4gPSBbXTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGhpZGVkQXJlYXM6IEFycmF5PE10eFNwbGl0QXJlYT4gPSBbXTtcclxuXHJcbiAgQFZpZXdDaGlsZHJlbignZ3V0dGVyRWxzJykgcHJpdmF0ZSBndXR0ZXJFbHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgKSB7XHJcbiAgICAvLyBUbyBmb3JjZSBhZGRpbmcgZGVmYXVsdCBjbGFzcywgY291bGQgYmUgb3ZlcnJpZGUgYnkgdXNlciBASW5wdXQoKSBvciBub3RcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgLy8gVG8gYXZvaWQgdHJhbnNpdGlvbiBhdCBmaXJzdCByZW5kZXJpbmdcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ210eC1zcGxpdC1pbml0JykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE5iR3V0dGVycygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID09PSAwID8gMCA6IHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcmVhKGNvbXBvbmVudDogTXR4U3BsaXRQYW5lRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICBjb25zdCBuZXdBcmVhOiBNdHhTcGxpdEFyZWEgPSB7XHJcbiAgICAgIGNvbXBvbmVudCxcclxuICAgICAgb3JkZXI6IDAsXHJcbiAgICAgIHNpemU6IDAsXHJcbiAgICAgIG1pblNpemU6IG51bGwsXHJcbiAgICAgIG1heFNpemU6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjb21wb25lbnQudmlzaWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2gobmV3QXJlYSk7XHJcblxyXG4gICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWRlZEFyZWFzLnB1c2gobmV3QXJlYSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQXJlYShjb21wb25lbnQ6IE10eFNwbGl0UGFuZURpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzcGxheWVkQXJlYXMuc29tZShhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpKSB7XHJcbiAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcclxuICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcclxuXHJcbiAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGlkZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCkpIHtcclxuICAgICAgY29uc3QgYXJlYSA9IHRoaXMuaGlkZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCk7XHJcbiAgICAgIHRoaXMuaGlkZWRBcmVhcy5zcGxpY2UodGhpcy5oaWRlZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZUFyZWEoXHJcbiAgICBjb21wb25lbnQ6IE10eFNwbGl0UGFuZURpcmVjdGl2ZSxcclxuICAgIHJlc2V0T3JkZXJzOiBib29sZWFuLFxyXG4gICAgcmVzZXRTaXplczogYm9vbGVhblxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKGNvbXBvbmVudC52aXNpYmxlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYnVpbGQocmVzZXRPcmRlcnMsIHJlc2V0U2l6ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dBcmVhKGNvbXBvbmVudDogTXR4U3BsaXRQYW5lRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcclxuICAgIGlmIChhcmVhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFyZWFzID0gdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XHJcbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xyXG5cclxuICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGlkZUFyZWEoY29tcDogTXR4U3BsaXRQYW5lRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICBjb25zdCBhcmVhID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXApO1xyXG4gICAgaWYgKGFyZWEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXJlYXMgPSB0aGlzLmRpc3BsYXllZEFyZWFzLnNwbGljZSh0aGlzLmRpc3BsYXllZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xyXG4gICAgYXJlYXMuZm9yRWFjaChfYXJlYSA9PiB7XHJcbiAgICAgIF9hcmVhLm9yZGVyID0gMDtcclxuICAgICAgX2FyZWEuc2l6ZSA9IDA7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKC4uLmFyZWFzKTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZpc2libGVBcmVhU2l6ZXMoKTogTXR4U3BsaXRPdXRwdXRBcmVhU2l6ZXMge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheWVkQXJlYXMubWFwKGEgPT4gKGEuc2l6ZSA9PT0gbnVsbCA/ICcqJyA6IGEuc2l6ZSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZpc2libGVBcmVhU2l6ZXMoc2l6ZXM6IE10eFNwbGl0T3V0cHV0QXJlYVNpemVzKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoc2l6ZXMubGVuZ3RoICE9PSB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybWF0ZWRTaXplcyA9IHNpemVzLm1hcChzID0+IGdldElucHV0UG9zaXRpdmVOdW1iZXIocywgbnVsbCkpO1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IGlzVXNlclNpemVzVmFsaWQodGhpcy51bml0LCBmb3JtYXRlZFNpemVzKTtcclxuXHJcbiAgICBpZiAoaXNWYWxpZCA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4gKGFyZWEuY29tcG9uZW50Ll9zaXplID0gZm9ybWF0ZWRTaXplc1tpXSkpO1xyXG5cclxuICAgIHRoaXMuYnVpbGQoZmFsc2UsIHRydWUpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkKHJlc2V0T3JkZXJzOiBib29sZWFuLCByZXNldFNpemVzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xyXG5cclxuICAgIC8vIMKkIEFSRUFTIE9SREVSXHJcblxyXG4gICAgaWYgKHJlc2V0T3JkZXJzID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIElmIHVzZXIgcHJvdmlkZWQgJ29yZGVyJyBmb3IgZWFjaCBhcmVhLCB1c2UgaXQgdG8gc29ydCB0aGVtLlxyXG4gICAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcG9uZW50Lm9yZGVyICE9PSBudWxsKSkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc29ydChcclxuICAgICAgICAgIChhLCBiKSA9PiAoKGEuY29tcG9uZW50Lm9yZGVyIGFzIG51bWJlcikgLSBiLmNvbXBvbmVudC5vcmRlcikgYXMgbnVtYmVyXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVGhlbiBzZXQgcmVhbCBvcmRlciB3aXRoIG11bHRpcGxlcyBvZiAyLCBudW1iZXJzIGJldHdlZW4gd2lsbCBiZSB1c2VkIGJ5IGd1dHRlcnMuXHJcbiAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4ge1xyXG4gICAgICAgIGFyZWEub3JkZXIgPSBpICogMjtcclxuICAgICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZU9yZGVyKGFyZWEub3JkZXIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDCpCBBUkVBUyBTSVpFXHJcblxyXG4gICAgaWYgKHJlc2V0U2l6ZXMgPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgdXNlVXNlclNpemVzID0gaXNVc2VyU2l6ZXNWYWxpZChcclxuICAgICAgICB0aGlzLnVuaXQsXHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5tYXAoYSA9PiBhLmNvbXBvbmVudC5zaXplKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgc3dpdGNoICh0aGlzLnVuaXQpIHtcclxuICAgICAgICBjYXNlICdwZXJjZW50Jzoge1xyXG4gICAgICAgICAgY29uc3QgZGVmYXVsdFNpemUgPSAxMDAgLyB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XHJcbiAgICAgICAgICAgIGFyZWEuc2l6ZSA9IHVzZVVzZXJTaXplcyA/IChhcmVhLmNvbXBvbmVudC5zaXplIGFzIG51bWJlcikgOiBkZWZhdWx0U2l6ZTtcclxuICAgICAgICAgICAgYXJlYS5taW5TaXplID0gZ2V0QXJlYU1pblNpemUoYXJlYSk7XHJcbiAgICAgICAgICAgIGFyZWEubWF4U2l6ZSA9IGdldEFyZWFNYXhTaXplKGFyZWEpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAncGl4ZWwnOiB7XHJcbiAgICAgICAgICBpZiAodXNlVXNlclNpemVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcclxuICAgICAgICAgICAgICBhcmVhLnNpemUgPSBhcmVhLmNvbXBvbmVudC5zaXplO1xyXG4gICAgICAgICAgICAgIGFyZWEubWluU2l6ZSA9IGdldEFyZWFNaW5TaXplKGFyZWEpO1xyXG4gICAgICAgICAgICAgIGFyZWEubWF4U2l6ZSA9IGdldEFyZWFNYXhTaXplKGFyZWEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbGRjYXJkU2l6ZUFyZWFzID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maWx0ZXIoYSA9PiBhLmNvbXBvbmVudC5zaXplID09PSBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vIHdpbGRjYXJkIGFyZWEgPiBOZWVkIHRvIHNlbGVjdCBvbmUgYXJiaXRyYXJpbHkgPiBmaXJzdFxyXG4gICAgICAgICAgICBpZiAod2lsZGNhcmRTaXplQXJlYXMubGVuZ3RoID09PSAwICYmIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXJlYS5zaXplID0gaSA9PT0gMCA/IG51bGwgOiBhcmVhLmNvbXBvbmVudC5zaXplO1xyXG4gICAgICAgICAgICAgICAgYXJlYS5taW5TaXplID0gaSA9PT0gMCA/IG51bGwgOiBnZXRBcmVhTWluU2l6ZShhcmVhKTtcclxuICAgICAgICAgICAgICAgIGFyZWEubWF4U2l6ZSA9IGkgPT09IDAgPyBudWxsIDogZ2V0QXJlYU1heFNpemUoYXJlYSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTW9yZSB0aGFuIG9uZSB3aWxkY2FyZCBhcmVhID4gTmVlZCB0byBrZWVwIG9ubHkgb25lIGFyYml0cmFybHkgPiBmaXJzdFxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbGRjYXJkU2l6ZUFyZWFzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICBsZXQgYWxyZWFkeUdvdE9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmVhLmNvbXBvbmVudC5zaXplID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChhbHJlYWR5R290T25lID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5taW5TaXplID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBhcmVhLm1heFNpemUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlHb3RPbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBhcmVhLm1pblNpemUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZWEubWF4U2l6ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IGFyZWEuY29tcG9uZW50LnNpemU7XHJcbiAgICAgICAgICAgICAgICAgIGFyZWEubWluU2l6ZSA9IGdldEFyZWFNaW5TaXplKGFyZWEpO1xyXG4gICAgICAgICAgICAgICAgICBhcmVhLm1heFNpemUgPSBnZXRBcmVhTWF4U2l6ZShhcmVhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoU3R5bGVTaXplcygpO1xyXG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaFN0eWxlU2l6ZXMoKTogdm9pZCB7XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBQRVJDRU5UIE1PREVcclxuICAgIGlmICh0aGlzLnVuaXQgPT09ICdwZXJjZW50Jykge1xyXG4gICAgICAvLyBPbmx5IG9uZSBhcmVhID4gZmxleC1iYXNpcyAxMDAlXHJcbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXNbMF0uY29tcG9uZW50LnNldFN0eWxlRmxleCgwLCAwLCBgMTAwJWAsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gTXVsdGlwbGUgYXJlYXMgPiB1c2UgZWFjaCBwZXJjZW50IGJhc2lzXHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc3VtR3V0dGVyU2l6ZSA9IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemU7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcclxuICAgICAgICAgIGFyZWEuY29tcG9uZW50LnNldFN0eWxlRmxleChcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgYGNhbGMoICR7YXJlYS5zaXplfSUgLSAkeygoYXJlYS5zaXplIGFzIG51bWJlcikgLyAxMDApICogc3VtR3V0dGVyU2l6ZX1weCApYCxcclxuICAgICAgICAgICAgYXJlYS5taW5TaXplICE9PSBudWxsICYmIGFyZWEubWluU2l6ZSA9PT0gYXJlYS5zaXplID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhLm1heFNpemUgIT09IG51bGwgJiYgYXJlYS5tYXhTaXplID09PSBhcmVhLnNpemUgPyB0cnVlIDogZmFsc2VcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIFBJWEVMIE1PREVcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICAgIGVsc2UgaWYgKHRoaXMudW5pdCA9PT0gJ3BpeGVsJykge1xyXG4gICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XHJcbiAgICAgICAgLy8gQXJlYSB3aXRoIHdpbGRjYXJkIHNpemVcclxuICAgICAgICBpZiAoYXJlYS5zaXplID09PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KDEsIDEsIGAxMDAlYCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFyZWEuY29tcG9uZW50LnNldFN0eWxlRmxleCgxLCAxLCBgYXV0b2AsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFyZWEgd2l0aCBwaXhlbCBzaXplXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy8gT25seSBvbmUgYXJlYSA+IGZsZXgtYmFzaXMgMTAwJVxyXG4gICAgICAgICAgaWYgKHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGFyZWEuY29tcG9uZW50LnNldFN0eWxlRmxleCgwLCAwLCBgMTAwJWAsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBNdWx0aXBsZSBhcmVhcyA+IHVzZSBlYWNoIHBpeGVsIGJhc2lzXHJcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KFxyXG4gICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICBgJHthcmVhLnNpemV9cHhgLFxyXG4gICAgICAgICAgICAgIGFyZWEubWluU2l6ZSAhPT0gbnVsbCAmJiBhcmVhLm1pblNpemUgPT09IGFyZWEuc2l6ZSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICBhcmVhLm1heFNpemUgIT09IG51bGwgJiYgYXJlYS5tYXhTaXplID09PSBhcmVhLnNpemUgPyB0cnVlIDogZmFsc2VcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2NsaWNrVGltZW91dDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBjbGlja0d1dHRlcihldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGd1dHRlck51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCB0ZW1wUG9pbnQgPSBnZXRQb2ludEZyb21FdmVudChldmVudCk7XHJcblxyXG4gICAgLy8gQmUgc3VyZSBtb3VzZXVwL3RvdWNoZW5kIGhhcHBlbmVkIGF0IHNhbWUgcG9pbnQgYXMgbW91c2Vkb3duL3RvdWNoc3RhcnQgdG8gdHJpZ2dlciBjbGljay9kYmxjbGlja1xyXG4gICAgaWYgKHRoaXMuc3RhcnRQb2ludCAmJiB0aGlzLnN0YXJ0UG9pbnQueCA9PT0gdGVtcFBvaW50LnggJiYgdGhpcy5zdGFydFBvaW50LnkgPT09IHRlbXBQb2ludC55KSB7XHJcbiAgICAgIC8vIElmIHRpbWVvdXQgaW4gcHJvZ3Jlc3MgYW5kIG5ldyBjbGljayA+IGNsZWFyVGltZW91dCAmIGRibENsaWNrRXZlbnRcclxuICAgICAgaWYgKHRoaXMuX2NsaWNrVGltZW91dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fY2xpY2tUaW1lb3V0KTtcclxuICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KCdkYmxjbGljaycsIGd1dHRlck51bSk7XHJcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBFbHNlIHN0YXJ0IHRpbWVvdXQgdG8gY2FsbCBjbGlja0V2ZW50IGF0IGVuZFxyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLm5vdGlmeSgnY2xpY2snLCBndXR0ZXJOdW0pO1xyXG4gICAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcclxuICAgICAgICB9LCB0aGlzLmd1dHRlckRibENsaWNrRHVyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhcnREcmFnZ2luZyhcclxuICAgIGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCxcclxuICAgIGd1dHRlck9yZGVyOiBudW1iZXIsXHJcbiAgICBndXR0ZXJOdW06IG51bWJlclxyXG4gICk6IHZvaWQge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIHRoaXMuc3RhcnRQb2ludCA9IGdldFBvaW50RnJvbUV2ZW50KGV2ZW50KTtcclxuICAgIGlmICh0aGlzLnN0YXJ0UG9pbnQgPT09IG51bGwgfHwgdGhpcy5kaXNhYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbmFwc2hvdCA9IHtcclxuICAgICAgZ3V0dGVyTnVtLFxyXG4gICAgICBsYXN0U3RlcHBlZE9mZnNldDogMCxcclxuICAgICAgYWxsQXJlYXNTaXplUGl4ZWw6XHJcbiAgICAgICAgZ2V0RWxlbWVudFBpeGVsU2l6ZSh0aGlzLmVsUmVmLCB0aGlzLmRpcmVjdGlvbikgLSB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplLFxyXG4gICAgICBhbGxJbnZvbHZlZEFyZWFzU2l6ZVBlcmNlbnQ6IDEwMCxcclxuICAgICAgYXJlYXNCZWZvcmVHdXR0ZXI6IFtdLFxyXG4gICAgICBhcmVhc0FmdGVyR3V0dGVyOiBbXSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xyXG4gICAgICBjb25zdCBhcmVhU25hcHNob3Q6IE10eFNwbGl0QXJlYVNuYXBzaG90ID0ge1xyXG4gICAgICAgIGFyZWEsXHJcbiAgICAgICAgc2l6ZVBpeGVsQXRTdGFydDogZ2V0RWxlbWVudFBpeGVsU2l6ZShhcmVhLmNvbXBvbmVudC5lbFJlZiwgdGhpcy5kaXJlY3Rpb24pLFxyXG4gICAgICAgIHNpemVQZXJjZW50QXRTdGFydDogdGhpcy51bml0ID09PSAncGVyY2VudCcgPyBhcmVhLnNpemUgOiAtMSwgLy8gSWYgcGl4ZWwgbW9kZSwgYW55d2F5LCB3aWxsIG5vdCBiZSB1c2VkLlxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGFyZWEub3JkZXIgPCBndXR0ZXJPcmRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc3RyaWN0TW92ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0JlZm9yZUd1dHRlciA9IFthcmVhU25hcHNob3RdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQmVmb3JlR3V0dGVyLnVuc2hpZnQoYXJlYVNuYXBzaG90KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJlYS5vcmRlciA+IGd1dHRlck9yZGVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdHJpY3RNb3ZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zbmFwc2hvdC5hcmVhc0FmdGVyR3V0dGVyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQWZ0ZXJHdXR0ZXIgPSBbYXJlYVNuYXBzaG90XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0FmdGVyR3V0dGVyLnB1c2goYXJlYVNuYXBzaG90KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc25hcHNob3QuYWxsSW52b2x2ZWRBcmVhc1NpemVQZXJjZW50ID0gW1xyXG4gICAgICAuLi50aGlzLnNuYXBzaG90LmFyZWFzQmVmb3JlR3V0dGVyLFxyXG4gICAgICAuLi50aGlzLnNuYXBzaG90LmFyZWFzQWZ0ZXJHdXR0ZXIsXHJcbiAgICBdLnJlZHVjZSgodCwgYSkgPT4gdCArIGEuc2l6ZVBlcmNlbnRBdFN0YXJ0LCAwKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNCZWZvcmVHdXR0ZXIubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlci5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goXHJcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgdGhpcy5zdG9wRHJhZ2dpbmcuYmluZCh0aGlzKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaChcclxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoZW5kJywgdGhpcy5zdG9wRHJhZ2dpbmcuYmluZCh0aGlzKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaChcclxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoY2FuY2VsJywgdGhpcy5zdG9wRHJhZ2dpbmcuYmluZCh0aGlzKSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaChcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2Vtb3ZlJywgdGhpcy5kcmFnRXZlbnQuYmluZCh0aGlzKSlcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNobW92ZScsIHRoaXMuZHJhZ0V2ZW50LmJpbmQodGhpcykpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiBhcmVhLmNvbXBvbmVudC5sb2NrRXZlbnRzKCkpO1xyXG5cclxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ210eC1kcmFnZ2luZycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhcclxuICAgICAgdGhpcy5ndXR0ZXJFbHMudG9BcnJheSgpW3RoaXMuc25hcHNob3QuZ3V0dGVyTnVtIC0gMV0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ210eC1kcmFnZ2VkJ1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLm5vdGlmeSgnc3RhcnQnLCB0aGlzLnNuYXBzaG90Lmd1dHRlck51bSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYWdFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICBpZiAodGhpcy5fY2xpY2tUaW1lb3V0ICE9PSBudWxsKSB7XHJcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fY2xpY2tUaW1lb3V0KTtcclxuICAgICAgdGhpcy5fY2xpY2tUaW1lb3V0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbmRQb2ludCA9IGdldFBvaW50RnJvbUV2ZW50KGV2ZW50KTtcclxuICAgIGlmICh0aGlzLmVuZFBvaW50ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgc3RlcHBlZE9mZnNldFxyXG5cclxuICAgIGxldCBvZmZzZXQgPVxyXG4gICAgICB0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnXHJcbiAgICAgICAgPyB0aGlzLnN0YXJ0UG9pbnQueCAtIHRoaXMuZW5kUG9pbnQueFxyXG4gICAgICAgIDogdGhpcy5zdGFydFBvaW50LnkgLSB0aGlzLmVuZFBvaW50Lnk7XHJcbiAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XHJcbiAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGVwcGVkT2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQgLyB0aGlzLmd1dHRlclN0ZXApICogdGhpcy5ndXR0ZXJTdGVwO1xyXG5cclxuICAgIGlmIChzdGVwcGVkT2Zmc2V0ID09PSB0aGlzLnNuYXBzaG90Lmxhc3RTdGVwcGVkT2Zmc2V0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNuYXBzaG90Lmxhc3RTdGVwcGVkT2Zmc2V0ID0gc3RlcHBlZE9mZnNldDtcclxuXHJcbiAgICAvLyBOZWVkIHRvIGtub3cgaWYgZWFjaCBndXR0ZXIgc2lkZSBhcmVhcyBjb3VsZCByZWFjdHMgdG8gc3RlcHBlZE9mZnNldFxyXG5cclxuICAgIGxldCBhcmVhc0JlZm9yZSA9IGdldEd1dHRlclNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkoXHJcbiAgICAgIHRoaXMudW5pdCxcclxuICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0JlZm9yZUd1dHRlcixcclxuICAgICAgLXN0ZXBwZWRPZmZzZXQsXHJcbiAgICAgIHRoaXMuc25hcHNob3QuYWxsQXJlYXNTaXplUGl4ZWxcclxuICAgICk7XHJcbiAgICBsZXQgYXJlYXNBZnRlciA9IGdldEd1dHRlclNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkoXHJcbiAgICAgIHRoaXMudW5pdCxcclxuICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0FmdGVyR3V0dGVyLFxyXG4gICAgICBzdGVwcGVkT2Zmc2V0LFxyXG4gICAgICB0aGlzLnNuYXBzaG90LmFsbEFyZWFzU2l6ZVBpeGVsXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEVhY2ggZ3V0dGVyIHNpZGUgYXJlYXMgY2FuJ3QgYWJzb3JiIGFsbCBvZmZzZXRcclxuICAgIGlmIChhcmVhc0JlZm9yZS5yZW1haW4gIT09IDAgJiYgYXJlYXNBZnRlci5yZW1haW4gIT09IDApIHtcclxuICAgICAgaWYgKE1hdGguYWJzKGFyZWFzQmVmb3JlLnJlbWFpbikgPT09IE1hdGguYWJzKGFyZWFzQWZ0ZXIucmVtYWluKSkge1xyXG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGFyZWFzQmVmb3JlLnJlbWFpbikgPiBNYXRoLmFicyhhcmVhc0FmdGVyLnJlbWFpbikpIHtcclxuICAgICAgICBhcmVhc0FmdGVyID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eShcclxuICAgICAgICAgIHRoaXMudW5pdCxcclxuICAgICAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlcixcclxuICAgICAgICAgIHN0ZXBwZWRPZmZzZXQgKyBhcmVhc0JlZm9yZS5yZW1haW4sXHJcbiAgICAgICAgICB0aGlzLnNuYXBzaG90LmFsbEFyZWFzU2l6ZVBpeGVsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcmVhc0JlZm9yZSA9IGdldEd1dHRlclNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkoXHJcbiAgICAgICAgICB0aGlzLnVuaXQsXHJcbiAgICAgICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQmVmb3JlR3V0dGVyLFxyXG4gICAgICAgICAgLShzdGVwcGVkT2Zmc2V0IC0gYXJlYXNBZnRlci5yZW1haW4pLFxyXG4gICAgICAgICAgdGhpcy5zbmFwc2hvdC5hbGxBcmVhc1NpemVQaXhlbFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEFyZWFzIGJlZm9yZSBndXR0ZXIgY2FuJ3QgYWJzb3JicyBhbGwgb2Zmc2V0ID4gbmVlZCB0byByZWNhbGN1bGF0ZSBzaXplcyBmb3IgYXJlYXMgYWZ0ZXIgZ3V0dGVyLlxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gICAgZWxzZSBpZiAoYXJlYXNCZWZvcmUucmVtYWluICE9PSAwKSB7XHJcbiAgICAgIGFyZWFzQWZ0ZXIgPSBnZXRHdXR0ZXJTaWRlQWJzb3JwdGlvbkNhcGFjaXR5KFxyXG4gICAgICAgIHRoaXMudW5pdCxcclxuICAgICAgICB0aGlzLnNuYXBzaG90LmFyZWFzQWZ0ZXJHdXR0ZXIsXHJcbiAgICAgICAgc3RlcHBlZE9mZnNldCArIGFyZWFzQmVmb3JlLnJlbWFpbixcclxuICAgICAgICB0aGlzLnNuYXBzaG90LmFsbEFyZWFzU2l6ZVBpeGVsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvLyBBcmVhcyBhZnRlciBndXR0ZXIgY2FuJ3QgYWJzb3JicyBhbGwgb2Zmc2V0ID4gbmVlZCB0byByZWNhbGN1bGF0ZSBzaXplcyBmb3IgYXJlYXMgYmVmb3JlIGd1dHRlci5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICAgIGVsc2UgaWYgKGFyZWFzQWZ0ZXIucmVtYWluICE9PSAwKSB7XHJcbiAgICAgIGFyZWFzQmVmb3JlID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eShcclxuICAgICAgICB0aGlzLnVuaXQsXHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0JlZm9yZUd1dHRlcixcclxuICAgICAgICAtKHN0ZXBwZWRPZmZzZXQgLSBhcmVhc0FmdGVyLnJlbWFpbiksXHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdC5hbGxBcmVhc1NpemVQaXhlbFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnVuaXQgPT09ICdwZXJjZW50Jykge1xyXG4gICAgICAvLyBIYWNrIGJlY2F1c2Ugb2YgYnJvd3NlciBtZXNzaW5nIHVwIHdpdGggc2l6ZXMgdXNpbmcgY2FsYyhYJSAtIFlweCkgLT4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgLy8gSWYgbm90IHRoZXJlLCBwbGF5aW5nIHdpdGggZ3V0dGVycyBtYWtlcyB0b3RhbCBnb2luZyBkb3duIHRvIDk5Ljk5ODc1JSB0aGVuIDk5Ljk5Mjg2JSwgOTkuOTg5ODYlLC4uXHJcbiAgICAgIGNvbnN0IGFsbCA9IFsuLi5hcmVhc0JlZm9yZS5saXN0LCAuLi5hcmVhc0FmdGVyLmxpc3RdO1xyXG4gICAgICBjb25zdCBhcmVhVG9SZXNldCA9IGFsbC5maW5kKFxyXG4gICAgICAgIGEgPT5cclxuICAgICAgICAgIGEucGVyY2VudEFmdGVyQWJzb3JwdGlvbiAhPT0gMCAmJlxyXG4gICAgICAgICAgYS5wZXJjZW50QWZ0ZXJBYnNvcnB0aW9uICE9PSBhLmFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUgJiZcclxuICAgICAgICAgIGEucGVyY2VudEFmdGVyQWJzb3JwdGlvbiAhPT0gYS5hcmVhU25hcHNob3QuYXJlYS5tYXhTaXplXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoYXJlYVRvUmVzZXQpIHtcclxuICAgICAgICBhcmVhVG9SZXNldC5wZXJjZW50QWZ0ZXJBYnNvcnB0aW9uID1cclxuICAgICAgICAgIHRoaXMuc25hcHNob3QuYWxsSW52b2x2ZWRBcmVhc1NpemVQZXJjZW50IC1cclxuICAgICAgICAgIGFsbFxyXG4gICAgICAgICAgICAuZmlsdGVyKGEgPT4gYSAhPT0gYXJlYVRvUmVzZXQpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHRvdGFsLCBhKSA9PiB0b3RhbCArIGEucGVyY2VudEFmdGVyQWJzb3JwdGlvbiwgMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3cgd2Uga25vdyBhcmVhcyBjb3VsZCBhYnNvcmIgc3RlcHBlZE9mZnNldCwgdGltZSB0byByZWFsbHkgdXBkYXRlIHNpemVzXHJcblxyXG4gICAgYXJlYXNCZWZvcmUubGlzdC5mb3JFYWNoKGl0ZW0gPT4gdXBkYXRlQXJlYVNpemUodGhpcy51bml0LCBpdGVtKSk7XHJcbiAgICBhcmVhc0FmdGVyLmxpc3QuZm9yRWFjaChpdGVtID0+IHVwZGF0ZUFyZWFTaXplKHRoaXMudW5pdCwgaXRlbSkpO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcclxuICAgIHRoaXMubm90aWZ5KCdwcm9ncmVzcycsIHRoaXMuc25hcHNob3QuZ3V0dGVyTnVtKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcERyYWdnaW5nKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4gYXJlYS5jb21wb25lbnQudW5sb2NrRXZlbnRzKCkpO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLmRyYWdMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBmY3QgPSB0aGlzLmRyYWdMaXN0ZW5lcnMucG9wKCk7XHJcbiAgICAgIGlmIChmY3QpIHtcclxuICAgICAgICBmY3QoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdhcm5pbmc6IEhhdmUgdG8gYmUgYmVmb3JlIFwibm90aWZ5KCdlbmQnKVwiXHJcbiAgICAvLyBiZWNhdXNlIFwibm90aWZ5KCdlbmQnKVwiXCIgY2FuIGJlIGxpbmtlZCB0byBcIltzaXplXT0neCdcIiA+IFwiYnVpbGQoKVwiID4gXCJzdG9wRHJhZ2dpbmcoKVwiXHJcbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBJZiBtb3ZlZCBmcm9tIHN0YXJ0aW5nIHBvaW50LCBub3RpZnkgZW5kXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZW5kUG9pbnQgJiZcclxuICAgICAgKHRoaXMuc3RhcnRQb2ludC54ICE9PSB0aGlzLmVuZFBvaW50LnggfHwgdGhpcy5zdGFydFBvaW50LnkgIT09IHRoaXMuZW5kUG9pbnQueSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLm5vdGlmeSgnZW5kJywgdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbXR4LWRyYWdnaW5nJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKFxyXG4gICAgICB0aGlzLmd1dHRlckVscy50b0FycmF5KClbdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0gLSAxXS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnbXR4LWRyYWdnZWQnXHJcbiAgICApO1xyXG4gICAgdGhpcy5zbmFwc2hvdCA9IG51bGw7XHJcblxyXG4gICAgLy8gTmVlZGVkIHRvIGxldCAoY2xpY2spPVwiY2xpY2tHdXR0ZXIoLi4uKVwiIGV2ZW50IHJ1biBhbmQgdmVyaWZ5IGlmIG1vdXNlIG1vdmVkIG9yIG5vdFxyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZW5kUG9pbnQgPSBudWxsO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5vdGlmeShcclxuICAgIHR5cGU6ICdzdGFydCcgfCAncHJvZ3Jlc3MnIHwgJ2VuZCcgfCAnY2xpY2snIHwgJ2RibGNsaWNrJyB8ICd0cmFuc2l0aW9uRW5kJyxcclxuICAgIGd1dHRlck51bTogbnVtYmVyXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCBzaXplcyA9IHRoaXMuZ2V0VmlzaWJsZUFyZWFTaXplcygpO1xyXG5cclxuICAgIGlmICh0eXBlID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0LmVtaXQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZW5kJykge1xyXG4gICAgICB0aGlzLmRyYWdFbmQuZW1pdCh7IGd1dHRlck51bSwgc2l6ZXMgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcclxuICAgICAgdGhpcy5ndXR0ZXJDbGljay5lbWl0KHsgZ3V0dGVyTnVtLCBzaXplcyB9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RibGNsaWNrJykge1xyXG4gICAgICB0aGlzLmd1dHRlckRibENsaWNrLmVtaXQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndHJhbnNpdGlvbkVuZCcpIHtcclxuICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIpIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy50cmFuc2l0aW9uRW5kU3Vic2NyaWJlci5uZXh0KHNpemVzKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3Byb2dyZXNzJykge1xyXG4gICAgICAvLyBTdGF5IG91dHNpZGUgem9uZSB0byBhbGxvdyB1c2VycyBkbyB3aGF0IHRoZXkgd2FudCBhYm91dCBjaGFuZ2UgZGV0ZWN0aW9uIG1lY2hhbmlzbS5cclxuICAgICAgdGhpcy5kcmFnUHJvZ3Jlc3NTdWJqZWN0Lm5leHQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcclxuICB9XHJcbn1cclxuIl19