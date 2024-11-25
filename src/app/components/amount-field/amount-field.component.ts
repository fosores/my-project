import { Component, ElementRef, forwardRef, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-amount-field',
  standalone: true,
  imports: [],
  templateUrl: './amount-field.component.html',
  styleUrls: ['./amount-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountFieldComponent),
      multi: true,
    },
  ],
})
export class AmountFieldComponent implements ControlValueAccessor {
  @ViewChild('input', { static: false }) inputField!: ElementRef;

  value = signal<number>(0); // Default value is 0
  disabled = signal<boolean>(false);
  visibleValueIntegers = signal<string>('0'); // Default integer part
  visibleValueDecimals = signal<string>('00'); // Default decimal part

  private onTouched?(): void {}
  private onChange?(_: unknown): void {}

  formatAmount(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  protected handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('EVENT', input.value)
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

    const value = rawValue === '' ? 0 : parseFloat(rawValue); // Default to 0 if empty

    this.value.set(value);
    this.updateVisibleParts(value);

    if (this.onChange) {
      this.onChange(value);
    }
    console.log('VALOR', value)
    // this.inputField.nativeElement.value = value;
  }

  protected handleBlur(): void {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private updateVisibleParts(amount: number): void {
    const validAmount = amount || 0;
    const [integers, decimals] = validAmount.toFixed(2).split('.');
    this.visibleValueIntegers.set(
      integers.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    );
    this.visibleValueDecimals.set(decimals);
  }

  writeValue(valueToWrite: number | null): void {
    const validValue = valueToWrite ?? 0;
    this.value.set(validValue);
    this.updateVisibleParts(validValue);
  }

  registerOnChange(fn: (_: unknown) => unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => unknown): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
