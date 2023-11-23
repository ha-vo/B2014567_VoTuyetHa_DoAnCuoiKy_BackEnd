const { ObjectId } = require('mongodb')

class HinhHHService {
    constructor(client) {
        this.HinhHH = client.db().collection('HinhHH');
    }

    extractConactData(payload) {
        const HinhHH = {
            mahinh: payload.mahinh,
            tenhinh: payload.tenhinh,
            mshh: payload.mshh,
        };


        return HinhHH;
    }
    async create(payload) {
        const HinhHH = this.extractConactData(payload);
        const result = await this.HinhHH.findOneAndUpdate(
            HinhHH,
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.HinhHH.find(filter);
        return await cursor.toArray();
    }
    async findByPrimaryKey(mahinh) {
        return await this.find({
            mahinh,
        });
    }

    async findById(id) {
        return await this.HinhHH.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.HinhHH.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.HinhHH.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.HinhHH.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = HinhHHService