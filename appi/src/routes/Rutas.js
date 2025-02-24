import React from 'react'
import { Route, Routes } from "react-router-dom"
import { HomeProductos } from '../componentes/producto'
import { Home } from '../page'
import { Layout } from '../layouts'
import {Productos} from './../componentes/formulario'

export function Rutas() {
    const Layouts = (Layout, Page) => (
        <Layout>
            <Page />
        </Layout>
    )

    return (
        <Routes>
            <Route path="/"element={Layouts(Layout, Home)} />
            <Route path="/producto" element={Layouts(Layout,HomeProductos)} />
            <Route path="/formsproductos" element={Layouts(Layout,Productos)} />
        </Routes>
    )
}

export default Rutas