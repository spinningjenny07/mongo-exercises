/* jslint esversion:6 */
module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?

	//1. Look through movie database and find any movie with LOR title
	Movie.find({title: /The Lord of the Rings/}, (err, data) =>{
        //console.log(data);
        var movieArr = [];
        // [8,11,15]
        for(var i in data) {
            movieArr.push(data[i]._id);
            console.log(movieArr);
        } 
        


        Checkout.find(
             {
                 $or:[
                {movieId:{"$in":movieArr}}
                ]
             }
         )
         .distinct("userId",
            (err, data)=> {
                console.log("The following users have checked out an LOR movie: " + data);        
            });

        });
    };
