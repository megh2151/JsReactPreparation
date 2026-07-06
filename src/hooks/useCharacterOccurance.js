import { useState } from 'react';

function useCharacterOccurance() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = () => {
        if (!input) {
            setResult('');
            return;
        }

        // Step 1: count each character
        const freq = {};
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            freq[char] = (freq[char] || 0) + 1;
        }

        // Step 2: find character with highest count
        let maxChar = '';
        let maxCount = 0;
        for (const char in freq) {
            if (freq[char] > maxCount) {
                maxCount = freq[char];
                maxChar = char;
            }
        }

        setResult(maxChar);
    };

    return { input, setInput, result, handleClick };
}

export default useCharacterOccurance;