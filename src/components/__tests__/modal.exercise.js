import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Modal, ModalContents, ModalOpenButton} from '../modal'

test('can be opened and closed', () => {})
render(
  <Modal>
    <ModalOpenButton>
      <button>Open</button>
    </ModalOpenButton>
    <ModalContents aria-label="My Label" title="My Title">
      My Contents
    </ModalContents>
  </Modal>,
)

userEvent.click(screen.getByRole('button', {name: /Open/}))
expect(screen.getByText('My Contents')).toBeInTheDocument()
expect(screen.getByLabelText('My Label')).toBeInTheDocument()
expect(screen.getByRole('heading').textContent).toBe('My Title')

userEvent.click(screen.getByRole('button'), {name: /Close/})
expect(screen.queryByLabelText('My Label')).not.toBeInTheDocument()
