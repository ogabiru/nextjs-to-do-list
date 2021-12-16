import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import { PropTypes } from 'prop-types';
import styles from '../styles/Global.module.css'
import modalStyles from '../styles/Modal.module.css'

let modalEl = null;

const Modal = ({open, title, content, close, actionTitle, action}) => {

  const MyModal = () => {
    let actionFooter = null
    if (actionTitle !== undefined && action !== undefined) {
      actionFooter = (
        <div className={modalStyles.modal_footer}>
          <button onClick={() => action()}>{actionTitle}</button>
        </div>
      )
    }
    return(
      <div className={modalStyles.modal}>
        <div className={modalStyles.modal_overlay} onClick={() => close()}></div>
        <div className={`${modalStyles.modal_card} ${styles.card}`}>
          <div className={modalStyles.modal_header}>
            <h2>{title}</h2>
            <button onClick={() => close()}>x</button>
          </div>
          <div className={modalStyles.modal_content}>
            {content}
          </div>
          {actionFooter}
        </div>
      </div>
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