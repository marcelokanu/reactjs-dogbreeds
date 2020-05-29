import React, { useState, ChangeEvent, useEffect } from 'react';
import { Container, Box, TextField, Button } from '@material-ui/core';
import ShowModal from '../../components/Modal/index.js';
// import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface IBreeds {
  id: number;
  name: string;
  bredFor: string;
  breedGroup: string;
  lifeSpan: string;
  temperament: string;
  origin: string;
  weight: {
    imperial: string;
    metric: string;
  };

  height: {
    imperial: string;
    metric: string;
  };
}

const ListBreeds: React.FC = () => {
  const [breeds, setBreeds] = useState<IBreeds[]>(() => {
    const storageBreeds = localStorage.getItem('@BreedsExplorer:breeds');

    if (storageBreeds) {
      return JSON.parse(storageBreeds);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@BreedsExplorer:breeds', JSON.stringify(breeds));
  }, [breeds]);

  async function handleFindBreed(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const inputText = event.target.value.toString().toLowerCase();

    try {
      const response = await api.get('breeds');
      const breedList = response.data;

      const breedFiltered = breedList.filter((b: IBreeds) => {
        const breedNormalized = b.name.toString().toLowerCase();

        return breedNormalized.includes(inputText);
      });

      setBreeds(!breedFiltered ? breedList : breedFiltered);
      return breedFiltered;
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <Container maxWidth="sm">
      {/* <img src={logo} width="100" className="App-logo" alt="logo" /> */}

      <Box display="flex" flexDirection="column">
        <h1>List of Breeds</h1>
        <TextField
          id="outlined-basic"
          label="breed filter"
          variant="outlined"
          onChange={handleFindBreed}
        />
        {breeds.map((breed) => (
          <>
            <Button variant="contained" color="default">
              {breed.name}
            </Button>
            <ShowModal />
          </>
        ))}
      </Box>
    </Container>
  );
};

export default ListBreeds;
