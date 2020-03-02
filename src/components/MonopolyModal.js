import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const MonopolyModal = (props) => {
  // Take all resources of the selected type from other players' hands and add those resources to the current player's hand
  const selectResource = (e) => {
    const resource = e.target.textContent.toLowerCase();
    const otherPlayers = props.players.filter(player => player !== props.whoseTurn);
    otherPlayers.forEach(player => {
      props.whoseTurn[resource] += player[resource];
      player[resource] = 0;
    })
    props.setShowMonopolyModal(false);
  }
  return (
    <Modal show={props.showMonopolyModal}>
      <div>
        <Modal.Header>
          <Modal.Title>Choose a resource to monopolize</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Button onClick={selectResource} className="mr-2 d-inline-block">Wheat</Button>
                <Button onClick={selectResource} className="mr-2 d-inline-block">Lumber</Button>
                <Button onClick={selectResource} className="mr-2 d-inline-block">Brick</Button>
                <Button onClick={selectResource} className="mr-2 d-inline-block">Ore</Button>
                <Button onClick={selectResource} className="mr-2 d-inline-block">Sheep</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export { MonopolyModal };