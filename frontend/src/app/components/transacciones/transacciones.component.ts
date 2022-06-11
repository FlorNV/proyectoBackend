import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  transacciones!: Array<Transaccion>;

  constructor(private transaccionService: TransaccionService, private router: Router) { 
    this.obtenerTransacciones();
  }

  ngOnInit(): void {
  }

  obtenerTransacciones(){
    this.transaccionService.getTransacciones().subscribe(
      result => {
        console.log(result);
      }
    )
  }

  llamarFormAgregarTransaccion(){
    this.router.navigate(['transaccion-form', 0]);
  }
}
