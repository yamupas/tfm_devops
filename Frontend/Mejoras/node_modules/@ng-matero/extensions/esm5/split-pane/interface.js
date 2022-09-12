/**
 * @fileoverview added by tsickle
 * Generated from: interface.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function MtxSplitPoint() { }
if (false) {
    /** @type {?} */
    MtxSplitPoint.prototype.x;
    /** @type {?} */
    MtxSplitPoint.prototype.y;
}
/**
 * @record
 */
export function MtxSplitArea() { }
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
export function MtxSplitSnapshot() { }
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
export function MtxSplitAreaSnapshot() { }
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
export function MtxSplitSideAbsorptionCapacity() { }
if (false) {
    /** @type {?} */
    MtxSplitSideAbsorptionCapacity.prototype.remain;
    /** @type {?} */
    MtxSplitSideAbsorptionCapacity.prototype.list;
}
/**
 * @record
 */
export function MtxSplitAreaAbsorptionCapacity() { }
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
export function MtxSplitOutputData() { }
if (false) {
    /** @type {?} */
    MtxSplitOutputData.prototype.gutterNum;
    /** @type {?} */
    MtxSplitOutputData.prototype.sizes;
}
/**
 * @record
 */
export function MtxSplitOutputAreaSizes() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLW1hdGVyby9leHRlbnNpb25zL3NwbGl0LXBhbmUvIiwic291cmNlcyI6WyJpbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSxtQ0FHQzs7O0lBRkMsMEJBQVU7O0lBQ1YsMEJBQVU7Ozs7O0FBR1osa0NBTUM7OztJQUxDLGlDQUFpQzs7SUFDakMsNkJBQWM7O0lBQ2QsNEJBQW9COztJQUNwQiwrQkFBdUI7O0lBQ3ZCLCtCQUF1Qjs7Ozs7QUFLekIsc0NBT0M7OztJQU5DLHFDQUFrQjs7SUFDbEIsNkNBQTBCOztJQUMxQix1REFBb0M7O0lBQ3BDLDZDQUEwQjs7SUFDMUIsNkNBQStDOztJQUMvQyw0Q0FBOEM7Ozs7O0FBR2hELDBDQUlDOzs7SUFIQyxvQ0FBbUI7O0lBQ25CLGdEQUF5Qjs7SUFDekIsa0RBQTJCOzs7OztBQUs3QixvREFHQzs7O0lBRkMsZ0RBQWU7O0lBQ2YsOENBQTRDOzs7OztBQUc5QyxvREFLQzs7O0lBSkMsc0RBQW1DOztJQUNuQyxxREFBb0I7O0lBQ3BCLGdFQUErQjs7SUFDL0IscURBQW9COzs7OztBQUt0Qix3Q0FHQzs7O0lBRkMsdUNBQWtCOztJQUNsQixtQ0FBK0I7Ozs7O0FBR2pDLDZDQUF3RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE10eFNwbGl0UGFuZURpcmVjdGl2ZSB9IGZyb20gJy4vc3BsaXQtcGFuZS5kaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNdHhTcGxpdFBvaW50IHtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE10eFNwbGl0QXJlYSB7XHJcbiAgY29tcG9uZW50OiBNdHhTcGxpdFBhbmVEaXJlY3RpdmU7XHJcbiAgb3JkZXI6IG51bWJlcjtcclxuICBzaXplOiBudW1iZXIgfCBudWxsO1xyXG4gIG1pblNpemU6IG51bWJlciB8IG51bGw7XHJcbiAgbWF4U2l6ZTogbnVtYmVyIHwgbnVsbDtcclxufVxyXG5cclxuLy8gQ1JFQVRFRCBPTiBEUkFHIFNUQVJUXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE10eFNwbGl0U25hcHNob3Qge1xyXG4gIGd1dHRlck51bTogbnVtYmVyO1xyXG4gIGFsbEFyZWFzU2l6ZVBpeGVsOiBudW1iZXI7XHJcbiAgYWxsSW52b2x2ZWRBcmVhc1NpemVQZXJjZW50OiBudW1iZXI7XHJcbiAgbGFzdFN0ZXBwZWRPZmZzZXQ6IG51bWJlcjtcclxuICBhcmVhc0JlZm9yZUd1dHRlcjogQXJyYXk8TXR4U3BsaXRBcmVhU25hcHNob3Q+O1xyXG4gIGFyZWFzQWZ0ZXJHdXR0ZXI6IEFycmF5PE10eFNwbGl0QXJlYVNuYXBzaG90PjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNdHhTcGxpdEFyZWFTbmFwc2hvdCB7XHJcbiAgYXJlYTogTXR4U3BsaXRBcmVhO1xyXG4gIHNpemVQaXhlbEF0U3RhcnQ6IG51bWJlcjtcclxuICBzaXplUGVyY2VudEF0U3RhcnQ6IG51bWJlcjtcclxufVxyXG5cclxuLy8gQ1JFQVRFRCBPTiBEUkFHIFBST0dSRVNTXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE10eFNwbGl0U2lkZUFic29ycHRpb25DYXBhY2l0eSB7XHJcbiAgcmVtYWluOiBudW1iZXI7XHJcbiAgbGlzdDogQXJyYXk8TXR4U3BsaXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5PjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNdHhTcGxpdEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkge1xyXG4gIGFyZWFTbmFwc2hvdDogTXR4U3BsaXRBcmVhU25hcHNob3Q7XHJcbiAgcGl4ZWxBYnNvcmI6IG51bWJlcjtcclxuICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiBudW1iZXI7XHJcbiAgcGl4ZWxSZW1haW46IG51bWJlcjtcclxufVxyXG5cclxuLy8gQ1JFQVRFRCBUTyBTRU5EIE9VVFNJREVcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTXR4U3BsaXRPdXRwdXREYXRhIHtcclxuICBndXR0ZXJOdW06IG51bWJlcjtcclxuICBzaXplczogTXR4U3BsaXRPdXRwdXRBcmVhU2l6ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTXR4U3BsaXRPdXRwdXRBcmVhU2l6ZXMgZXh0ZW5kcyBBcnJheTxudW1iZXIgfCAnKic+IHsgfVxyXG4iXX0=