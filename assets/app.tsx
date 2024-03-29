/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from 'react'
import ReactDOM from 'react-dom/client'

// any CSS you import will output into a single css file (app.css in this case)
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/app.css'

// start the Stimulus application
// import './bootstrap';
import Todo from './Todo'

// Render React component
const root = ReactDOM.createRoot(
  document.getElementById('react-test') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
)
