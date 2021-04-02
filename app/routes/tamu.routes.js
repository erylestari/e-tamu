// cara sebelumnya ========>

const guest = require('../controller/tamu.controller')
module.exports = app => {
  // Create data tamu
  app.get('/tamu/create', guest.add)
  app.post('/tamu/create', guest.create)

  // Retrieve semua tamu
  app.get('/guest', guest.findAll)

  // Retrieve a single guest with guestId
  app.get('/guest/:tamuId', guest.findOne)

  // Update a guest with guestId
  app.get('/tamu/edit/:tamuId', guest.edit)
  app.post('/tamu/edit/:tamuId', guest.update)

  // Delete a guest with guestId
  app.get('/tamu/delete/:tamuId', guest.check)
  app.post('/tamu/delete/:tamuId', guest.delete)

  // Delete all guest
  app.delete('/guest', guest.deleteAll)
}


