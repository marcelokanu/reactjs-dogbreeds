import React, { useState, ChangeEvent, useEffect } from 'react';
import { Container, TextField, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import BreedList from '../../components/BreedList';

import api from '../../services/api';

interface IBreeds {
  id: number;
  name: string;
  bredFor: string;
  breedGroup: string;
  lifeSpan: string;
  temperament: string;
  origin: string;
  img: string;
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
    const config = { Authorization: process.env.API_HEADER_KEY };

    try {
      const response = await api.get('breeds', { headers: config });
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
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Typography variant="h3">List of Breeds</Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="outlined-basic"
            label="breed filter"
            variant="outlined"
            margin="dense"
            onChange={handleFindBreed}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {breeds.map((breed) => (
          <Grid key={breed.id} item md={4}>
            <BreedList
              id={breed.id}
              title={breed.name}
              temperament={breed.temperament}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListBreeds;
