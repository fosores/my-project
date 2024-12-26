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

const currencies = {
  pesos: ['$'],
  dollars: ['U$S'],
};

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
  @ViewChild('visibleValue', { static: false }) visibleValue!: ElementRef;
  _isError = false;
  _control!: FormControl;
  @Input() set currency(value: keyof typeof currencies) {
    this._currency = (currencies[value] || []).join(' ') + ' ';
  }
  _currency = '$ ';
  @Input() disable: boolean = false;
  _isDisabled: boolean = false;
  @Input() set readOnly(value: boolean) {
    this._readOnly = value;
  }
  _readOnly: boolean = false;
  @Input() maxIntegerLength: number = 9;

  value: number = 0;
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
      this._isError = !!errors && touched;
    }
  }

  formatAmount(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  handleFocus(): void {
    this.inputField.nativeElement.focus();
  }

  private getInputWidth(): boolean {
    // Retorna el ancho del input
    const inputWidth =
      this.inputField.nativeElement.getBoundingClientRect().width;
    const visibleValueWidth =
      this.visibleValue.nativeElement.getBoundingClientRect().width;
    console.log('Ancho Input', inputWidth);
    console.log('Ancho visibleValue', visibleValueWidth);

    return visibleValueWidth > inputWidth;
  }

  resizeAmountFont() {
    const maxIterations = 10; // Limitar las iteraciones para evitar bucles infinitos
    let iteration = 0;

    while (this.getInputWidth() && iteration < maxIterations) {
      console.log('Soy más ancho que el input');
      // Reducir el tamaño de la fuente o ajustar la visibilidad
      const currentFontSize = parseFloat(
        window.getComputedStyle(this.visibleValue.nativeElement).fontSize
      );
      this.visibleValue.nativeElement.style.fontSize = `${
        currentFontSize - 1
      }px`;
      iteration++;
    }
  }

  protected handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.resizeAmountFont();

    // Convertir comas en puntos
    input.value = input.value.replace(/,/g, '.');

    // Obtener la posición actual del cursor
    const selectionStart = input.selectionStart ?? input.value.length;

    // Ubicar el índice del punto decimal
    const decimalIndex = input.value.indexOf('.');

    // Determinar si se modifican enteros o decimales
    let modifyingIntegers = true;
    let modifyingDecimals = false;

    if (decimalIndex !== -1 && selectionStart > decimalIndex) {
      modifyingIntegers = false;
      modifyingDecimals = true;
    }

    if (!input.value) {
      this.value = 0;
    }

    const twoDecimalsRegEx = /^-?\d*(\.\d{0,2})?$/;
    if (!twoDecimalsRegEx.test(input.value)) {
      const dIndex = input.value.indexOf('.');
      if (dIndex !== -1 && input.value.length > dIndex + 2) {
        const newValue =
          input.value.slice(0, dIndex + 2) +
          input.value[input.value.length - 1];
        this.inputField.nativeElement.value = newValue;
        input.value = newValue;
      } else {
        this.inputField.nativeElement.value = input.value.slice(0, -1);
        input.value = input.value.slice(0, -1);
      }
    }

    if (!input.value) {
      input.value = '0';
    }

    let rawValue = input.value.replace(/[^0-9.]/g, '').trim();

    if (modifyingIntegers) {
      const [integerPart] = rawValue.split('.');
      const integerPartWithoutLeadingZeros = integerPart.replace(/^0+/, '');

      if (integerPartWithoutLeadingZeros.length > this.maxIntegerLength) {
        input.value = input.value.slice(0, -1);
        rawValue = input.value.replace(/[^0-9.]/g, '').trim();
      }
    }

    const decimalIdx = rawValue.indexOf('.');
    if (decimalIdx !== -1) {
      const [integers, decimals] = rawValue.split('.');
      if (decimals && decimals.length > 2) {
        rawValue = `${integers}.${decimals.substring(0, 1)}${decimals.slice(
          -1
        )}`;
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

  setDisabledState(): void {
    this._isDisabled = this.disable;
    this.cd.markForCheck();
  }
}
