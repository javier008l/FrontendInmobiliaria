import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as M from 'materialize-css';


@Component({
  selector: 'app-formulario-contacto-cliente',
  templateUrl: './formulario-contacto-cliente.component.html',
  styleUrls: ['./formulario-contacto-cliente.component.css']
})
export class FormularioContactoClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  tipo: any

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {
  }

  ngOnInit() {
    this.ConstruirFormulario();
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
  }

  onSelectChange(value: string) {
    this.tipo = value
  }
  /**
   * Construcción del formulario con los controles
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      asunto: ['', [Validators.required, Validators.minLength(2)]],
      contenido: ['', [Validators.required, Validators.minLength(2)]],
      ventaAlquiler: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  /**
   * Función de registro público
   */
  Enviar() {
    const datosUsuario = localStorage.getItem("datos-usuario");
    let campos = this.ObtenerFormGroup;
    const ventaAlquiler: string | undefined = this.fGroup.get('ventaAlquiler')?.value === 'venta' ? 'venta' : 'alquiler';


    if (datosUsuario) {
      const usuario = JSON.parse(datosUsuario);
      const correo = usuario.correo;
      let datos = {
        asunto: campos["asunto"].value,
        contenido: campos["contenido"].value,
        tipo: this.tipo,
        ventaAlquiler: ventaAlquiler,
        correo: correo,
        direccion: campos["direccion"].value,
      };
      this.servicioSeguridad.FormularioContactoCliente(datos).subscribe({
        next: () => {
          alert("Se ha enviado el correo con exito.")
        },
        error: () => {
          alert("Se ha producido un error.")
        }
      });
    }
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

}
