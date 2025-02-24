import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Reservation } from '../../shared/interface/Reservation.interface';
import { BillboardService } from '../../services/billboard.service';
import { Billboard } from '../../shared/interface/Billboard.interface';

@Component({
  selector: 'app-reservation',
  imports: [LoadingComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  protected activeId!: number;
  protected listOfReservations!: Reservation[];
  protected selectedValues: number[] = [];
  protected activeBillboard!: Billboard;
  protected notAvailableSeats: number[] = [];

  gridSize: number = 3;
  grid: number[][] = [];

  selectedCells: boolean[][] = [];
  userReservatiosn : Reservation[] =[];

  constructor(
    private readonly $reservationService: ReservationService,
    private readonly $activeRouter: ActivatedRoute,
    private readonly $billBoardService: BillboardService
  ) {
    this.$activeRouter.paramMap.subscribe((pathParams: any) => {
      if (pathParams.params.hasOwnProperty('billboard')) {
        this.activeId = pathParams.params.billboard;

        this.$reservationService
          .getAllReservations(this.activeId)
          .subscribe((data: any) => {
            this.listOfReservations = data.content;
            this.$billBoardService
              .getBillBoardById(this.activeId)
              .subscribe((data: Billboard) => {
                this.activeBillboard = data;
                const seats = Math.sqrt(data.sala.capacity);
                this.seatIsNotDisponible();
                this.generateGrid(seats);
              });
          });
      }

      this.$reservationService.getAllReservationOfUser().subscribe((res:any)=>{
        this.userReservatiosn = res.content
      })
    });
    this.selectedCells = this.grid.map((row) => row.map(() => false));
  }

  seatIsNotDisponible() {
    let datos = [
      ...this.listOfReservations.map((x: Reservation) => x.seat),
      ...Array.from(
        { length: 20 },
        (_, i) => this.activeBillboard.sala.capacity + 1 + i
      ),
    ];
    this.notAvailableSeats = datos;
  }

  generateGrid(size: number): void {
    this.gridSize = size;
    this.grid = [];
    let counter = 1;

    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(counter++);
      }
      this.grid.push(row);
    }

    this.selectedCells = this.grid.map((row) => row.map(() => false));
    this.selectedValues = [];
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedCells[row][col];
  }

  toggleSelection(row: number, col: number): void {
    if (!this.selectedCells[row][col] && this.selectedValues.length >= 3) {
      alert('solo se puede asignar 3 puestos a la vez');
      return;
    }
    this.selectedCells[row][col] = !this.selectedCells[row][col];
    const cellValue = this.grid[row][col];

    if (this.selectedCells[row][col]) {
      this.selectedValues.push(cellValue);
    } else {
      this.selectedValues = this.selectedValues.filter(
        (value) => value !== cellValue
      );
    }
  }

  onSendSeatAssegment() {
    if (this.selectedValues.length !== 0) {
      this.selectedValues.forEach((seat: number) => {
        this.$reservationService
          .sendRequestSeats({
            seat,
            reservation: this.activeBillboard.id!,
          })
          .subscribe((res: any) => {
            alert('correctamente asignado');
            location.reload();
          });
      });
    }
  }

  deleteHandler(id:number){
    this.$reservationService.deleteReservation(id).subscribe((res:any)=>{
      alert('correctamente eliminado');
      location.reload();
    })
  }
}
