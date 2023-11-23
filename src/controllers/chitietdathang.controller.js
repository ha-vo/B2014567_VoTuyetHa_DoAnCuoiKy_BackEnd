const ChiTietDatHang = require("../services/ChiTietDatHang.service.js")
const MongoDB = require("../utils/mongodb.utils")
const ApiError = require("../api-code.js")

exports.create = async (req, res, next) => {
    if (!req.body?.sodondh) {
        return next(new ApiError(400, ' sodondh cannot be empty'));
    }

    try {
        const chiTietDatHang = new ChiTietDatHang(MongoDB.client)
        const document = await chiTietDatHang.create(req.body)
        return res.send(document)
    }
    catch {
        return next(new ApiError(500, 'An error occurred while creating ChitietDatHang'));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const chiTietDatHang = new ChiTietDatHang(MongoDB.client)
        documents = await chiTietDatHang.find({})
    }
    catch (err) {
        return next(new ApiError(500, 'An error occurred while retrieving ChitietDatHang'));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const chiTietDatHang = new ChiTietDatHang(MongoDB.client)
        const document = await chiTietDatHang.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'ChitietDatHang not found'));
        }
        res.send(document)
    } catch {
        return next(new ApiError(500, `Error retrieving ChitietDatHang at id= ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, "Data update can't be not empty"));
    }
    try {
        const chiTietDatHang = new ChiTietDatHang(MongoDB.client)
        const document = await chiTietDatHang.update(req.params.id, req.body)
        if (!document) {
            return next(new ApiError(404, 'ChitietDatHang not found'));
        }
        res.send({ "message": 'ChitietDatHang updated successfully' })
    } catch {
        return next(new ApiError(500, `Error retrieving while update`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const chiTietDatHang = new ChiTietDatHang(MongoDB.client)
        const document = await chiTietDatHang.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'ChitietDatHang not found'));
        }
        res.send({ "message": "delete ChitietDatHang successfully" })
    } catch {
        return next(new ApiError(500, `Error retrieving ChitietDatHang at id= ${req.params.id}`));
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const chiTietDatHang = new ChiTietDatHang(MongoDB.client)
        const document = await chiTietDatHang.deleteAll()
        res.send({ "message": `deleted ${document} DatHang` })
    } catch {
        return next(new ApiError(500, 'An error occurred while deleting all ChitietDatHang'));
    }
}
