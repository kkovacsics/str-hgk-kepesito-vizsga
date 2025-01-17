/**
 * @TODO : controller elkészítése, mely kapcsolódik a megfelelő service osztályhoz
 *
 * Kezelje a http-error üzeneteket:
 * - hiányos értékek @update műveletkor: BadREquest => 'Missing field'
 * - ha valamiért nem tudta a server frissíteni a building entitást:
 *  InternalServerError => 'Could not updated building'
 *
 * A szerver a megfelelő válaszokat küldje el a kliens felé
 */

const httpError = require('http-errors');
const Model = require('../../models/building.model');
const service = require('./building.service');

exports.updateBuilding = (req, res, next) => {
  const { buildingId, className } = req.body;
  if (!buildingId || !className) {
      return next(new httpError.BadRequest('No buildingId or className!'));
  }

  return service.update(buildingId, className)
      .then( updatedBuilding => {
          res.status(201);
          res.json(updatedBuilding);
      })
      .catch( err => next( new httpError.BadRequest(err.message)) );
}


exports.getAllBuildingWithClassrooms = (req, res, next) => {
  return service.getAll()
    .then(list => {
      res.json(list);
    });
};