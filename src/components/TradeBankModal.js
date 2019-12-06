import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

const TradeBankModal = (props) => {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [tradeFor, setTradeFor] = useState("");
  const changeType = (e) => {
    setQuantity(e.target.value);
    if (e.target.value != 0) {
      setType(e.target.id.substring(9, e.target.id.length).toLowerCase());
    }
    else {
      setType("");
    }
    props.setForceUpdate(props.forceUpdate + 1);
  }

  const confirmTrade = () => {
    props.whoseTurn[type] -= quantity;
    props.whoseTurn[tradeFor] += quantity/4;
    setType("");
    setQuantity(0);
    setTradeFor("");
    props.hideTradeBankModal();
  }

  return (
    <Modal show={props.showTradeBankModal} onHide={props.hideTradeBankModal}>
      <Modal.Header closeButton>
        <Modal.Title>Trade with bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Wheat ({props.whoseTurn.wheat})</Form.Label>
            <Form.Control id="tradeBankWheat" type="number" min="0" max={props.whoseTurn.wheat} onChange={changeType} disabled={type && type !== "wheat"}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Lumber ({props.whoseTurn.lumber})</Form.Label>
            <Form.Control id="tradeBankLumber" type="number" min="0" max={props.whoseTurn.lumber} onChange={changeType} disabled={type && type !== "lumber"}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Brick ({props.whoseTurn.brick})</Form.Label>
            <Form.Control id="tradeBankBrick" type="number" min="0" max={props.whoseTurn.brick} onChange={changeType} disabled={type && type !== "brick"}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ore ({props.whoseTurn.ore})</Form.Label>
            <Form.Control id="tradeBankOre" type="number" min="0" max={props.whoseTurn.ore} onChange={changeType} disabled={type && type !== "ore"}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sheep ({props.whoseTurn.sheep})</Form.Label>
            <Form.Control id="tradeBankSheep" type="number" min="0" max={props.whoseTurn.sheep} onChange={changeType} disabled={type && type !== "sheep"}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Trade for:</Form.Label>
            <Form.Control id="tradeBankResource" as="select" onChange={(e) => setTradeFor(e.target.value)}>
              <option selected disabled></option>
              <option value="wheat">wheat</option>
              <option value="lumber">lumber</option>
              <option value="brick">brick</option>
              <option value="ore">ore</option>
              <option value="sheep">sheep</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button style={{ display: quantity % 4 === 0 && tradeFor ? "block" : "none" }} onClick={confirmTrade}>Confirm trade</Button>
      </Modal.Body>
    </Modal >
  )
}

export { TradeBankModal };