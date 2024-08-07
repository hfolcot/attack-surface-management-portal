import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CoreComponentsModule } from '../core-components.module';
import { ComponentRef } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let componentRef: ComponentRef<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreComponentsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef
    componentRef.setInput('title', 'Testing')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render the title', () => {
    expect(component.title()).toEqual("Testing");
  });
});
