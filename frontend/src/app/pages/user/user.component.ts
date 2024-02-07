import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userAppName: string = '';
  userAppEmail: string = '';
  userAppPass: string = 'userPass';

  imag: string = '../assets/persona.png';

  constructor(
    private inicioAppService: InicioAppService,
    private toast: ToastrService
  ) {}
  file: File | null = null;

  ngOnInit(): void {
    this.userAppName = this.inicioAppService.getName();
    this.userAppEmail = this.inicioAppService.getEmail();
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];

      // Crear un FileReader para leer el archivo seleccionado
      const reader = new FileReader();

      // Cuando el archivo se haya leído, actualizar la imagen
      reader.onload = (e) => {
        if (e.target) {
          this.imag = e.target.result as string;
        }
      };
      // Leer el archivo como una URL de datos
      reader.readAsDataURL(this.file);
    }
  }

  onImag(form: NgForm) {
    if (this.file) {
      const formData = new FormData();
      formData.append('imagen', this.file);

      this.inicioAppService.saveImag(formData);
    }
  }

  name(): void {
    this.inicioAppService.changeName(this.userAppName, this.userAppEmail);
  }

  cancel() {
    this.userAppName = this.inicioAppService.getName();
  }

  onPass(form: NgForm): void {
    var password = form.value.password;
    var pass = form.value.pass;
    var pass2 = form.value.pass2;

    if (form.valid) {
      this.inicioAppService.comparePass(password).subscribe((res) => {
        if (res.comp) {
          if (pass == '' || pass2 == '') {
            this.toast.error('Introduzca la contraseña dos veces');
          } else {
            if (pass === pass2) {
              this.inicioAppService.resetPass(pass).subscribe(
                () => {
                  this.toast.info('Contraseña cambiada');
                },
                (err) => {
                  this.toast.error(err.error.msj || 'Error desconocido');
                }
              );
            } else {
              this.toast.error('Introduzca dos veces la misma contraseña');
            }
          }
        }
      });
    } else {
      this.toast.error('Complete todos los campos para continuar');
    }
  }
}
