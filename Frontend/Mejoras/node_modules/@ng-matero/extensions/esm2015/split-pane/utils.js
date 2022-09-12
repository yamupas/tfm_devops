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
    const rect = ((/** @type {?} */ (elRef.nativeElement))).getBoundingClientRect();
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
        const total = sizes.reduce((/**
         * @param {?} _total
         * @param {?} s
         * @return {?}
         */
        (_total, s) => (s !== null ? _total + s : _total)), 0);
        return sizes.every((/**
         * @param {?} s
         * @return {?}
         */
        s => s !== null)) && total > 99.9 && total < 100.1;
    }
    // A size at null is mandatory but only one.
    if (unit === 'pixel') {
        return sizes.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s === null)).length === 1;
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
    (acc, area) => {
        /** @type {?} */
        const res = getAreaAbsorptionCapacity(unit, area, acc.remain, allAreasSizePixel);
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
            areaSnapshot,
            pixelAbsorb: 0,
            percentAfterAbsorption: areaSnapshot.sizePercentAtStart,
            pixelRemain: 0,
        };
    }
    // Area start at zero and need to be reduced, not possible
    if (areaSnapshot.sizePixelAtStart === 0 && pixels < 0) {
        return {
            areaSnapshot,
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
    const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    /** @type {?} */
    const tempPercentSize = (tempPixelSize / allAreasSizePixel) * 100;
    // ENLARGE AREA
    if (pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels
        if (areaSnapshot.area.maxSize !== null && tempPercentSize > areaSnapshot.area.maxSize) {
            // Use area.area.maxSize as newPercentSize and return calculate pixels remaining
            /** @type {?} */
            const maxSizePixel = (areaSnapshot.area.maxSize / 100) * allAreasSizePixel;
            return {
                areaSnapshot,
                pixelAbsorb: maxSizePixel,
                percentAfterAbsorption: areaSnapshot.area.maxSize,
                pixelRemain: areaSnapshot.sizePixelAtStart + pixels - maxSizePixel,
            };
        }
        return {
            areaSnapshot,
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
            const minSizePixel = (areaSnapshot.area.minSize / 100) * allAreasSizePixel;
            return {
                areaSnapshot,
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
                areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: 0,
                pixelRemain: pixels + areaSnapshot.sizePixelAtStart,
            };
        }
        return {
            areaSnapshot,
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
    const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    // ENLARGE AREA
    if (pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels
        if (areaSnapshot.area.maxSize !== null && tempPixelSize > areaSnapshot.area.maxSize) {
            return {
                areaSnapshot,
                pixelAbsorb: areaSnapshot.area.maxSize - areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.maxSize,
            };
        }
        return {
            areaSnapshot,
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
                areaSnapshot,
                pixelAbsorb: areaSnapshot.area.minSize + pixels - tempPixelSize,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.minSize,
            };
        }
        // If reduced under zero > return remaining pixels
        // tslint:disable-next-line: one-line
        else if (tempPixelSize < 0) {
            return {
                areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: -1,
                pixelRemain: pixels + areaSnapshot.sizePixelAtStart,
            };
        }
        return {
            areaSnapshot,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctbWF0ZXJvL2V4dGVuc2lvbnMvc3BsaXQtcGFuZS8iLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVVBLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUE4QjtJQUM5RCxhQUFhO0lBQ2IsSUFDRSxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsY0FBYyxLQUFLLFNBQVM7UUFDbEQsQ0FBQyxtQkFBQSxLQUFLLEVBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUMvQztRQUNBLE9BQU87WUFDTCxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxLQUFLLEVBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ2xELENBQUMsRUFBRSxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87U0FDbkQsQ0FBQztLQUNIO0lBQ0QsYUFBYTtJQUNiLHFDQUFxQztTQUNoQyxJQUNILENBQUMsbUJBQUEsS0FBSyxFQUFjLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUztRQUMzQyxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFDM0M7UUFDQSxPQUFPO1lBQ0wsQ0FBQyxFQUFFLENBQUMsbUJBQUEsS0FBSyxFQUFjLENBQUMsQ0FBQyxPQUFPO1lBQ2hDLENBQUMsRUFBRSxDQUFDLG1CQUFBLEtBQUssRUFBYyxDQUFDLENBQUMsT0FBTztTQUNqQyxDQUFDO0tBQ0g7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsS0FBaUIsRUFDakIsU0FBb0M7O1VBRTlCLElBQUksR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxhQUFhLEVBQWUsQ0FBQyxDQUFDLHFCQUFxQixF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QUM7U0FDSDtRQUNELE9BQU87WUFDTCxZQUFZO1lBQ1osV0FBVyxFQUFFLE1BQU07WUFDbkIsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQztLQUNIO0FBQ0gsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxJQUF5QixFQUFFLElBQW9DO0lBQzVGLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0tBQzNEO1NBQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQzNCLGdEQUFnRDtRQUNoRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNyRjtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTXR4U3BsaXRBcmVhLFxyXG4gIE10eFNwbGl0UG9pbnQsXHJcbiAgTXR4U3BsaXRBcmVhU25hcHNob3QsXHJcbiAgTXR4U3BsaXRTaWRlQWJzb3JwdGlvbkNhcGFjaXR5LFxyXG4gIE10eFNwbGl0QXJlYUFic29ycHRpb25DYXBhY2l0eSxcclxufSBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogTXR4U3BsaXRQb2ludCB7XHJcbiAgLy8gVG91Y2hFdmVudFxyXG4gIGlmIChcclxuICAgIChldmVudCBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlcyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAoZXZlbnQgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID4gMFxyXG4gICkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogKGV2ZW50IGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsXHJcbiAgICAgIHk6IChldmVudCBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLFxyXG4gICAgfTtcclxuICB9XHJcbiAgLy8gTW91c2VFdmVudFxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICBlbHNlIGlmIChcclxuICAgIChldmVudCBhcyBNb3VzZUV2ZW50KS5jbGllbnRYICE9PSB1bmRlZmluZWQgJiZcclxuICAgIChldmVudCBhcyBNb3VzZUV2ZW50KS5jbGllbnRZICE9PSB1bmRlZmluZWRcclxuICApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IChldmVudCBhcyBNb3VzZUV2ZW50KS5jbGllbnRYLFxyXG4gICAgICB5OiAoZXZlbnQgYXMgTW91c2VFdmVudCkuY2xpZW50WSxcclxuICAgIH07XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudFBpeGVsU2l6ZShcclxuICBlbFJlZjogRWxlbWVudFJlZixcclxuICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCdcclxuKTogbnVtYmVyIHtcclxuICBjb25zdCByZWN0ID0gKGVsUmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICByZXR1cm4gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyByZWN0LndpZHRoIDogcmVjdC5oZWlnaHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnB1dEJvb2xlYW4odjogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnYm9vbGVhbicgPyB2IDogdiA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElucHV0UG9zaXRpdmVOdW1iZXI8VD4odjogYW55LCBkZWZhdWx0VmFsdWU6IFQpOiBudW1iZXIgfCBUIHtcclxuICBpZiAodiA9PT0gbnVsbCB8fCB2ID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgfVxyXG5cclxuICB2ID0gTnVtYmVyKHYpO1xyXG4gIHJldHVybiAhaXNOYU4odikgJiYgdiA+PSAwID8gdiA6IGRlZmF1bHRWYWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVXNlclNpemVzVmFsaWQodW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJywgc2l6ZXM6IEFycmF5PG51bWJlciB8IG51bGw+KTogYm9vbGVhbiB7XHJcbiAgLy8gQWxsIHNpemVzIGhhdmUgdG8gYmUgbm90IG51bGwgYW5kIHRvdGFsIHNob3VsZCBiZSAxMDBcclxuICBpZiAodW5pdCA9PT0gJ3BlcmNlbnQnKSB7XHJcbiAgICBjb25zdCB0b3RhbCA9IHNpemVzLnJlZHVjZSgoX3RvdGFsLCBzKSA9PiAocyAhPT0gbnVsbCA/IF90b3RhbCArIHMgOiBfdG90YWwpLCAwKTtcclxuICAgIHJldHVybiBzaXplcy5ldmVyeShzID0+IHMgIT09IG51bGwpICYmIHRvdGFsID4gOTkuOSAmJiB0b3RhbCA8IDEwMC4xO1xyXG4gIH1cclxuXHJcbiAgLy8gQSBzaXplIGF0IG51bGwgaXMgbWFuZGF0b3J5IGJ1dCBvbmx5IG9uZS5cclxuICBpZiAodW5pdCA9PT0gJ3BpeGVsJykge1xyXG4gICAgcmV0dXJuIHNpemVzLmZpbHRlcihzID0+IHMgPT09IG51bGwpLmxlbmd0aCA9PT0gMTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBcmVhTWluU2l6ZShhOiBNdHhTcGxpdEFyZWEpOiBudWxsIHwgbnVtYmVyIHtcclxuICBpZiAoYS5zaXplID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmIChhLmNvbXBvbmVudC5sb2NrU2l6ZSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIGEuc2l6ZTtcclxuICB9XHJcblxyXG4gIGlmIChhLmNvbXBvbmVudC5taW5TaXplID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmIChhLmNvbXBvbmVudC5taW5TaXplID4gYS5zaXplKSB7XHJcbiAgICByZXR1cm4gYS5zaXplO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGEuY29tcG9uZW50Lm1pblNpemU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBcmVhTWF4U2l6ZShhOiBNdHhTcGxpdEFyZWEpOiBudWxsIHwgbnVtYmVyIHtcclxuICBpZiAoYS5zaXplID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmIChhLmNvbXBvbmVudC5sb2NrU2l6ZSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIGEuc2l6ZTtcclxuICB9XHJcblxyXG4gIGlmIChhLmNvbXBvbmVudC5tYXhTaXplID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmIChhLmNvbXBvbmVudC5tYXhTaXplIDwgYS5zaXplKSB7XHJcbiAgICByZXR1cm4gYS5zaXplO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGEuY29tcG9uZW50Lm1heFNpemU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRHdXR0ZXJTaWRlQWJzb3JwdGlvbkNhcGFjaXR5KFxyXG4gIHVuaXQ6ICdwZXJjZW50JyB8ICdwaXhlbCcsXHJcbiAgc2lkZUFyZWFzOiBBcnJheTxNdHhTcGxpdEFyZWFTbmFwc2hvdD4sXHJcbiAgcGl4ZWxzOiBudW1iZXIsXHJcbiAgYWxsQXJlYXNTaXplUGl4ZWw6IG51bWJlclxyXG4pOiBNdHhTcGxpdFNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkge1xyXG4gIHJldHVybiBzaWRlQXJlYXMucmVkdWNlKFxyXG4gICAgKGFjYywgYXJlYSkgPT4ge1xyXG4gICAgICBjb25zdCByZXMgPSBnZXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5KHVuaXQsIGFyZWEsIGFjYy5yZW1haW4sIGFsbEFyZWFzU2l6ZVBpeGVsKTtcclxuICAgICAgYWNjLmxpc3QucHVzaChyZXMpO1xyXG4gICAgICBhY2MucmVtYWluID0gcmVzLnBpeGVsUmVtYWluO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSxcclxuICAgIHsgcmVtYWluOiBwaXhlbHMsIGxpc3Q6IFtdIH1cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5KFxyXG4gIHVuaXQ6ICdwZXJjZW50JyB8ICdwaXhlbCcsXHJcbiAgYXJlYVNuYXBzaG90OiBNdHhTcGxpdEFyZWFTbmFwc2hvdCxcclxuICBwaXhlbHM6IG51bWJlcixcclxuICBhbGxBcmVhc1NpemVQaXhlbDogbnVtYmVyXHJcbik6IE10eFNwbGl0QXJlYUFic29ycHRpb25DYXBhY2l0eSB7XHJcbiAgLy8gTm8gcGFpbiBubyBnYWluXHJcbiAgaWYgKHBpeGVscyA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICBwaXhlbEFic29yYjogMCxcclxuICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogYXJlYVNuYXBzaG90LnNpemVQZXJjZW50QXRTdGFydCxcclxuICAgICAgcGl4ZWxSZW1haW46IDAsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gQXJlYSBzdGFydCBhdCB6ZXJvIGFuZCBuZWVkIHRvIGJlIHJlZHVjZWQsIG5vdCBwb3NzaWJsZVxyXG4gIGlmIChhcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCA9PT0gMCAmJiBwaXhlbHMgPCAwKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgIHBpeGVsQWJzb3JiOiAwLFxyXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAwLFxyXG4gICAgICBwaXhlbFJlbWFpbjogcGl4ZWxzLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmICh1bml0ID09PSAncGVyY2VudCcpIHtcclxuICAgIHJldHVybiBnZXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5UGVyY2VudChhcmVhU25hcHNob3QsIHBpeGVscywgYWxsQXJlYXNTaXplUGl4ZWwpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHVuaXQgPT09ICdwaXhlbCcpIHtcclxuICAgIHJldHVybiBnZXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5UGl4ZWwoYXJlYVNuYXBzaG90LCBwaXhlbHMsIGFsbEFyZWFzU2l6ZVBpeGVsKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHlQZXJjZW50KFxyXG4gIGFyZWFTbmFwc2hvdDogTXR4U3BsaXRBcmVhU25hcHNob3QsXHJcbiAgcGl4ZWxzOiBudW1iZXIsXHJcbiAgYWxsQXJlYXNTaXplUGl4ZWw6IG51bWJlclxyXG4pOiBNdHhTcGxpdEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkge1xyXG4gIGNvbnN0IHRlbXBQaXhlbFNpemUgPSBhcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCArIHBpeGVscztcclxuICBjb25zdCB0ZW1wUGVyY2VudFNpemUgPSAodGVtcFBpeGVsU2l6ZSAvIGFsbEFyZWFzU2l6ZVBpeGVsKSAqIDEwMDtcclxuXHJcbiAgLy8gRU5MQVJHRSBBUkVBXHJcblxyXG4gIGlmIChwaXhlbHMgPiAwKSB7XHJcbiAgICAvLyBJZiBtYXhTaXplICYgbmV3U2l6ZSBiaWdnZXIgdGhhbiBpdCA+IGFic29yYiB0byBtYXggYW5kIHJldHVybiByZW1haW5pbmcgcGl4ZWxzXHJcbiAgICBpZiAoYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSAhPT0gbnVsbCAmJiB0ZW1wUGVyY2VudFNpemUgPiBhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplKSB7XHJcbiAgICAgIC8vIFVzZSBhcmVhLmFyZWEubWF4U2l6ZSBhcyBuZXdQZXJjZW50U2l6ZSBhbmQgcmV0dXJuIGNhbGN1bGF0ZSBwaXhlbHMgcmVtYWluaW5nXHJcbiAgICAgIGNvbnN0IG1heFNpemVQaXhlbCA9IChhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplIC8gMTAwKSAqIGFsbEFyZWFzU2l6ZVBpeGVsO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFyZWFTbmFwc2hvdCxcclxuICAgICAgICBwaXhlbEFic29yYjogbWF4U2l6ZVBpeGVsLFxyXG4gICAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUsXHJcbiAgICAgICAgcGl4ZWxSZW1haW46IGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgcGl4ZWxzIC0gbWF4U2l6ZVBpeGVsLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICBwaXhlbEFic29yYjogcGl4ZWxzLFxyXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiB0ZW1wUGVyY2VudFNpemUgPiAxMDAgPyAxMDAgOiB0ZW1wUGVyY2VudFNpemUsXHJcbiAgICAgIHBpeGVsUmVtYWluOiAwLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIFJFRFVDRSBBUkVBXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gIGVsc2UgaWYgKHBpeGVscyA8IDApIHtcclxuICAgIC8vIElmIG1pblNpemUgJiBuZXdTaXplIHNtYWxsZXIgdGhhbiBpdCA+IGFic29yYiB0byBtaW4gYW5kIHJldHVybiByZW1haW5pbmcgcGl4ZWxzXHJcbiAgICBpZiAoYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSAhPT0gbnVsbCAmJiB0ZW1wUGVyY2VudFNpemUgPCBhcmVhU25hcHNob3QuYXJlYS5taW5TaXplKSB7XHJcbiAgICAgIC8vIFVzZSBhcmVhLmFyZWEubWluU2l6ZSBhcyBuZXdQZXJjZW50U2l6ZSBhbmQgcmV0dXJuIGNhbGN1bGF0ZSBwaXhlbHMgcmVtYWluaW5nXHJcbiAgICAgIGNvbnN0IG1pblNpemVQaXhlbCA9IChhcmVhU25hcHNob3QuYXJlYS5taW5TaXplIC8gMTAwKSAqIGFsbEFyZWFzU2l6ZVBpeGVsO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFyZWFTbmFwc2hvdCxcclxuICAgICAgICBwaXhlbEFic29yYjogbWluU2l6ZVBpeGVsLFxyXG4gICAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUsXHJcbiAgICAgICAgcGl4ZWxSZW1haW46IGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgcGl4ZWxzIC0gbWluU2l6ZVBpeGVsLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gSWYgcmVkdWNlZCB1bmRlciB6ZXJvID4gcmV0dXJuIHJlbWFpbmluZyBwaXhlbHNcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25lLWxpbmVcclxuICAgIGVsc2UgaWYgKHRlbXBQZXJjZW50U2l6ZSA8IDApIHtcclxuICAgICAgLy8gVXNlIDAgYXMgbmV3UGVyY2VudFNpemUgYW5kIHJldHVybiBjYWxjdWxhdGUgcGl4ZWxzIHJlbWFpbmluZ1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFyZWFTbmFwc2hvdCxcclxuICAgICAgICBwaXhlbEFic29yYjogLWFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0LFxyXG4gICAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IDAsXHJcbiAgICAgICAgcGl4ZWxSZW1haW46IHBpeGVscyArIGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICBwaXhlbEFic29yYjogcGl4ZWxzLFxyXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiB0ZW1wUGVyY2VudFNpemUsXHJcbiAgICAgIHBpeGVsUmVtYWluOiAwLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHlQaXhlbChcclxuICBhcmVhU25hcHNob3Q6IE10eFNwbGl0QXJlYVNuYXBzaG90LFxyXG4gIHBpeGVsczogbnVtYmVyLFxyXG4gIGNvbnRhaW5lclNpemVQaXhlbDogbnVtYmVyXHJcbik6IE10eFNwbGl0QXJlYUFic29ycHRpb25DYXBhY2l0eSB7XHJcbiAgY29uc3QgdGVtcFBpeGVsU2l6ZSA9IGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgcGl4ZWxzO1xyXG5cclxuICAvLyBFTkxBUkdFIEFSRUFcclxuXHJcbiAgaWYgKHBpeGVscyA+IDApIHtcclxuICAgIC8vIElmIG1heFNpemUgJiBuZXdTaXplIGJpZ2dlciB0aGFuIGl0ID4gYWJzb3JiIHRvIG1heCBhbmQgcmV0dXJuIHJlbWFpbmluZyBwaXhlbHNcclxuICAgIGlmIChhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplICE9PSBudWxsICYmIHRlbXBQaXhlbFNpemUgPiBhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICAgIHBpeGVsQWJzb3JiOiBhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplIC0gYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQsXHJcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogLTEsXHJcbiAgICAgICAgcGl4ZWxSZW1haW46IHRlbXBQaXhlbFNpemUgLSBhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICBwaXhlbEFic29yYjogcGl4ZWxzLFxyXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAtMSxcclxuICAgICAgcGl4ZWxSZW1haW46IDAsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gUkVEVUNFIEFSRUFcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9uZS1saW5lXHJcbiAgZWxzZSBpZiAocGl4ZWxzIDwgMCkge1xyXG4gICAgLy8gSWYgbWluU2l6ZSAmIG5ld1NpemUgc21hbGxlciB0aGFuIGl0ID4gYWJzb3JiIHRvIG1pbiBhbmQgcmV0dXJuIHJlbWFpbmluZyBwaXhlbHNcclxuICAgIGlmIChhcmVhU25hcHNob3QuYXJlYS5taW5TaXplICE9PSBudWxsICYmIHRlbXBQaXhlbFNpemUgPCBhcmVhU25hcHNob3QuYXJlYS5taW5TaXplKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYXJlYVNuYXBzaG90LFxyXG4gICAgICAgIHBpeGVsQWJzb3JiOiBhcmVhU25hcHNob3QuYXJlYS5taW5TaXplICsgcGl4ZWxzIC0gdGVtcFBpeGVsU2l6ZSxcclxuICAgICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAtMSxcclxuICAgICAgICBwaXhlbFJlbWFpbjogdGVtcFBpeGVsU2l6ZSAtIGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBJZiByZWR1Y2VkIHVuZGVyIHplcm8gPiByZXR1cm4gcmVtYWluaW5nIHBpeGVsc1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmUtbGluZVxyXG4gICAgZWxzZSBpZiAodGVtcFBpeGVsU2l6ZSA8IDApIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgICAgcGl4ZWxBYnNvcmI6IC1hcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCxcclxuICAgICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAtMSxcclxuICAgICAgICBwaXhlbFJlbWFpbjogcGl4ZWxzICsgYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcmVhU25hcHNob3QsXHJcbiAgICAgIHBpeGVsQWJzb3JiOiBwaXhlbHMsXHJcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IC0xLFxyXG4gICAgICBwaXhlbFJlbWFpbjogMCxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXJlYVNpemUodW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJywgaXRlbTogTXR4U3BsaXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5KSB7XHJcbiAgaWYgKHVuaXQgPT09ICdwZXJjZW50Jykge1xyXG4gICAgaXRlbS5hcmVhU25hcHNob3QuYXJlYS5zaXplID0gaXRlbS5wZXJjZW50QWZ0ZXJBYnNvcnB0aW9uO1xyXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ3BpeGVsJykge1xyXG4gICAgLy8gVXBkYXRlIHNpemUgZXhjZXB0IGZvciB0aGUgd2lsZGNhcmQgc2l6ZSBhcmVhXHJcbiAgICBpZiAoaXRlbS5hcmVhU25hcHNob3QuYXJlYS5zaXplICE9PSBudWxsKSB7XHJcbiAgICAgIGl0ZW0uYXJlYVNuYXBzaG90LmFyZWEuc2l6ZSA9IGl0ZW0uYXJlYVNuYXBzaG90LnNpemVQaXhlbEF0U3RhcnQgKyBpdGVtLnBpeGVsQWJzb3JiO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=