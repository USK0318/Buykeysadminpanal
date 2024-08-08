const Razorpay = require('razorpay');
const crypto = require('crypto');

const instance = new Razorpay({
    key_id: 'rzp_test_k08nI1XM4ua61t', // Replace with your key_id
    key_secret: 'cm2v1OSggPZ5vVHX5rl3jrq4' // Replace with your key_secret
})

async function createOrder(req, res) {
    const { amount, productId, productName } = req.body;
    
    console.log("Request body:", req.body); 

    const options = {
        amount: amount*100, // amount in smallest currency unit
        currency: "INR",
        receipt: `receipt#${productId}`, // use productId in the receipt for tracking
        payment_capture: 1 // 1 for automatic capture
    };

    console.log("Creating order with options:", options);
    
    try {
        const order = await instance.orders.create(options);
        console.log("Order created successfully:", order);

        res.json({ order, productId, productName });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({ error: error.message });
    }
}

async function verifyPayment(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        // console.log("Verifying payment with razorpay_order_id:", razorpay_order_id, "razorpay_payment_id:", razorpay_payment_id, "razorpay_signature:", razorpay_signature);

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === razorpay_signature) {
            res.status(200).send({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).send({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}

module.exports = {
    createOrder,
    verifyPayment
};

