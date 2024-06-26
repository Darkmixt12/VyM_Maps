import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  public firstNameAndLastnamePattern: string = '([a-zA-Zñ ]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }


    //TODO: FORMULARIO DE EDITAR CLIENTE

  public getFieldError(field: string, form: FormGroup): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    if (field === 'name') {
      for (const key of Object.keys(errors)) {
        switch (key) {
          case 'required':
            return 'Este campo es requerido';
          case 'minlength':
            return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
          case 'pattern':
            return `El Usuario solo puede contener letras`;
          case 'maxlength':
            return `Maximo ${errors['maxlength'].requiredLength} caracteres.`
        }
      }
    } else {
      for (const key of Object.keys(errors)) {
        switch (key) {
		  case 'required':
			return 'El correo es Requerido';
          case 'pattern':
            return `Digite un correo electronico valido`;
        }
      }
    }
    return null;
  }


  //TODO: FORMULARIO DE CREACION DE CLIENTE VALIDADORES Y EDITAR CLIENTES

  public getFieldErrorClient(field: string, form: FormGroup): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

      for (const key of Object.keys(errors)) {
        switch (key) {
          case 'required':
            return 'Este campo es requerido';
          case 'minlength':
            return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
          case 'maxlength':
            return `Maximo ${errors['maxlength'].requiredLength} caracteres.`
        }
      }

    if(field === 'email'){
      for (const key of Object.keys(errors)) {
        switch (key) {
          case 'pattern':
            return `Digite un correo electronico valido`;
        }
      }
    }

    if(field === 'telefono'){
      for (const key of Object.keys(errors)) {
        switch (key) {
          case 'pattern':
            return `El numero de telefono no puede contener letras ni simbolos`;
        }
      }
    }

    
    return null;

  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
