require('dotenv').config();
const { Router } = require('express');
const axios = require('axios')
const { Dog, Temperamento } = require('../db');
const { Op } = require("sequelize");

const { API_KEY } = process.env;
const URL_API = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const router = Router();

function validarPeso(peso) {
      let [min, max] = peso.split("-");
      min = isNaN(min) ? "0" : parseInt(min);
      max = isNaN(max) ? "0" : parseInt(max);
      return [min, max];
}

router.get('/', async (req, res) => {  // Back 1 y 2
      let { name } = req.query;
      if (!name) {
            try {
                  const perros = await axios(URL_API);
                  const datosApi = perros.data.map(p => {
                        let perro = {
                              id: p.id,
                              image: p.image.url,
                              name: p.name.toLowerCase(),
                              temperament: p.temperament,
                              weight: validarPeso(p.weight.metric)
                        }
                        return perro;
                  })
                  const datosDB = (await Dog.findAll(
                        {
                              include: {
                                    model: Temperamento,
                                    attributes: ["name"],
                                    through: { attributes: [] }
                              }
                        }
                  )).map(p => {
                        let pdb = {
                              id: p.id,
                              image: p.image,
                              name: p.name.toLowerCase(),
                              weight: validarPeso(p.weight),
                              temperament: p.temperamentos.map(t => t.name).join(', ')
                        };
                        return pdb;
                  })
                  const unidos = datosDB.concat(datosApi)
                  return res.json(unidos)

            } catch (error) {
                  res.status(404).send(error)
            }
      } else {
            try {
                  const perros = await axios(URL_API)
                  const filtrados = perros.data.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
                  const final = filtrados.map(p => {
                        let perro = {
                              id: p.id,
                              image: p.image.url,
                              name: p.name,
                              temperament: p.temperament,
                              weight: validarPeso(p.weight.metric)
                        }
                        return perro
                  })

                  const perrosDB = (await Dog.findAll({
                        where: { name: { [Op.iLike]: `%${name}%` } },
                        include: {
                              model: Temperamento,
                              attributes: ["name"],
                              through: { attributes: [] },
                        }
                  })).map(p => {
                        return {
                              id: p.id,
                              image: p.image,
                              name: p.name,
                              weight: p.weight,
                              temperament: p.temperamentos.map(t => t.name).toString()
                        }
                  })
                  return res.json(perrosDB.concat(final));
            } catch (error) {
                  res.status(404).send(error)
            }
      }
})

router.get('/:breed_id', async (req, res) => {    ///  Hecha!
      let { breed_id } = req.params
      console.log(breed_id);
      if (breed_id.length === 36) {
            try {
                  let buscoPerro = await Dog.findOne({
                        attributes: ["name", "height", "weight", "life_span", "image"],
                        where: {
                              id: breed_id
                        },
                        include: {
                              model: Temperamento,
                              attributes: ["name"],
                              through: { attributes: [] },
                        }
                  })
                  if (!buscoPerro) return res.status(404).send(`No existe un perro con el "${breed_id}"`)
                  let temps = buscoPerro.temperamentos.map(t => t.name)

                  let buscoPerro1 = {
                        id: buscoPerro.breed_id,
                        name: buscoPerro.name,
                        weight: buscoPerro.weight,
                        height: buscoPerro.height,
                        life_span: buscoPerro.life_span,
                        image: buscoPerro.image,
                        temperament: temps.toString()
                  }

                  return res.json(buscoPerro1)

            } catch (error) {
                  res.send(error)
            }

      } else {
            try {
                  let perros = await axios(URL_API)
                  let buscado = perros.data.find(p => p.id == breed_id)
                  if (!buscado) return res.status(201).send('No está tu amigo en la lista!')
                  let resp = {
                        id: buscado.breed_id,
                        image: buscado.image.url,
                        name: buscado.name,
                        temperament: buscado.temperament,
                        height: buscado.height.metric,
                        weight: validarPeso(buscado.weight.metric),
                        life_span: buscado.life_span,
                        temperament: buscado.temperament
                  }

                  return res.json(resp)
            } catch (error) {
                  return res.status(404).send('hubo un error.')
            }
      }
})

module.exports = router;