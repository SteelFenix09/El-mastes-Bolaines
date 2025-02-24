import React from 'react'
import { Menu } from '../componentes/inicio'
import {Fouter} from '../page/Fouter'

export function Layout({children}) {
  return (
    <div>
    <div className='menu'>
    <Menu />
    </div>
    <div className='body' > {children}    </div>
    <div className='footer'>
    <Fouter />
    </div>
    </div>
  )
}

export default Layout