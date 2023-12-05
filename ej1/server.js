const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>Personajes de Ricky y Morty</h1>
    <form method="POST" action="/" enctype="application/x-www-form-urlencoded">
      <input type="number" name="character" placeholder="" min="1" max="414">
      <input type="submit">
    </form>
  `);
});

app.post('/', async (req, res) => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character/' + req.body.character);
    const characterData = await response.json();

    await fs.writeFile('info.json', JSON.stringify(characterData, null, 2), 'utf8');

    res.send(`
      <h1>Datos del personaje "${req.body.character}"</h1>
      <h1>Personajes de Ricky y Morty</h1>
      <form method="POST" action="/" enctype="application/x-www-form-urlencoded">
        <input type="number" name="character" placeholder="" min="1" max="414">
        <input type="submit">
      </form>
      <div><img src="${characterData.image}"></div>
      <p>${characterData.name}</p>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(3000);
