import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MDCNotchedOutlineAdapter } from '@material/notched-outline/adapter';
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';

@Directive({
  selector: 'mdc-notched-outline-idle',
})
export class MdcNotchedOutlineIdle {
  @HostBinding('class.mdc-notched-outline__idle') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-notched-outline], mdc-notched-outline',
  exportAs: 'mdcNotchedOutline',
  template: `
  <svg>
    <path #svgpath class="mdc-notched-outline__path"/>
  </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcNotchedOutline implements OnInit, OnDestroy {
  get outlineIdle(): MdcNotchedOutlineIdle { return this._outlineIdle; }
  set outlineIdle(outlineIdle: MdcNotchedOutlineIdle) {
    this._outlineIdle = outlineIdle;
    this._changeDetectorRef.markForCheck();
  }
  private _outlineIdle: MdcNotchedOutlineIdle;

  @HostBinding('class.mdc-notched-outline') isHostClass = true;
  @ViewChild('svgpath') svgpath: ElementRef;

  private _mdcAdapter: MDCNotchedOutlineAdapter = {
    getWidth: () => this._getHostElement().offsetWidth,
    getHeight: () => this._getHostElement().offsetHeight,
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    setOutlinePathAttr: (value: string) => this.svgpath.nativeElement.setAttribute('d', value),
    getIdleOutlineStyleValue: (propertyName: string) => {
      if (this.outlineIdle) {
        return window.getComputedStyle(this.outlineIdle.elementRef.nativeElement).getPropertyValue(propertyName);
      }
    }
  };

  _foundation: {
    init(): void,
    destroy(): void,
    notch(notchWidth: number, isRtl: boolean): void,
    closeNotch(): void
  } = new MDCNotchedOutlineFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngOnInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  /**
   * Updates outline selectors and SVG path to open notch.
   */
  notch(notchWidth: number, isRtl: boolean): void {
    this._foundation.notch(notchWidth, isRtl);
  }

  /**
   * Updates the outline selectors to close notch and return it to idle state.
   */
  closeNotch() {
    this._foundation.closeNotch();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
