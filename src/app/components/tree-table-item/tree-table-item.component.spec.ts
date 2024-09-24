import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTableItemComponent } from './tree-table-item.component';

describe('TreeTableItemComponent', () => {
  let component: TreeTableItemComponent;
  let fixture: ComponentFixture<TreeTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeTableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
