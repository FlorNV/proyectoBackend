import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Divisa } from 'src/app/models/divisa';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-transaccion-form',
  templateUrl: './transaccion-form.component.html',
  styleUrls: ['./transaccion-form.component.css']
})
export class TransaccionFormComponent implements OnInit {

  transaccion!: Transaccion;
  accion: string = '';
  divisas!: Array<Divisa>;
  divisa!: Divisa;
  amount!: number;
  from!: string;
  to!: string;
  conversion!: any;
  email!: string;

  constructor(private transaccionService: TransaccionService, private router: Router, 
    private activatedRoute: ActivatedRoute) { 
      // this.obtenerDivisas();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id'] == '0'){
          this.accion = 'new';
          this.iniciarTransaccion();
        }else{
          this.accion = 'update';
          this.cargarTransaccion(params['id']);
        }
      }
    )
  }

  iniciarTransaccion(){
    this.transaccion = new Transaccion();
  }

  agregarTransaccion(){
    this.transaccionService.addTransaccion(this.transaccion).subscribe(
      result => {
        if(result.status == '1'){
          alert(result.msg);
          this.router.navigate(['transacciones']);
        }
      },
      error => {
        if(error.status == '0'){
          alert(error.msg);
        }
      }
    )
  }

  cargarTransaccion(id: string){

  }

  obtenerDivisas(){
    this.transaccionService.getCurrencies().subscribe(
      result => {
        this.divisas = new Array<Divisa>();
        for (const key in result.result) {
          this.divisa = new Divisa();
          this.divisa.codigo = key;
          this.divisa.nombre = result.result[key];
          this.divisas.push(this.divisa);
        }
      }
    )
  }

  convertirDivisa(){
    this.transaccionService.getEquivalencia(this.from, this.to).subscribe(
      result => {
        this.transaccion.tasaConversion = result.result[this.to];
      }
    )
    this.transaccionService.getConversion(this.from, this.to, this.amount).subscribe(
      result => {
        this.conversion = result.result;
        this.transaccion.cantidadOrigen = this.amount;
        this.transaccion.monedaOrigen = this.from;
        this.transaccion.cantidadDestino = this.conversion;
        this.transaccion.monedaDestino = this.to;
        this.transaccion.emailCliente = this.email;
        this.agregarTransaccion();
      }
    )
  }
}
