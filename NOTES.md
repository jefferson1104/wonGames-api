## Buscando games

```bash
## Busca por paginas (48 games por pagina)
curl -X POST http://localhost:1337/games/populate\?page\=1

## Busca por jogo especifico
curl -X POST http://localhost:1337/games/populate\?page\=1\&search\=cyberpunk


```
