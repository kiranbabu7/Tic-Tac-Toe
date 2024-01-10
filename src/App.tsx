import { SetStateAction, useState } from 'react'
import './App.css'

function Square({value, updateSquare}) {
  return <button className="square" onClick={updateSquare}>{value}</button>
}


function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}



function Board()  {
  const [winner, setWinner] = useState('')
  const [square, setsquare] = useState(Array(9).fill(null))
  const [presentTurn, setPresentTurn] = useState('X')
  const [history, setHistory] = useState([square])


  function updateSquare(i: number) {
    const nextSquare = square.slice()
    if(nextSquare[i]|| winner) return
    nextSquare[i] = presentTurn
    const historydata: any = history.concat([nextSquare])
    setsquare(nextSquare)
    setHistory(historydata)
    
    const getWinner = calculateWinner(nextSquare)

    if(getWinner) {
      setWinner(getWinner)
    }
    setPresentTurn( presentTurn == 'X' ? 'O' : 'X' )
    console.log(history)
  }
  function jumpTo(step:number) {
    setsquare(history[step])
  }
  console.log('history : ', history)
  const moves = history.map((_data , index) => {
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)} >Move to Step {index}</button>
      </li>
    )
  } )

  return (
    <>
      <div className="Status">{winner ? `Winner is ${winner}` : `Next Turn : ${presentTurn}`}</div>
      <div className="board-row">
        <Square value={square[0]} updateSquare={() => updateSquare(0)} />
        <Square value={square[1]} updateSquare={() => updateSquare(1)} />
        <Square value={square[2]} updateSquare={() => updateSquare(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} updateSquare={() => updateSquare(3)} />
        <Square value={square[4]} updateSquare={() => updateSquare(4)} />
        <Square value={square[5]} updateSquare={() => updateSquare(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} updateSquare={() => updateSquare(6)} />
        <Square value={square[7]} updateSquare={() => updateSquare(7)} />
        <Square value={square[8]} updateSquare={() => updateSquare(8)} />
      </div>
      <div>
        <h3>History</h3>
        <ol>
        {moves}
        </ol>
      </div>
    </>
  )
}

function App() {
  return (
    <>
    <Board/>
    </>
  )
}
export default App
