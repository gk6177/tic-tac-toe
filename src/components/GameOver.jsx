import { useEffect, useRef } from 'react';

export default function GameOver({ winner, onRestart, winSound }) {

    const audioRef = useRef(null);

    useEffect(() => {
        if (!winSound) return;


        if (typeof winSound === 'string') {
            audioRef.current = new Audio(winSound);
            audioRef.current.preload = 'auto';
        } else {

            audioRef.current = winSound;
        }


        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }, [winSound]);

    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner ? <p>{winner} won!</p> : <p>It's a draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    );
}
