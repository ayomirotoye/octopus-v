import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { btnTexts, modalTitles } from "../../common/constants";
import { camelCaseToSentenceCase, isObject } from "../../common/helpers";

const ViewTnxDetailsModal = ({ show, handle_close, details }: any) => {
  const [elements, setElements] = useState(Object.assign([]));
  useEffect(() => {
    buildDisplayElements();
  }, [details]);

  const buildDisplayElements = () => {
    let formElements = [];
    if (isObject(details)) {
      for (const [keys, values] of Object.entries(details)) {
        formElements.push(
          <Form.Group>
            <label htmlFor={keys}>{camelCaseToSentenceCase(String(keys))}</label>
            <Form.Control
              type="text"
              id={keys}
              placeholder={keys}
              value={ String(values)}
            />
          </Form.Group>
        );
      }
      setElements(formElements);
    }
  };

  return (
    <Modal
      centered
      show={show}
      onHide={handle_close}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {modalTitles.VIEW_TRANSACTION_DETAILS_MODAL_TITLE}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample">{elements}</form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handle_close}>
          {btnTexts.CLOSE_BTN_TEXT}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTnxDetailsModal;
