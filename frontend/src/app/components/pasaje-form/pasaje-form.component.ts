import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje } from 'src/app/models/pasaje';
import { Persona } from 'src/app/models/persona';
import { PasajeService } from 'src/app/services/pasaje.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-pasaje-form',
  templateUrl: './pasaje-form.component.html',
  styleUrls: ['./pasaje-form.component.css']
})
export class PasajeFormComponent implements OnInit {

  pasaje!: Pasaje;
  personas!: Array<Persona>;
  accion: string = '';
  ingresados!: boolean;

  constructor(private pasajeService: PasajeService, private personaService: PersonaService, 
    private router: Router, private activatedRoute: ActivatedRoute) { 
      this.ingresados = false;
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id'] == '0'){
          this.accion = 'new';
          this.iniciarPasaje();
          this.cargarPersonas();
        } else {
          this.accion = 'update';
          this.cargarPersonas();
          this.cargarPasaje(params['id']);
        }
      }
    )
  }

  iniciarPasaje(){
    this.pasaje = new Pasaje();
    this.pasaje.fechaCompra = new Date();
  }

  agregarPasaje(){
    this.pasaje.precioPasaje = this.calcularTotal();
    this.pasajeService.addPasaje(this.pasaje).subscribe(
      result => {
        if(result.status == '1'){
          alert(result.msg);
          this.router.navigate(['pasajes']);
        }
      },
      error => {
        if(error.status == '0'){
          alert(error.msg);
        }
      }
    )
  }

  cargarPasaje(id: string){
    this.pasajeService.getPasaje(id).subscribe(
      result => {
        this.pasaje = new Pasaje();
        Object.assign(this.pasaje, result);
        this.pasaje.fechaCompra = new Date(result.fechaCompra);
      }
    )
  }

  cargarPersonas(){
    this.personaService.getPersonas().subscribe(
      result => {
        this.personas = new Array<Persona>();
        result.forEach((element: any) => {
          let persona = new Persona();
          Object.assign(persona, element);
          this.personas.push(persona);
        });
      }
    )
  }

  actualizarPasaje(){
    if(this.ingresados){
      this.pasaje.precioPasaje = this.calcularTotal();
    }
    this.pasajeService.updatePasaje(this.pasaje).subscribe(
      result => {
        if(result.status == '1'){
          alert(result.msg);
          this.router.navigate(['pasajes']);
        }
      },
      error => {
        if(error.status == '0'){
          alert(error.msg);
        }
      }
    )
  }

  cancelar(){
    this.router.navigate(['pasajes']);
  }

  mostrarTotal(){
    if(this.pasaje.categoriaPasajero !== '' && this.pasaje.precioPasaje > 0){
      this.ingresados = true;
    }else{
      this.ingresados = false;
    }
  }

  calcularTotal(): number{
    let total: number = this.pasaje.precioPasaje;
    if(this.pasaje.categoriaPasajero === 'm'){
      total = total - total * 0.25;
    }else if(this.pasaje.categoriaPasajero === 'j'){
      total = total - total * 0.5;
    }
    return total;
  }

  quitarFiltros(form: NgForm){
    form.resetForm();
    this.ingresados = false;
  }
}
