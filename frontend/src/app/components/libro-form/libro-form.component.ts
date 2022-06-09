import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css']
})
export class LibroFormComponent implements OnInit {

  libro!: Libro;
  accion: string = '';

  constructor(private libroService: LibroService, private router: Router, 
    private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] == '0'){
        this.accion = 'new';
        this.iniciarLibro();
      }else{
        this.accion = 'update';
        this.cargarLibro(params['id']);
      }
    })
  }

  iniciarLibro(){
    this.libro = new Libro();
  }

  agregarLibro(){
    this.libroService.addLibro(this.libro).subscribe(
      result => {
        if(result.status == '1'){
          alert(result.msg);
          this.router.navigate(['libros']);
        }
      },
      error => {
        if(error.status == '0'){
          alert(error.msg);
        }
      }
    )
  }

  cargarLibro(id: string){

  }
}
