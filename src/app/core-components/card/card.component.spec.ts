import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CoreComponentsModule } from '../core-components.module';
import { ComponentRef, signal } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let componentRef: ComponentRef<CardComponent>;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreComponentsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
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
