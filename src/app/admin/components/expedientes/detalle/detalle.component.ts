import { Component, OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { Params,ActivatedRoute, Router } from '@angular/router';
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';
import { FormBuilder,Validators,FormArray, Form } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDatepickerApply } from '@angular/material/datepicker';
import { Expediente } from 'src/app/admin/interfaces/expediente';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportarService } from 'src/app/admin/services/exportar.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private expedientesServices: ExpedientesService,
    private fb:FormBuilder,
    private routerService: Router,
    private exportarcionService:ExportarService
  ){}

  params:any
  _id:any
  expediente:any
  mostrarNotasClinicas = true;
  crearNotaClinica = false;
  haveBeenCreated_ClinicalNote = false;
  clinicalNotesOriginal_length:any
  mostrarUltimaRegistrada = false
  changeToTabOnIndex = 0;
  fecha_proximaCita = ''
  cambiosGuardados = false

  //Formulario para el expediente
  expedienteForm = this.fb.group({
    //Paciente
    nombre: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    apellido_paterno: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    apellido_materno: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    edad: this.fb.control('', [Validators.required, Validators.maxLength(3)]),
    ocupacion: this.fb.control('', [Validators.required, Validators.maxLength(60)]),
    direccion: this.fb.control('', [Validators.required, Validators.maxLength(60)]),
    sexo: this.fb.control('', [Validators.required, Validators.maxLength(9)]),
    ingresos_mensuales: this.fb.control('', [Validators.required, Validators.maxLength(6)]),

    //Expediente
    motivo_consulta: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    circunstancias_aparicion: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    auxSintoma: this.fb.control('', [ Validators.maxLength(50)]),
    sintomas: this.fb.array([]),
    descripcion_fisica: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    demanda_tratamiento: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    area_escolar: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    area_laboral: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    acontecimientos_significativos: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    desarrollo_psicosexual: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    familiograma: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    area_familiar_relacion: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    mapeo_familiar: this.fb.control('', [Validators.required, Validators.maxLength(600)]),
    impresiones_diagnositcas_familia: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    hipotesis_familiar: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    examen_mental: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    indicaciones_diagnosticas: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    //DCM Y CIE
    auxEje: this.fb.control('', [ Validators.maxLength(20)]),
    auxCodigo: this.fb.control('', [ Validators.maxLength(10)]),
    auxDcm: this.fb.control('', [ Validators.maxLength(10)]),
    auxCie: this.fb.control('', [ Validators.maxLength(10)]),
    auxTranstorno: this.fb.control('', [ Validators.maxLength(50)]),
    impresiones_diagnostics_dcm_cie: this.fb.array([]),
    //Modalidad terapeutica
    modalidad_terapeutica: this.fb.array([]),
    objetivo_terapeutico: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    estrategias_terapeuticas: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    pronostico_terapeutico: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    foco_terapeutico: this.fb.control('', [Validators.required, Validators.maxLength(600)]),


    //Notas clinicas
    auxNotaClinica_fecha: this.fb.control('', [ Validators.maxLength(50)]),
    auxNotaClinica_nota: this.fb.control('',[Validators.required,Validators.maxLength(600)]),
    notas_clinica: this.fb.array([]),
    //CITAS
    citas: this.fb.array([]),





  })

  //Formulario para la nota clinica
  notaClinicaForm = this.fb.group({
    auxFecha: this.fb.control(new Date().toISOString(),[Validators.maxLength(50)]),
    fecha: this.fb.control('',[Validators.maxLength(50)]),
    nota: this.fb.control('',[Validators.required,Validators.maxLength(1000)])
  })

  ngOnInit(): void {
    //Obtiene el expediente en base al id mandado y setea los forms con el valor corrrespondiente
    this.activatedRoute.params.subscribe((params: Params) => {
      this._id = this.activatedRoute.snapshot.paramMap.get('id')
      console.log(this._id)
      this.expedientesServices.obtenerExpediente(this._id)
        .subscribe((expedientGeted:any) => {
          this.expediente = expedientGeted.data
          console.log(this.expediente);
          this.asignValuesToFormControls()
          this.asignNotasClinicasToFormArray()
          this.asignNotasCitasToFormArray()
          this.clinicalNotesOriginal_length = this.expedienteForm.controls.notas_clinica.length

















        });
    });

  }

  //Metodo que encuentra el control correspondiente y le asigna el valor del expediente solicitado
  setValuesForm(formControl:string,value:string){
    this.expedienteForm.get(formControl)?.setValue(value)
  }

  //Asigna valores del expediente solicitado al formulario expedienteForm
  asignValuesToFormControls(){
    this.setValuesForm('nombre',this.expediente.paciente.nombre)
    this.setValuesForm('apellido_paterno',this.expediente.paciente.apellido_paterno)
    this.setValuesForm('apellido_materno',this.expediente.paciente.apellido_materno)
    this.setValuesForm('edad',this.expediente.paciente.edad)
    this.setValuesForm('ocupacion',this.expediente.paciente.ocupacion)
    this.setValuesForm('direccion',this.expediente.paciente.direccion)
    switch (this.expediente.paciente.sexo) {
      case 'M':
          this.setValuesForm('sexo','Masculino')
        break;
        case 'F':
          this.setValuesForm('sexo','Femenino')
        break;
        case 'O':
          this.setValuesForm('sexo','Otro')
        break;
      default:
        break;
    }
    this.setValuesForm('motivo_consulta',this.expediente.expediente.motivo_de_consulta)
    this.setValuesForm('circunstancias_aparicion',this.expediente.expediente.circunstancias_de_aparicion)
    this.setValuesForm('descripcion_fisica',this.expediente.expediente.descripcion_fisica)
    this.setValuesForm('demanda_tratamiento',this.expediente.expediente.demanda_de_tratamiento)
    this.setValuesForm('area_escolar',this.expediente.expediente.area_escolar)
    this.setValuesForm('area_laboral',this.expediente.expediente.area_laboral)
    this.setValuesForm('acontecimientos_significativos',this.expediente.expediente.acontecimientos_significativos)
    this.setValuesForm('desarrollo_psicosexual',this.expediente.expediente.desarrollo_psicosexual)
    this.setValuesForm('familiograma',this.expediente.expediente.familiograma)
    this.setValuesForm('area_familiar_relacion',this.expediente.expediente.area_de_relacion_y_familiar)
    this.setValuesForm('mapeo_familiar',this.expediente.expediente.mapeo_familiar)
    this.setValuesForm('impresiones_diagnositcas_familia',this.expediente.expediente.impresion_diagnostica_de_familia)
    this.setValuesForm('hipotesis_familiar',this.expediente.expediente.hipotesis_familiar)
    this.setValuesForm('examen_mental',this.expediente.expediente.examen_mental)
    this.setValuesForm('indicaciones_diagnosticas',this.expediente.expediente.indicaciones_diagnosticas)
    this.setValuesForm('foco_terapeutico',this.expediente.expediente.foco)


  }

  //Valida si el form control que se envia como parametro tiene algun error y a sido tocado anteriormente
  validateFormControl(formControls:string[]):boolean{
    formControls.forEach(control =>{
      if(this.notaClinicaForm.get(control)?.invalid || this.notaClinicaForm.get(control)?.touched || this.notaClinicaForm.get(control)?.value == ''){
        return true;
      }
      return false

    })
    return false

  }

  //Guarda la nota clinca
  save(){

    let expedient_updated = this.prepareExpedientToSend()

    this.expedientesServices.actualizarExpediente(this._id,expedient_updated)
    .subscribe((res:any) =>{
      console.log(res);

      if(res.result){

        this.showDialog('Cambios guardados!','success')
        setTimeout(() => {
          window.location.reload()
        },3000)
      }


    })



  }

  //Agregar nueva nota clínica al form array del formulario expediente
  addNotaClinica(){

    this.crearNotaClinica = !this.crearNotaClinica
    let date_before_format = this.notaClinicaForm.get('auxFecha')?.value
    let deate_formated = new Date(date_before_format!)?.toLocaleDateString('es-MX')
    this.notaClinicaForm.get('fecha')?.setValue(deate_formated)

    let newDate = this.notaClinicaForm.get('fecha')?.value
    let newNote = this.notaClinicaForm.get('nota')?.value
    let notasClinicasFormArray = this.expedienteForm.get('notas_clinica') as FormArray
    let newNoteClinic = this.fb.group({
      fecha: this.fb.control(newDate,[Validators.maxLength(10)]),
      nota: this.fb.control(newNote,[Validators.maxLength(1000)])
    })
    notasClinicasFormArray.push(newNoteClinic)
    this.haveBeenCreated_ClinicalNote = true

    Swal.fire({
      icon: 'success',
      title: 'Nota agregada con éxito',
      showConfirmButton: false,
      timer: 2500
    })

    this.mostrarUltimaRegistrada = true

    this.setIndexOfTabFocused()
  }

  //Obtener las notas clinicas del expediente solicitado y agregarlas al form array de expediente
  asignNotasClinicasToFormArray(){

    let notas_clinicas = this.expediente.notas_clinicas
    if (notas_clinicas.length == 0) {
      return
    }

    let formArray_notaClinica = (this.expedienteForm.get('notas_clinica') as FormArray)
    notas_clinicas.forEach((nota:any) => {

      let fecha = nota.fecha;
      let data =  nota.nota;

      let newFormGroup = this.fb.group({
        fecha: this.fb.control(fecha),
        nota: this.fb.control(data)
      })

      formArray_notaClinica.push(newFormGroup)


    })
  }

    //Obtener las notas clinicas del expediente solicitado y agregarlas al form array de expediente
    asignNotasCitasToFormArray(){

      let citas = this.expediente.citas
      if (citas.length == 0) {
        return
      }

      let formArray_citas = (this.expedienteForm.get('citas') as FormArray)
      citas.forEach((cita:any) => {

        let fecha = cita.fecha;
        let status =  cita.status;

        let newFormGroup = this.fb.group({
          fecha: this.fb.control(fecha),
          stauts: this.fb.control(status)
        })

        formArray_citas.push(newFormGroup)


      })
    }


  haveClinicalNotes(){
    let notasClinicasFormArray = this.expedienteForm.get('notas_clinica') as FormArray
    return notasClinicasFormArray.length

  }

  gateDateOfNote(index:number,control:string){
    return(<FormArray>this.expedienteForm.get('notas_clinica')).controls[index].get(control)?.value


  }

  deleteClinicalNote(index: number,formControl:string) {
    //Show confirm dialog for delete an item
    Swal.fire({
      title: '¿Desea eliminar el item?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const formControlAsArray = this.expedienteForm.get(formControl) as FormArray
        formControlAsArray.removeAt(index)
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
      }
    })

  }

  prepareExpedientToSend():Expediente{
    let expedient: Expediente = {
      paciente: {
        nombre: this.expedienteForm.controls.nombre.value ,
        edad: this.expedienteForm.controls.edad.value,
        apellido_paterno: this.expedienteForm.controls.apellido_paterno.value,
        apellido_materno: this.expedienteForm.controls.apellido_materno.value,
        ocupacion: this.expedienteForm.controls.ocupacion.value,
        ingresos_mensuales: this.expedienteForm.controls.ingresos_mensuales.value,
        direccion: this.expedienteForm.controls.direccion.value,
        sexo: this.expedienteForm.controls.sexo.value,
      },
      expediente: {
        motivo_de_consulta: this.expedienteForm.controls.motivo_consulta.value,
        circunstancias_de_aparicion: this.expedienteForm.controls.circunstancias_aparicion.value,
        sintomas: this.expedienteForm.controls.sintomas.value,
        descripcion_fisica: this.expedienteForm.controls.descripcion_fisica.value,
        demanda_de_tratamiento: this.expedienteForm.controls.demanda_tratamiento.value,
        area_escolar: this.expedienteForm.controls.area_escolar.value,
        area_laboral: this.expedienteForm.controls.area_laboral.value,
        acontecimientos_significativos: this.expedienteForm.controls.acontecimientos_significativos.value,
        desarrollo_psicosexual: this.expedienteForm.controls.desarrollo_psicosexual.value,
        familiograma: this.expedienteForm.controls.familiograma.value,
        area_de_relacion_y_familiar: this.expedienteForm.controls.area_familiar_relacion.value,
        mapeo_familiar: this.expedienteForm.controls.mapeo_familiar.value,
        impresion_diagnostica_de_familia: this.expedienteForm.controls.impresiones_diagnositcas_familia.value,
        hipotesis_familiar: this.expedienteForm.controls.hipotesis_familiar.value,
        examen_mental: this.expedienteForm.controls.examen_mental.value,
        indicaciones_diagnosticas: this.expedienteForm.controls.indicaciones_diagnosticas.value,
        impresiones_diagnosticas: this.expedienteForm.controls.impresiones_diagnostics_dcm_cie.value,
        modalidad_terapeutica: this.expedienteForm.controls.modalidad_terapeutica.value,
        objetivo_terapeutico: this.expedienteForm.controls.objetivo_terapeutico.value,
        estrategias_terapeuticas: this.expedienteForm.controls.estrategias_terapeuticas.value,
        pronostico_terapeutico: this.expedienteForm.controls.pronostico_terapeutico.value,
        foco: this.expedienteForm.controls.foco_terapeutico.value

      },
      notas_clinicas: this.expedienteForm.controls.notas_clinica.value,
      citas: this.expedienteForm.controls.citas.value


  }

  return expedient

  }

  isTheLastOneInserted(index:number){
    let clinicalNotes_actualLength = this.expedienteForm.controls.notas_clinica.length
    if( clinicalNotes_actualLength > this.clinicalNotesOriginal_length ){
      if ((index+1) == clinicalNotes_actualLength) {
        return true

      }
      return false
    }
    return false

  }

  isReadyOnly(index:number){
    let clinicalNotes_actualLength = this.expedienteForm.controls.notas_clinica.length
    if( clinicalNotes_actualLength > this.clinicalNotesOriginal_length ){
      if ((index+1) == clinicalNotes_actualLength) {
        return false

      }
      return true
    }
    return true

  }

  setIndexOfTabFocused(){
    this.changeToTabOnIndex =  1
  }

  addNewCita(){
    let citaProximaCita = this.setDate()
    let citasFormArray = this.expedienteForm.get('citas') as FormArray
    let newFormControl_cita = this.fb.group({
        fecha: this.fb.control(citaProximaCita),
        status:true,
        asistencia: false
    })
    citasFormArray.push(newFormControl_cita);
    let newCita = {
      fecha: citaProximaCita,
      status: true
    }
    this.expediente.citas.push(newCita)
    console.log(this.expedienteForm.controls.citas.value);



  }
  setDate(){
    let date_time = new Date(this.fecha_proximaCita).toLocaleTimeString()
    let date_date = new Date(this.fecha_proximaCita).toLocaleDateString()
    let deate_formated = `${date_date} - ${date_time}`
    return deate_formated

  }

  cancelCita(index:number){

        //Show confirm dialog for delete an item
        Swal.fire({
          title: '¿Desea cancelar la cita?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const formControlAsArray = this.expedienteForm.get('citas') as FormArray
            let oldValue = formControlAsArray.controls[index].value
            let newValue = this.fb.group({
              fecha: this.fb.control(oldValue.fecha),
              status: this.fb.control(false)
            })
            formControlAsArray.removeAt(index)
            formControlAsArray.insert(index,newValue)
            console.log(this.expedienteForm.controls.citas.value);
            this.expediente.citas[index].status = false
            Swal.fire('Cita Cancelada!', '', 'success')
          } else if (result.isDenied) {
          }
        })






  }

  confirmCita(index:number){

    //Show confirm dialog for delete an item
    Swal.fire({
      title: '¿Desea reactivar la cita?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const formControlAsArray = this.expedienteForm.get('citas') as FormArray
        let oldValue = formControlAsArray.controls[index].value
        let newValue = this.fb.group({
          fecha: this.fb.control(oldValue.fecha),
          status: this.fb.control(true)
        })
        formControlAsArray.removeAt(index)
        formControlAsArray.insert(index,newValue)
        console.log(this.expedienteForm.controls.citas.value);
        this.expediente.citas[index].status = true
        Swal.fire('Cita Confirmada!', '', 'success')
      } else if (result.isDenied) {
      }
    })






  }

  exportarNotaClinica(index:number){

    let nota_clinica = this.expediente.notas_clinicas[index]

    if ((!this.cambiosGuardados && this.haveBeenCreated_ClinicalNote) && ( nota_clinica == undefined) ) {
      this.showDialog('Debe guardar los camios para poder exportar a PDF','error')
      return
    }

    let nota_clinica_to_export = {
      paciente: `${this.expediente.paciente.nombre} ${this.expediente.paciente.apellido_paterno} ${this.expediente.paciente.apellido_materno}`,
      numero_de_nota: index+1,
      nota: nota_clinica.nota,
      fecha: nota_clinica.fecha
    }
    console.log(nota_clinica_to_export);

    this.exportarcionService.entrevistaClinicaPDF(nota_clinica_to_export)
  }

  hasError(controlName:string,typeError:string){
    return this.notaClinicaForm.get(controlName).hasError(typeError) && this.notaClinicaForm.get(controlName).touched
  }


  verNotaDetalle(index:number){
    this.routerService.navigate(['/admin/notas/detalle',this.expediente._id,index])
  }





  showDialog(title,icon){
    Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 2500
    })
  }


}
