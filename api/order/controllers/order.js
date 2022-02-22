'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

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

    return games
  }
}
