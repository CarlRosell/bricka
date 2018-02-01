import * as React from 'react';
import shuffleArray from './shuffleArray';
import { createAlphaRange, createNumberRange } from './createRange';
import './Bingo.css';
import Cell from './Cell';

const generateInitialState = ({
  firstNumber,
  lastNumber,
  isNumeric,
  firstLetter,
  lastLetter,
  turn
}) => {
  const chars = isNumeric
    ? createNumberRange(firstNumber, lastNumber)
    : createAlphaRange(firstLetter, lastLetter);
  return {
    chars,
    shuffledChars: shuffleArray([...chars]).splice(0, 9),
    firstNumber,
    lastNumber,
    firstLetter,
    lastLetter,
    isNumeric,
    turn: turn + 1,
    active: isNumeric
      ? `${firstNumber}-${lastNumber}`
      : `${firstLetter}-${lastLetter}`
  };
};

export default class Bingo extends React.Component {
  constructor(props) {
    super(props);
    this.state = generateInitialState({
      firstNumber: 1,
      lastNumber: 10,
      isNumeric: true,
      firstLetter: 'a',
      lastLetter: 'i',
      turn: 0
    });
  }

  reset = () => {
    this.setState(s => generateInitialState(s));
  };

  updateSettings = ({ isNumeric, first, last }) => {
    if (isNumeric === true) {
      this.setState(s =>
        generateInitialState({
          ...s,
          isNumeric,
          firstNumber: first,
          lastNumber: last
        })
      );
    } else {
      this.setState(s =>
        generateInitialState({
          ...s,
          isNumeric,
          firstLetter: first,
          lastLetter: last
        })
      );
    }
  };

  renderButton = (isNumeric, first, last) => (
    <button
      className={this.state.active === `${first}-${last}` ? 'active' : ''}
      onClick={() => this.updateSettings({ isNumeric, first, last })}
    >
      {`${first}-${last}`}
    </button>
  );

  render() {
    const { shuffledChars, turn } = this.state;
    return (
      <div>
        {this.renderButton(true, 1, 10)}
        {this.renderButton(true, 10, 20)}
        {this.renderButton(true, 1, 20)}
        {this.renderButton(false, 'a', 'i')}
        {this.renderButton(false, 'j', 's')}
        {this.renderButton(false, 't', 'ö')}
        {this.renderButton(false, 'a', 'ö')}
        <div className="Game">
          <div className="Container">
            {shuffledChars.map(char => {
              return <Cell key={`${turn}_${char}`} char={char} />;
            })}
          </div>
        </div>
        <button onClick={this.reset}>Börja om</button>
      </div>
    );
  }
}
