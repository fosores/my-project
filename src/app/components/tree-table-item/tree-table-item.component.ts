import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'ly-tree-table-item',
  templateUrl: './tree-table-item.component.html',
  styleUrls: ['./tree-table-item.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TreeTableItemComponent implements OnInit {
  @ViewChild('template', { static: true }) template: any;

  @Input() data: any[] = [];
  @Input() keyDefinitions: string[] = [];
  @Input() children: any[] = [];
  @Input() childPropertyName: string = 'children';
  @Input() widthDefinitions: { [key: string]: string } = {}; 
  expandedItems: Set<any> = new Set();
  expandedSubLevelItems: Set<any> = new Set();

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  isExpanded(item: any): boolean {
    return this.expandedItems.has(item);
  }

  isSubLevelExpanded(item: any) {
    return this.expandedSubLevelItems.has(item);
  }

  expandToggle(item: any) {
    if (this.isExpanded(item)) {
      this.expandedItems.delete(item);
    } else {
      this.expandedItems.add(item);
    }
  }

  expandSubLevelToggle(item: any) {
    if (this.isSubLevelExpanded(item)) {
      this.expandedSubLevelItems.delete(item);
    } else {
      this.expandedSubLevelItems.add(item);
    }
  }
}
