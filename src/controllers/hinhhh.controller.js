const HinhHHService = require("../services/HinhHH.service.js")
const MongoDB = require("../utils/mongodb.utils")
const ApiError = require("../api-code.js")

exports.create = async (req, res, next) => {
    if (!req.body?.mahinh) {
        return next(new ApiError(400, ' mahinh cannot be empty'));
    }

    try {
        const hinhHH = new HinhHHService(MongoDB.client)
        const document = await hinhHH.create(req.body)
        return res.send(document)
    }
    catch {
        return next(new ApiError(500, 'An error occurred while creating hinhHH'));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const hinhHH = new HinhHHService(MongoDB.client)
        documents = await hinhHH.find({})
    }
    catch (err) {
        return next(new ApiError(500, 'An error occurred while retrieving hinhHH'));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const hinhHH = new HinhHHService(MongoDB.client)
        const document = await hinhHH.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'hinhHH not found'));
        }
        res.send(document)
    } catch {
        return next(new ApiError(500, `Error retrieving hinhHH at id= ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, "Data update can't be not empty"));
    }
    try {
        const hinhHH = new HinhHHService(MongoDB.client)
        const document = await hinhHH.update(req.params.id, req.body)
        if (!document) {
            return next(new ApiError(404, 'hinhHH not found'));
        }
        res.send({ "message": 'hinhHH updated successfully' })
    } catch {
        return next(new ApiError(500, `Error retrieving while update`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const hinhHH = new HinhHHService(MongoDB.client)
        const document = await hinhHH.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'hinhHH not found'));
        }
        res.send({ "message": "delete hinhHH successfully" })
    } catch {
        return next(new ApiError(500, `Error retrieving hinhHH at id= ${req.params.id}`));
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const hinhHH = new HinhHHService(MongoDB.client)
        const document = await hinhHH.deleteAll()
        res.send({ "message": `deleted ${document} HangHoa` })
    } catch {
        return next(new ApiError(500, 'An error occurred while deleting all hinhHH'));
    }
}
