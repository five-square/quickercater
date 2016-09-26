import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentAdd from 'material-ui/svg-icons/content/add';

/**
 * Non-linear steppers allow users to enter a multi-step flow at any point.
 *
 * This example is similar to the regular horizontal stepper, except steps are no longer
 * automatically set to `disabled={true}` based on the `activeStep` prop.
 *
 * We've used the `<StepButton>` here to demonstrate clickable step labels.
 */
export default class HorizontalNonLinearStepper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      packageArray: ['Delivery', 'Truck', 'On-site', 'Something Else', 'Something more'],
      packageDisplay: null,
    };
  }

  componentWillMount() {
    this.setState({
      packageDisplay: this.state.packageArray[this.state.stepIndex],
    });
  }

  getStepContent(stepIndex) {
    console.log(this.state.packageArray[stepIndex]);
    return this.state.packageArray[stepIndex];
  }

  handleSelect(stepIndex) {
    this.setState({
      stepIndex,
      packageDisplay: this.state.packageArray[stepIndex],
    });
  }

  handleNext() {
    const { stepIndex } = this.state;
    if (stepIndex < this.state.packageArray.length - 1) {
      this.setState({
        stepIndex: stepIndex + 1,
        packageDisplay: this.state.packageArray[stepIndex + 1],
      });
    }
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        packageDisplay: this.state.packageArray[stepIndex - 1],
      });
    }
  }

  render() {
    const { stepIndex } = this.state;
    const contentStyle = { textAlign: 'center' };

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper linear={false} activeStep={stepIndex}>
          {this.state.packageArray.map((e, index) =>
            <Step key={index}>
              <StepButton onTouchTap={() => this.handleSelect(index)}>
                {e}
              </StepButton>
            </Step>
          )}
        </Stepper>
        <div style={contentStyle}>
          <div style={{ marginTop: 12 }}>
            <ul>
              <li style={{ display: 'inline-block' }}>
                <FloatingActionButton
                  disabled={stepIndex === 0}
                  onTouchTap={e => this.handlePrev(e)}
                  style={{ marginRight: 12 }}
                >
                  <ContentRemove />
                </FloatingActionButton>
              </li>
              <li>
                <span>{this.state.packageDisplay}</span>
              </li>
              <li>
                <FloatingActionButton
                  disabled={stepIndex === this.state.packageArray.length - 1}
                  onTouchTap={e => this.handleNext(e)}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
