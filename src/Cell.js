import * as React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
  state = { active: false };

  render() {
    const { active } = this.state;
    return (
      <button
        className={'Cell' + (active ? ' active' : '')}
        onClick={() => this.setState(s => ({ active: !s.active }))}
      >
        <span>{this.props.char}</span>
      </button>
    );
  }
}
