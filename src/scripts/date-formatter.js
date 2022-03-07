const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'review';
const reviewUT = require('../../src/models/review.schema')
const ReviewScript = {
    init: async () => {

        let bulkOps = [];
        // const cursor = await reviewUT.Review.find({ "reviewed_date": { "$exists": true, "$type": 2 } });
        const cursor = await reviewUT.Review.find({reviewed_date: {$not: {$type: 9}}});
        console.log('cursor...', cursor.length);
        cursor.forEach(async (doc, index)=> {
            doc.reviewed_date = new Date(doc.reviewed_date);
            console.log("a...", a);
            const a = await reviewUT.Review.save(doc);
            
            if(index ===  cursor.length -1){
                console.log('came inside..', index);
                return true;
            }  
            /*
            bulkOps.push(
                {
                    "updateOne": {
                        "filter": { "_id": doc._id },
                        "update": { "$set": { "reviewed_date": newDate } }
                    }
                }
            );

            if(index%100 === 0){
                console.log('came to end', index)
                await reviewUT.Review.bulkWrite(bulkOps);
                bulkOps = [];
            }

            if(index ===  cursor.length -1){
                console.log('came inside..', index);
            }       
            */     
        });

        

    }

}

module.exports = ReviewScript;