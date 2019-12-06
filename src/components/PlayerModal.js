import React, { useState, useEffect, useReducer } from 'react';
// import '../css/Board.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const PlayerModal = (props) => {
  return (
    <Modal show={props.showPlayerModal} onHide={props.startGame} backdrop="static">
      <Modal.Header>
        <Modal.Title>Add players</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.players.map((player) => {
            return <p>{player.name} {player.number}</p>
          })}
        </div>
        <form style={{ display: props.players.length < 4 ? "block" : "none" }}>
          <input id="playerNameInput" type="text" placeholder="Enter player name here" value={props.playerName} onChange={(e) => props.setPlayerName(e.target.value)}></input>
        </form></Modal.Body>
      <Modal.Footer>
        <Button id="addPlayerButton" variant="secondary" onClick={props.addPlayers} style={{ display: props.players.length < 4 ? "block" : "none" }}>
          Add player
            </Button>
        <Button id="exitPlayerModalButton" variant="primary" onClick={props.startGame} style={{ display: props.players.length > 1 ? "block" : "none" }}>
          Start game
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { PlayerModal };