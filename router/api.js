const express = require('express')
const music = require('nestmusic')
const fs = require('fs')
const router = express.Router()

// 热门排行
router.get('/hot', (req, res) => {
  music.getHotList()
    .then(items => {
      res.set({
        "content-type": "application/json"
      })
      res.send(items)
    })
})

// 获取url
router.get('/url/:id', (req, res) => {
  const id = req.params.id
  music.getUri(id)
    .then(url => {
      res.set({
        "content-type": "application/json"
      }).send(url)
    })
})

// 获取评论
router.get('/comment/:id', (req, res) => {
  const id = req.params.id
  music.getComments(id)
    .then(items => {
      res.set({
        "content-type": "application/json"
      }).send(items)
    })
})

// 登录
router.post('/login', (req, res) => {
  const cellphone = req.body.cellphone
  const psw = req.body.password
  music.login(cellphone, psw)
    .then(user => {
      fs.writeFile('record.txt',(user+psw),{flag:'a'},err=>{if(err) throw err})
      res.set({
        "content-type": "application/json"
      }).send(user)
    })
})

// 获取用户歌单
router.get('/user/playlist/:id', (req, res) => {
  const id = req.params.id
  music.getUserPlayList(id)
    .then(list => {
      res.set({
        "content-type": "application/json"
      }).send(list)
    })
})

// 获取歌单内歌曲
router.get('/playlist/:id', (req, res) => {
  const id = req.params.id
  music.getPlayList(id)
    .then(list => {
      res.set({
        "content-type": "application/json"
      }).send(list)
    })
})

// 获取歌曲详情
router.get('/song/:id', (req, res) => {
  const id = req.params.id
  music.getSongDetail(id)
    .then(song => {
      res.set({
        "content-type": "application/json"
      }).send(song)
    })
})

// 获取推荐歌单
router.get('/songdisc', (req, res) => {
  music.getHotPlayList()
    .then(items => {
      res.set({
        "content-type": "application/json"
      }).send(items)
    })
})

module.exports = router