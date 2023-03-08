const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

// describe(, () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Dog.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Dog.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Dog.create({ name: 'Pug' });
//       });
//     });
//   });
// });

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    it('error sin nombre', function (done) {
      Dog.create({
        image: 'Hola',
      })
        .then(() => done('No debería haberse creado'))
        .catch(() => done());
    });
    it('error sin imagen', function (done) {
      Dog.create({
        name: 'perro',
      })
        .then(() => done('No deberia haberse creado'))
        .catch(() => done());
    });
  });
});