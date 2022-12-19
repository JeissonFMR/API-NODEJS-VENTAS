const { UsersService } = require('./services')
const createError = require('http-errors')
const { Response } = require('../common/response')
const debug = require('debug')('app:module-users-controller')

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll()
            Response.succes(res, 200, 'Lista de usuarios', users)
        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.succes(res, 200, `User ${id}`, user);
            }

        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await UsersService.create(body)
                Response.succes(res, 201, 'Usuario agregado', insertedId)
            }

        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let userDelete = await UsersService.deleteById(id);
            if (!userDelete) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.succes(res, 200, `Usuario ${id} eliminado`, userDelete);
            }

        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },
    updateU: async (req, res) => {
        try {
            const { body } = req;
            const name = body.nombre
            const apellido = body.apellido
            const correo = body.email
            const { params: { id } } = req;
            let product = await UsersService.updateById(id, name, apellido, correo)
            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.succes(res, 200, `Producto ${id} editado con exito`, product);
            }
        } catch (error) {
            debug(error)
            Response.error(res);
        }
    }

}