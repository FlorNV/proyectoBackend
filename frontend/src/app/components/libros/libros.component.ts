import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libro!: Libro;
  libros!: Array<Libro>;
  indice!: number;

  constructor(private libroService: LibroService, private router: Router) { 
    this.libros = new Array<Libro>();
    this.libro = new Libro();
    // this.indice = 0;
    this.obtenerLibrosDestacados();
  }

  ngOnInit(): void {
  }

  llamarFormAgregarLibro(){
    this.router.navigate(['libro-form', 0]);
  }

  obtenerLibrosDestacados(){
    this.libroService.getLibrosDestacados().subscribe(
      result => {
        result.forEach((element: any) => {
          let libroAux = new Libro();
          Object.assign(libroAux, element);
          this.libros.push(libroAux);
        });
        this.activar(0);
      }
    )
  }

  activar(valor: number){
    this.indice = valor;
    if(this.indice < this.libros.length){
      this.libro = this.libros[this.indice];
    }
  }

  siguiente(){
    this.indice ++;
    if(this.indice > this.libros.length-1){
      this.indice = 0;
    }
    this.libro = this.libros[this.indice];
  }

  anterior(){
    this.indice --;
    if(this.indice < 0){
      this.indice = this.libros.length-1;
    }
    this.libro = this.libros[this.indice];
  }

  getIndice(libro: Libro): number{
    return this.libros.findIndex(l => l._id == libro._id);
  }
}
