import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import KeyLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import PackageCard from './PackageCard';
// import AddPackageCard from './AddPackageCard';

export default class PackageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slidePosition: 0,
    };
  }

  next() {
    this.reactSwipe.next();
    console.log('slide changed', this.reactSwipe.getPos());
    this.setState({ slidePosition: this.reactSwipe.getPos() });
  }

  prev() {
    this.reactSwipe.prev();
    console.log('slide changed', this.reactSwipe.getPos());
    this.setState({ slidePosition: this.reactSwipe.getPos() });
  }

  render() {
    console.log('Current slidePosition in render: ', this.props.packages, this.state.slidePosition);

    const swipeOptions = {
      startSlide: 0,
      auto: 0,
      speed: 300,
      disableScroll: false,
      continuous: true,
      slidesPerView: 2,
    };
            // {this.props.editing
            //   ? <AddPackageCard
            //     key={this.props.package.length}
            //     addNewPackage={this.props.addNewPackage}
            //   />
            //   : null
            // }

    return (
      <Paper zDepth={2} style={this.props.style.paper}>
        <div className="center" style={this.props.style.slider}>
          <ReactSwipe
            ref={c => { this.reactSwipe = c; }}
            className="mySwipe"
            swipeOptions={swipeOptions}
            key={this.props.packages.length}
          >
            {this.props.packages.map((pack, index) =>
              <div key={index} style={this.props.style.div}>
                <PackageCard
                  style={this.props.style.card}
                  ownerId={this.props.ownerId}
                  editing={this.props.editing}
                  pack={pack}
                />
              </div>
            )}
          </ReactSwipe>
          <div>
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
        </div>
        <Card style={this.props.style.description}>
          <CardTitle
            title={this.props.packages[this.state.slidePosition].name}
          />
          <CardText>
            {this.props.packages[this.state.slidePosition].description}
          </CardText>
        </Card>
      </Paper>
    );
  }
}
