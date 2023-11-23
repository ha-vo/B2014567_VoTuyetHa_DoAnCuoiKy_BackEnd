const DatHangService = require("../services/DatHang.service.js")
const MongoDB = require("../utils/mongodb.utils")
const ApiError = require("../api-code.js")

exports.create = async (req, res, next) => {
    if (!req.body?.sodondh) {
        return next(new ApiError(400, ' sodondh cannot be empty'));
    }

    try {
        const datHangService = new DatHangService(MongoDB.client)
        const document = await datHangService.create(req.body)
        return res.send(document)
    }
    catch {
        return next(new ApiError(500, 'An error occurred while creating DatHang'));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const datHangService = new DatHangService(MongoDB.client)
        let mskh = req.query
        if (mskh) {
            try {
                documents = await datHangService.findByMSKH(mskh)
            } catch (err) { console.log(err); }

        } else {
            documents = await datHangService.find({})
        }
    }
    catch (err) {
        return next(new ApiError(500, 'An error occurred while retrieving DatHang'));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const datHangService = new DatHangService(MongoDB.client)
        const document = await datHangService.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'DatHang not found'));
        }
        res.send(document)
    } catch {
        return next(new ApiError(500, `Error retrieving DatHang at id= ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, "Data update can't be not empty"));
    }
    try {
        const datHangService = new DatHangService(MongoDB.client)
        const document = await datHangService.update(req.params.id, req.body)
        if (!document) {
            return next(new ApiError(404, 'DatHang not found'));
        }
        res.send({ "message": 'DatHang updated successfully' })
    } catch {
        return next(new ApiError(500, `Error retrieving while update`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const datHangService = new DatHangService(MongoDB.client)
        const document = await datHangService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'DatHang not found'));
        }
        res.send({ "message": "delete DatHang successfully" })
    } catch {
        return next(new ApiError(500, `Error retrieving DatHang at id= ${req.params.id}`));
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const datHangService = new DatHangService(MongoDB.client)
        const document = await datHangService.deleteAll()
        res.send({ "message": `deleted ${document} DatHang` })
    } catch {
        return next(new ApiError(500, 'An error occurred while deleting all DatHang'));
    }
}
