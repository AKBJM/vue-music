import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}

export function getSongVkey (songmid) {
  const url = '/api/getSongVkey'

  const data = Object.assign({}, commonParams, {
    '-': 'getplaysongvkey14120747999226269',
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    songmid: songmid,
    g_tk: 1738933734,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"13912579","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"13912579","songmid":["${songmid}"],"songtype":[0],"uin":"673132183","loginflag":1,"platform":"20"}},"comm":{"uin":673132183,"format":"json","ct":24,"cv":0}}`
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
