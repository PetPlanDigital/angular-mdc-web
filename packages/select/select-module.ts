import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcFloatingLabelModule } from '@angular-mdc/web/floating-label';
import { MdcLineRippleModule } from '@angular-mdc/web/line-ripple';
import { MdcNotchedOutlineModule } from '@angular-mdc/web/notched-outline';

import { MdcSelect } from './select';
import { MdcSelectIcon } from './select-icon';
import { MdcSelectHelperText } from './helper-text';

const SELECT_DECLARATIONS = [
  MdcSelect,
  MdcSelectHelperText,
  MdcSelectIcon
];

@NgModule({
  imports: [
    CommonModule,
    MdcFloatingLabelModule,
    MdcNotchedOutlineModule,
    MdcLineRippleModule
  ],
  exports: SELECT_DECLARATIONS,
  declarations: SELECT_DECLARATIONS
})
export class MdcSelectModule { }
