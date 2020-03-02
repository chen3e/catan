import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

const TradeBankModal = (props) => {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [tradeFor, setTradeFor] = useState("");
  const [multiple, setMultiple] = useState(4);

  // Upon the declaration/redeclaration of a resource to be traded in, check if any applicable port bonuses exist and setMultiple accordingly
  const changeType = (e) => {
    setQuantity(e.target.value);
    if (props.whoseTurn.ports.includes("triple")) {
      setMultiple(3);
    }
    if (e.target.value != 0) {
      setType(e.target.id.substring(9, e.target.id.length).toLowerCase());
      if (props.whoseTurn.ports.includes(type)) {
        setMultiple(2);
      }
    }
    else {
      setType("");
    }
    props.setForceUpdate(props.forceUpdate + 1);
  }

  // Adjust player's resources according to the form, reset appropriate states and hide modal
  const confirmTrade = () => {
    props.whoseTurn[type] -= quantity;
    props.whoseTurn[tradeFor] += quantity/multiple;
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
        {props.whoseTurn.ports && props.whoseTurn.ports.length > 0 ? <p>Available ports: {props.whoseTurn.ports.map((port, index) => {
          let lastPort = (index === props.whoseTurn.ports.length - 1);
          if (index && lastPort) {
            return port;
          }
          else if (index) {
            return port + ", ";
          }
          else if (lastPort) {
            return port.charAt(0).toUpperCase() + port.slice(1)
          }
          else {
            return port.charAt(0).toUpperCase() + port.slice(1) + ", ";
          }
        })}</p> : <p>No ports</p>}
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
              <option value="wheat">Wheat</option>
              <option value="lumber">Lumber</option>
              <option value="brick">Brick</option>
              <option value="ore">Ore</option>
              <option value="sheep">Sheep</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {/* <Button disabled={validTrade()} onClick={confirmTrade}>Confirm trade</Button> */}
        <Button disabled={ quantity % multiple !== 0 || quantity === 0 || !tradeFor || tradeFor == type } onClick={confirmTrade}>Confirm trade</Button>
      </Modal.Body>
    </Modal >
  )
}

export { TradeBankModal };