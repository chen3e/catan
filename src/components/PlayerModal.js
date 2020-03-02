import React, { useState, useEffect, useReducer } from 'react';
// import '../css/Board.css'
import { Player } from '../setup.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PlayerModal = (props) => {
  const [playerName, setPlayerName] = useState("");

  // Create a player instance if name is not duplicate and clear the name field
  const addPlayers = (e) => {
    const sameName = props.players.filter(_player => _player.name === playerName);
    if (sameName.length) {
      alert("A player with that name already exists!");
    }
    else if (playerName.length) {
      let number = props.players.length + 1;
      let player = new Player(playerName, number);
      props.setPlayers([...props.players, player]);
      setPlayerName("");
    }
  };
  return (
    <Modal show={props.showPlayerModal} onHide={props.startGame} backdrop="static">
      <Modal.Header>
        <Modal.Title>Add players</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.players.map((player) => {
            return <p>{player.name}</p>
          })}
        </div>
        <form style={{ display: props.players.length < 4 ? "block" : "none" }}>
          <input id="playerNameInput" type="text" placeholder="Enter player name here" value={playerName} onChange={(e) => setPlayerName(e.target.value)}></input>
        </form></Modal.Body>
      <Modal.Footer>
        <Button id="addPlayerButton" variant="secondary" onClick={addPlayers} style={{ display: props.players.length < 4 ? "block" : "none" }}>
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