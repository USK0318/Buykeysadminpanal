const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: 'rzp_test_k08nI1XM4ua61t', // Replace with your key_id
    key_secret: 'cm2v1OSggPZ5vVHX5rl3jrq4' // Replace with your key_secret
});

const createOrder = async (req, res) => {
    const options = {

        amount: 500, // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1 // 1 for automatic capture
    };

    console.log("Creating order with options:", options);
    
    try {
        const order = await instance.orders.create(options);
        console.log("Order created successfully:", order);
        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createOrder
};

