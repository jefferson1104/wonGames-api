'use strict';

const stripe = require("stripe")(process.env.STRIPE_KEY)

module.exports = {
  createPaymentIntent: async (ctx) => {
    const { cart } = ctx.request.body

    let games = []

    await Promise.all(
      cart?.map( async (game) => {
        // verifica se o jogo existe e se é valido
        const validatedGame = await strapi.services.game.findOne({
          id: game.id
        })

        // se o jogo for valido faz um push no array games
        if (validatedGame) {
          games.push(validatedGame)
        }
      })
    )

    // retorna 404 se o jogo nao existir
    if (!games.length) {
      ctx.response.status = 404
      return {
        error: "No valid games found!"
      }
    }

    // somando o valor total de games
    const total = games.reduce((acc, game) => {
      return acc + game.price
    }, 0)

    // tratando quando o valor total de games for zero
    if (total === 0) {
      return {
        freeGames: true
      }
    }

    // criando paymentIntent
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100),
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" }
      })

      return paymentIntent
    } catch (err) {
      return {
        error: err.raw.message
      }
    }
  },

  create: async (ctx) => {
    // pegando informações vindas do front-end
    const { cart, paymentIntentId, paymentMethod } = ctx.request.body

    // pegando dados do usuario
    const token = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx)
    const userId = token.id

    const userInfo = await strapi.query("user", "users-permissions").findOne({ id: userId })

    // pegando dados dos jogos
    // pegando o total (saber se a compra é free ou não)
    // pegando o paymentIntentId
    // pegando dados do sobre o pagamento (paymentMethod)

    // salvar no banco de dados

    // enviar um email sobre a compra para o usuario

    return { cart, paymentIntentId, paymentMethod, userInfo }
  }
}
