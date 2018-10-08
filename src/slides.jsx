import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import MediaQuery from 'react-responsive';
import bee from './images/beeBack.jpg';
import bee1 from './images/bee1.jpg';
import bee2 from './images/bee2.jpg';
import swarm from './images/beeSwarm2.jpg'
import originalHives from './images/originalHives.jpg'
import cuttingComb from './images/cuttingComb.jpg';
import honeyHarvest from './images/honeyHarvest.jpg';
import machine from './images/machine.jpg';
import supers from './images/honeySupers.jpg';
import gettingSwarm from './images/gettingSwarm.JPG';



const items = [
  {
    src: originalHives,
    altText: 'Slide 1',
    header: '',
    caption: 'Setting up our first hives in the spring of 2017'
  },
  {
    src: bee1,
    altText: 'Slide 2',
    caption: 'Some of our original hardworking bees!'
  },
  {
    src: swarm,
    altText: 'Slide 3',
    caption: 'Our bees tried to swarm a few times while we were still figuring out what we were doing. Oops!'
  },
  {
    src: gettingSwarm,
    altText: 'Slide 2',
    caption: 'Thankfully, we were able to retrieve the swarm and get our bees back!'
  },
  {
    src: bee2,
    altText: 'Slide 2',
    caption: 'Our hives continue to grow and multiply.'
  },
  {
    src: bee,
    altText: 'Slide 2',
    caption: 'Searching for the queen!'
  },
  {
    src: supers,
    altText: 'Slide 2',
    caption: 'Frames full of honey from our honey supers'
  },
  {
    src: cuttingComb,
    altText: 'Slide 2',
    caption: 'Cutting the honeycomb to free that delicious, all natural honey. Yum!'
  },
  {
    src: machine,
    altText: 'Slide 2',
    caption: 'Frames in the honey extractor ready to be spun'
  },
  {
    src: honeyHarvest,
    altText: 'Slide 2',
    caption: 'Here comes the honey!'
  },


];

class Slides extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className = "carouselItem"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <MediaQuery query="(max-width: 1224px)">
            <img src={item.src} className = "carouselImageSmall"  alt={item.altText} />
            <div  className = "test">{item.caption} </div>
            </MediaQuery>
            <MediaQuery query="(min-width: 1224px)">
              <img className = "carouselImage" src={item.src}  alt={item.altText} />
              <div className = "carouselCaption"></div>
              <CarouselCaption className = "carouselFont" captionHeader={item.header} captionText = {item.caption} />
              </MediaQuery>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        pause = 'hover'
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval = {false}
        className = "carousel"
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Slides;
