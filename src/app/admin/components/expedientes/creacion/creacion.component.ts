import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/admin/interfaces/expediente';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';


import { Router } from '@angular/router';
import { UserDataService } from 'src/app/admin/services/user-data.service';
@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})


export class CreacionComponent implements OnInit{


  constructor(private fb: FormBuilder, private expedienteService: ExpedientesService, private routerService: Router, private userDataService:UserDataService) {
    fb = fb;
  }


  fecha = new Date().toLocaleString('es-MX')
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
  expedient_id = 0;

  user_data  = this.userDataService.getUserData()

  ngOnInit(): void {

    
    this.expedienteService.getNextId()
    .subscribe((res:any) => {
      this.expedient_id = res.data + 1
      
    })

  }

  expediente = this.fb.group({

    //Boleanos auxiliares
    mostrarSintomas: this.fb.control({value:false,disabled:true}),
    mostrarIndicacionesDcmCIe: this.fb.control({value:false,disabled:true}), 
    //Paciente
    nombre: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    apellido_paterno: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    apellido_materno: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    edad: this.fb.control('', [Validators.required, Validators.maxLength(3)]),
    ocupacion: this.fb.control('', [Validators.required, Validators.maxLength(60)]),
    direccion: this.fb.control('', [Validators.required, Validators.maxLength(60)]),
    sexo: this.fb.control('M', [Validators.required]),
    ingresos_mensuales: this.fb.control('', [Validators.required, Validators.maxLength(6)]),
    //Expediente
    motivo_consulta: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    circunstancias_aparicion: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    auxSintoma: this.fb.control('', [Validators.maxLength(50)]),
    sintomas: this.fb.array([]),
    descripcion_fisica: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    demanda_tratamiento: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    area_escolar: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    area_laboral: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    acontecimientos_significativos: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    desarrollo_psicosexual: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    familiograma: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    area_familiar_relacion: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    mapeo_familiar: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    impresiones_diagnositcas_familia: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    hipotesis_familiar: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    examen_mental: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    indicaciones_diagnosticas: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    //DCM Y CIE
    auxEje: this.fb.control('', [Validators.maxLength(20)]),
    auxDcm: this.fb.control('', [Validators.maxLength(10)]),
    auxCie: this.fb.control('', [Validators.maxLength(10)]),
    auxTranstorno: this.fb.control('', [Validators.maxLength(50)]),
    impresiones_diagnostics_dcm_cie: this.fb.array([]),
    //Modalidad terapeutica
    auxTi: this.fb.control(false, [Validators.required]),
    auxTf: this.fb.control(false, [Validators.required]),
    auxTp: this.fb.control(false, [Validators.required]),
    auxTg: this.fb.control(false, [Validators.required]),
    auxOtra: this.fb.control(false, [Validators.required]),
    auxFundamento: this.fb.control('', [Validators.maxLength(1000), Validators.required]),
    modalidad_terapeutica: this.fb.array([]),

    foco_terapeutico: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    objetivo_terapeutico: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    estrategias_terapeuticas: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    pronostico_terapeutico: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),


    //Notas clinicas
    auxNotaClinica_fecha: this.fb.control('', [Validators.maxLength(50)]),
    auxNotaClinica_nota: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
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
    
    let filtros =  {
      user_id : this.user_data.id
    }
    
    this.expedienteService.crearExpediente(expediente_ready_to_send,filtros)
    .subscribe((res:any) => {

      console.log('create expedient response',res);
      
      if (res.result) {
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2500
        })
        this.routerService.navigate(['/admin/expedientes/lista'])
        return

      }

      Swal.fire({
        icon: 'error',
        title: res.message,
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
  addItemToArray(auxControlNames: Array<string>, formControlName: string, keys: Array<string>,showTableAuxName?:string) {

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

    
    if(showTableAuxName){
      switch (showTableAuxName) {
        case 'mostrarSintomas':
          this.expediente.controls.mostrarSintomas.enable()
          break;
        case 'mostrarIndicacionesDcmCIe':
          this.expediente.controls.mostrarIndicacionesDcmCIe.enable()
          break;
      
        default:
          break;
      }
    }


  }

  //Elimina de un FormArrayControl el item en la posición indeicada
  deleteItemFromArray(index: number, formControl: string,showArrayAux?:string) {
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
        if(formControlAsArray.length == 0 && showArrayAux){
          
          
            let auxShowArray_control = this.expediente.get(showArrayAux)
            
            auxShowArray_control.disable()
            auxShowArray_control.setValue(false)
          
        }
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
  prepareExpedientToSend() {

    let sintomasAsArray = [] 
    this.expediente.controls.sintomas.value.forEach((sintoma:any) => {
      sintomasAsArray.push(sintoma.sintoma)
    })

    let impresionesDiagnosticasAsArray = [] 
    this.expediente.controls.impresiones_diagnostics_dcm_cie.value.forEach((impresion:any) => {
      let aux = []
      aux.push(impresion.eje)
      aux.push(impresion.dcm)
      aux.push(impresion.cie)
      aux.push(impresion.transtorno)
      impresionesDiagnosticasAsArray.push(aux)
    })

    let modalidadTerapeuticaAsArray = [] 
    this.expediente.controls.modalidad_terapeutica.value.forEach((modalidad:any) => {
      let aux = []
      aux.push(modalidad.ti)
      aux.push(modalidad.tf)     
      aux.push(modalidad.tp)
      aux.push(modalidad.tg)
      aux.push(modalidad.otra)
      aux.push(modalidad.fundamento)
      modalidadTerapeuticaAsArray.push(aux)
    })


    
    let expedient = {
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
        circunstancias_aparicion: this.expediente.controls.circunstancias_aparicion.value,
        sintomas: sintomasAsArray,
        descripcion_fisica: this.expediente.controls.descripcion_fisica.value,
        demanda_tratamiento: this.expediente.controls.demanda_tratamiento.value,
        area_escolar: this.expediente.controls.area_escolar.value,
        area_laboral: this.expediente.controls.area_laboral.value,
        acontecimientos_significativos: this.expediente.controls.acontecimientos_significativos.value,
        desarrollo_psicosexual: this.expediente.controls.desarrollo_psicosexual.value,
        familiograma: this.expediente.controls.familiograma.value,
        area_familiar_relacion: this.expediente.controls.area_familiar_relacion.value,
        mapeo_familiar: this.expediente.controls.mapeo_familiar.value,
        impresiones_diagnosticas_familia: this.expediente.controls.impresiones_diagnositcas_familia.value,
        hipotesis_familiar: this.expediente.controls.hipotesis_familiar.value,
        examen_mental: this.expediente.controls.examen_mental.value,
        indicaciones_diagnosticas: this.expediente.controls.indicaciones_diagnosticas.value,
        impresiones_diagnosticas: impresionesDiagnosticasAsArray,
        modalidad_terapeutica: modalidadTerapeuticaAsArray,
        objetivo_terapeutico: this.expediente.controls.objetivo_terapeutico.value,
        estrategia_terapeutica: this.expediente.controls.estrategias_terapeuticas.value,
        pronostico_terapeutico: this.expediente.controls.pronostico_terapeutico.value,
        foco_terapeutico: this.expediente.controls.foco_terapeutico.value

      }


    }

  

    return expedient

  }

  //Setea el fvalor del formControl correspondiente a true
  ModalidadTerapeuticaSetValue(control: string) {
    let actualValue = this.expediente.get(control)?.value
    this.expediente.get(control)?.setValue(!actualValue)
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
  /*addNewCita() {
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
  */

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
      }
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
