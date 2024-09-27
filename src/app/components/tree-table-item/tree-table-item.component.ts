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

const EVEN_ROW_COLOR = '#f3f4f4';
const ODD_ROW_COLOR = '#ffffff';

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
  @Input() displayedProperties: string[] = [];
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

  isExpanded(item: TreeTableItem): boolean {
    return this.expandedItems.has(item);
  }

  isSubLevelExpanded(item: TreeTableItem): boolean {
    return this.expandedSubLevelItems.has(item);
  }

  expandToggle(item: TreeTableItem): void {
    if (this.isExpanded(item)) {
      this.expandedItems.delete(item);
    } else {
      this.expandedItems.add(item);
    }
  }

  expandSubLevelToggle(item: TreeTableItem): void {
    this.expandedSubLevelItems.has(item)
      ? this.expandedSubLevelItems.delete(item)
      : this.expandedSubLevelItems.add(item);
  }

  getBackgroundColor(rowIndex: number): string {
    return rowIndex % 2 !== 0 ? ODD_ROW_COLOR : EVEN_ROW_COLOR;
  }

  calculateRowColors(): string[] {
    return this.data.map((_, i) => this.getBackgroundColor(i));
  }

  onLinkClick(item: TreeTableItem): void {
    this.linkClicked.emit(item);
  }
}
