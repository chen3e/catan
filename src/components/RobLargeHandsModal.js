import React, { useState, useEffect, useReducer } from 'react';
import '../css/PlayerInfoTab.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { RobLargeHandsForm } from '../components/RobLargeHandsForm';

const RobLargeHandsModal = (props) => {
  return (
    <Modal show={!!props.playerLosingResources} hide={props.chooseLostResources} backdrop="static">
      <Modal.Header>
        <Modal.Title>{props.playerLosingResources ? props.playerLosingResources.name : <p></p>}, choose {props.numberResourcesToLose} resources to lose</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.playerLosingResources ? <RobLargeHandsForm ore={props.playerLosingResources.ore} brick={props.playerLosingResources.brick} lumber={props.playerLosingResources.lumber} wheat={props.playerLosingResources.wheat} sheep={props.playerLosingResources.sheep} numberResourcesToLose={props.numberResourcesToLose} chooseLostResources={props.chooseLostResources} resourcesLost={props.resourcesLost} setResourcesLost={props.setResourcesLost}/> : <p></p>}
        </div>
      </Modal.Body>
    </Modal >
  )
}

export { RobLargeHandsModal };