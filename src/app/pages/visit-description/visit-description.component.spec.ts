import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDescriptionComponent } from './visit-description.component';

describe('VisitDescriptionComponent', () => {
  let component: VisitDescriptionComponent;
  let fixture: ComponentFixture<VisitDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
