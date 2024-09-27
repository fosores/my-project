import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
export interface ColumnWidthDefinitions {
  [columnName: string]: string;
}

export interface TreeTableItem {
  [key: string]: any;
  children?: TreeTableItem[];
}

@Component({
  selector: 'ly-tree-table-item',
  templateUrl: './tree-table-item.component.html',
  styleUrls: ['./tree-table-item.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TreeTableItemComponent implements OnInit {
  @ViewChild('template', { static: true }) template: any;

  @Output() linkClicked = new EventEmitter<any>();
  @Input() data: TreeTableItem[] = [];
  @Input() keyDefinitions: string[] = [];
  @Input() children: TreeTableItem[] = [];
  @Input() childPropertyName: string = 'children';
  @Input() keyLinkName: string = 'link';
  @Input() widthDefinitions: ColumnWidthDefinitions = {};
  expandedItems: Set<TreeTableItem> = new Set();
  expandedSubLevelItems: Set<TreeTableItem> = new Set();
  backgroundColors: string[] = [];

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.backgroundColors = this.calculateRowColors();
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

  getBackgroundColor(index: number): string {
    return index % 2 !== 0 ? '#ffffff' : '#f3f4f4';
  }

  calculateRowColors(): string[] {
    return this.data.map((_, i) => this.getBackgroundColor(i));
  }

  onLinkClick(item: any) {
    this.linkClicked.emit(item);
  }
}
