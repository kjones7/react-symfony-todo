/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

document.querySelector('button').addEventListener('click', function() {
  var text = document.querySelector('input').value;
  var li = document.createElement('li');
  li.innerText = text;
  document.querySelector('ul').append(li);
  document.querySelector('input').value = '';
});


// Render React component
const root = createRoot(document.getElementById('react-test'));
root.render(<h1>Hello, world</h1>);
