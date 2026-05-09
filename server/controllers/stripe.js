const prisma = require('../config/prisma')
const creatPaymentIntent = async (req, res) => {
const strip = require(stripe)(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
    })
    res.redirect(303, session.url);
}
