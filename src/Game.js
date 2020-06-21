import React from 'react';

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={props.onClick}
      key={props.i}
    >
      {props.value}
    </button>
  )
}


class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: props.size
    }
  }

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      key={i}
    />;
  }

  renderARow(i) {
    let arr = []
    for (let j = 0; j < this.state.size; ++j) {
      arr.push(j)
    }
    return (
      <div className="board-row" key={i}>
        {arr.map((v, j) => this.renderSquare(i * this.state.size + j))}
      </div>
    )
  }

  render() {
    let arr = []
    for (let j = 0; j < this.state.size; ++j) {
      arr.push(j)
    }

    return (
      <div>
        {arr.map((v, j) => this.renderARow(j))}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      size: this.props.size,
      history: [{
        squares: Array(this.props.size * this.props.size).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(this.state.size, squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? '●' : '○'
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState(() => ({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    }))
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(this.state.size, current.squares)

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className="btn btn-sm btn-outline-secondary mt-1">{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? '●' : '○')
    }

    return (
      <div className="container">
        <h1 className="display-4 text-center my-5">five-in-a-row</h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              size={this.state.size}
            />
          </div>
          <div className="game-info ml-5">
            <div className="h4">{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

const calculateWinner = (size, squares) => {
  for (let t = 0; t < size * size; ++t) {
    if (squares[t] &&
      squares[t] === squares[t + 1] &&
      squares[t] === squares[t + 2] &&
      squares[t] === squares[t + 3] &&
      squares[t] === squares[t + 4]) {
      return squares[t]
    }
    if (squares[t] &&
      squares[t] === squares[t + size] &&
      squares[t] === squares[t + 2 * size] &&
      squares[t] === squares[t + 3 * size] &&
      squares[t] === squares[t + 4 * size]) {
      return squares[t]
    }
    if (squares[t] &&
      squares[t] === squares[t + size + 1] &&
      squares[t] === squares[t + 2 * (size + 1)] &&
      squares[t] === squares[t + 3 * (size + 1)] &&
      squares[t] === squares[t + 4 * (size + 1)]) {
      return squares[t]
    }
    if (squares[t] &&
      squares[t] === squares[t + size - 1] &&
      squares[t] === squares[t + 2 * (size - 1)] &&
      squares[t] === squares[t + 3 * (size - 1)] &&
      squares[t] === squares[t + 4 * (size - 1)]) {
      return squares[t]
    }

  }
  return null
}

export default Game;