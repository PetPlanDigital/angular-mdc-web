import {
  Directive,
  Input
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcIcon } from '@angular-mdc/web/icon';

@Directive({
  selector: '[mdcSelectIcon]',
  exportAs: 'mdcSelectIcon',
  host: { 'class': 'mdc-select__icon' }
})
export class MdcSelectIcon extends MdcIcon {
  @Input()
  get leading(): boolean { return this._leading; }
  set leading(value: boolean) {
    this._leading = toBoolean(value);
  }
  private _leading: boolean;

  @Input()
  get trailing(): boolean { return this._trailing; }
  set trailing(value: boolean) {
    this._trailing = toBoolean(value);
  }
  private _trailing: boolean;
}
