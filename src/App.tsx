import { useEffect, useState } from 'react';
import { characters, Character } from './data/characters';

interface CharacterWithImageUrl extends Character {
  imageUrl: string;
}

const App = () => {
  const [character, setCharacter] = useState<CharacterWithImageUrl | null>(null);

  const getImageUrl = async (image: string): Promise<string> => {
      const imageModule = await import(`../src/assets/img/${image}`);
      return imageModule.default;
  };

  useEffect(() => {
    const fetchCharacter = async () => {
      const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

      const imageUrl = await getImageUrl(randomCharacter.image);

     setCharacter({ ...randomCharacter, imageUrl });
    };

    fetchCharacter();
  }, []);

  if (!character) {
    return <p>Erro</p>;
  }

  return (
    <div className="App">
      <h1>Heróis da Marvel</h1>
      <div className="character-card">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="character-image"
        />
        <h2>{character.name}</h2>
        <p>{character.description}</p>
      </div>
    </div>
  );
};

export default App;
