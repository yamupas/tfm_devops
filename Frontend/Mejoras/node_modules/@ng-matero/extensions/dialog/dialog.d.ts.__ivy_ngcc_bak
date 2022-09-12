import { TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { MtxDialogData } from './dialog.config';
export declare class MtxDialog {
    dialog: MatDialog;
    constructor(dialog: MatDialog);
    originalOpen(componentOrTemplateRef: ComponentType<any> | TemplateRef<any>, config: any): import("@angular/material/dialog").MatDialogRef<any, any>;
    open(config: MtxDialogData, componentOrTemplateRef?: ComponentType<any> | TemplateRef<any>): import("@angular/material/dialog").MatDialogRef<any, any>;
    alert(title: string, onOk?: () => void): void;
    confirm(title: string, onOk?: () => void, onClose?: () => void): void;
}
