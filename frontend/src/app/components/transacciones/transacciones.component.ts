import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  divisas!: Array<String>;
  transacciones!: Array<Transaccion>;
  transaccion!: Transaccion;
  origen!: string;
  destino!: string;

  constructor(private transaccionService: TransaccionService, private router: Router) { 
    this.obtenerDivisas();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      scrollX: true
    };
    this.cargarTransacciones();
  }

  cargarTransacciones(){
    this.transaccionService.getTransacciones().subscribe(
      result => {
        this.transacciones = new Array<Transaccion>();
        result.forEach((element: any) => {
          this.transaccion = new Transaccion();
          Object.assign(this.transaccion, element);
          this.transacciones.push(this.transaccion);
        });
        this.rerender();
      }
    )
  }

  obtenerTransaccionesPorMoneda(){
    this.transaccionService.getTransaccionesByMoneda(this.origen, this.destino).subscribe(
      result => {
        this.transacciones = new Array<Transaccion>();
        result.forEach((element: any) => {
          this.transaccion = new Transaccion();
          Object.assign(this.transaccion, element);
          this.transacciones.push(this.transaccion);
        });
        this.rerender();
      }
    )
  }

  obtenerDivisas(){
    this.transaccionService.getCurrencies().subscribe(
      result => {
        this.divisas = new Array<String>();
        for (const key in result.result) {
          this.divisas.push(key);
        }
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

  llamarFormAgregarTransaccion(){
    this.router.navigate(['transaccion-form', 0]);
  }

  quitarFiltros(form: NgForm){
    this.cargarTransacciones();
    form.resetForm();
  }
}
