import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const SimpleModal = ({showModal, handleCloseModal, title, bodyTxt}) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyTxt}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
            OK
             </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default SimpleModal