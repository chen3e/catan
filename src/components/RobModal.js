import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const RobModal = (props) => {
  return (
    <Modal show={props.showRobModal} onHide={props.rob} backdrop="static">
      <Modal.Header>
        <Modal.Title>Choose a player to rob</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.robbedPlayers.length ? props.robbedPlayers.map((player) => { return <Button className="mr-2 mb-2 d-inline-block" onClick={() => props.rob(player.name)}>{player.name} ({player.wheat+player.brick+player.lumber+player.sheep+player.ore} resources)</Button> }) : <p></p>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.rob(null)}>Don't rob anyone</Button>
      </Modal.Footer>
    </Modal>
  )
}

export { RobModal };