const { ObjectId } = require('mongodb')

class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection('NhanVien');
    }

    extractConactData(payload) {
        const NhanVien = {
            msnv: payload.msnv,
            hotennv: payload.hotennv,
            address: payload.address,
            password: payload.password,
            chucvu: payload.chucvu,
        };


        return NhanVien;
    }
    async create(payload) {
        const NhanVien = this.extractConactData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            NhanVien,
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }
    async findByPrimaryKey(msnv) {
        return await this.find({
            msnv,
        });
    }

    async findById(id) {
        return await this.NhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.NhanVien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.NhanVien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanVienService