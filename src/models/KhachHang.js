const { ObjectId } = require('mongodb')

class KhachHangService {
    constructor(client) {
        this.KhachHang = client.db().collection('KhachHang');
    }

    extractConactData(payload) {
        const khachhang = {
            mskh: payload.mskh,
            hotenkh: payload.hotenkh,
            address: payload.address,
            password: payload.password,
            std: payload.std,
        };


        return khachhang;
    }
    async create(payload) {
        const khachhang = this.extractConactData(payload);
        const result = await this.KhachHang.findOneAndUpdate(
            khachhang,
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.KhachHang.find(filter);
        return await cursor.toArray();
    }
    async findByPrimaryKey(mskh) {
        return await this.find({
            mskh,
        });
    }

    async findById(id) {
        return await this.KhachHang.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.KhachHang.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.KhachHang.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.KhachHang.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = KhachHangService

