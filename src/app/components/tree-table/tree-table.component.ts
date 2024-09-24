import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ly-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TreeTableComponent implements OnInit{
  @Input() headers: any[] = [];
  @Input() actionHeader: any[] = [];
  @Input() data: any[] = [];
  displayedHeaders: any[] = [];
  ngOnInit(){
    this.displayedHeaders = [...this.headers];

    if (this.actionHeader) {
      this.displayedHeaders.push(this.actionHeader);
    }
  }
}
