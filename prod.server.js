const express = require('express')
const config = require('./config/index')
const axios = require('axios')

const port = process.env.PORT || config.build.port

const app = express()

app.get('/api/getDiscList', (req, res) => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getSongVkey', (req, res) => {
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  axios.get(url, {
    headers: {
      Origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/portal/player.html'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getLyric', (req, res) => {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      Origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/portal/player.html'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getSongList', (req, res) => {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      Origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/portal/player.html'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getRankList', (req, res) => {
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  axios.get(url, {
    headers: {
      Origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/n/yqq/toplist/4.html'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/search', (req, res) => {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  axios.get(url, {
    headers: {
      Origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/m/index.html'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})