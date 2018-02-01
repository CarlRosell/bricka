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
    active: isNumeric ? `${firstNumber}-${lastNumber}` : `${firstLetter}-${lastLetter}`
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
      turn: 0,
    });
  }

  reset = () => {
    this.setState(s => generateInitialState(s));
  };

  updateSettings = ({isNumeric, firstNumber, lastNumber, firstLetter, lastLetter}) => {
    if (isNumeric === true) {
      this.setState(s => generateInitialState({ ...s, isNumeric, firstNumber, lastNumber }));
    } else {
      this.setState(s => generateInitialState({ ...s, isNumeric, firstLetter, lastLetter }));
    }
  };

  render() {
    const {
      shuffledChars,
      turn,
      active,
    } = this.state;
    return (
      <div>
        <button className={active === '0-9' ? 'active' : '' } onClick={() => this.updateSettings({isNumeric: true, firstNumber: 1, lastNumber: 10})}>1-10</button>
        <button className={active === '10-20' ? 'active' : '' } onClick={() => this.updateSettings({isNumeric: true, firstNumber: 10, lastNumber: 20})}>10-20</button>
        <button className={active === '1-20' ? 'active' : '' } onClick={() => this.updateSettings({isNumeric: true, firstNumber: 1, lastNumber: 20})}>1-20</button>
        <button className={active === 'a-i' ? 'active' : '' } onClick={() => this.updateSettings({isNumeric: false, firstLetter: 'a', lastLetter: 'i'})}>A-I</button>
        <button className={active === 'j-s' ? 'active' : '' } onClick={() => this.updateSettings({isNumeric: false, firstLetter: 'j', lastLetter: 's'})}>J-S</button>
        <button className={active === 't-ö' ? 'active' : '' } onClick={() => this.updateSettings({isNumeric: false, firstLetter: 't', lastLetter: 'ö'})}>T-Ö</button>
        <button className={active === 'a-ö' ? 'active' : '' } onClick={() => this.updateSettings({isNumeric: false, firstLetter: 'a', lastLetter: 'ö'})}>A-Ö</button>
        <div className="Game">
          <div className="Container">
            {shuffledChars.map((char) => {
              return (
                <Cell key={`${turn}_${char}`} char={char} />
              );
            })}
          </div>
        </div>
        <button onClick={this.reset}>Börja om</button>
      </div>
    );
  }
}
