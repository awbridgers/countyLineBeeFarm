import React from 'react';
import Loader from 'react-spinners/RingLoader';


const LoadingScreen = props =>(
  <div className = 'loadingScreen'>
    <div>
      <Loader
        color = '#CFB53B'
        height = {20}
        width = {8}
        margin = {10}
      />
    </div>
    <div>
      <h4>{props.message}</h4>
    </div>
  </div>
)

export default LoadingScreen
