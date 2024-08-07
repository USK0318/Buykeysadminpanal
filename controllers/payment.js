const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: 'rzp_test_k08nI1XM4ua61t', // Replace with your key_id
    key_secret: 'cm2v1OSggPZ5vVHX5rl3jrq4' // Replace with your key_secret
})

async function createOrder(req, res) {
    const { amount, productId, productName } = req.body;
    
    // Log the request body for debugging
    console.log("Request body:", req.body); 

    const options = {
        amount: amount, // amount in smallest currency unit
        currency: "INR",
        receipt: `receipt#${productId}`, // use productId in the receipt for tracking
        payment_capture: 1 // 1 for automatic capture
    };

    console.log("Creating order with options:", options);
    
    try {
        const order = await instance.orders.create(options);
        console.log("Order created successfully:", order);

        // You can include the product information in the response if needed
        res.json({ order, productId, productName });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({ error: error.message });
    }
}



module.exports = {
    createOrder
};

