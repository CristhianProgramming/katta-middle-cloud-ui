import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMoviesComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditMoviesComponent;
  let fixture: ComponentFixture<EditMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
