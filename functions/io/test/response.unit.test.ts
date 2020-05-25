import { _response } from '../response'
import response from '../response'

describe('_response()', () => {
  const res = _response()

  test('should contain headers as an object', () => {
    expect(typeof res.headers).toBe('object')
  })

  test('should return header: "Content-Type": "application/json"', () => {
    expect(res.headers['Content-Type']).toBe('application/json')
  })

  test('should return headers which allow CORS', () => {
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*')
    expect(res.headers['Access-Control-Allow-Credentials']).toBe(true)
  })

  test('should return body with typeof string if exists, else undefined', () => {
    const body = {
      data: [1, 2, 3, 4],
    }
    let res = _response(200, body)
    expect(typeof res.body).toBe('string')

    res = _response()
    expect(typeof res.body).toBe('undefined')
  })
})

describe('_200()', () => {
  const res = response._200()

  test('should return status code 200', () => {
    expect(res.statusCode).toBe(200)
  })
})

describe('_401()', () => {
  const res = response._401()

  test('should return status code 401', () => {
    expect(res.statusCode).toBe(401)
  })

  test('should contain body with message: "Unauthorized"', () => {
    expect(JSON.parse(res.body).message).toBe('Unauthorized')
  })
})

describe('_404()', () => {
  const res = response._404()

  test('should return status code 404', () => {
    expect(res.statusCode).toBe(404)
  })
})

describe('_500()', () => {
  const res = response._500()

  test('should return status code 500', () => {
    expect(res.statusCode).toBe(500)
  })

  test('should contain body with error if exists, else be undefined', () => {
    const error = { error: 'An error occured!' }
    let res = response._500(error)
    expect(res.body).toBe(JSON.stringify(error))

    res = response._500()
    expect(res.body).toBe(undefined)
  })
})
