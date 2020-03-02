import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

import '../css/DevelopmentCardsModal.css';

const DevelopmentCardsModal = (props) => {
  const cardCSSClass = (card) => {
    return card.replace(/ /g, '_').toLowerCase();
  }
  const CSSClassCard = (css) => {
    const dict = {
      "year_of_plenty": "Year of Plenty",
      "road_building": "Road Building",
      "knight": "Knight",
      "monopoly": "Monopoly",
    }
    return dict[css]
  }

  const playCard = (e) => {
    let card = CSSClassCard(e.target.className.replace('developmentCard ', ''));
    for (let i = 0; i < props.whoseTurn.purchased_cards.length; i++) {
      if (card === props.whoseTurn.purchased_cards[i]) {
        props.whoseTurn.played_cards.push(props.whoseTurn.purchased_cards.splice(i, 1)[0]);
        break;
      }
    }
    props.hideDevelopmentCardsModal();
    props.cardEffects(card);
  }

  return (
    <Modal size={'lg'} show={props.showDevelopmentCardsModal} onHide={props.hideDevelopmentCardsModal}>
      <Modal.Header closeButton>
        <Modal.Title>Select (click) a card to use</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.whoseTurn.purchased_cards && props.whoseTurn.purchased_cards.length ? props.whoseTurn.purchased_cards.map(card => {
          return <div onClick={playCard} className={'developmentCard '+cardCSSClass(card)}><p>{card}</p></div>
        })
        : <p>No available cards</p>}
      </Modal.Body>
    </Modal >
  )
}

export { DevelopmentCardsModal };