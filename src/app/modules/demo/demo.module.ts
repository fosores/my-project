import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, DemoRoutingModule, DemoComponent],
})
export class DemoModule {}
