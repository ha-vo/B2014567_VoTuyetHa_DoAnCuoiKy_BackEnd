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
            { $set: {} },
            { returnDocument: "after", upsert: true }
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

    async update(mskh, payload) {
        const update = this.extractConactData(payload);
        const filter = { mskh: mskh }
        const result = await this.KhachHang.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        console.log(result)
        return result;
    }

    async delete(mskh) {
        const filter = { mskh: mskh }
        const result = await this.KhachHang.findOneAndDelete(
            filter
        );
        console.log(mskh, filter)
        return result;
    }


    async deleteAll() {
        const result = await this.KhachHang.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = KhachHangService

