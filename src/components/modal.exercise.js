import React from 'react'
import {Dialog} from './lib'

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider
      value={{isOpen, setIsOpen}}
      {...props}
    ></ModalContext.Provider>
  )
}

function ModalDismissButton({children}) {
  const {setIsOpen} = React.useContext(ModalContext)

  return React.cloneElement(children, {
    onClick: () => setIsOpen(false),
  })
}

function ModalOpenButton({children}) {
  const {setIsOpen} = React.useContext(ModalContext)

  return React.cloneElement(children, {
    onClick: () => setIsOpen(true),
  })
}

function ModalContents(props) {
  const {isOpen, setIsOpen} = React.useContext(ModalContext)

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...props}
    ></Dialog>
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
