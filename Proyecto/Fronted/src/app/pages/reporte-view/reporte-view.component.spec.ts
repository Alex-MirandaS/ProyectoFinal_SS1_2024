import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteViewComponent } from './reporte-view.component';

describe('ReporteViewComponent', () => {
  let component: ReporteViewComponent;
  let fixture: ComponentFixture<ReporteViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteViewComponent]
    });
    fixture = TestBed.createComponent(ReporteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
