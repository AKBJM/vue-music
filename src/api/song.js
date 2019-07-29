import {commonParams} from './config'
import axios from 'axios'

export function getLyric (mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    '-': 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: mid,
    platform: 'yqq.json',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    g_tk: 5381,
    inCharset: 'utf8'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
