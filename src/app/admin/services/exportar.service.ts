import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExpedientesService } from './expedientes.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExportarService {

  _id:any;
  expediente:any

  constructor(
    private expedientesServices: ExpedientesService
  ){}

  public main(id:string){

      this.expedientesServices.obtenerExpediente(id)
        .subscribe((expedientGeted:any) => {
          this.expediente = expedientGeted.data
          console.log(this.expediente);
          this.createPDF()

        });
  }

  public crearEstructuraSintoma(sintomas){
    let sintomas_created= []
    sintomas.forEach((sintoma:any) => {
      sintomas_created.push(sintoma.sintoma)
    })
    return sintomas_created
  }

  public crearEstructuraImpresionesDiagnosticas(impresiones_diagnositcas){
    var estructure = [
      {
        table: {          
          layout: 'lightHorizontalLines',
          widths:[],
          heights:[],
          body:[
          ]
        }
      }
    ]


    impresiones_diagnositcas.forEach((impresion:any) => {

      let impresionesAux = []

      impresionesAux.push(impresion.eje)
      impresionesAux.push(impresion.dcm)
      impresionesAux.push(impresion.cie)
      impresionesAux.push(impresion.transtorno)

      estructure[0].table.body.push(impresionesAux)


    })

    var length_columns = estructure[0].table.body[0].length;
    var width_column = (100/length_columns)
    console.log('width_column',width_column);
    console.log('length_columns',length_columns);
    var widthToString = `${width_column.toString()}%`

    do {
      estructure[0].table.widths.push(widthToString)
      length_columns--
    } while (length_columns > 0);

    let length_rows = estructure[0].table.body.length * estructure[0].table.widths.length

    do {
      estructure[0].table.heights.push(20)
      length_rows--

    } while (length_rows > 0);


    console.log(estructure);


    return estructure



    /*
              //IMPRESIONES DIAGNOSTICAS
              [
                {
                  table:{
                    widths: ['20%','20%','20%','20%','20%','20%'],
                    heights: [20,30],
                    body:[
                      ['Eje','Código','DCM','CIE','Transtorno'],
                      impresiones_diagnosticas


                    ]
                  }
                }
              ],
    */
  }

  public crearEstructuraModalidadTerapeutica(modalidad_terapeutica){
    
    var estructure = [
      {
        table: {
          layout: 'lightHorizontalLines',
          widths:[],
          heights:[],
          body:[
            ['TI','TF','TP','TG','Otra','Fundamento']
          ]
        }
      }
    ]


    modalidad_terapeutica.forEach((modalidad:any,index) => {



      let modalidadesAux = []

      
      modalidadesAux.push(modalidad.ti == true  ? modalidad.ti = 'Si' : modalidad.ti = 'No')
      modalidadesAux.push(modalidad.tf == true  ? modalidad.tf = 'Si' : modalidad.tf = 'No')
      modalidadesAux.push(modalidad.tp == true  ? modalidad.tp = 'Si' : modalidad.tp = 'No')
      modalidadesAux.push(modalidad.tg == true  ? modalidad.tg = 'Si' : modalidad.tg = 'No')
      modalidadesAux.push(modalidad.otra == true  ? modalidad.otra = 'Si' : modalidad.otra = 'No')
      modalidadesAux.push(modalidad.fundamento)

      estructure[0].table.body.push(modalidadesAux)


    })

    var length_columns = estructure[0].table.body[0].length;
    var width_column = (100/length_columns)
    console.log('width_column',width_column);
    console.log('length_columns',length_columns);
    var widthToString = `${width_column.toString()}%`

    do {
      estructure[0].table.widths.push('*')
      length_columns--
    } while (length_columns > 0);

    let length_rows = estructure[0].table.body.length * estructure[0].table.widths.length

    do {
      estructure[0].table.heights.push(20)
      length_rows--

    } while (length_rows > 0);


    console.log(estructure);

    return estructure
    
  }

  public crearEstructuraSintomas(sintomas){
    var estructure = [
      {
        table: {
          layout: 'lightHorizontalLines',
          widths:['100%'],
          heights:[],
          body:[
          ]
        },
        margin: [ 0, 0, 0, 10 ]
      }
    ]

    let sintomas_length = sintomas.length
    let index = 0
    do {
      let sintomasAux = []
      sintomasAux.push(sintomas[index])
      sintomas_length--
      index++
      estructure[0].table.body.push(sintomasAux)



    } while (sintomas_length > 0);


    let length_rows = sintomas.length

    do {
      estructure[0].table.heights.push(20)
      length_rows--

    } while (length_rows > 0);


    return estructure
  }

  public obtenerSexo(sexo){

    if (sexo == 'M'){
      sexo = 'Masculino'
    }else if(sexo == 'F'){
      sexo = 'Femenino'
    }else{
      sexo = 'Otro'

    }

    return sexo
  }

  public createPDF(){

    
    let expediente = this.expediente
    
    console.log('expediente',expediente);
    
    let sintomas = this.crearEstructuraSintomas(expediente.expediente.sintomas)
    let impresiones_diagnosticas = this.crearEstructuraImpresionesDiagnosticas(expediente.expediente.impresiones_diagnosticas)
    let modalidad_terapeutica = this.crearEstructuraModalidadTerapeutica(expediente.expediente.modalidad_terapeutica)
    
    
    let fecha = moment(new Date()).format('YYYY-MM-DD h:mm:ss')
    let sexo = this.obtenerSexo(expediente.paciente.sexo)

    const pdfDefinition:any = {
      content:[
        {
          layout: 'lightHorizontalLines',
          table:{
            widths: ['100%','100%','100%'],
            heights:[30,30,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,15,30,20,30,15,30,15,30,15,30,15,30],
            body:[
              //Primer renglon
              [
                {
                  columns: [
                    {
                      width:'50%',
                      text:[{text:`N° Expediente: `,alignment:'left',bold:true},{text:`${expediente.expediente.id}`,alignment:'center'}]

                    },
                    {
                      width:'50%',
                      text:[{text:`Fecha Impresion: `,alignment:'left',bold:true},{text:`${fecha}`,alignment:'center'}]

                    }
                  ]

                }
              ],
              [
                {
                  columns:[
                    {
                      width:'50%',
                      text:[{text:`Nombre: `,style:['styleIndicator']},{text:`${expediente.paciente.nombre} ${expediente.paciente.apellido_paterno} ${expediente.paciente.apellido_materno}`,style:['styleContent']}]
                    },
                    {
                      width:'20%',
                      text:[{text:`Edad: `,style:['styleIndicator']},{text:`${expediente.paciente.edad}`,style:['styleContent']}]
                    },
                    {
                      width:'20%',
                      text:[{text:`Sexo: `,style:['styleIndicator']},{text:`${sexo}`,style:['styleContent']}]
                    }
                  ],
                  columnGap: 3,
                },
              ],
              //Segundo renglon
              [

                {
                  columns:[
                    {
                      width:'50%',
                      text:[{text:`Dirección: `,style:['styleIndicator']},{text:`${expediente.paciente.direccion}`,style:['styleContent']}],
                    },
                    {
                      width:'50%',
                      text:[{text:`Ocupación: `,style:['styleIndicator']},{text:`${expediente.paciente.ocupacion}`,style:['styleContent']}],
                    }
                  ],
                  columnGap: 3,
                }

              ],
              //Cuarto renglon
              [
                {
                  text:[{text:`Motivo de consulta`,style:['styleIndicatorLongContent']}]
                }
              ],
              //Quinto renglon
              [
                {
                  text:[{text:`${expediente.expediente.motivo_consulta}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]
                }
              ],
              //SEXTO RENGLON (CIRCUNSTANCIAS DE APARICION)
              [
                {
                  text:[{text:`Circunstancias De Apracición`,style:['styleIndicatorLongContent']}],
                }
              ],
              //SEPTIMO RENGLON (CIRCUNSTANCIAS DE APARICION)
              [
                {
                  text:[{text:`${expediente.expediente.circunstancias_aparicion}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              
              //OCTAVO renglon (SINTOMAS)
              [
                {
                  text:[{text:`Sintomas`,style:['styleIndicatorLongContent']}],
                }

              ],
              //NOVENO renglon (SINTOMAS)
              sintomas,
              
              //DECIMO REGNLON (DESCRIPCION FÍSICA)
              [
                {
                  text:[{text:`Descripción Física`,style:['styleIndicatorLongContent']}],
                }

              ],
              //DECIMO PRIMERO renglon (DESCRIPCION FÍSICA)
              [
                {
                  text:[{text:`${expediente.expediente.descripcion_fisica}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]


                }
              ],
              //DECIMO SEGUNDO RENGLON (DEMANDA DE TRATAMIENTO)
              [
                {
                  text:[{text:`Demanda De Tratamiento`,style:['styleIndicatorLongContent']}],
                }

              ],
              //DECIMO TERCERO renglon (DEMANDA DE TRATAMIENTO)
              [
                {
                  text:[{text:`${expediente.expediente.demanda_tratamiento}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]


                }
              ],
              //AREA ESCOLAR
              [
                {
                  text:[{text:`Área Escolar`,style:['styleIndicatorLongContent']}],
                }

              ],
              //ÁREA ESCOLAR
              [
                {
                  text:[{text:`${expediente.expediente.area_escolar}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //ACONTECIMIENTOS SIGNIFICATVIOS
              [
                {
                  text:[{text:`Acontecimientos Significativos`,style:['styleIndicatorLongContent']}],
                }

              ],
              //ACONTECIMIENTOS SIGNIFICATVIOS
              [
                {
                  text:[{text:`${expediente.expediente.acontecimientos_significativos}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //DESARROLLO PSICOSEXUAL
              [
                {
                  text:[{text:`Desarrollo Psicosexual`,style:['styleIndicatorLongContent']}],
                }

              ],
              //DESARROLLO PSICOSEXUAL
              [
                {
                  text:[{text:`${expediente.expediente.desarrollo_psicosexual}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //FAMILIOGRAMA
              [
                {
                  text:[{text:`Familiograma`,style:['styleIndicatorLongContent']}],
                }

              ],
              //FAMILIOGRAMA
              [
                {
                  text:[{text:`${expediente.expediente.familiograma}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //AREA FAMILIAR Y DE RELACION
              [
                {
                  text:[{text:`Área Familiar y De Relación`,style:['styleIndicatorLongContent']}],
                }

              ],
              //AREA FAMILIAR Y DE RELACION
              [
                {
                  text:[{text:`${expediente.expediente.area_familiar_relacion}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //MAPEO FAMILIAR
              [
                {
                  text:[{text:`Mapeo Familiar`,style:['styleIndicatorLongContent']}],
                }

              ],
              //MAPEO FAMILIAR
              [
                {
                  text:[{text:`${expediente.expediente.mapeo_familiar}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //IMPRESION DIAGNOSTICA DE LA FAMILIA
              [
                {
                  text:[{text:`Impresión Diagnóstica De La Familia`,style:['styleIndicatorLongContent']}],
                }

              ],
              //IMPRESION DIAGNOSTICA DE LA FAMILIA
              [
                {
                  text:[{text:`${expediente.expediente.impresiones_diagnosticas_familia}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //HIPOTESIS FAMILIAR
              [
                {
                  text:[{text:`Hipótesis Familiar`,style:['styleIndicatorLongContent']}],
                  margin: [0,20,0,10 ]

                }

              ],
              //HIPOTESIS FAMILIAR
              [
                {
                  text:[{text:`${expediente.expediente.hipotesis_familiar}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //EXAMEN MENTAL
              [
                {
                  text:[{text:`Exámen Mental`,style:['styleIndicatorLongContent']}],
                }

              ],
              //EXAMEN MENTAL
              [
                {
                  text:[{text:`${expediente.expediente.examen_mental}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              
              //INDICACIONES DIAGNOSTICAS
              [
                {
                  text:[{text:`Indicaciones Diagnósticas`,style:['styleIndicatorLongContent']}],
                }

              ],
              //INDICACIONES DIAGNOSTICAS
              [
                {
                  text:[{text:`${expediente.expediente.indicaciones_diagnosticas}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              
              //IMPRESIONES DIAGNOSTICAS
              [
                {
                  text:[{text:`Impresiones Diagnósticas`,style:['styleIndicatorLongContent']}],
                }
              ],
              //IMPRESIONES DIAGNOSTICAS
              impresiones_diagnosticas,
            
              //FOCO TERAPEUTICO
              [
                {
                  text:[{text:`Fóco Terapéutico`,style:['styleIndicatorLongContent']}],
                  margin: [0,10,0,0]
                }

              ],
              //FOCO TERAPÉTUCIO
              [
                {
                  text:[{text:`${expediente.expediente.foco_terapeutico}`,style:['styleLongContent']}],
                  margin: [0,0,0,10]
                }
              ],
             
              //MODALIDAD TERAPEUTICA
              [
                {
                  text:[{text:`Modalidad Terapéutica`,style:['styleIndicatorLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //MODALIDAD TERAPEUTICA
              [
                modalidad_terapeutica
              ],
              
              //OBJETIVO TERAPEUTICO
              [
                {
                  text:[{text:`Objetivo Terapéutico`,style:['styleIndicatorLongContent']}],
                }

              ],
              //OBJETIVO TERAPEUTICO
              [
                {
                  text:[{text:`${expediente.expediente.objetivo_terapeutico}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]

                }
              ],
              //ESTRATRGIAS TERAPEUTICAS
              [
                {
                  text:[{text:`Estratégias Terapéuticas`,style:['styleIndicatorLongContent']}],
                }

              ],
              //ESTRATEGIAS TERAPEUTICAS
              [
                {
                  text:[{text:`${expediente.expediente.estrategia_terapeutica}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]


                }
              ],
              //PRONOSTICO TERAPEUTICO
              [
                {
                  text:[{text:`Pronóstico Terapéutico`,style:['styleIndicatorLongContent']}],
                }

              ],
              //PRONOSTICO TERAPEUTICO
              [
                {
                  text:[{text:`${expediente.expediente.pronostico_terapeutico}`,style:['styleLongContent']}],
                  margin: [0,0,0,10 ]


                }
              ],

            ]
          }

        },

      ],
      styles:{
        styleIndicator:{
          fontSize:14,
          bold:true,
          alignment:'center'
        },
        styleContent:{
          fontSize:12,
          alignment:'center'
        },
        styleIndicatorLongContent:{
          fontSize:14,
          bold:true,
          alignment:'center'
        },
        styleLongContent:{
          fontSize:12,
          alignment:'justify'
        }
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open()
    pdf.download(`${expediente.paciente.nombre}-${expediente.paciente.apellido_materno}-${expediente.paciente.apellido_paterno}`)

  }

  public notaClinica(data){
    console.log('data recibida',data);
    
    const pdfDefinition:any = {
      content:[
        {
          layout:'noBorder',
          table:{
            widths: ['100%'],
            heights:[30,30,30],
            body:[
              [
                {
                  columns:[
                    {
                      width: '*',
                      text:[{text:`Nombre: `,style:['styleIndicator']},{text:`${data.paciente}: `,style:['styleContent']}],
                    },
                    {
                      width: '*',
                      text:[{text:`Creación: `,style:['styleIndicator']},{text:`${data.fecha}`,style:['styleContent']}]
                    },
                    {
                      width: '*',
                      text:[{text:`Número de nota: `,style:[{alignment:'center',bold:true,fontSize:14}]},{text:`${data.numero_de_nota}`,style:['styleContent']}]

                    }
                  ],

                }
              ],
              [
                {
                  text:[{text:`Nota Clínica `,style:['styleIndicatorLongContent']}],
                  margin: [ 5, 10, 5, 10 ]

                }
              ],
              [
                {
                  text:[{text:`${data.nota} `,style:['styleLongContent']}],
                  margin: [ 5, 10, 5, 10 ]

                }
              ],
              [
                {
                  text:[{text:`Fecha de impresión: `,style:[{alignment:'right',bold:true}]},{text:`${moment(new Date()).format('YYYY-MM-DD h:mm:ss')} `,style:[{alignment:'right'}]}],

                }
              ]
            ]
          }

        },

      ],
      styles:{
        styleIndicator:{
          fontSize:14,
          bold:true,
          alignment:'center'
        },
        styleContent:{
          fontSize:12,
          alignment:'center'
        },
        styleIndicatorLongContent:{
          fontSize:14,
          bold:true,
          alignment:'center'
        },
        styleLongContent:{
          fontSize:12,
          alignment:'justify'
        }
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open()
   //pdf.download(`${expediente.paciente.nombre}-${expediente.paciente.apellido_materno}-${expediente.paciente.apellido_paterno}`)

  }


}
