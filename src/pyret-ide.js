/**
 * pyret-ide core module
 * @module pyret-ide
 */
// This file exposes the api that consumers will use to interact
// with the pyret-ide library.
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import firebase from 'firebase';

import PyretIDE from './components/PyretIDE';
import {LanguageError, UserError} from './errors';
import HoverHighlight from './components/HoverHighlight';
import createStore from './redux/createStore';
import {configureIDE} from './redux/actionCreators';

export { LanguageError, UserError, HoverHighlight };

  /**
   * Initialize the pyret-ide library
   * @function
   * @param {Object} config - configuration for pyret-ide
   * @param {element} config.rootEl - root dom node to render the ide into.
   *                           Should be a child of document.body
   * @param {function} config.runtimeApiLoader - function returning a promise
   *                                             that loads a runtime api
   * @param {boolean} [config.debug=false] - Whether or not to enable debug logging
   * @param {boolean} [config.skipCSSLoading=false] - Whether or not to skip loading
   *                                                  of CSS used by pyret-ide
   * @param {Object} [config.codemirrorOptions] - Config object passed to codemirror
   */
export function init({rootEl, runtimeApiLoader, debug, skipCSSLoading,
        codemirrorOptions, firebaseConfig}) {
  if (!skipCSSLoading) {
    require('bootstrap/less/bootstrap.less');
  }
  const store = createStore({debug});
  store.dispatch(configureIDE({codemirrorOptions, runtimeApiLoader}));
  if (firebaseConfig) {
    firebase.initializeApp(firebaseConfig);
  } else {
    console.warn("Configure firebase before initializing!");
  }
  ReactDOM.render(
    <Provider store={store}>
      <PyretIDE />
    </Provider>,
    rootEl
  );
}

