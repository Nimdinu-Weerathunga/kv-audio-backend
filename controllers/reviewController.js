import Review from "../models/review.js";

export function addReview(req, res) {
    if(req.user == null) {
        res.status(401).json({message : "Please login and try again"});
        return;
    }
     // Get review data from request body
    const data = req.body; 

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    // Create a new Review instance
    const newReview = new Review(data); 

    newReview.save() // Save to the database
        .then(() => {
            res.json({message: "Review added successfully"});
        })
        .catch((error) => {
            res.status(500).json({error : "Review addition failed"});
        });
    
    
}

export async function getReviews(req, res) {
    const user = req.user;

    try {
        // if user is not admin, return only approved reviews
        if(user == null || user.role != "admin") {

            const reviews = await Review.find({isApproved: true});
            res.json(reviews);
           return;
        }
        if(user.role == "admin") {
            const reviews = await Review.find();
            res.json(reviews);
        }

    }catch (e) {
        res.status(500).json({error: "Failed to fetch reviews"});
    }
}

/* export function getReviews(req, res) {
    const user = req.user;
    if(user == null || user.role != "admin") {

        Review.find({isApproved: true})
        .then((reviews) => {
            res.json(reviews);
        }).catch((error) => {
            res.status(500).json({error: "Failed to fetch reviews"});
        });
       return;
    }
    if(user.role == "admin") {
        Review.find()
        .then((reviews) => {
            res.json(reviews);
        })
    }
} */

export function deleteReview(req, res) {
    const email = req.params.email;
    if(req.user == null) {
        res.status(401).json({message : "Please login and try again"});
        return;
    }
    if(req.user.role == "admin"){
        Review.deleteOne({email: email})
        .then(() => {
            res.json({message: "Review deleted successfully"});
        })
        .catch((error) => {
            res.status(500).json({error: "Review deletion failed"});
        });
        return
    }
    if(req.user.role == "customer" ){
        if(req.user.email == email){
            Review.deleteOne({email: email}).then(() => {
                res.json({message: "Review deleted successfully"});
            })
            .catch((error) => {
                res.status(500).json({error: "Review deletion failed"});
            });
            return;
        }else{
            res.status(403).json({message: "You are not authorized to perform this action"});
            return;
        }
    }

    
}

export function approveReview(req, res) {
    const email = req.params.email;
    if(req.user == null) {
        res.status(401).json({message : "Please login and try again"});
        return;
    }
    if(req.user.role == "admin"){
       Review.updateOne({email: email}, {isApproved: true})
       .then(() => {
           res.json({message: "Review approved successfully"});
       })
       .catch((error) => {
           res.status(500).json({error: "Review approval failed"});
       });
    }else{
        res.status(403).json({message: "You are not an admin."});
    }
}