import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';
 import { LinkContainer } from 'react-router-bootstrap'
 import bee2 from "./images/bee2.jpg";
 import bee1 from "./images/bee1.jpg";
 import honey from './images/honey.jpg'

const Group = (props) => {
  return (
    <CardDeck className = 'homepageDeck'>
      <Card className = "homepageCard" id = 'one'>
        <CardImg className ="cardImg" top width="100%" src= {bee2} alt="Card image cap" />
        <CardBody>
          <CardTitle>Local Bees</CardTitle>
          <CardSubtitle>Located on the Johnston/Wake County line in Wendell, North Carolina</CardSubtitle>
          <CardText></CardText>
          <LinkContainer to = '/about'><Button>About Us</Button></LinkContainer>
        </CardBody>
      </Card>
      <Card className = 'homepageCard' id ='two'>
        <CardImg top width="100%" src={honey} alt="Card image cap"/>
        <CardBody>
          <CardTitle>Local Honey</CardTitle>
          <CardSubtitle>Find out where we'll be selling honey locally or buy online.</CardSubtitle>
          <CardText></CardText>
          <LinkContainer to = '/buy-honey'><Button className = 'cardButton'>Buy Now</Button></LinkContainer>
        </CardBody>
      </Card>
      <Card className = 'homepageCard' id='three'>
        <CardImg top width="100%" src= {bee1} alt="Card image cap" />
        <CardBody>
          <CardTitle>For a Good Cause</CardTitle>
          <CardSubtitle>Learn about Colony Collapse Disorder and what you can do to help!</CardSubtitle>
          <CardText></CardText>
            <LinkContainer to = '/help-the-bees'><Button>Learn Here</Button></LinkContainer>
        </CardBody>
      </Card>
    </CardDeck>
  );
};

export default Group;
