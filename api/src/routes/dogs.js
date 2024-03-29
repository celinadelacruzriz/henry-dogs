const { Router } = require('express');
const router = Router();
const { getBreedsApiDbName, getBreedsID, postCreatedBreed } = require('../Controllers/DogsApiDb')

router.get('/', getBreedsApiDbName)

router.get('/:id', getBreedsID)

router.post('/', postCreatedBreed)


module.exports = router;