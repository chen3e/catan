import React, { useState, useEffect, useReducer } from 'react';
// import '../css/Board.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const VictoryModal = (props) => {
  return (
    <Modal show={props.showVictoryModal} backdrop="static">
      <Modal.Header>
        <Modal.Title>{props.whoseTurn.name} has won!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Through cunning diplomacy, strategic expansion and raw industriousness, {props.whoseTurn.name} has established a dominant position on the continent of Natac. {props.whoseTurn.name} will be remembered by history, while their opponents will fade into obscurity...</p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Replay</Button>
      </Modal.Footer>
    </Modal>
  )
}

export { VictoryModal };