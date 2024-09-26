import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ly-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class TreeTableComponent implements OnInit {
  @Input() headers: any[] = [];
  @Input() actionHeader: string = "";
  @Input() data: any[] = [];
  displayedHeaders: any[] = [];
  ngOnInit() {
    this.displayedHeaders = [...this.headers];

    if (this.actionHeader) {
      this.displayedHeaders.push(this.actionHeader);
    }
  }
}
