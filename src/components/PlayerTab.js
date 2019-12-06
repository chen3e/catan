import React, { useState, useEffect, useReducer } from 'react';
import '../css/PlayerInfoTab.css';

const PlayerTab = (props) => {
  return (
    <div id="playerTab">
      <div>
        <h6>Current player: {props.whoseTurn.name ? props.whoseTurn.name : "none"}</h6>
        <p>{props.helpText}</p>
        <p>Turn stage: {props.turnStage}</p>
        <p>Victory points: {props.whoseTurn.points}</p>
        <p>Wheat: {props.whoseTurn.wheat}</p>
        <p>Lumber: {props.whoseTurn.lumber}</p>
        <p>Brick: {props.whoseTurn.brick}</p>
        <p>Ore: {props.whoseTurn.ore}</p>
        <p>Sheep: {props.whoseTurn.sheep}</p>
      </div>
      <div id="actions">
        <button id="rollDice" onClick={props.rollDice} disabled={ props.turnStage == "ROLL" ? false : true }></button>
        <p>Roll: {props.rollDisplay}</p>
        <button id="endTurn" onClick={props.nextPlayer} disabled={ props.turnStage == "TRADE/BUILD" ? false : true }>End turn</button>
        <button onClick={props.openHelpModal}>Help</button>
        <button id="tradeBank" onClick={props.openTradeBankModal}>Trade with bank</button>
        <button id="tradePlayers">Trade with other players</button>
      </div>
    </div>
  )
}

export { PlayerTab };