const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  // Updated the code here
    res.send(JSON.stringify(friends,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get('/:email',function (req, res) {
  // Updated the code here
	const email = req.params.email;
	res.send(friends[email])
});


// POST request: Add a new friend
  // Updated the code here
router.post("/",function (req,res){
    if (req.body.email){
        friends[req.body.email] = {
            "firstName":req.body.firstName,
             "lastName":req.body.lastName,  // Updated the code here
             "DOB":req.body.DOB,  // Updated the code here
            }
    }
res.send("The user" + (' ')+ (req.body.firstName) + " Has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", function (req, res) {
    const email = req.params.email;
    let friend = friends[email]
    if (friend) { //Check is friend exists
        let DOB = req.body.DOB;
        let firstName = req.body.firstName;//Added similarly for firstName
        let lastName = req.body.lastName;//Added similarly for lastName

        //if DOB the DOB has been changed, update the DOB 
        if(DOB) {
            friend["DOB"] = DOB
        }
        //Added similarly for firstName
		if(firstName) {
            friend["firstName"] = firstName
        }
        //Added similarly for lastName
		if(lastName) {
            friend["lastName"] = lastName
        }
		
        friends[email]=friend;
        res.send(`Friend with the email  ${email} updated.`);
    }
    else{
        res.send("Unable to find friend!");
    }
  });


// DELETE request: Delete a friend by email id
  router.delete("/:email", (req, res) => {
    const email = req.params.email;
    if (email){
        delete friends[email]
    }
    res.send(`Friend with the email  ${email} deleted.`);
  });
module.exports=router;
