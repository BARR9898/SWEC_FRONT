import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/admin/interfaces/expediente';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/enviroments/enviroment';
import { checkToken } from 'src/app/admin/interceptors/token.interceptor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})


export class CreacionComponent {


  constructor(private fb: FormBuilder, private expedienteService: ExpedientesService, private routerService: Router) {
    fb = fb;
  }

  mostrarSintomas = false;
  mostrarIndicacionesDcmCIe = false;
  mostrarModalidadTerapeutica = false;
  fecha_proximaCita = ''
  sexos = [
    {
      descripcion: 'Masculino',
      value: 'M'
    },
    {
      descripcion: 'Femenino',
      value: 'F'
    },
    {
      descripcion: 'Otro',
      value: 'O'
    }
  ]

  expediente = this.fb.group({
    //Paciente
    nombre: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(50)]),
    apellido_paterno: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(50)]),
    apellido_materno: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(50)]),
    edad: this.fb.control('25', [Validators.required, Validators.maxLength(3)]),
    ocupacion: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(60)]),
    direccion: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(60)]),
    sexo: this.fb.control('M', [Validators.required]),
    ingresos_mensuales: this.fb.control('6000', [Validators.required, Validators.maxLength(6)]),
    //Expediente
    motivo_consulta: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    circunstancias_aparicion: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    auxSintoma: this.fb.control('Cansacio', [Validators.maxLength(50)]),
    sintomas: this.fb.array([]),
    descripcion_fisica: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    demanda_tratamiento: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    area_escolar: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    area_laboral: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    acontecimientos_significativos: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    desarrollo_psicosexual: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    familiograma: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    area_familiar_relacion: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    mapeo_familiar: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    impresiones_diagnositcas_familia: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    hipotesis_familiar: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    examen_mental: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    indicaciones_diagnosticas: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    //DCM Y CIE
    auxEje: this.fb.control('E1', [Validators.maxLength(20)]),
    auxCodigo: this.fb.control('200', [Validators.maxLength(10)]),
    auxDcm: this.fb.control('CC2', [Validators.maxLength(10)]),
    auxCie: this.fb.control('Z142', [Validators.maxLength(10)]),
    auxTranstorno: this.fb.control('Bipolar', [Validators.maxLength(50)]),
    impresiones_diagnostics_dcm_cie: this.fb.array([]),
    //Modalidad terapeutica
    auxTi: this.fb.control(false, [Validators.required]),
    auxTf: this.fb.control(false, [Validators.required]),
    auxTp: this.fb.control(false, [Validators.required]),
    auxTg: this.fb.control(false, [Validators.required]),
    auxOtra: this.fb.control(false, [Validators.required]),
    auxFundamento: this.fb.control('Ingrese un dato', [Validators.maxLength(600), Validators.required]),
    modalidad_terapeutica: this.fb.array([]),

    foco_terapeutico: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    objetivo_terapeutico: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    estrategias_terapeuticas: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    pronostico_terapeutico: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),


    //Notas clinicas
    auxNotaClinica_fecha: this.fb.control('Ingrese un dato', [Validators.maxLength(50)]),
    auxNotaClinica_nota: this.fb.control('Ingrese un dato', [Validators.required, Validators.maxLength(600)]),
    nota_clinica: this.fb.array([]),

    //Citas
    citas: this.fb.array([]),




  })

  //Guarda El expediente
  saveExpedient() {

    this.ModalidadTerapeuticaPrepareData()

    let controlsWithOutValue = this.evalueteExpedientControls()
    if (controlsWithOutValue.length > 0) {
      let title = this.CreateTtitleForDialog(controlsWithOutValue);

      Swal.fire({
        icon: 'warning',
        title: 'El formulario es invalido!',
        text: `Los campos: ${title} se encuentran vacios`,
        showConfirmButton: true,
      })

      return
    }

    let expediente_ready_to_send = this.prepareExpedientToSend()
    this.expedienteService.crearExpediente(expediente_ready_to_send)
    .subscribe((res:any) => {
      console.log(res);

      if (res.result) {
        Swal.fire({
          icon: 'success',
          title: 'Expediente guardado con éxito!',
          showConfirmButton: false,
          timer: 2500
        })
        this.routerService.navigate(['/admin/expedientes/lista'])
        return

      }

      Swal.fire({
        icon: 'error',
        title: 'Algo salio mal!',
        showConfirmButton: false,
        timer: 2500
      })



    })
  }

  //Obtiene el tamaño de lo que se a escrito dentro de un form control
  getWrotenValueLength(formControlName: string) {
    return (<FormArray>this.expediente.get(formControlName)?.value.length)
  }

  //Vlida si el control enviado como parametrp tiene el tipo de error que se mande como 2do parametro
  hasError(formControlName: string, typeError: string) {
    let hasError = (this.expediente.get(formControlName)?.hasError(typeError))
    return hasError

  }

  //Agrega un nuevo item (formGroup) a un ArrayFormControl
  addItemToArray(auxControlNames: Array<string>, formControlName: string, keys: Array<string>) {

    const newData: Array<string> = [];
    auxControlNames.forEach(data => {
      let auxData;
      auxData = (<FormArray>this.expediente.get(data)).value;

      newData.push(auxData)
    })

    const controlFormAsArray = this.expediente.get(formControlName) as FormArray

    let auxFormGroup = this.fb.group({

    });


    keys.forEach((key, index) => {
      auxFormGroup.addControl(key, this.fb.control(newData[index]))
    })

    controlFormAsArray.push(auxFormGroup);

    //Clean the formControls
    auxControlNames.forEach((control) => {
      this.expediente.get(control)?.setValue('')
    })

  }

  //Elimina de un FormArrayControl el item en la posición indeicada
  deleteItemFromArray(index: number, formControl: string) {
    //Show confirm dialog for delete an item
    Swal.fire({
      title: '¿Desea eliminar el dato?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const formControlAsArray = this.expediente.get(formControl) as FormArray
        formControlAsArray.removeAt(index)
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
      }
    })

  }

  //Obtiene el el tamaño de un ArrayFormControl
  getLengthOfArrayForm(formControlName: string) {
    return (<FormArray>this.expediente.get(formControlName)).controls.length

  }

  //Asigna los valores de los controls a una variable de tipo Expediente que será la que se envie
  //en la peticion
  prepareExpedientToSend(): Expediente {
    let expedient: Expediente = {
      paciente: {
        nombre: this.expediente.controls.nombre.value,
        edad: this.expediente.controls.edad.value,
        apellido_paterno: this.expediente.controls.apellido_paterno.value,
        apellido_materno: this.expediente.controls.apellido_materno.value,
        ocupacion: this.expediente.controls.ocupacion.value,
        ingresos_mensuales: this.expediente.controls.ingresos_mensuales.value,
        direccion: this.expediente.controls.direccion.value,
        sexo: this.expediente.controls.sexo.value,

      },
      expediente: {
        motivo_de_consulta: this.expediente.controls.motivo_consulta.value,
        circunstancias_de_aparicion: this.expediente.controls.circunstancias_aparicion.value,
        sintomas: this.expediente.controls.sintomas.value,
        descripcion_fisica: this.expediente.controls.descripcion_fisica.value,
        demanda_de_tratamiento: this.expediente.controls.demanda_tratamiento.value,
        area_escolar: this.expediente.controls.area_escolar.value,
        area_laboral: this.expediente.controls.area_laboral.value,
        acontecimientos_significativos: this.expediente.controls.acontecimientos_significativos.value,
        desarrollo_psicosexual: this.expediente.controls.desarrollo_psicosexual.value,
        familiograma: this.expediente.controls.familiograma.value,
        area_de_relacion_y_familiar: this.expediente.controls.area_familiar_relacion.value,
        mapeo_familiar: this.expediente.controls.mapeo_familiar.value,
        impresion_diagnostica_de_familia: this.expediente.controls.impresiones_diagnositcas_familia.value,
        hipotesis_familiar: this.expediente.controls.hipotesis_familiar.value,
        examen_mental: this.expediente.controls.examen_mental.value,
        indicaciones_diagnosticas: this.expediente.controls.indicaciones_diagnosticas.value,
        impresiones_diagnosticas: this.expediente.controls.impresiones_diagnostics_dcm_cie.value,
        modalidad_terapeutica: this.expediente.controls.modalidad_terapeutica.value,
        objetivo_terapeutico: this.expediente.controls.objetivo_terapeutico.value,
        estrategias_terapeuticas: this.expediente.controls.estrategias_terapeuticas.value,
        pronostico_terapeutico: this.expediente.controls.pronostico_terapeutico.value,
        foco: this.expediente.controls.foco_terapeutico.value

      },
      notas_clinicas: [],
      citas: this.expediente.controls.citas.value


    }

    return expedient

  }

  //Setea el fvalor del formControl correspondiente a true
  ModalidadTerapeuticaSetValue(control: string) {
    this.expediente.get(control)?.setValue(true)
  }

  //Crea el formGroup que se insertara dentro del FormArrayControl modalidad_terapeutica
  ModalidadTerapeuticaPrepareData() {

    let ModalidadTerapeuticaAsArrayForm = this.expediente.controls.modalidad_terapeutica as FormArray
    if(ModalidadTerapeuticaAsArrayForm.value.length > 0){
      return
    }
    let ModalidadTerapeutica_newFormGroup = this.fb.group({
      ti: this.fb.control(this.expediente.controls.auxTi.value),
      tf: this.fb.control(this.expediente.controls.auxTf.value),
      tp: this.fb.control(this.expediente.controls.auxTp.value),
      tg: this.fb.control(this.expediente.controls.auxTg.value),
      otra: this.fb.control(this.expediente.controls.auxOtra.value),
      fundamento: this.fb.control(this.expediente.controls.auxFundamento.value)
    })
    ModalidadTerapeuticaAsArrayForm.push(ModalidadTerapeutica_newFormGroup);

  }

  //Da formato a la fecha
  setDate() {
    let date_time = new Date(this.fecha_proximaCita).toLocaleTimeString()
    let date_date = new Date(this.fecha_proximaCita).toLocaleDateString()
    let deate_formated = `${date_date} - ${date_time}`
    return deate_formated

  }

  //Crea el formGroup que se insertada dentro del FormArrayControl de citas
  addNewCita() {
    if (this.expediente.controls.citas.value.length == 1) {

      Swal.fire({
        icon: 'warning',
        title: 'Solo se puede agregar una próxima cita por sesión!',
        showConfirmButton: true
      })
      return
    }
    let citaProximaCita = this.setDate()
    let citasFormArray = this.expediente.get('citas') as FormArray
    let newFormControl_cita = this.fb.group({
      fecha: this.fb.control(citaProximaCita),
      status: true,
      asistencia: false
    })
    citasFormArray.push(newFormControl_cita);

    Swal.fire({
      icon: 'success',
      title: 'Cita registrada con éxito!',
      showConfirmButton: true
    })
  }

  //Evualua si los controls necesarios estan vacios o no y retorna un arreglo JSON con los controls
  //que si estan vacios
  evalueteExpedientControls() {

    let controls = [
      {
        control_name: 'nombre',
        nameForUser: 'Nombre'
      },
      {
        control_name: 'edad',
        nameForUser: 'Edad'

      },
      {
        control_name: 'sexo',
        nameForUser: 'Sexo'
      },
      {
        control_name: 'apellido_paterno',
        nameForUser: 'Apellido Paterno'
      },
      {
        control_name: 'apellido_materno',
        nameForUser: 'Apellido Materno'
      },
      {
        control_name: 'ocupacion',
        nameForUser: 'Ocupación'
      },
      {
        control_name: 'ingresos_mensuales',
        nameForUser: 'Ingresos Mensuales'
      },
      {
        control_name: 'direccion',
        nameForUser: 'Dirección'
      },
      {
        control_name: 'motivo_consulta',
        nameForUser: 'Motivo De Consulta'
      },
      {
        control_name: 'circunstancias_aparicion',
        nameForUser: 'Circunstancias De Aparición'
      },
      {
        control_name: 'sintomas',
        nameForUser: 'Sintomas'
      },
      {
        control_name: 'descripcion_fisica',
        nameForUser: 'Descripción Física'
      },
      {
        control_name: 'demanda_tratamiento',
        nameForUser: 'Demanda De Tratamiento'
      },
      {
        control_name: 'area_esclar',
        nameForUser: 'Área Escolar'
      },
      {
        control_name: 'area_laboral',
        nameForUser: 'Área Laboral'
      },
      {
        control_name: 'acontecimientos_significativos',
        nameForUser: 'Acontecimientos Significativos'
      },
      {
        control_name: 'desarrollo_psicosexual',
        nameForUser: 'Desarrollo Psicosexual'
      },
      {
        control_name: 'familiograma',
        nameForUser: 'Familiograma'
      },
      {
        control_name: 'area_familiar_relacion',
        nameForUser: 'Área Familiar y De Relación'
      },
      {
        control_name: 'mapeo_familiar',
        nameForUser: 'Mapeo Familiar'
      },
      {
        control_name: 'impresiones_diagnositcas_familia',
        nameForUser: 'Impresiones Diagnósticas De La Familia'
      },
      {
        control_name: 'hipotesis_familiar',
        nameForUser: 'Hipótesis Familiar'
      },
      {
        control_name: 'examen_mental',
        nameForUser: 'Exámen Mental'
      },
      {
        control_name: 'indicaciones_diagnosticas',
        nameForUser: 'Indicaciones Diagnósticas'
      },
      {
        control_name: 'impresiones_diagnostics_dcm_cie',
        nameForUser: 'Impresiones Diagnósticas DCM y CIE'
      },
      {
        control_name: 'modalidad_terapeutica',
        nameForUser: 'Modalidad Terapéutica'
      },
      {
        control_name: 'objetivo_terapeutico',
        nameForUser: 'Objetivo Terapéutico'
      },
      {
        control_name: 'estrategias_terapeuticas',
        nameForUser: 'Estrategia Terapéutica'
      },
      {
        control_name: 'pronostico_terapeutico',
        nameForUser: 'Pronóstico Terapéutico'
      },
      {
        control_name: 'foco_terapeutico',
        nameForUser: 'Fóco Terapéutico'
      },
      {
        control_name: 'citas',
        nameForUser: 'Citas'
      },
    ]


    let controlsWithOutValue:any = [];
    controls.forEach((control:any) => {
      let actualControl_VALUE = this.expediente.get(control.control_name)?.value
      if (actualControl_VALUE == '') {
        let itemWithOutValue = {
          control_name: control
        }
        controlsWithOutValue.push(itemWithOutValue)
      }
    })

    return controlsWithOutValue

  }


  //Crea el titulo que se cmostrara en el dialos si es que alguno de los controls necesarios
  //Se encuentra vacio
  CreateTtitleForDialog(controlsWithOutValue:[string]){
    let controls:any = []
    let title = ``
    controlsWithOutValue.forEach((control:any) => {
      controls.push(control.control_name.nameForUser)
      let auxTitle = `${control.control_name.nameForUser}`
      title += ` ${auxTitle} ,`

    })
    return title
  }






}
