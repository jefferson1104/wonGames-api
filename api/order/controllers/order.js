'use strict';

const stripe = require("stripe")(process.env.STRIPE_KEY);
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  createPaymentIntent: async (ctx) => {
    const { cart } = ctx.request.body;

    // simplificando dados do carrinho
    const cartGamesId = await strapi.config.functions.cart.cartGamesId(cart);

    // pega todos os jogos no carrinho
    const games = await strapi.config.functions.cart.cartItems(cartGamesId);

    // retorna 404 se o jogo nao existir
    if (!games.length) {
      ctx.response.status = 404
      return {
        error: "No valid games found!"
      }
    }

    // somando o valor total de games
    const total = await strapi.config.functions.cart.total(games)

    // tratando quando o valor total de games for zero
    if (total === 0) {
      return {
        freeGames: true
      };
    };

    // criando paymentIntent
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        metadata: { cart: JSON.stringify(cartGamesId) }
      });

      return paymentIntent;
    } catch (err) {
      return {
        error: err.raw.message
      };
    };
  },

  create: async (ctx) => {
    // pegando informações vindas do front-end
    const { cart, paymentIntentId, paymentMethod } = ctx.request.body;

    // pegando dados do usuario
    const token = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx);
    const userId = token.id;
    const userInfo = await strapi.query("user", "users-permissions").findOne({ id: userId });

    // simplificando dados do carrinho
    const cartGamesId = await strapi.config.functions.cart.cartGamesId(cart);

    // pega todos os jogos no carrinho
    const games = await strapi.config.functions.cart.cartItems(cartGamesId);

    // pegando o total (saber se a compra é free ou não)
    const total_in_cents = await strapi.config.functions.cart.total(games);

    // pegando dados do paymentMethod vindos do front-end
    let paymentInfo;
    if (total_in_cents !== 0) {
      try {
        paymentInfo = await stripe.paymentMethods.retrieve(paymentMethod);
      } catch (err) {
        ctx.response.status = 402;
        return { error: err.message }
      }
    }

    // montando entidade para salvar no banco de dados
    const entry = {
      total_in_cents,
      payment_intent_id: paymentIntentId,
      card_brand: paymentInfo?.card?.brand,
      card_last4: paymentInfo?.card?.last4,
      games,
      user: userInfo
    };
    const entity = await strapi.services.order.create(entry);

    // enviar um email sobre a compra para o usuario

    // retornando o que foi salvo no banco de dados
    return sanitizeEntity(entity, { model: strapi.models.order });
  }
}
