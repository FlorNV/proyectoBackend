import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Pasaje } from 'src/app/models/pasaje';
import { PasajeService } from 'src/app/services/pasaje.service';

@Component({
  selector: 'app-pasajes',
  templateUrl: './pasajes.component.html',
  styleUrls: ['./pasajes.component.css']
})
export class PasajesComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  pasajes!: Array<Pasaje>;
  categoria!: string;

  constructor(private pasajeService: PasajeService, private router: Router) { 
    // this.cargarPasajesPorCategoria();
  }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      scrollX: true
    }
    this.cargarPasajes();
  }
  
  cargarPasajes(){
    this.pasajeService.getPasajes().subscribe(
      result => {
        this.pasajes = new Array<Pasaje>();
        result.forEach((element: any) => {
          let pasaje = new Pasaje();
          Object.assign(pasaje, element);
          this.pasajes.push(pasaje);
        });
        this.rerender();
      }
    )
  }

  cargarPasajesPorCategoria(){
    this.pasajeService.getPasajesByCategoria(this.categoria).subscribe(
      result => {
        this.pasajes = new Array<Pasaje>();
        result.forEach((element: any) => {
          let pasaje = new Pasaje();
          Object.assign(pasaje, element);
          this.pasajes.push(pasaje);
        });
        this.rerender();
      }
    )
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(undefined);
  }

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(undefined);     
    });
  }

  llamarFormAgregarPasaje(){
    this.router.navigate(['pasaje-form', 0]);
  }

  editarPasaje(pasaje: Pasaje){
    this.router.navigate(['pasaje-form', pasaje._id]);
  }

  eliminarPasaje(pasaje: Pasaje){
    this.router.navigate(['pasaje-form', pasaje._id]);
  }
}
