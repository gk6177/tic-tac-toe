

export default function GameBoard({ onSelectSquare, board }) {
   return (
      <ol id="game-board">
         {board.map((row, rowIndex) => (
            <li key={rowIndex}>
               <ol>
                  {row.map((playerSymbol, colIndex) => (
                     <li key={colIndex} >
                        <button className="square" onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                           {playerSymbol === null
                              ? ''
                              : playerSymbol === 'X'
                                 ? '\u2715'
                                 : '\u25EF'}
                        </button>
                     </li>
                  ))}
               </ol>
            </li >
         ))}
      </ol >
   );
} 