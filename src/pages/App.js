import React, { useEffect } from 'react';
import beeLogo from '../images/beeLogo.png'
import {useMediaQuery} from 'react-responsive'
import Group from '../components/group.jsx'


  // const testServer = async () =>{
    
  //   let response = await fetch('api/test')
  //   let test = await response.json();
  //   console.log(test)
  //   // let testEmail = await fetch('api/test-email');
  //   // let res = await testEmail.json();
  //   // console.log(res)
  // }



  const App = props => {
    // useEffect(()=>{
    //   //testServer();
    // },[])
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    return (
      <div>
        <div>
          {!isTabletOrMobile ? (
            <div className = "banner">
              <div className = "bannerLeft"></div>
              <div className = "bannerRight">
                <div className = "bannerText">
                  <h3>Delicious, pure honey made by our hardworking bees on the Johnston-Wake County Line.</h3>
                </div>
              </div>
            </div>
          ) : (
            <div id = 'mobileHeader' style = {{color: "white"}}>
              <img className = "mobileImage" src = {beeLogo} alt = "Bee Logo"/>
              <h6 style = {{width: "80%", margin: "auto"}}>Delicious, pure honey made by our hardworking bees on the Johnston-Wake County Line.</h6>
            </div>
            )
          }
        </div>
        <div className = "deck">
          <Group></Group>
        </div>
      </div>
    );
  }

export default App;
