import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarHalfComponent } from './star-half.component';

describe('StarHalfComponent', () => {
  let component: StarHalfComponent;
  let fixture: ComponentFixture<StarHalfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarHalfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarHalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
