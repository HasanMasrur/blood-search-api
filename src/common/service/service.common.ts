import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import mongoose, { Model, Types } from "mongoose";
import { IPaginate } from "../dto/common.dto";


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

     // find by paginate
  protected async findByPaginate(
    query: object = {},
    paginate?: IPaginate,
    lookupStages: any[] = [],
  ) {
    const page = Math.abs(Number(paginate?.page || 0) || this.DEFAULT_PAGE);
    const limit = Math.abs(Number(paginate?.limit || 0) || this.DEFAULT_LIMIT);

    if (query['_id']) {
      query['_id'] = new mongoose.Types.ObjectId(query['_id']);
    }

    const data = await this.model.aggregate([
      {
        $match: { ...query, deleted_at: null },
      },
      {
        $facet: {
          page: [
            {
              $count: 'totalIndex',
            },
            {
              $addFields: {
                totalPage: { $ceil: { $divide: ['$totalIndex', limit] } },
                currentPage: page,
                nextPage: {
                  $cond: {
                    if: { $gt: ['$totalPage', page] },
                    then: page + 1,
                    else: null,
                  },
                },
                previousPage: {
                  $cond: { if: { $gt: [page, 1] }, then: page - 1, else: null },
                },
                startingIndex: limit * (page - 1) + 1,
                endingIndex: limit * page,
                itemsOnCurrentPage: {
                  $cond: {
                    if: { $gte: [limit, '$totalIndex'] },
                    then: '$totalIndex',
                    else: limit,
                  },
                },
                limit: limit,
                sortBy: 'created_at',
                sortOrder: -1,
              },
            },
          ],
          data: [
            {
              $sort: {
                created_at: -1,
              },
            },
            {
              $skip: limit * (page - 1),
            },
            {
              $limit: limit,
            },
            ...lookupStages,
          ],
        },
      },
    ]);

    return {
      page: data?.[0]?.page?.[0],
      data: data?.[0]?.data,
    };
  
  
  }
  protected async findByPaginateNear(
    query: object = {},
    paginate?: IPaginate,
    lookupStages: any[] = [],
  ) {
    const page = Math.abs(Number(paginate?.page || 0) || this.DEFAULT_PAGE);
    const limit = Math.abs(Number(paginate?.limit || 0) || this.DEFAULT_LIMIT);

    if (query['_id']) {
      query['_id'] = new mongoose.Types.ObjectId(query['_id']);
    }
console.log(query);
    const data = await this.model.aggregate([
{
  $geoNear: {
    near: { type: "Point", coordinates: [query['lng'], query['lat']] },
    distanceField: "dist.calculated",
    maxDistance: 100,  // Specify max distance (in meters)
    spherical: true
  }
},
      // {
      //   $match: { ...query, deleted_at: null },
      // },
      {
        $facet: {
          page: [
            {
              $count: 'totalIndex',
            },
            {
              $addFields: {
                totalPage: { $ceil: { $divide: ['$totalIndex', limit] } },
                currentPage: page,
                nextPage: {
                  $cond: {
                    if: { $gt: ['$totalPage', page] },
                    then: page + 1,
                    else: null,
                  },
                },
                previousPage: {
                  $cond: { if: { $gt: [page, 1] }, then: page - 1, else: null },
                },
                startingIndex: limit * (page - 1) + 1,
                endingIndex: limit * page,
                itemsOnCurrentPage: {
                  $cond: {
                    if: { $gte: [limit, '$totalIndex'] },
                    then: '$totalIndex',
                    else: limit,
                  },
                },
                limit: limit,
                sortBy: 'created_at',
                sortOrder: -1,
              },
            },
          ],
          data: [
            {
              $sort: {
                created_at: -1,
              },
            },
            {
              $skip: limit * (page - 1),
            },
            {
              $limit: limit,
            },
            ...lookupStages,
          ],
        },
      },
    ]);

    return {
      page: data?.[0]?.page?.[0],
      data: data?.[0]?.data,
    };
  
  
  }
}