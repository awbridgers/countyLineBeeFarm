import React from 'react';
import { Card, CardTitle } from 'reactstrap';


const MarketList = (props) =>(
  <Card className = 'markets'>
    <CardTitle>Find us at these upcoming local markets!</CardTitle>
    <table className = 'marketTable'>
      <tbody>
        <tr>
          <th>Market</th>
          <th>Date</th>
        </tr>
        <tr>
          <td>Wendell Farmers' Market</td>
          <td>Saturdays, May 16th-Oct. 3rd</td>
        </tr>
    {props.marketList.sort((a,b)=>a.date - b.date).map((market,i)=>{
      // console.log(market.date)
      return(
      <tr key = {i}>
        <td>{market.name}</td>
        <td>{market.date.format('dddd, MMM. Do')}</td>
      </tr>
      )
    }
  )}
  </tbody>
</table>

  </Card>
)


export default MarketList
