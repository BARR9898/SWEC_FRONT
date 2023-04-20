import { Citas } from "./citas"

export interface Expediente {
  paciente: {
    nombre: string | null,
    edad: string | null,
    sexo: 'M' | 'F' | string | null,
    apellido_paterno: string | null,
    apellido_materno: string | null,
    ocupacion: string | null,
    ingresos_mensuales: string | null,
    direccion: string | null
  },
  expediente: {
    motivo_de_consulta: string | null,
    circunstancias_de_aparicion: string | null,
    sintomas: JSON[] | any[],
    descripcion_fisica: string | null,
    demanda_de_tratamiento: string | null,
    area_escolar: string | null,
    area_laboral: string | null,
    acontecimientos_significativos: string | null,
    desarrollo_psicosexual: string | null,
    familiograma: string | null,
    area_de_relacion_y_familiar: string | null,
    mapeo_familiar: string | null,
    impresion_diagnostica_de_familia: string | null,
    hipotesis_familiar: string | null ,
    examen_mental: string | null,
    indicaciones_diagnosticas: string | null,
    impresiones_diagnosticas: JSON[] | any[],
    modalidad_terapeutica: JSON[] | any[]
    objetivo_terapeutico: string | null
    estrategias_terapeuticas: string | null
    pronostico_terapeutico: string | null,
    foco: string | null
  },
  expediente_id: any,
  citas:JSON[] | any[],
  notas_clinicas: JSON[] | any[],


}
