const Tamu = require('../models/tamu.model')

// Create and Save tamu baru
exports.add = (req, res) => {
  res.render('tamu/create', { page: 'Create User' })
}

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty'
    })
  }

  let active = true;
  if (req.body.active === 'false') active = false

  // Create tamu
  const tamu = new Tamu({
    namatamu: req.body.namatamu,
    notel: req.body.notel,
    instansi: req.body.instansi,
    bidang: req.body.bidang,
    keperluan: req.body.keperluan,
    active
  })

  // Save tamu di database
  Tamu.create(tamu, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occured while creating the Guest.'
      })
    } else {
      // res.send(data)
      res.redirect('/guest')
    }
  })
}

// Retrieve semua tamu dari database
exports.findAll = (req, res) => {
  Tamu.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving guest.'
      })
    } else {
      // res.send(data)
      res.render('tamu/index', { page: 'Data Tamu', data })
    }
  })
}

// Find tamu dengan guestId
exports.findOne = (req, res) => {
  Tamu.findById(req.params.tamuId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.tamuId}`
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Customer with id' + req.params.tamuId
        })
      }
    } else {
      res.send(data)
    }
  })
}

// // Update tamu berdasarkan guestId 
exports.edit = (req, res) => {
  Tamu.findById(req.params.tamuId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.tamuId}`
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Customer with id' + req.params.tamuId
        })
      }
    } else {
      // res.send(data)
      res.render('tamu/edit', { page: 'Edit Tamu', data })
    }
  })
}

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  Tamu.updateById(
    req.params.tamuId,
    new Tamu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.tamuId}`
          })
        } else {
          res.status(500).send({
            message:
              'Could not delete Customer with id ' + req.params.tamuId
          })
        }
      } else {
        // res.send(data)
        res.redirect('/guest')
      }
    }
  )
}

// Delete tamu berdasarkan guestId 
exports.check = (req, res) => {
  Tamu.findById(req.params.tamuId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.tamuId}`
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Customer with id' + req.params.tamuId
        })
      }
    } else {
      // res.send(data)
      res.render('tamu/delete', { page: 'Delete Tamu', data })
    }
  })
}

exports.delete = (req, res) => {
  Tamu.remove(req.params.tamuId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.tamuId}.`
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Customer with id ' + req.params.tamuId
        })
      }
    } else {
      // res.send({
      //   message: `Guest was deleted successfully`
      // })
      res.redirect('/guest')
    }
  })
}

// Delete semua tamu dari database
exports.deleteAll = (req, res) => {
  Tamu.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all guest.'
      })
    } else {
      res.send({
        message: `All guest were deleted successfully!`
      })
    }
  })
}
