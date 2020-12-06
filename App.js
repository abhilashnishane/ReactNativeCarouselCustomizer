/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import KeepAwake from 'react-native-keep-awake';
import Main from './src/Main';
import DragTest from './src/DragTest';

function App() {
  return (
    <>
      <KeepAwake />
      <Main />
      {/* <DragTest /> */}
    </>
  )
}

export default App;
