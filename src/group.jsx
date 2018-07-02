import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';
 import { LinkContainer } from 'react-router-bootstrap'
 import bee2 from "./images/bee2.jpg";
 import bee1 from "./images/bee1.jpg";
 import honey from './images/honey.jpg'

const Group = (props) => {
  return (
    <CardDeck>
      <Card>
        <CardImg top width="100%" src= {bee2} alt="Card image cap" />
        <CardBody>
          <CardTitle>Local Bees</CardTitle>
          <CardSubtitle>Located on the Johnston/Wake County line in Wendell, North Carolina</CardSubtitle>
          <CardText></CardText>
          <LinkContainer to = '/about'><Button>About Us</Button></LinkContainer>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src={honey} alt="Card image cap"/>
        <CardBody>
          <CardTitle>Local Honey</CardTitle>
          <CardSubtitle>100% all natural honey straight from the hive</CardSubtitle>
          <CardText></CardText>
          <LinkContainer to = '/buy-honey'><Button>Buy Now</Button></LinkContainer>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src= {bee1} alt="Card image cap" />
        <CardBody>
          <CardTitle>Something else</CardTitle>
          <CardSubtitle>Something interesting? going for a Local Bees, Local Honey, Local _______</CardSubtitle>
          <CardText></CardText>
          <Button>Something</Button>
        </CardBody>
      </Card>
    </CardDeck>
  );
};

export default Group;
