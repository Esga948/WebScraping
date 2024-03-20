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
  imag: string = '';
  userAppPass: string = 'userPass';
  file: File | null = null;

  constructor(private inicioAppService: InicioAppService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.userAppName = this.inicioAppService.getName();
    this.userAppEmail = this.inicioAppService.getEmail();
    this.inicioAppService.getU().subscribe(
      async (res) => {
        if (res == '') {
          this.imag = '../assets/p.png';
        } else {
          const response = await fetch('http://localhost:8080/' + res);
          if (!response.ok) {
            this.imag = '../assets/p.png';
          } else {
            this.imag = `http://localhost:8080/${res}`;
          }
        }
      },
      (err) => {
        this.imag = '../assets/p.png';
      }
    );
  }

  //subir imagen
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

  //guardar imagen
  onImag(form: NgForm) {
    if (form.valid && this.file) {
      const formData = new FormData();
      formData.append('imagen', this.file);

      this.inicioAppService.saveImag(formData).subscribe(
        (res) => {
          this.toast.info('Imagen guardada');
          // Recargar la página
          window.location.reload();

          this.inicioAppService.getU().subscribe(
            (res) => {
              this.imag = `http://localhost:8080/${res}`;
            },
            (err) => {
              console.log('Error ', err);
            }
          );
        },
        (err) => {
          if (err.status === 409) {
            this.toast.error(
              'Ya existe un archivo con ese nombre, cambiele el nombre para poder subirlo'
            );
            console.log('Error ', err);
          } else if (err.status === 408) {
            this.toast.error('Error en el proceso, vuelve a intentarlo');
          } else {
            this.toast.error('Error al guardar la imagen');
            console.log('Error ', err);
          }
        }
      );
    } else {
      this.toast.error('Introduzca una imagen');
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
          if (pass == '' || pass2 == '' || pass == password || pass2 == password) {
            this.toast.error('Introduzca la nueva contraseña dos veces, no puede ser igual a la antigua');
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
