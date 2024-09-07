import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarFullComponent } from './star-full.component';

describe('StarFullComponent', () => {
  let component: StarFullComponent;
  let fixture: ComponentFixture<StarFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarFullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
