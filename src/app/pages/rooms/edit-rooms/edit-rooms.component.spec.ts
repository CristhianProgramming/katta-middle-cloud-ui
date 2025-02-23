import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomsComponent } from './edit-rooms.component';

describe('EditRoomsComponent', () => {
  let component: EditRoomsComponent;
  let fixture: ComponentFixture<EditRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
