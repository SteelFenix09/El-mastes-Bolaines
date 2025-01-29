import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import "./Ejemplo01.scss"

//hooks useState

function Ejemplo01() {
    const [contador, setContador] = useState(0)

    const incrementar = () => {
        setContador(contador + 1)
    }

    const decrementar = () => {
        setContador(contador + - 1)
    }

    return (
        <div className='container-celda'>
            <h1>Incremento: {contador}</h1>
            <div className='container-celda__button'>
                <Button variant="primary" onClick={incrementar}><i class="bi bi-plus-circle"></i></Button>
                <Button variant="primary" onClick={decrementar}><i class="bi bi-dash-circle"></i></Button>
            </div>
        </div>
    )
}

export default Ejemplo01