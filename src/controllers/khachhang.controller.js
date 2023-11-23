const KhachHangService = require("../services/KhachHang.service.js")
const MongoDB = require("../utils/mongodb.utils.js")
const ApiError = require("../api-code.js")

exports.create = async (req, res, next) => {
    if (!req.body?.mskh) {
        return next(new ApiError(400, ' mskh cannot be empty'));
    }
    try {
        const khachHangService = new KhachHangService(MongoDB.client)
        const document = await khachHangService.create(req.body)
        return res.send(document)
    }
    catch (e) {
        console.log(e)
        return next(new ApiError(500, e));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const khachHangService = new KhachHangService(MongoDB.client)
        let mskh = req.query
        if (mskh === true) {
            try {
                documents = await khachHangService.findByPrimaryKey(mskh)
            } catch (err) { console.log(err); }

        } else {
            try {
                documents = await khachHangService.find({})
            } catch (e) {
                console.log(e)
            }
        }
    }
    catch (err) {
        print(err)
        return next(new ApiError(500, 'An error occurred while retrieving contact'));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const khachHangService = new KhachHangService(MongoDB.client)
        const document = await khachHangService.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'KhachHang not found'));
        }
        res.send(document)
    } catch {
        return next(new ApiError(500, `Error retrieving contact at id= ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, "Data update can't be not empty"));
    }
    try {
        const khachHangService = new KhachHangService(MongoDB.client)
        const document = await khachHangService.update(req.params.id, req.body)
        console.log(document)
        if (!document) {
            return next(new ApiError(404, 'KhachHang not found'));
        }
        res.send({ "message": 'KhachHang updated successfully' })
    } catch (e) {
        console.log
        return next(new ApiError(500, `Error retrieving while update`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const khachHangService = new KhachHangService(MongoDB.client)
        const document = await khachHangService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        res.send({ "message": "delete contact successfully" })
    } catch {
        return next(new ApiError(500, `Error retrieving contact at id= ${req.params.id}`));
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const khachHangService = new KhachHangService(MongoDB.client)
        const document = await khachHangService.deleteAll()
        res.send({ "message": `deleted ${document} contact` })
    } catch {
        return next(new ApiError(500, 'An error occurred while deleting all contacts'));
    }
}
