import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, Observable, Subscription, timer } from 'rxjs';

const types: { [key: string]: string } = {
  primary: 'ly-button--primary',
  secondary: 'ly-button--secondary',
};

const sizes: { [key: string]: string } = {
  small: 'ly-button--small',
  base: 'ly-button--base',
  block: 'ly-button--block',
};

@Component({
  selector: 'ly-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements AfterViewInit, OnDestroy {
  @Output() btnClick: EventEmitter<Event> = new EventEmitter<Event>();
  @ViewChild('button') button!: ElementRef;
  @ViewChild('buttonText') buttonText!: ElementRef;
  type = input<keyof typeof types, string>(types['primary'], {
    transform: (value: keyof typeof types) => types[value],
  });

  disabled = input<boolean, boolean>(false, {
    transform: (value: boolean): boolean => {
      this._disabled = value;
      this.updateTabIndex();
      return value;
    },
  });
  _disabled = false;

  size = input<keyof typeof sizes, keyof typeof sizes>(sizes['base'], {
    transform: (value: keyof typeof sizes): keyof typeof sizes => {
      return sizes[value];
    },
  });

  tabIndex = '0';

  private click$!: Observable<Event>;
  private _btnClickSubscription: Subscription = new Subscription();
  _animate = false;
  _animationColor!: string;
  _animatedClass = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.click$ = fromEvent(this.button.nativeElement, 'click');
    this._btnClickSubscription.add(
      this.click$.subscribe((clickEvent: Event) => {
        if (!this._disabled) {
          clickEvent.stopPropagation();
          this.triggerAnimation();
          this.btnClick.emit(clickEvent);
        }
      })
    );
  }

  triggerAnimation(): void {
    if (this._animate) {
      return;
    }
    this._animate = true;
    this.updateAnimationClass();
    this.changeDetectorRef.detectChanges();

    timer(1000).subscribe(() => {
      this._animate = false;
      this.updateAnimationClass();
      this.changeDetectorRef.detectChanges();
    });
  }

  updateAnimationClass(): void {
    this._animatedClass = this._animate ? `${this.type()}--animated` : '';
  }

  updateTabIndex(): void {
    this.tabIndex = this._disabled ? '-1' : '0';
  }

  ngOnDestroy(): void {
    this._btnClickSubscription.unsubscribe();
  }
}
