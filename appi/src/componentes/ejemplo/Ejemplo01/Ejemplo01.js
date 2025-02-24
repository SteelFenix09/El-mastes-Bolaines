import React, { useState } from 'react'
import "./Ejemplo01.scss"

import { Ejemplo02 } from '../Ejemplo02'

export function Ejemplo01() {

  const [contador, setContador] = useState(0)

  const incrementar = () => {
    setContador(contador + 1)
  }

  const decremento = () => {
    setContador(contador + - 1)
  }

  const fondo = {
    tema: {
      backgroundColor: 'black',
      color: 'white'
    }
  }
  return (
    <div>
      <Ejemplo02 contador={contador}
        incrementar={incrementar}
        decrementar={decremento}
        fondo={fondo} />
    </div>
  )
}

export default Ejemplo01