import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'

afterEach(async () => {
  queryCache.clear()
  await auth.logout()
})

test('renders all the book information', async () => {
  localStorage.setItem(auth.localStorageKey, 'abc123')
  const user = buildUser()
  const book = buildBook()
  window.history.pushState({}, 'Book', `/book/${book.id}`)

  const oldFetch = window.fetch
  window.fetch = async (url, config) => {
    let result

    if (url.endsWith('/bootstrap')) {
      result = {user: {...user, token: 'abc123'}, listItems: []}
    } else if (url.endsWith(`/books/${book.id}`)) {
      result = {book}
    }

    return {ok: true, json: async () => result}
  }

  render(<App />, {wrapper: AppProviders})
  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))
  expect(screen.getByText(book.title)).toBeInTheDocument()

  window.fetch = oldFetch
})
