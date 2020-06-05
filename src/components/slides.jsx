import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import ImageGallery from 'react-image-gallery';
import MediaQuery from 'react-responsive';
import bee from '../images/beeBack.jpg';
import bee1 from '../images/bee1.jpg';
import bee2 from '../images/bee2.jpg';
import swarm from '../images/beeSwarm2.jpg'
import originalHives from '../images/originalHives.jpg'
import cuttingComb from '../images/cuttingComb.jpg';
import honeyHarvest from '../images/honeyHarvest.jpg';
import machine from '../images/machine.jpg';
import supers from '../images/honeySupers.jpg';
import gettingSwarm from '../images/gettingSwarm.JPG';
import closeUp from '../images/closeUpBee.jpg';
import 'react-image-gallery/styles/css/image-gallery.css'



const items = [
  {
    original: originalHives,
    altText: 'Slide 1',
    header: '',
    description: 'Setting up our first hives in the spring of 2017',
    thumbnail: originalHives,
    thumbnailClass: 'thumbnail'
  },
  {
    original: bee1,
    thumbnail: bee1,
    altText: 'Slide 2',
    description: 'Some of our original hardworking bees!'
  },
  {
    original: swarm,
    thumbnail: swarm,
    altText: 'Slide 3',
    description: 'Our bees tried to swarm a few times while we were still figuring out what we were doing. Oops!'
  },
  {
    original: gettingSwarm,
    thumbnail: gettingSwarm,
    altText: 'Slide 2',
    description: 'Thankfully, we were able to retrieve the swarm and get our bees back!'
  },
  {
    original: bee2,
    thumbnail: bee2,
    altText: 'Slide 2',
    description: 'Our hives continue to grow and multiply.',
    thumbnailClass: 'thumbnail'
  },
  {
    original: bee,
    thumbnail: bee,
    altText: 'Slide 2',
    description: 'Searching for the queen!'
  },
  {
    original: supers,
    thumbnail: supers,
    altText: 'Slide 2',
    description: 'Frames full of honey from our honey supers'
  },
  {
    original: cuttingComb,
    thumbnail: cuttingComb,
    altText: 'Slide 2',
    description: 'Cutting the honeycomb to free that delicious, all natural honey. Yum!',
    thumbnailClass: 'thumbnail'
  },
  {
    original: machine,
    thumbnail: machine,
    altText: 'Slide 2',
    description: 'Frames in the honey extractor ready to be spun'
  },
  {
    original: honeyHarvest,
    thumbnail: honeyHarvest,
    altText: 'Slide 2',
    description: 'Here comes the honey!'
  },
  {
    original: closeUp,
    thumbnail: closeUp,
    altText: 'Slide 2',
    description: 'A friendly bee!'
  },


];
const Slides = props =>(
  <div className = 'gallery'>
    <ImageGallery
      items = {items}
      showFullscreenButton = {false}
      showPlayButton = {false}
    />
  </div>
)

class OldSlides extends Component {
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
          <MediaQuery maxDeviceWidth = {1224}>
            <img src={item.src} className = "carouselImageSmall"  alt={item.altText} />
            <div  className = "test">{item.description} </div>
            </MediaQuery>
            <MediaQuery minDeviceWidth = {1224}>
              <img className = "carouselImage" src={item.src}  alt={item.altText} />
              <div className = "carouseldescription"></div>
              <CarouselCaption className = "carouselFont" descriptionHeader={item.header} descriptionText = {item.description} />
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
