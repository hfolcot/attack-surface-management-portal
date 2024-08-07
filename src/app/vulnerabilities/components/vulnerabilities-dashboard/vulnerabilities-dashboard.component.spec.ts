import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnerabilitiesDashboardComponent } from './vulnerabilities-dashboard.component';

describe('VulnerabilitiesDashboardComponent', () => {
  let component: VulnerabilitiesDashboardComponent;
  let fixture: ComponentFixture<VulnerabilitiesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VulnerabilitiesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VulnerabilitiesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
