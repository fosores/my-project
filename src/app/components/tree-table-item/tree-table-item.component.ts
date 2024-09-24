import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ly-tree-table-item',
  templateUrl: './tree-table-item.component.html',
  styleUrls: ['./tree-table-item.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TreeTableItemComponent implements OnInit{
  @ViewChild("template", { static: true }) template: any;

  @Input() data: any[] = [];
  @Input() keyDefinitions: string[] = [];
  @Input() children: any[] = [];
  expandedItems: Set<any> = new Set(); 

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  isExpanded(item: any): boolean {
    return this.expandedItems.has(item);
  }

  expandToggle(item: any) {
    if (this.isExpanded(item)) {
      this.expandedItems.delete(item);
    } else {
      this.expandedItems.add(item);
    }
  }

  test(){
    this.sublevels = !this.sublevels
  }

  //test
  sublevels = false

}
