import Adapt from './adapt.js'
import config from './config.js'
import axios from 'axios'
import { nanoid } from 'nanoid/non-secure'
import { sanitize } from '@/utils/aux-methods.js'

const { apiKey, url } = config
const format = 'json'

/* API */
const getTopArtists = async (country) => {
  const url = buildApiUrl('geo.gettopartists', { country: country })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-topArtists=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  // return Adapt.adaptArtists(checkMbids(results.topartists.artist))
  return results
}

const getArtistInfo = async (artist) => {
  const url = buildApiUrl('artist.getinfo', { artist: sanitize(artist) })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-artistInfo=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  return Adapt.adaptArtists(results.artist)
}

const getArtistTopTags = async (artist, num) => {
  const url = buildApiUrl('artist.gettoptags', { artist: sanitize(artist) })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-artisttopTags=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  const tags = results.toptags.tag
  return Adapt.adaptTags(num ? tags.slice(0, num) : tags)
}

const getArtistTopAlbums = async (artist) => {
  const url = buildApiUrl('artist.gettopalbums', { artist: sanitize(artist) })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-artistToopAlbums=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  const albums = results.topalbums.album
  return Adapt.adaptAlbums(filterUndefined(albums))
}

const getArtistTopTracks = async (artist) => {
  const url = buildApiUrl('artist.gettoptracks', { artist: sanitize(artist), limit: 10 })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-artistTopTracks=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  return Adapt.adaptTracks(results.toptracks.track)
}

const getAlbumInfo = async (artist, album) => {
  const url = buildApiUrl('album.getinfo', { artist: sanitize(artist), album: sanitize(album) })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-albumInfo=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  return Adapt.adaptAlbums(results.album)
}

const getTrackInfo = async (artist, track) => {
  const url = buildApiUrl('track.getinfo', { artist: sanitize(artist), track: sanitize(track) })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-trackInfo=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  return Adapt.adaptTracks(results.track)
}

const getSearchFunction = (type) => {
  if (type === 'track') {
    return searchTrack
  }

  if (type === 'artist') {
    return searchArtist
  }

  if (type === 'album') {
    return searchAlbum
  }

  return q => { console.warn('This searcher is not supported yet!') }
}

const searchTrack = async (search) => {
  const url = buildApiUrl('track.search', { track: search })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-track=', res)
    results.push(...res.data.results.trackmatches.track)
  }).catch(error => console.error(error))
  console.log('Results: ', results)
  return results
  // return Adapt.adaptTracks(checkMbids(results.trackmatches.track))
}

const searchAlbum = async (search) => {
  const url = buildApiUrl('album.search', { album: search })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-album=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  return Adapt.adaptAlbums(checkMbids(filterUndefined(results.albummatches.album)))
}

const searchArtist = async (search) => {
  const url = buildApiUrl('artist.search', { artist: search })
  const results = []

  axios.get(url).then(res => {
    console.log('getdata-artistInfo=', res)
    results.push(...res.data.items)
  }).catch(error => console.error(error))
  return Adapt.adaptArtists(checkMbids(sortWithoutImages(filterMbids(results.artistmatches.artist))))
}

/* Aux API methods */
const buildApiUrl = (method, params) => buildUrl(url, { method: method, ...params, api_key: apiKey, format: format })

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&')

const paramToUrl = (name, value) => name + (value ? '=' + value : '')

/* Other aux */
const filterMbids = (list) => {
  const mbids = new Map()

  return list.filter(element => {
    if (!element.mbid) return true

    const exists = mbids.has(element.mbid)
    if (!exists) mbids.set(element.mbid, true)
    return !exists
  })
}

const filterUndefined = (list) => {
  return list.filter(element => element.name && element.name !== '(null)' && element.name !== 'undefined')
}

const checkMbids = (list) => {
  list.filter(element => !element.mbid).forEach(element => {
    element.mbid = 'random:' + nanoid()
  })
  return list
}

const sortWithoutImages = (artists) => {
  const withImages = []
  const withoutImages = []

  artists.forEach(artist => {
    const image = artist.image[2]['#text']
    const array = image === '' ? withoutImages : withImages
    array.push(artist)
  })

  return withImages.concat(withoutImages)
}

/* Exports */
const standalone = { getTopArtists }
const artist = { getArtistInfo, getArtistTopTags, getArtistTopAlbums, getArtistTopTracks }
const album = { getAlbumInfo }
const track = { getTrackInfo }
const search = { getSearchFunction, searchTrack, searchAlbum, searchArtist }

export default { ...standalone, ...artist, ...album, ...track, ...search }
