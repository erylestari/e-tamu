const express = require('express')
const router = express.Router()

// use res.render to load up an ejs view file=====>
router.get('/', (req, res) => {
  res.render('pages/home', { page: 'Web Buku Tamu' })
})

// about page
router.get('/about', (req, res) => {
  res.render('pages/about', { page: 'Tentang Kami' })
})

// about page
router.get('/contact', (req, res) => {
  res.render('pages/contact', { page: 'Kontak Perusahaan Kami' })
})

module.exports = router
