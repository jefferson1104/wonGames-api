const cartGamesId = async (cart) => {
  return await cart.map((game) => ({
    id: game.id,
  }));
};

const cartItems = async (cart) => {
  let games = [];

  await Promise.all(
    cart?.map( async (game) => {
      // verifica se o jogo existe e se é valido
      const validatedGame = await strapi.services.game.findOne({
        id: game.id
      });

      // se o jogo for valido faz um push no array games
      if (validatedGame) {
        games.push(validatedGame)
      };
    })
  );

  return games;
};

const total = async (games) => {
  const amount = await games.reduce((acc, game) => {
    return acc + game.price;
  }, 0);

  return Number((amount * 100).toFixed(0));
};

module.exports = {
  cartGamesId,
  cartItems,
  total
}
