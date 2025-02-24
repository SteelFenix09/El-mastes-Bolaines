import React from 'react'
import './ItemProducto.scss'

import { Card, CardText } from 'react-bootstrap'

export function ItemProductos({ producto }) {

  return (
    <Card>
      <Card.Img variant="top" src={producto.img} />
      <Card.Body id='body'>
        <Card.Title id='body__title'>{producto.nombre}</Card.Title>
        <Card.Text className='body__text'>Cantidad: {producto.cantidad} </Card.Text>
        <CardText className='body__text'>Precio: ${producto.precio}  </CardText>
        <CardText className='body__text'>Peso: {producto.unidad} </CardText>
      </Card.Body>
    </Card>
  )
}

export default ItemProductos