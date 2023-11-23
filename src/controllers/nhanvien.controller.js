const NhanVienService = require("../services/NhanVien.service.js")
const MongoDB = require("../utils/mongodb.utils")
const ApiError = require("../api-code.js")

exports.create = async (req, res, next) => {
    if (!req.body?.msnv) {
        return next(new ApiError(400, ' msnv cannot be empty'));
    }

    try {
        const nhanVienService = new NhanVienService(MongoDB.client)
        const document = await nhanVienService.create(req.body)
        return res.send(document)
    }
    catch {
        return next(new ApiError(500, 'An error occurred while creating th NhanVien'));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const nhanVienService = new NhanVienService(MongoDB.client)
        let hotennv = req.query
        if (hotennv === true) {
            try {
                documents = await nhanVienService.findByName(hotennv)
            } catch (err) { console.log(err); }

        } else {
            documents = await nhanVienService.find({})
        }
    }
    catch (err) {
        return next(new ApiError(500, 'An error occurred while retrieving NhanVien'));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client)
        const document = await nhanVienService.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'NhanVien not found'));
        }
        res.send(document)
    } catch {
        return next(new ApiError(500, `Error retrieving NhanVien at id= ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, "Data update can't be not empty"));
    }
    try {
        const nhanVienService = new NhanVienService(MongoDB.client)
        const document = await nhanVienService.update(req.params.id, req.body)
        if (!document) {
            return next(new ApiError(404, 'NhanVien not found'));
        }
        res.send({ "message": 'NhanVien updated successfully' })
    } catch {
        return next(new ApiError(500, `Error retrieving while update`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client)
        const document = await nhanVienService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'NhanVien not found'));
        }
        res.send({ "message": "delete NhanVien successfully" })
    } catch {
        return next(new ApiError(500, `Error retrieving NhanVien at id= ${req.params.id}`));
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client)
        const document = await nhanVienService.deleteAll()
        res.send({ "message": `deleted ${document} NhanVien` })
    } catch {
        return next(new ApiError(500, 'An error occurred while deleting all NhanVien'));
    }
}
