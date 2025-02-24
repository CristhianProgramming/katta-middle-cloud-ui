import { Component, inject, OnInit } from '@angular/core';
import { BillboardService } from '../../../services/billboard.service';
import { Billboard } from '../../../shared/interface/Billboard.interface';
import { ResponseG } from '../../../shared/interface/Response.interface';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Router, RouterOutlet } from '@angular/router';
import { JwtServiceService } from '../../../services/jwt-service.service';

@Component({
  selector: 'app-billboard',
  imports: [LoadingComponent, RouterOutlet],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.scss',
})
export class BillboardComponent implements OnInit {
  protected billboardList!: Billboard[];
  protected isAdminPanel : boolean = inject(JwtServiceService).isAdmin() ?? false;

  constructor(private readonly $billboardService: BillboardService,private readonly $router:Router) {}

  ngOnInit(): void {
    this.$billboardService
      .getListOfAllBillboards()
      .subscribe((response: ResponseG<Billboard[]>) => {
        this.billboardList = response.content;
      });
  }

  deleteFunction(id : number){
    this.$billboardService.deleteBillBoard(id).subscribe((r:any)=>{
      location.reload();
    })
  }

  edit(id : number){
      this.$router.navigate(['/billboard/edit/'+id]);
  }
}
