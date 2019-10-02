import React from 'react';
import { Card, CardTitle } from 'reactstrap';


const MarketList = (props) =>(
  <Card className = 'markets'>
    <CardTitle>Upcoming Markets</CardTitle>
    <table className = 'marketTable'>
      <tbody>
        <tr>
          <th>Market</th>
          <th>Date</th>
        </tr>
    {props.marketList.sort((a,b)=>a.date - b.date).map((market,i)=>{
      return(
      <tr key = {i}>
        <td>{market.name}</td>
        <td>{market.date.format('MM-DD')}</td>
      </tr>
      )
    }
  )}
  </tbody>
</table>

  </Card>
)


export default MarketList
