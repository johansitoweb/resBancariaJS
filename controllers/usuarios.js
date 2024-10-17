const {response, request} = require ('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');

//guardar datos db
const usuariosPost = async (req, res = response) => {

    const {apellido, nombre, email, dni, nroAfiliado, password, role } = req.body;
    const usuario = new Usuario({apellido, nombre, email, dni, nroAfiliado, password, role});

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar en bd
    await usuario.save();
    res.json({
        msg:'post API - controller',
        usuario
    });
}

//Actualizar Usuario
const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    //const {DATOS EXCLUIDOS... EL RESTO QUEDA INCLUIDO EN LA VARIABLE }
    const {_id, password, google, email, ... restoInfo} = req.body;

    //validar contra DB
    if(password)
    {
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        restoInfo.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, restoInfo);


    res.json({
        msg: `El usuario se actualizo correctamente... `,
        usuario
    });
}



const usuariosGet = async(req = request, res = response) => {

    const {limite=5, desde = 0} = req.query;
    const query = {estado: false};
    /*const usuarios = await Usuario.find({estado: true})
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments({estado:true}); */
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}








const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    //borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: true});

    res.json(
        usuario
    );
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}