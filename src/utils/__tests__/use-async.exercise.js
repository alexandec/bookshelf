import {renderHook, act} from '@testing-library/react-hooks'
import {useAsync} from '../hooks'

beforeEach(() => {
  jest.spyOn(console, 'error')
})

afterEach(() => {
  console.error.mockRestore()
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('calling run with a promise which resolves', async () => {
  const {promise, resolve} = deferred()
  const {result} = renderHook(() => useAsync())
  expect(result.current.status).toBe('idle')

  act(() => {
    result.current.run(promise)
  })
  expect(result.current.status).toBe('pending')

  await act(async () => {
    resolve()
    await promise
  })
  expect(result.current.status).toBe('resolved')

  act(() => {
    result.current.reset()
  })
  expect(result.current.status).toBe('idle')
})

test('calling run with a promise which rejects', async () => {
  const {promise, reject} = deferred()
  const {result} = renderHook(() => useAsync())
  expect(result.current.status).toBe('idle')

  let p
  act(() => {
    p = result.current.run(promise)
  })
  expect(result.current.status).toBe('pending')

  const rejectedValue = Symbol('rejected value')
  await act(async () => {
    reject(rejectedValue)
    await p.catch(() => {})
  })
  expect(result.current.status).toBe('rejected')

  act(() => {
    result.current.reset()
  })
  expect(result.current.status).toBe('idle')
})

test('can specify an initial state', () => {
  const {result} = renderHook(() => useAsync({status: 'custom'}))
  expect(result.current.status).toBe('custom')
})

test('can set the data', () => {
  const {result} = renderHook(() => useAsync())
  act(() => {
    result.current.setData('my data')
  })
  expect(result.current.data).toBe('my data')
})

test('can set the error', () => {
  const {result} = renderHook(() => useAsync())
  act(() => {
    result.current.setError('my error')
  })
  expect(result.current.error).toBe('my error')
})

test('No state updates happen if the component is unmounted while pending', async () => {
  const {promise, resolve} = deferred()
  const {result, unmount} = renderHook(() => useAsync())
  let p

  act(() => {
    p = result.current.run(promise)
  })
  unmount()
  await act(async () => {
    resolve()
    await p
  })

  expect(console.error).not.toHaveBeenCalled()
})

test('calling "run" without a promise results in an early error', () => {
  const {result} = renderHook(() => useAsync())
  expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(
    `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`,
  )
})
