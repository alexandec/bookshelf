import {server, rest} from 'test/server'
import {client} from '../api-client'

const apiURL = 'https://bookshelf.jk/api'
const endpoint = 'test-endpoint'
const mockResult = {mockValue: 'VALUE'}

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )

  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  const token = 'ABC123'
  let request

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, {token})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  const headers = {Custom: 'header'}
  const mode = {mode: 'cors'}
  let request

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, {headers, ...mode})
  expect(request.headers.get('Custom')).toStrictEqual('header')
  expect(request.mode).toBe('cors')
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  const data = {something: 'A bunch of stuff'}
  let request

  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, {data})
  expect(request.body).toEqual(data)
})
