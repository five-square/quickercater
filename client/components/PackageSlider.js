import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import KeyLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import PackageCard from './PackageCard';

export default class PackageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slidePosition: 0,
    };
  }

  next() {
    this.reactSwipe.next();
    this.setState({ slidePosition: this.reactSwipe.getPos() });
  }

  prev() {
    this.reactSwipe.prev();
    this.setState({ slidePosition: this.reactSwipe.getPos() });
  }

  render() {
    const swipeOptions = {
      startSlide: 0,
      auto: 0,
      speed: 300,
      disableScroll: false,
      continuous: true,
      slidesPerView: 1,
    };

    return (
      <Paper zDepth={2} style={this.props.style.paper}>
        <div className="center" style={this.props.style.slider}>
          <ReactSwipe
            ref={c => { this.reactSwipe = c; }}
            className="mySwipe"
            swipeOptions={swipeOptions}
            key={this.props.packages.length + 1}
          >
            {this.props.packages.map((pack, index) =>
              <div key={index} style={this.props.style.div}>
                <PackageCard
                  style={this.props.style.card}
                  ownerId={this.props.ownerId}
                  editing={this.props.editing}
                  pack={pack}
                  count={this.props.packages}
                  add={this.props.add}
                  edit={this.props.edit}
                  delete={this.props.delete}
                />
              </div>
            )}
          </ReactSwipe>
          <FloatingActionButton
            style={this.props.style.floatingLeftButton}
            onTouchTap={e => this.prev(e)}
          >
            <KeyLeft />
          </FloatingActionButton>
          <FloatingActionButton
            style={this.props.style.floatingRightButton}
            onTouchTap={e => this.next(e)}
          >
            <KeyRight />
          </FloatingActionButton>
        </div>
      </Paper>
    );
  }
}
