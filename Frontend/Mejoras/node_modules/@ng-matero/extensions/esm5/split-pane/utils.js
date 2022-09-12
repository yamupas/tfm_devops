/**
 * @fileoverview added by tsickle
 * Generated from: utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} event
 * @return {?}
 */
export function getPointFromEvent(event) {
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
export function getElementPixelSize(elRef, direction) {
    /** @type {?} */
    var rect = ((/** @type {?} */ (elRef.nativeElement))).getBoundingClientRect();
    return direction === 'horizontal' ? rect.width : rect.height;
}
/**
 * @param {?} v
 * @return {?}
 */
export function getInputBoolean(v) {
    return typeof v === 'boolean' ? v : v === 'false' ? false : true;
}
/**
 * @template T
 * @param {?} v
 * @param {?} defaultValue
 * @return {?}
 */
export function getInputPositiveNumber(v, defaultValue) {
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
export function isUserSizesValid(unit, sizes) {
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
export function getAreaMinSize(a) {
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
export function getAreaMaxSize(a) {
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
export function getGutterSideAbsorptionCapacity(unit, sideAreas, pixels, allAreasSizePixel) {
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
export function updateAreaSize(unit, item) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctbWF0ZXJvL2V4dGVuc2lvbnMvc3BsaXQtcGFuZS8iLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVVBLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUE4QjtJQUM5RCxhQUFhO0lBQ2IsSUFDRSxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsY0FBYyxLQUFLLFNBQVM7UUFDbEQsQ0FBQyxtQkFBQSxLQUFLLEVBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUMvQztRQUNBLE9BQU87WUFDTCxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxLQUFLLEVBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ2xELENBQUMsRUFBRSxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87U0FDbkQsQ0FBQztLQUNIO0lBQ0QsYUFBYTtJQUNiLHFDQUFxQztTQUNoQyxJQUNILENBQUMsbUJBQUEsS0FBSyxFQUFjLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUztRQUMzQyxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFDM0M7UUFDQSxPQUFPO1lBQ0wsQ0FBQyxFQUFFLENBQUMsbUJBQUEsS0FBSyxFQUFjLENBQUMsQ0FBQyxPQUFPO1lBQ2hDLENBQUMsRUFBRSxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsT0FBTztTQUNqQyxDQUFDO0tBQ0g7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsS0FBaUIsRUFDakIsU0FBb0M7O1FBRTlCLElBQUksR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxhQUFhLEVBQWUsQ0FBQyxDQUFDLHFCQUFxQixF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QUFzQixFQUFFLENBQUMsQ0FBQztnQkFDMUIsV0FBVyxFQUFFLE1BQU0sR0FBRyxZQUFZLENBQUMsZ0JBQWdCO2FBQ3BELENBQUM7U0FDSDtRQUNELE9BQU87WUFDTCxZQUFZLGNBQUE7WUFDWixXQUFXLEVBQUUsTUFBTTtZQUNuQixzQkFBc0IsRUFBRSxDQUFDLENBQUM7WUFDMUIsV0FBVyxFQUFFLENBQUM7U0FDZixDQUFDO0tBQ0g7QUFDSCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLElBQXlCLEVBQUUsSUFBb0M7SUFDNUYsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7S0FDM0Q7U0FBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDM0IsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3JGO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBNdHhTcGxpdEFyZWEsXHJcbiAgTXR4U3BsaXRQb2ludCxcclxuICBNdHhTcGxpdEFyZWFTbmFwc2hvdCxcclxuICBNdHhTcGxpdFNpZGVBYnNvcnB0aW9uQ2FwYWNpdHksXHJcbiAgTXR4U3BsaXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5LFxyXG59IGZyb20gJy4vaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQb2ludEZyb21FdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBNdHhTcGxpdFBvaW50IHtcclxuICAvLyBUb3VjaEV2ZW50XHJcbiAgaWYgKFxyXG4gICAgKGV2ZW50IGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzICE9PSB1bmRlZmluZWQgJiZcclxuICAgIChldmVudCBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPiAwXHJcbiAgKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiAoZXZlbnQgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcclxuICAgICAgeTogKGV2ZW50IGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFksXHJcbiAgICB9O1xyXG4gIH1cclxuICAvLyBNb3VzZUV2ZW50XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gIGVsc2UgaWYgKFxyXG4gICAgKGV2ZW50IGFzIE1vdXNlRXZlbnQpLmNsaWVudFggIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgKGV2ZW50IGFzIE1vdXNlRXZlbnQpLmNsaWVudFkgIT09IHVuZGVmaW5lZFxyXG4gICkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogKGV2ZW50IGFzIE1vdXNlRXZlbnQpLmNsaWVudFgsXHJcbiAgICAgIHk6IChldmVudCBhcyBNb3VzZUV2ZW50KS5jbGllbnRZLFxyXG4gICAgfTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50UGl4ZWxTaXplKFxyXG4gIGVsUmVmOiBFbGVtZW50UmVmLFxyXG4gIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJ1xyXG4pOiBudW1iZXIge1xyXG4gIGNvbnN0IHJlY3QgPSAoZWxSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gIHJldHVybiBkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/IHJlY3Qud2lkdGggOiByZWN0LmhlaWdodDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElucHV0Qm9vbGVhbih2OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdHlwZW9mIHYgPT09ICdib29sZWFuJyA/IHYgOiB2ID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcjxUPih2OiBhbnksIGRlZmF1bHRWYWx1ZTogVCk6IG51bWJlciB8IFQge1xyXG4gIGlmICh2ID09PSBudWxsIHx8IHYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICB9XHJcblxyXG4gIHYgPSBOdW1iZXIodik7XHJcbiAgcmV0dXJuICFpc05hTih2KSAmJiB2ID49IDAgPyB2IDogZGVmYXVsdFZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNVc2VyU2l6ZXNWYWxpZCh1bml0OiAncGVyY2VudCcgfCAncGl4ZWwnLCBzaXplczogQXJyYXk8bnVtYmVyIHwgbnVsbD4pOiBib29sZWFuIHtcclxuICAvLyBBbGwgc2l6ZXMgaGF2ZSB0byBiZSBub3QgbnVsbCBhbmQgdG90YWwgc2hvdWxkIGJlIDEwMFxyXG4gIGlmICh1bml0ID09PSAncGVyY2VudCcpIHtcclxuICAgIGNvbnN0IHRvdGFsID0gc2l6ZXMucmVkdWNlKChfdG90YWwsIHMpID0+IChzICE9PSBudWxsID8gX3RvdGFsICsgcyA6IF90b3RhbCksIDApO1xyXG4gICAgcmV0dXJuIHNpemVzLmV2ZXJ5KHMgPT4gcyAhPT0gbnVsbCkgJiYgdG90YWwgPiA5OS45ICYmIHRvdGFsIDwgMTAwLjE7XHJcbiAgfVxyXG5cclxuICAvLyBBIHNpemUgYXQgbnVsbCBpcyBtYW5kYXRvcnkgYnV0IG9ubHkgb25lLlxyXG4gIGlmICh1bml0ID09PSAncGl4ZWwnKSB7XHJcbiAgICByZXR1cm4gc2l6ZXMuZmlsdGVyKHMgPT4gcyA9PT0gbnVsbCkubGVuZ3RoID09PSAxO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFyZWFNaW5TaXplKGE6IE10eFNwbGl0QXJlYSk6IG51bGwgfCBudW1iZXIge1xyXG4gIGlmIChhLnNpemUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGEuY29tcG9uZW50LmxvY2tTaXplID09PSB0cnVlKSB7XHJcbiAgICByZXR1cm4gYS5zaXplO1xyXG4gIH1cclxuXHJcbiAgaWYgKGEuY29tcG9uZW50Lm1pblNpemUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGEuY29tcG9uZW50Lm1pblNpemUgPiBhLnNpemUpIHtcclxuICAgIHJldHVybiBhLnNpemU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYS5jb21wb25lbnQubWluU2l6ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFyZWFNYXhTaXplKGE6IE10eFNwbGl0QXJlYSk6IG51bGwgfCBudW1iZXIge1xyXG4gIGlmIChhLnNpemUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGEuY29tcG9uZW50LmxvY2tTaXplID09PSB0cnVlKSB7XHJcbiAgICByZXR1cm4gYS5zaXplO1xyXG4gIH1cclxuXHJcbiAgaWYgKGEuY29tcG9uZW50Lm1heFNpemUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGEuY29tcG9uZW50Lm1heFNpemUgPCBhLnNpemUpIHtcclxuICAgIHJldHVybiBhLnNpemU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYS5jb21wb25lbnQubWF4U2l6ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEd1dHRlclNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkoXHJcbiAgdW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJyxcclxuICBzaWRlQXJlYXM6IEFycmF5PE10eFNwbGl0QXJlYVNuYXBzaG90PixcclxuICBwaXhlbHM6IG51bWJlcixcclxuICBhbGxBcmVhc1NpemVQaXhlbDogbnVtYmVyXHJcbik6IE10eFNwbGl0U2lkZUFic29ycHRpb25DYXBhY2l0eSB7XHJcbiAgcmV0dXJuIHNpZGVBcmVhcy5yZWR1Y2UoXHJcbiAgICAoYWNjLCBhcmVhKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGdldEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkodW5pdCwgYXJlYSwgYWNjLnJlbWFpbiwgYWxsQXJlYXNTaXplUGl4ZWwpO1xyXG4gICAgICBhY2MubGlzdC5wdXNoKHJlcyk7XHJcbiAgICAgIGFjYy5yZW1haW4gPSByZXMucGl4ZWxSZW1haW47XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LFxyXG4gICAgeyByZW1haW46IHBpeGVscywgbGlzdDogW10gfVxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkoXHJcbiAgdW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJyxcclxuICBhcmVhU25hcHNob3Q6IE10eFNwbGl0QXJlYVNuYXBzaG90LFxyXG4gIHBpeGVsczogbnVtYmVyLFxyXG4gIGFsbEFyZWFzU2l6ZVBpeGVsOiBudW1iZXJcclxuKTogTXR4U3BsaXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5IHtcclxuICAvLyBObyBwYWluIG5vIGdhaW5cclxuICBpZiAocGl4ZWxzID09PSAwKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgIHBpeGVsQWJzb3JiOiAwLFxyXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiBhcmVhU25hcHNob3Quc2l6ZVBlcmNlbnRBdFN0YXJ0LFxyXG4gICAgICBwaXhlbFJlbWFpbjogMCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBBcmVhIHN0YXJ0IGF0IHplcm8gYW5kIG5lZWQgdG8gYmUgcmVkdWNlZCwgbm90IHBvc3NpYmxlXHJcbiAgaWYgKGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ID09PSAwICYmIHBpeGVscyA8IDApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFyZWFTbmFwc2hvdCxcclxuICAgICAgcGl4ZWxBYnNvcmI6IDAsXHJcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IDAsXHJcbiAgICAgIHBpeGVsUmVtYWluOiBwaXhlbHMsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKHVuaXQgPT09ICdwZXJjZW50Jykge1xyXG4gICAgcmV0dXJuIGdldEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHlQZXJjZW50KGFyZWFTbmFwc2hvdCwgcGl4ZWxzLCBhbGxBcmVhc1NpemVQaXhlbCk7XHJcbiAgfVxyXG5cclxuICBpZiAodW5pdCA9PT0gJ3BpeGVsJykge1xyXG4gICAgcmV0dXJuIGdldEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHlQaXhlbChhcmVhU25hcHNob3QsIHBpeGVscywgYWxsQXJlYXNTaXplUGl4ZWwpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXJlYUFic29ycHRpb25DYXBhY2l0eVBlcmNlbnQoXHJcbiAgYXJlYVNuYXBzaG90OiBNdHhTcGxpdEFyZWFTbmFwc2hvdCxcclxuICBwaXhlbHM6IG51bWJlcixcclxuICBhbGxBcmVhc1NpemVQaXhlbDogbnVtYmVyXHJcbik6IE10eFNwbGl0QXJlYUFic29ycHRpb25DYXBhY2l0eSB7XHJcbiAgY29uc3QgdGVtcFBpeGVsU2l6ZSA9IGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgcGl4ZWxzO1xyXG4gIGNvbnN0IHRlbXBQZXJjZW50U2l6ZSA9ICh0ZW1wUGl4ZWxTaXplIC8gYWxsQXJlYXNTaXplUGl4ZWwpICogMTAwO1xyXG5cclxuICAvLyBFTkxBUkdFIEFSRUFcclxuXHJcbiAgaWYgKHBpeGVscyA+IDApIHtcclxuICAgIC8vIElmIG1heFNpemUgJiBuZXdTaXplIGJpZ2dlciB0aGFuIGl0ID4gYWJzb3JiIHRvIG1heCBhbmQgcmV0dXJuIHJlbWFpbmluZyBwaXhlbHNcclxuICAgIGlmIChhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplICE9PSBudWxsICYmIHRlbXBQZXJjZW50U2l6ZSA+IGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUpIHtcclxuICAgICAgLy8gVXNlIGFyZWEuYXJlYS5tYXhTaXplIGFzIG5ld1BlcmNlbnRTaXplIGFuZCByZXR1cm4gY2FsY3VsYXRlIHBpeGVscyByZW1haW5pbmdcclxuICAgICAgY29uc3QgbWF4U2l6ZVBpeGVsID0gKGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUgLyAxMDApICogYWxsQXJlYXNTaXplUGl4ZWw7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICAgIHBpeGVsQWJzb3JiOiBtYXhTaXplUGl4ZWwsXHJcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSxcclxuICAgICAgICBwaXhlbFJlbWFpbjogYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQgKyBwaXhlbHMgLSBtYXhTaXplUGl4ZWwsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgIHBpeGVsQWJzb3JiOiBwaXhlbHMsXHJcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IHRlbXBQZXJjZW50U2l6ZSA+IDEwMCA/IDEwMCA6IHRlbXBQZXJjZW50U2l6ZSxcclxuICAgICAgcGl4ZWxSZW1haW46IDAsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gUkVEVUNFIEFSRUFcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgZWxzZSBpZiAocGl4ZWxzIDwgMCkge1xyXG4gICAgLy8gSWYgbWluU2l6ZSAmIG5ld1NpemUgc21hbGxlciB0aGFuIGl0ID4gYWJzb3JiIHRvIG1pbiBhbmQgcmV0dXJuIHJlbWFpbmluZyBwaXhlbHNcclxuICAgIGlmIChhcmVhU25hcHNob3QuYXJlYS5taW5TaXplICE9PSBudWxsICYmIHRlbXBQZXJjZW50U2l6ZSA8IGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUpIHtcclxuICAgICAgLy8gVXNlIGFyZWEuYXJlYS5taW5TaXplIGFzIG5ld1BlcmNlbnRTaXplIGFuZCByZXR1cm4gY2FsY3VsYXRlIHBpeGVscyByZW1haW5pbmdcclxuICAgICAgY29uc3QgbWluU2l6ZVBpeGVsID0gKGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUgLyAxMDApICogYWxsQXJlYXNTaXplUGl4ZWw7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICAgIHBpeGVsQWJzb3JiOiBtaW5TaXplUGl4ZWwsXHJcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSxcclxuICAgICAgICBwaXhlbFJlbWFpbjogYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQgKyBwaXhlbHMgLSBtaW5TaXplUGl4ZWwsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBJZiByZWR1Y2VkIHVuZGVyIHplcm8gPiByZXR1cm4gcmVtYWluaW5nIHBpeGVsc1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gICAgZWxzZSBpZiAodGVtcFBlcmNlbnRTaXplIDwgMCkge1xyXG4gICAgICAvLyBVc2UgMCBhcyBuZXdQZXJjZW50U2l6ZSBhbmQgcmV0dXJuIGNhbGN1bGF0ZSBwaXhlbHMgcmVtYWluaW5nXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICAgIHBpeGVsQWJzb3JiOiAtYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQsXHJcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogMCxcclxuICAgICAgICBwaXhlbFJlbWFpbjogcGl4ZWxzICsgYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgIHBpeGVsQWJzb3JiOiBwaXhlbHMsXHJcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IHRlbXBQZXJjZW50U2l6ZSxcclxuICAgICAgcGl4ZWxSZW1haW46IDAsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXJlYUFic29ycHRpb25DYXBhY2l0eVBpeGVsKFxyXG4gIGFyZWFTbmFwc2hvdDogTXR4U3BsaXRBcmVhU25hcHNob3QsXHJcbiAgcGl4ZWxzOiBudW1iZXIsXHJcbiAgY29udGFpbmVyU2l6ZVBpeGVsOiBudW1iZXJcclxuKTogTXR4U3BsaXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5IHtcclxuICBjb25zdCB0ZW1wUGl4ZWxTaXplID0gYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQgKyBwaXhlbHM7XHJcblxyXG4gIC8vIEVOTEFSR0UgQVJFQVxyXG5cclxuICBpZiAocGl4ZWxzID4gMCkge1xyXG4gICAgLy8gSWYgbWF4U2l6ZSAmIG5ld1NpemUgYmlnZ2VyIHRoYW4gaXQgPiBhYnNvcmIgdG8gbWF4IGFuZCByZXR1cm4gcmVtYWluaW5nIHBpeGVsc1xyXG4gICAgaWYgKGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUgIT09IG51bGwgJiYgdGVtcFBpeGVsU2l6ZSA+IGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgICAgcGl4ZWxBYnNvcmI6IGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUgLSBhcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCxcclxuICAgICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAtMSxcclxuICAgICAgICBwaXhlbFJlbWFpbjogdGVtcFBpeGVsU2l6ZSAtIGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgIHBpeGVsQWJzb3JiOiBwaXhlbHMsXHJcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IC0xLFxyXG4gICAgICBwaXhlbFJlbWFpbjogMCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBSRURVQ0UgQVJFQVxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICBlbHNlIGlmIChwaXhlbHMgPCAwKSB7XHJcbiAgICAvLyBJZiBtaW5TaXplICYgbmV3U2l6ZSBzbWFsbGVyIHRoYW4gaXQgPiBhYnNvcmIgdG8gbWluIGFuZCByZXR1cm4gcmVtYWluaW5nIHBpeGVsc1xyXG4gICAgaWYgKGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUgIT09IG51bGwgJiYgdGVtcFBpeGVsU2l6ZSA8IGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgICAgcGl4ZWxBYnNvcmI6IGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUgKyBwaXhlbHMgLSB0ZW1wUGl4ZWxTaXplLFxyXG4gICAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IC0xLFxyXG4gICAgICAgIHBpeGVsUmVtYWluOiB0ZW1wUGl4ZWxTaXplIC0gYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIElmIHJlZHVjZWQgdW5kZXIgemVybyA+IHJldHVybiByZW1haW5pbmcgcGl4ZWxzXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgICBlbHNlIGlmICh0ZW1wUGl4ZWxTaXplIDwgMCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFyZWFTbmFwc2hvdCxcclxuICAgICAgICBwaXhlbEFic29yYjogLWFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0LFxyXG4gICAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IC0xLFxyXG4gICAgICAgIHBpeGVsUmVtYWluOiBwaXhlbHMgKyBhcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFyZWFTbmFwc2hvdCxcclxuICAgICAgcGl4ZWxBYnNvcmI6IHBpeGVscyxcclxuICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogLTEsXHJcbiAgICAgIHBpeGVsUmVtYWluOiAwLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBcmVhU2l6ZSh1bml0OiAncGVyY2VudCcgfCAncGl4ZWwnLCBpdGVtOiBNdHhTcGxpdEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkpIHtcclxuICBpZiAodW5pdCA9PT0gJ3BlcmNlbnQnKSB7XHJcbiAgICBpdGVtLmFyZWFTbmFwc2hvdC5hcmVhLnNpemUgPSBpdGVtLnBlcmNlbnRBZnRlckFic29ycHRpb247XHJcbiAgfSBlbHNlIGlmICh1bml0ID09PSAncGl4ZWwnKSB7XHJcbiAgICAvLyBVcGRhdGUgc2l6ZSBleGNlcHQgZm9yIHRoZSB3aWxkY2FyZCBzaXplIGFyZWFcclxuICAgIGlmIChpdGVtLmFyZWFTbmFwc2hvdC5hcmVhLnNpemUgIT09IG51bGwpIHtcclxuICAgICAgaXRlbS5hcmVhU25hcHNob3QuYXJlYS5zaXplID0gaXRlbS5hcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCArIGl0ZW0ucGl4ZWxBYnNvcmI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==