import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import { PropTypes } from 'prop-types'
import {
  StyledModal,
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalClose
} from './styles'

let modalEl = null;

const Modal = ({open, title, content, close, actionTitle, action}) => {

  const MyModal = () => {
    let actionFooter = null
    if (actionTitle !== undefined && action !== undefined) {
      actionFooter = (
        <ModalFooter>
          <button onClick={() => action()}>{actionTitle}</button>
        </ModalFooter>
      )
    }
    return(
      <StyledModal>
        <ModalOverlay onClick={() => close()} />
        <ModalCard>
          <ModalHeader>
            <h2>{title}</h2>
            <ModalClose onClick={() => close()}>x</ModalClose>
          </ModalHeader>
          <ModalContent>
            {content}
          </ModalContent>
          {actionFooter}
        </ModalCard>
      </StyledModal>
    )
  }

  useEffect(() => {
    if (modalEl !== null || (!open && modalEl !== null)) {
      document.body.removeChild(modalEl)
      modalEl = null;
    }

    if (open) {
      modalEl = document.createElement('div')
      ReactDOM.render(<MyModal></MyModal>, modalEl)
      document.body.appendChild(modalEl)
    }
  }, [open])

  return <script />
}

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  close: PropTypes.func,
  actionTitle: PropTypes.string,
  action: PropTypes.func
}

export default Modal