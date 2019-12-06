import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// import '../css/PlayerInfoTab.css';

const RobModal = (props) => {
  return (
    <Modal show={props.showRobModal} onHide={props.rob} backdrop="static">
      <Modal.Header>
        <Modal.Title>Choose a player to rob</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.robbedPlayers.length ? props.robbedPlayers.map((player) => { return <Button onClick={props.rob}>{player.name} ({player.wheat+player.brick+player.lumber+player.sheep+player.ore} resources)</Button> }) : <p></p>}
          <Button onClick={props.rob}>Don't rob anyone</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export { RobModal };