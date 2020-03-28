import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerebrosComponent } from './cerebros.component';

describe('CerebrosComponent', () => {
  let component: CerebrosComponent;
  let fixture: ComponentFixture<CerebrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerebrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerebrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
