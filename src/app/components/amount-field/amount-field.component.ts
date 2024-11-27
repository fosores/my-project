import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-amount-field',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './amount-field.component.html',
  styleUrls: ['./amount-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountFieldComponent),
      multi: true,
    },
  ],
})
export class AmountFieldComponent
  implements ControlValueAccessor, AfterViewInit
{
  @ViewChild('input', { static: false }) inputField!: ElementRef;
  isError = false;
  _control!: FormControl;
  currency = signal<string>('$');
  value: number = 0;
  @Input() disable: boolean = false;
  isDisabled: boolean = false;
  visibleValueIntegers: string = '0';
  visibleValueDecimals: string = '00';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(public injector: Injector, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      this._control = ngControl.control as FormControl;
    }
    this.detectOnError();
    this.cd.detectChanges();
  }

  detectOnError(): void {
    this._control.valueChanges.subscribe(() => {
      this.detectError();
    });
  }

  detectError(): void {
    if (this._control) {
      const { errors, touched } = this._control;
      this.isError = !!errors && touched;
    }
  }

  formatAmount(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  handleFocus(): void {
    this.inputField.nativeElement.focus();
  }

  protected handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('EVENT', input.value);
    if (!input.value) {
      this.value = 0;
    }
    //DETECTS IF THE VALUE HAS ALREADY 2 DECIMALS TO PREVENT FURTHER ADDING
    const twoDecimalsRegEx = /^-?\d*(\.\d{0,2})?$/;
    if (!twoDecimalsRegEx.test(input.value)) {
      const decimalIndex = input.value.indexOf('.');

      if (decimalIndex !== -1 && input.value.length > decimalIndex + 2) {
        const newValue =
          input.value.slice(0, decimalIndex + 2) +
          input.value[input.value.length - 1];
        this.inputField.nativeElement.value = newValue;
      } else {
        this.inputField.nativeElement.value = input.value.slice(0, -1);
      }
    }

    if (!input.value) {
      input.value = '0';
    }
    let rawValue = input.value.replace(/[^0-9.]/g, '').trim();

    const decimalIndex = rawValue.indexOf('.');
    if (decimalIndex !== -1) {
      const [integers, decimals] = rawValue.split('.');
      if (decimals) {
        if (decimals.length > 2) {
          rawValue = `${integers}.${decimals.substring(0, 1)}${decimals.slice(
            -1
          )}`;
        }
      }
    }

    const value = rawValue === '' ? 0 : parseFloat(rawValue);

    this.updateVisibleParts(value);

    const visibleIntegers = this.visibleValueIntegers.replace(/\./g, '');
    const visibleDecimals =
      this.visibleValueDecimals !== '00'
        ? this.visibleValueDecimals
        : undefined;
    const unformattedValue = visibleDecimals
      ? parseFloat(`${visibleIntegers}.${visibleDecimals}`)
      : parseFloat(visibleIntegers);
    console.log('unformattedValue', unformattedValue);
    this.value = unformattedValue;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  protected handleBlur(): void {
    this.onTouched();
    this.cd.detectChanges();
  }

  private updateVisibleParts(amount: number): void {
    const validAmount = amount || 0;
    const [integers, decimals] = validAmount.toFixed(2).split('.');
    this.visibleValueIntegers = integers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    this.visibleValueDecimals = decimals;
  }

  writeValue(valueToWrite: number | null): void {
    const validValue = valueToWrite ?? 0;
    this.value = validValue;
    this.updateVisibleParts(validValue);
  }

  registerOnChange(fn: (_: unknown) => unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => unknown): void {
    this.onTouched = fn;
  }

  setDisabledState?(): void {
    this.isDisabled = this.disable;
    this.cd.markForCheck();
  }
}
