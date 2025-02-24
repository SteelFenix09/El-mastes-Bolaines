import React from 'react'

import {Col, Row, Tab,Tabs} from 'react-bootstrap'

import { ItemProductos } from '../ItemProductos'
import { Datos } from '../../../utils';

export function HomeProductos() {
  console.log();
  const fondo={
    tema:{
      backgroundColor:'black',
      color:"white",
      fontSize:'20px'
    }
  }
  
  return (
    <div className='container' style={fondo.tema}>
      <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="profile" title="Lista Productos">
        <Row xs={1} sm={1}  md={2} lg={3} >
        {
          Datos.map((producto)=>(
            <Col>
            <div className='p-2 '>
            <ItemProductos producto={producto} />
            </div>
            </Col>
          ))
        }
        </Row>
      </Tab>
      
    </Tabs>
    </div>
  )
}

export default HomeProductos