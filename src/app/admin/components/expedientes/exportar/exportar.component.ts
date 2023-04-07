import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { ExpedientesService } from 'src/app/admin/services/expedientes.service';
import { ActivatedRoute,Router,Params } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent implements OnInit {


  _id:any;
  expediente:any

  constructor(
    private activatedRoute: ActivatedRoute,
    private expedientesServices: ExpedientesService,
    private routerService: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this._id = this.activatedRoute.snapshot.paramMap.get('id')
      console.log(this._id)
      this.expedientesServices.obtenerExpediente(this._id)
        .subscribe(expedientGeted => {
          this.expediente = expedientGeted
          console.log(this.expediente);

          this.test()

        });
    });
  }



  public test(){
    let expediente = this.expediente
    let acualSintoma;
    let sintomas_estructurados = this.crearEstructuraSintoma(expediente.expediente.sintomas)
    const pdfDefinition:any = {
      content:[
        {
          layout:'noBorders',
          table:{
            widths: ['100%','100%','100%'],
            heights:[30,30,30],
            body:[
              //Primer renglon
              [
                {
                  columns:[
                    {
                      width:'33%',
                      text:[{text:`Nombre: `,style:['styleIndicator']},{text:`${expediente.paciente.nombre}`,style:['styleContent']}]
                    },
                    {
                      width:'33%',
                      text:[{text:`Edad: `,style:['styleIndicator']},{text:`${expediente.paciente.edad}`,style:['styleContent']}]
                    },
                    {
                      width:'33%',
                      text:[{text:`Sexo: `,style:['styleIndicator']},{text:`${expediente.paciente.sexo}`,style:['styleContent']}]
                    }
                  ],
                  columnGap: 6,
                },
              ],
              //Segundo renglon
              [
                {
                  text:[{text:`Dirección: `,style:['styleIndicator']},{text:`${expediente.paciente.direccion}`,style:['styleContent']}],
                },
              ],
              //Tercer renglon
              [
                {
                  text:[{text:`Ocupación: `,style:['styleIndicator']},{text:`${expediente.paciente.ocupacion}`,style:['styleContent']}],
                }
              ],
              //Cuarto renglon
              [
                {
                  text:[{text:`Motivo de consulta`,style:['styleIndicatorLongContent']}],
                }
              ],
              //Quinto renglon
              [
                {
                  text:[{text:`${expediente.expediente.motivo_de_consulta}`,style:['styleLongContent']}]

                }
              ],
              //Sexto renglon (SINTOMAS)
              [
                {
                  layout:'noBorders',
                  table:{
                    widths: ['30%','30%','30%'],
                    heights:[15,15,15],
                    body:[
                      [
                        {
                          text:[{text:'Sintomas',style:['styleIndicatorLongContent']}]
                        }
                      ],


                    ]
                  }
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
          fontSize:14,
          alignment:'center'
        },
        styleIndicatorLongContent:{
          fontSize:14,
          bold:true,
          alignment:'center'
        },
        styleLongContent:{
          fontSize:14,
          alignment:'justify'
        }
      }

    }

    pdfDefinition.cre

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open()

  }

  public crearEstructuraSintoma(sintomas){
    let sintomas_created= []
    sintomas.forEach((sintoma:any) => {
      let sintoma_aux =  sintoma.sintoma
      let newSintoma = {
        text:[{text:`${sintoma_aux}`}]
      }
      sintomas_created.push(newSintoma)
    })
    console.log(sintomas_created);

    return sintomas_created
  }

  public getSintoma(index:number){


  }




}
