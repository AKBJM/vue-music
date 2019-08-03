import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getRankList (topid) {
  const url = '/api/getRankList'

  const data = Object.assign({}, commonParams, {
    '-': 'getUCGI3815685249242067',
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    g_tk: 34551177,
    data: `{"detail":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topId":${topid},"offset":0,"num":20,"period":"2019-08-02"}},"comm":{"ct":24,"cv":0}}`
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
