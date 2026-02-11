import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeSelector } from './page-size-selector';

describe('PageSizeSelector', () => {
  let component: PageSizeSelector;
  let fixture: ComponentFixture<PageSizeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSizeSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSizeSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
