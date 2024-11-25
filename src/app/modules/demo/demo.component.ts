import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { AmountFieldComponent } from "../../components/amount-field/amount-field.component";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, SpinnerComponent, AmountFieldComponent],
})
export class DemoComponent {
  handleClick():void {
    console.log('Clicked')
  }
}
