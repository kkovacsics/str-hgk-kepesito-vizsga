/**
 * @TODO : Mongoose modellek segítségével frissitsen egy 'building' entitást az adatbázisban.
 * - el kell menteni egy új "classroom" entitást.
 * - ki kell nyeri az új "classroom" id-ját.
 * - az id-t helyezze el a megfelelő 'Building' entitás 'classrooms' listájába
 *
 * A @getAll metódus adja vissza a populált teljes "building" listát
 */
 const Building = require('../../models/building.model');
 const Classroom = require('../../models/classroom.model');


exports.update = (buildingId, className) => {
  // return Classroom.find({ name: className })
  //   .then(classroom => {
  //     Building.findById(buildingId)
  //       .then(building => {
  //         building.classrooms.push(classroom._id)
  //         return building.save()
  //       })
  //   })

  const classroom = new Classroom({ name: className });
  return classroom.save()
      .then( () => Building.findById(buildingId) )
      .then( building => {
        building.classrooms.push(classroom._id);
        return building.save();
      })
      .then( () => building );
};

exports.getAll =  () => Building.find().populate('classrooms');