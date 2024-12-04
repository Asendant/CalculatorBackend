const express = require('express');
const app = express();
const calculatorRoutes = require('./Routes/CalculatorRoutes/calculatorRoutes');
const PORT = 3000;

// Use the routes that are in the calculatorRoutes file.
app.use('/calculator', calculatorRoutes);

// Handle any pages that are not in the routes.
app.use((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(404).json({ message: "Route not found!"})
})

// Any server errors can be processed and logged here. All errors before this part of the stack still flow through this middleware function.
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ message: err.message });
})

// Start up the HTTP server.
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
