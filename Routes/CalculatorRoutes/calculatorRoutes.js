const express = require("express");
const router = express.Router();

// Use JSON to parse the request bodies.
router.use(express.json());

// Only allows the post requests to follow through if both num1 and num2 are valid and num2 isn't 0 if division.
const CheckIfValidRequest = (url, num1, num2) => {
    // Check to see if they are both numbers.
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        // Something is wrong with the input given by the user.
        return 1;
    }

    // Check if it's division and if the denominator is 0
    if (url === "/division" && num2 === 0) {
        // The divider is set to 0 meaning it's not possible to divide.
        return 2;
    }
    
    return 0;
}

// Checks to see if the numbers are validated before allowing them to be processed
router.use((req, res, next) => {
    let { num1, num2 } = req.body;
    
    let isValid = CheckIfValidRequest(req.url, num1, num2);
    
    if (isValid === 0) {
        req.num1 = num1;
        req.num2 = num2;
        next();
    } 
    else if (isValid === 1) {
        res.status(422).json( { message: "The arguments provided were not numbers!" });
        return false;
    } 
    else if (isValid === 2) {
        res.status(422).json({ message: "The second number cannot be 0!"})
        return false;
    }
})


// Users can check multiplication between num1 and num2.
router.post('/multiplication', (req, res) => {
    res.json({ answer: (req.num1 * req.num2)});
})

// Users can check divide between num1 and num2.
router.post('/division', (req, res) => {
    res.json({ answer: (req.num1/req.num2)});
})

// Users can check addition between num1 and num2.
router.post('/addition', (req, res) => {
    res.json({ answer: (req.num1 + req.num2)});
})

// Users can check subtraction between num1 and num2.
router.post('/subtraction', (req, res) => {
    res.json({ answer: (req.num1 - req.num2)});
})

module.exports = router;