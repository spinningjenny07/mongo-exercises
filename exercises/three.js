/*jslint esversion:6*/

module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?
	Checkout.aggregate ([
			{$group: 
				{
				_id: "$movieId",
				"count": {$sum: 1}
			},
		},
			{$sort: {"count": -1} //highest to lowest
		},
		{$limit: 1}],
		(err, data) => {
			var movieNum = data[0]._id;

			console.log("Movie #" + movieNum + " had the most checkouts.");
			
			Movie.findOne({_id: movieNum},
        
            (err, data)=> {
                console.log(data.title + " has the most checkouts.");
            
            });
	});
};
