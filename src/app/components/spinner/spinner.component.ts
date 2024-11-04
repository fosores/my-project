import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ly-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SpinnerComponent {
  @Input() loadingAria: string = '';
  @Input() animationDuration: number = 5;
}
