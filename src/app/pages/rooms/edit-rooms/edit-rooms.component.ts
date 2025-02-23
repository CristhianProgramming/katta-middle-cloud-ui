import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../../shared/interface/Room.interface';

@Component({
  selector: 'app-edit-rooms',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-rooms.component.html',
  styleUrl: './edit-rooms.component.scss'
})
export class EditRoomsComponent {
 protected roomsForm!: FormGroup;
  private activeId?: number;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly $roomService: RoomsService,
    private readonly $activeRoute: ActivatedRoute,
    private readonly $router: Router
  ) {
    this.roomsForm = this._fb.group({
      name: ['',Validators.required],
      capacity: [0,[Validators.min(20)]]
    });

    this.$activeRoute.paramMap.subscribe((pathParams: any) => {
      if (pathParams.params.hasOwnProperty('id')) {
        this.activeId = pathParams.params.id;
      }
    });

    if (this.activeId) {
      $roomService
        .getRoomDetails(this.activeId)
        .subscribe((room: Room | null) => {
          if (!room) {
            alert('No se encontro la pelicula');
          }
          delete room?.id;
          this.roomsForm.setValue({
            ...room,
          });
        });
    }
  }

  changeRoute(route: string) {
    this.$router.navigate([route]);
  }


  onSumitForm() {
    if (this.roomsForm.valid) {
      if (this.activeId) {
        this.$roomService
          .updateRoom(this.activeId, this.roomsForm.value)
          .subscribe((response: any) => {
            if (response.id) {
              location.replace('/rooms');
            }
          });
        return;
      }

      this.$roomService
        .createRoom(this.roomsForm.value)
        .subscribe((response: any) => {
          if (response.id) {
            location.replace('/rooms');
          }
        });
    }
  }
}

