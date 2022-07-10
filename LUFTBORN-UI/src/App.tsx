import './App.css';
import React, { Component, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

const List = React.lazy(() => import('./Components/List'));
const Details = React.lazy(() => import('./Components/Details'));
const Create = React.lazy(() => import('./Components/Create'));
const Update = React.lazy(() => import('./Components/Update'));



export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Suspense fallback={''}>

            <Routes>
              <Route path="/" element={<List />} />
              <Route path='/details' element={<Details />} />
              <Route path='/create' element={<Create />} />
              <Route path='/update' element={<Update />} />

            </Routes>

          </Suspense>


        </div>

      </div>
    )
  }
}