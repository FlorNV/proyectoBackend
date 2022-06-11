import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

function verificarURL(c:AbstractControl){ 
  if (c.value == null) return null;
  
  if(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(c.value) == false){ 
    return {urlValida: true} 
  }
  return null; 
}

@Directive({
  selector: '[url-valida]',
  providers:[ {provide: NG_VALIDATORS, multi: true, useValue: verificarURL} ]
})
export class UrlValida {

  constructor() { }

}



// function verificarEmail(c:AbstractControl){ 
//   if (c.value == null) return null;
  
//   if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(c.value) == false){ 
//     return {emailValido: true} 
//   }
//   return null; 
// }

// @Directive({
//   selector: '[email-valido]',
//   providers:[ {provide: NG_VALIDATORS, multi: true, useValue: verificarEmail} ]
// })
// export class EmailValido {

//   constructor() { }

// }
