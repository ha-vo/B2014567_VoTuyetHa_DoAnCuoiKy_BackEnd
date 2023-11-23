const { ObjectId } = require('mongodb')

class HangHoaService {
    constructor(client) {
        this.HangHoa = client.db().collection('HangHoa');
    }

    extractConactData(payload) {
        const HangHoa = {
            mshh: payload.mshh,
            tenhh: payload.tenhh,
            motahh: payload.motahh,
            gia: payload.gia,
            soluonghang: payload.soluonghang,
            ghichu: payload.ghichu,
        };


        return HangHoa;
    }
    async create(payload) {
        const HangHoa = this.extractConactData(payload);
        const result = await this.HangHoa.findOneAndUpdate(
            HangHoa,
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.HangHoa.find(filter);
        return await cursor.toArray();
    }
    async findByPrimaryKey(mshh) {
        return await this.find({
            mshh,
        });
    }

    async findById(id) {
        return await this.HangHoa.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.HangHoa.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.HangHoa.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.HangHoa.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = HangHoaService