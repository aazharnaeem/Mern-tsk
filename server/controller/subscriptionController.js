const { user } = require("../model");

const stripe = require("stripe")(process.env.stripeSecretKey);

//create user subscriptions
exports.createStripeSession = async (req, res, next) => {
    try {
        const { userId, priceId } = req.body;
        const exUser = await user.findById(userId);
        if (!exUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],

            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            subscription_data: {
                trial_period_days: 5,
            },
            customer: exUser.stripeCustomerId,
            success_url: "http://localhost:3000/home",
            cancel_url: "http://localhost:3000/PaymentError",
        });
        return res.status(200).json({ sucess:true,session});
    } catch (error) {
        return res.status(500).send({ sucess:false, message: error });
    }
};



//cancel subscription
exports.cancelSubscription = async (req, res) => {
    try {
        const subscriptionId = req.body.subscriptionId;

        await stripe.subscriptions.del(subscriptionId);
        return res
            .status(200)
            .json({ sucess:true, message: "Subscription cancelled successfully." });
    } catch (error) {
        return res.status(500).json({  sucess:false,error: error.message });
    }
};



//get user subscriptions
exports.getUserSubscriptions = async (req, res) => {
    try {
        const { userId } = req.params;
        const exUser = await user.findById(userId);
        if (!exUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const subscriptions = await stripe.subscriptions.list({
            customer: exUser.stripeCustomerId, // Assuming userStripeId is the correct field
            limit: 10,
        });

        return res.status(200).json({ success: true, subscriptions });
    } catch (err) {
        res.status(500).json({ sucess:false, err})
    }
};


//Get all products
exports.getProducts = async (req, res) => {
    try {
        const { data: products } = await stripe.products.list(
            { active: true }
        )

        const { data: prices } = await stripe.prices.list(
            { active: true }
        )

        let formulatedData = []
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < prices.length; j++) {
                if (products[i].id === prices[j].product) {

                    formulatedData.push({
                        productId: products[i].id,
                        object: products[i].object,
                        active: products[i].active,
                        default_price: products[i].default_price,
                        name: products[i].name,
                        description: products[i].description,
                        priceItem: {
                            id: prices[j].id,
                            object: prices[j].object,
                            currency: prices[j].currency,
                            nickname: prices[j].nickname,
                            product: prices[j].product,
                            unit_amount: prices[j].unit_amount
                        }

                    })
                }
            }
        }
        return res.status(200).send({ sucess:true,formulatedData});
    }
    catch (error) {
        return res.status(500).send({ sucess:false,error})
    }

}



//update user subscription
exports.upgradeSubscriptions = async (req, res) => {
    try {
        // Retrieve the necessary data from the request body
        const { subscriptionId, priceId } = req.body;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        const update = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: false,
            // proration_behavior: 'create_prorations',
            proration_behavior: 'always_invoice',
            items: [{
                id: subscription.items.data[0].id,
                price: priceId,
            }]
        });
        return res.status(200).send({ sucess:true,update})
    } catch (error) {
        console.log(error);
        res.status(500).json({  sucess:false,error: 'An error occurred while upgrading the Stripe package' });
    }
}


