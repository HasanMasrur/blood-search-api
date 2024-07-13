import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { Model, Types } from "mongoose";


export class Service<TDoc> {
    private DEFAULT_LIMIT = 10;
    private DEFAULT_PAGE = 1;

    constructor(private readonly model: Model<TDoc>) { }

    // create new
    protected async createOne(createDataDto: object) {
        const newData = new this.model(createDataDto);
        return await newData.save();
    }
    // create many
    protected async createMany(createDataDto: TDoc[]) {
        return await this.model.insertMany(createDataDto);
    }

    // find all documents by query
    protected async findAllByQuery(query: object) {
        return await this.model.find({ ...query, deletedAt: null });
    }

    // find one document
    protected async findOneById(id: Types.ObjectId) {
        return await this.model.findOne({ _id: id, deletedAt: null });
    }

    // find one document
    protected async findOneByQuery(query: object) {
        return await this.model.findOne({ ...query, deletedAt: null });
    }
    // update one document
    protected async updateById(id: Types.ObjectId, updateDataDto: object) {
        const data = await this.model.findByIdAndUpdate(id, updateDataDto, { new: true });
        if (!data) {
            throw new HttpException('Failed to update', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    // update one document by query
    protected async updateByQuery(query: object, updateDataDto: object) {
        const data = await this.model.findOneAndUpdate(query, updateDataDto, { new: true });
        return data;
    }

    // delete one by id
    protected async removeById(id: Types.ObjectId) {
        return await this.model.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() }, { new: true });
    }

    // delete by query
    protected async removeByQuery(query: object) {
        return await this.model.updateMany({ ...query, deletedAt: null }, { deletedAt: new Date() });
    }

    

}