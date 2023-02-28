const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe = require("stripe")(
  "sk_test_51MdohWSFBXIGHwCnagawjdf8a91qFCW9NGRZt72tPlUXM1H6Fj02Xn9JbjRvpi9I1584uy7Mq2Tk5kfL4w6uvZ7400iaRr8eSa"
);
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
