import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16', });

export default stripe;

export const createCheckoutSession = async (userId: number, planType: 'free' | 'premium', email: string) => {
    if (planType === 'free') {
        return null;
    }

    const session = await stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'DearPast Premium',
                    description: 'Create and export unlimited legacy projects',
                },
                unit_amount: 9900,
                recurring: {
                    interval: 'month',
                },
            },
            quantity: 1,
        }],
        mode: 'subscription',
        success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
        metadata: {
            userId: userId.toString(),
        },
    });

    return session;
};

export const handleWebhookEvent = async (event: Stripe.Event) => {
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            console.log(`Checkout session completed for user: ${session.metadata?.userId}`);
            break;
        case 'invoice.payment_succeeded':
            const invoice = event.data.object as Stripe.Invoice;
            console.log(`Payment succeeded for invoice: ${invoice.id}`);
            break;
        case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;
            console.log(`Subscription deleted: ${subscription.id}`);
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
};
