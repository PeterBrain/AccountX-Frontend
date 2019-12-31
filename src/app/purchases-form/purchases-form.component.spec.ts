import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesFormComponent } from './purchases-form.component';

describe('PurchasesFormComponent', () => {
  let component: PurchasesFormComponent;
  let fixture: ComponentFixture<PurchasesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
