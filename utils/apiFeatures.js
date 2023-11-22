class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        // 1) filtering
        const queryObj = { ...this.queryString }
        const exccludedField = ['page', 'sort', 'limit', 'fields'];
        exccludedField.forEach(el => delete queryObj[el])
        // const query = Tour.find(queryObj);
        // console.log(req.query);

        // 2) advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));
        // { duration: { $gte: '5' }, difficulty: 'easy' }

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        // 3) Sorting
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            // console.log(sortBy)
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        // 4) field limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    pagination() {
        // 5) pagination
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        //page=3&limit-10, 1-10, page 1, 11-20, page 2, 21-30 page 3
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

module.exports = APIFeatures;