import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Button } from 'semantic-ui-react';
import 'react-day-picker/lib/style.css';
import './DateRangePicker.css';
export default class DateRangePicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleApplyClick = _ => {
    this.props.onApply(this.state.from, this.state.to);
    this.setState({open: false});
  }

  handleDayClick(day, {disabled}) {
    if (!disabled) {
      const range = DateUtils.addDayToRange(day, this.state);
      this.setState(range);
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  openArea = _ => {
    this.setState({open: true});
  }

  isDisabledDate = (day) => {
    const today = new Date();
    return day.getDay() === 0 || day.getDay() === 6 || day > today;
  }

  setLastXDays = x => {
    let lastXDays = new Date();
    lastXDays.setDate(lastXDays.getDate() - x);
    let today = new Date();
    this.setState({
      from: lastXDays,
      to: today
    });
    this.props.onApply(lastXDays, today);
  }

  setLastDay = _ => {
    this.setLastXDays(1);
  }

  setLast3Day = _ => {
    this.setLastXDays(3);
  }

  setLastWeek = _ => {
    this.setLastXDays(7);
  }

  render() {
    const { from, to, open } = this.state;
    const modifiers = { start: from, end: to };

    const openButton = (!open && 
      <p>
        {from &&
          to &&
          `Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`
        }
        { (!from || !to) && "No date range is selected."}
        <br />
        <br />
        <Button secondary onClick={this.openArea}>
          Custom
        </Button>    
        <Button secondary onClick={this.setLastDay}>
          Last Day
        </Button>   
        <Button secondary onClick={this.setLast3Day}>
          Last 3 Day
        </Button>        
        <Button secondary onClick={this.setLastWeek}>
          Last Week
        </Button>                    
      </p>
    );

    const openArea = ( open &&
      <>
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`
          }
          {' '}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          disabledDays={ this.isDisabledDate }
          toMonth = {new Date()}
        />

        {
          from &&
            to && (
              <>
                <Button secondary onClick={this.handleResetClick}>
                  Reset
                </Button>
                <Button secondary  onClick={this.handleApplyClick}>
                  Apply
                </Button>              
              </>
            )
        }    
      </>
    );

    return (
      <div className="RangeExample">
        {openButton}
        {openArea}
      </div>
    );
  }
}
