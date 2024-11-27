import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { AmountFieldComponent } from '../../components/amount-field/amount-field.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SpinnerComponent,
    AmountFieldComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DemoComponent implements OnInit {
  handleClick(): void {
    console.log('Clicked');
  }

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
    });

    this.form.valueChanges.subscribe({
      next: () => {
        console.log(this.form.value);
        console.log(this.form.valid);
      },
    });
  }
}
