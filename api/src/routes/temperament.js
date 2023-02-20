require('dotenv').config();
const { Router } = require('express');
const router = Router();
const axios = require('axios');

const { Temperamento } = require('../db.js')

const { API_KEY } = process.env;
const URL_API = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

router.get('/', async (_req, res) => { // hecha!!!
      try {
            const hayDatos = await Temperamento.findAll();
            if (!hayDatos.length) {
                  const perros = await axios(URL_API);
                  const tempApi = perros.data.map((p) => p.temperament ? p.temperament : '').map(s => s?.split(', ')).flat();
                  const result = tempApi.reduce((acc, item) => {
                        if (!acc.includes(item) && item !== '') acc.push(item);
                        return acc;
                  }, []);
                  let datos = result.map(c => {
                        let dato = { name: c }
                        return dato
                  })
                  await Temperamento.bulkCreate(datos)
            }
            return res.json(hayDatos)
      } catch (error) {
            res.status(404).send(error)
      }
})

module.exports = router;