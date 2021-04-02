const sql = require('./db.js')

// constructor
const Tamu = function (tamu) {
  this.namatamu = tamu.namatamu
  this.notel = tamu.notel
  this.instansi = tamu.instansi
  this.bidang = tamu.bidang
  this.keperluan = tamu.keperluan
}

// create tamu baru
Tamu.create = (newTamu, result) => {
  sql.query('INSERT INTO guest SET ?', newTamu, (err, res) => {
    if (err) {
      console.log(`error: ${err}`)
      result(err, null)
      return
    }

    console.log('created tamu: ', { id: res.insertId, ...newTamu })
    result(null, { id: res.insertId, ...newTamu })
  })
}

// find tamu by Id
Tamu.findById = (tamuId, result) => {
  sql.query('SELECT * FROM guest WHERE id =' + tamuId, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found tamu: ', res[0])
      result(null, res[0])
      return
    }

    // not found tamu berdasarkan id
    result({ kind: 'not_found' }, null)
  })
}

// get semua tamu
Tamu.getAll = result => {
  sql.query('SELECT * FROM guest', (err, res) => {
    if (err) {
      console.log('error', err)
      result(null, err)
      return
    }

    console.log('Guest: ', res)
    result(null, res)
  })
}

// update tamu by Id
Tamu.updateById = (id, tamu, result) => {

  sql.query(
    'UPDATE guest SET namatamu = ?, notel = ?, instansi = ?, bidang = ?, keperluan = ? WHERE id = ?',
    [tamu.namatamu, tamu.notel, tamu.instansi, tamu.bidang, tamu.keperluan, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // not found tamu with the id
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('updated tamu: ', { id: id, ...tamu })
      result(null, { id: id, ...tamu })
    }
  )
}

// remove tamu by Id
Tamu.remove = (id, result) => {
  sql.query('DELETE FROM guest WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // not found tamu with the id
      result({ kind: 'not_found' }, null)
      return
    }

    console.log('deleted tamu with id: ', id)
    result(null, res)
  })
}

// remove semua tamu
Tamu.removeAll = result => {
  sql.query('DELETE FROM guest', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} guest`)
    result(null, res)
  })
}

module.exports = Tamu
