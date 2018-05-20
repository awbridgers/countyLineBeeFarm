import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import bee from './images/beeBack.jpg';
import logoSmall from "./images/beeLogoSmall.png";
import bee1 from './images/bee1.jpg';
import bee2 from './images/bee2.jpg';
import MediaQuery from 'react-responsive'

const items = [
  {
    src: bee,
    srcSmall:logoSmall,
    altText: 'Slide 1',
    header: ''
  },
  {
    src: bee1,
    altText: 'Slide 2',
    caption: ''
  },
  {
    src: bee2,
    altText: 'Slide 3',
    caption: ''
  }
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
          <MediaQuery query="(max-device-width: 1224px)">
            <img src={item.srcSmall}  alt={item.altText} />
            <CarouselCaption  captionHeader={item.header} captionText = {item.caption} />
            </MediaQuery>
            <MediaQuery query="(min-device-width: 1224px)">
              <img src={item.src}  alt={item.altText} />
              <CarouselCaption  captionHeader={item.header} captionText = {item.caption} />
              </MediaQuery>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval = "8000"
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
