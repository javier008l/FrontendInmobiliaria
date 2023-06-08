import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
declare var M: any;


@Component({
  selector: 'app-creacion-dep-ciu',
  templateUrl: './creacion-dep-ciu.component.html',
  styleUrls: ['./creacion-dep-ciu.component.css']
})
export class CreacionDepCiuComponent implements OnInit {
  departments: any[] = [];
  cities: any[] = [];
  fGroup: FormGroup = new FormGroup({});
  departamento: any;
  ciudad: any

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {

  }

  ngOnInit() {
    this.loadDepartments();
  }

  departamentoSeleccionado(value: string) {
    this.departamento = value;
  }
  ciudadSeleccionado(value: string) {
    this.ciudad = value
  }

  loadDepartments() {
    this.http.get<any[]>('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json').subscribe((data: any[]) => {
      this.departments = data;
      this.initializeSelects();
    });
  }

  initializeSelects() {
    const departmentSelect = document.getElementById('departmentSelect') as HTMLSelectElement;
    const citySelect = document.getElementById('citySelect') as HTMLSelectElement;

    departmentSelect.innerHTML = '<option value="" disabled selected>Escoge un Departamento</option>';
    citySelect.innerHTML = '<option value="" disabled selected>Escoge una Ciudad</option>';

    this.departments.forEach((department: any) => {
      const option = document.createElement('option');
      option.value = department.departamento;
      option.text = department.departamento;
      departmentSelect.appendChild(option);
    });

    M.FormSelect.init(departmentSelect);
    M.FormSelect.init(citySelect);

    departmentSelect.addEventListener('change', () => {
      const selectedDepartment = departmentSelect.value;
      this.loadCities(selectedDepartment);
    });
  }

  loadCities(department: string) {
    const departmentData = this.departments.find((dep: any) => dep.departamento === department);
    this.cities = departmentData.ciudades;

    const citySelect = document.getElementById('citySelect') as HTMLSelectElement;
    citySelect.innerHTML = '<option value="" disabled selected>Choose your city</option>';

    this.cities.forEach((city: any) => {
      const option = document.createElement('option');
      option.value = city;
      option.text = city;
      citySelect.appendChild(option);
    });

    M.FormSelect.init(citySelect);
  }

  Enviar() {
    let nombreDepartamento = this.departamento;
    let nombre = this.ciudad;

    this.servicioSeguridad.nombreDepartamento(nombreDepartamento).subscribe({
      next: (datos: any) => {
        this.departamento = datos

        if (this.departamento) {
          this.servicioSeguridad.crearCiudad(nombre, this.departamento).subscribe({
            next: (datos) => {
              alert("Se creo con exito");
            },
            error: (err) => {
              console.log(err);
            }
          });

        } else {
          console.log("No se pudo obtener el clienteId.");
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
