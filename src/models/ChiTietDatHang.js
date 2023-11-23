const { ObjectId } = require('mongodb')

class ChiTietDatHangService {
    constructor(client) {
        this.ChiTietDatHang = client.db().collection('ChiTietDatHang');
    }

    extractConactData(payload) {
        const ChiTietDatHang = {
            sodondh: payload.sodondh,
            mshh: payload.mshh,
            soluong: payload.soluong,
            giadathang: payload.giadathang,
            giamgia: payload.giamgia,
        };


        return ChiTietDatHang;
    }
    async create(payload) {
        const ChiTietDatHang = this.extractConactData(payload);
        const result = await this.ChiTietDatHang.findOneAndUpdate(
            ChiTietDatHang,
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.ChiTietDatHang.find(filter);
        return await cursor.toArray();
    }
    async findByPrimaryKey(sodondh) {
        return await this.find({
            sodondh,
        });
    }

    async findById(id) {
        return await this.ChiTietDatHang.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.ChiTietDatHang.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.ChiTietDatHang.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.ChiTietDatHang.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ChiTietDatHangService