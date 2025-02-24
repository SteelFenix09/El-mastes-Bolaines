import * as yup from 'yup';
export function initialValues() {
    return {
        nombre: '',
        precio: '',
        cantidad: '',
        unidad: '',
        imagen: ''
    }
}

export function validationSchema() {
    return yup.object({
        nombre: yup.string().required(true),
        precio: yup.number().required(true),
        cantidad: yup.number().required(true),
        unidad: yup.string().required(true),
        imagen: yup.string().required()
    })}