"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PymentManager = void 0;
const stripe_1 = require("stripe");
class PymentManager {
    constructor() {
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2020-08-27",
        });
    }
    async createPaymentIntent(payment, callback) {
        try {
            const result = await this.stripe.paymentIntents.create({
                amount: payment.amount * 100,
                currency: "USD",
                description: payment.description || 'payment',
                application_fee_amount: ((payment.amount * 5) / 100) * 100,
                metadata: { ...payment },
                transfer_data: {
                    destination: payment.destination,
                },
            });
            callback(undefined, result);
        }
        catch (error) {
            callback(error);
        }
    }
    createPayment(info) {
        return new Promise((reject, resolve) => {
            this.createPaymentIntent(info, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: "stripr account error" }) :
                    resolve(res);
            });
        });
    }
}
exports.PymentManager = PymentManager;
