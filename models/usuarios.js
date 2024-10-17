/* {

    "apellido": "Chaldu",
    "nombre": "Gabriel",
    "email": "gabriel@test.com",
    "dni": 22555555,
    "nroAfiliado": 123,
    "password": "123",
    "img": "",
    "role": "ADMIN_ROLE"
} */

const {Schema, model} = require ('mongoose');

const UsuarioSchema = Schema({
    apellido: {
        type: String,
        required: [true, 'El campo es requerido'],
    },
    nombre: {
        type: String,
        required: [true, 'El campo es requerido'],
    },
    email: {
        type: String,
        required: [true, 'El campo es requerido'],
        unique: true
    },
    dni: {
        type: Number,
        required: [true, 'El campo es requerido'],
        unique:true
    },
    nroAfiliado: {
        type: Number,
        required: [true, 'El campo es requerido'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'El campo es requerido'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El campo role es requerido'],
        //enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: false,
    },
    google: {
        type: Boolean,
        default: false,
    },

});

//esta funcion extrae del json que muestra por consola a __v y el password encriptado
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}
module.exports = model('Usuario', UsuarioSchema);
