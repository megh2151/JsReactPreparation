
import useCharacterOccurance from '../hooks/useCharacterOccurance';

function CharacterOccurance() {
    const { input, setInput, result, handleClick } = useCharacterOccurance();

    return (
        <div className="App">
      <header className="App-header">
            <div className="character-occurrence-title">
                <h2>Character Occurance</h2>
            </div>
            <div className="character-occurrence-input">
                <input type="text" placeholder="Enter a string" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="character-occurrence-button">
                <button onClick={handleClick}>Calculate</button>   
            </div>
            <div className="character-occurrence-result">
                <div>Result: {result}</div>
            </div>
        </header>
        </div>
    )

}

export default CharacterOccurance;
