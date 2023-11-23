const { ObjectId } = require('mongodb')

class DatHangService {
    constructor(client) {
        this.DatHang = client.db().collection('DatHang');
    }

    extractConactData(payload) {
        const DatHang = {
            sodondh: payload.sodondh,
            mskh: payload.mskh,
            msnv: payload.msnv,
            ngaydh: payload.ngaydh,
            ngaygh: payload.ngaygh,
            trangthaihd: payload.trangthaihd,
        };


        return DatHang;
    }
    async create(payload) {
        const DatHang = this.extractConactData(payload);
        const result = await this.DatHang.findOneAndUpdate(
            DatHang,
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.DatHang.find(filter);
        return await cursor.toArray();
    }
    async findByMSKH(mskh) {
        return await this.find({
            mskh,
        });
    }

    async findById(id) {
        return await this.DatHang.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.DatHang.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.DatHang.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.DatHang.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DatHangService