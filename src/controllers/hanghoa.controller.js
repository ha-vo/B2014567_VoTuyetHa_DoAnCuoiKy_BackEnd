const HangHoaService = require("../services/HangHoa.service.js")
const MongoDB = require("../utils/mongodb.utils")
const ApiError = require("../api-code.js")

exports.create = async (req, res, next) => {
    if (!req.body?.mshh) {
        return next(new ApiError(400, ' mshh cannot be empty'));
    }

    try {
        const hangHoaService = new HangHoaService(MongoDB.client)
        const document = await hangHoaService.create(req.body)
        return res.send(document)
    }
    catch {
        return next(new ApiError(500, 'An error occurred while creating HangHoa'));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const hangHoaService = new HangHoaService(MongoDB.client)
        let mskh = req.query
        if (mskh) {
            try {
                documents = await hangHoaService.findByMSKH(mskh)
            } catch (err) { console.log(err); }

        } else {
            documents = await hangHoaService.find({})
        }
    }
    catch (err) {
        return next(new ApiError(500, 'An error occurred while retrieving HangHoa'));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const hangHoaService = new HangHoaService(MongoDB.client)
        const document = await hangHoaService.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'HangHoa not found'));
        }
        res.send(document)
    } catch {
        return next(new ApiError(500, `Error retrieving HangHoa at id= ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new ApiError(400, "Data update can't be not empty"));
    }
    try {
        const hangHoaService = new HangHoaService(MongoDB.client)
        const document = await hangHoaService.update(req.params.id, req.body)
        if (!document) {
            return next(new ApiError(404, 'HangHoa not found'));
        }
        res.send({ "message": 'HangHoa updated successfully' })
    } catch {
        return next(new ApiError(500, `Error retrieving while update`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const hangHoaService = new HangHoaService(MongoDB.client)
        const document = await hangHoaService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'HangHoa not found'));
        }
        res.send({ "message": "delete HangHoa successfully" })
    } catch {
        return next(new ApiError(500, `Error retrieving HangHoa at id= ${req.params.id}`));
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const hangHoaService = new HangHoaService(MongoDB.client)
        const document = await hangHoaService.deleteAll()
        res.send({ "message": `deleted ${document} HangHoa` })
    } catch {
        return next(new ApiError(500, 'An error occurred while deleting all HangHoa'));
    }
}
