import { useEffect, useState } from 'react';
import data from './data/characters.json';

interface Character {
  name: string;
  description: string;
  image: string;  
  imageUrl?: string;  
}

interface CharacterData {
  characters: Character[];
}

const App = () => {
  const [character, setCharacter] = useState<Character | null>(null);

  const getImageUrl = (image: string) => {
 

    try {
      return require(`./assets/img/${image}`).default;  
    } catch (e) {
      console.error('Erro ao carregar a imagem:', e);
      return '';  
    }
  };

  useEffect(() => {
    const { characters } = data as CharacterData;

    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

    if (!randomCharacter.image) {
      console.error('Imagem não encontrada para o personagem', randomCharacter.name);
    }

    const imageUrl = getImageUrl(randomCharacter.image);

    setCharacter({ ...randomCharacter, imageUrl });
  }, []);

  return (
    <div className="App">
      <h1>Heróis da Marvel</h1>
      {character ? (
        <div className="character-card">
          <img src={character.image} alt={character.name} className="character-image" />
          <h2>{character.name}</h2>
          <p>{character.description}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default App;
