import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/VertexOverlay.css';

const HelpModal = (props) => {
  return (
    <Modal show={props.showHelpModal} onHide={props.hideHelpModal}>
      <Modal.Header closeButton>
        <Modal.Title>Build/trade options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Settlement: 1 wheat, 1 lumber, 1 brick, 1 sheep</p>
          <p>Road: 1 lumber, 1 brick</p>
          <p>City: 2 wheat, 3 ore (on preexisting settlement)</p>
          <p>Development card: 1 wheat, 1 ore, 1 sheep</p>
        </div>
        <div>
          <p><span className="examplePort triplePort"></span>: triple port</p>
          <p><span className="examplePort wheatPort"></span>: wheat port</p>
          <p><span className="examplePort lumberPort"></span>: lumber port</p>
          <p><span className="examplePort brickPort"></span>: brick port</p>
          <p><span className="examplePort orePort"></span>: ore port</p>
          <p><span className="examplePort sheepPort"></span>: sheep port</p>
        </div>
        <div>
          <p>Trade with bank: 4 of one resource in exchange for any 1 resource</p>
          <p>Trade with ports: 3 of one resource or 2 of port-specific resource in exchange for any 1 resource</p>
        </div>
      </Modal.Body>
    </Modal >
  )
}

export { HelpModal };