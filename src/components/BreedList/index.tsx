import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

const useStyles = makeStyles({
  root: {
    minHeight: 345,
  },
  media: {
    height: 340,
  },
  desc: {},
});

interface IProps {
  id: number;
  title: string;
  temperament: string;
}

const BreedCard: React.FC<IProps> = ({ id, title, temperament }: IProps) => {
  const classes = useStyles();

  const [imgBreed, setImgBreed] = useState();

  // const [imgBreed, setImgBreed] = useState(() => {
  //   const imgBreeds = localStorage.getItem('@BreedsExplorer:imgs');

  //   if (imgBreeds) {
  //     return JSON.parse(imgBreeds);
  //   }

  //   return [];
  // });

  // useEffect(() => {
  //   localStorage.setItem('@BreedsExplorer:imgs', JSON.stringify(imgBreed));
  // }, [imgBreed]);

  useEffect(() => {
    const config = { Authorization: process.env.API_HEADER_KEY };
    api
      .get('images/search', {
        headers: config,
        params: {
          breed_id: id,
        },
      })
      .then((response) => {
        setImgBreed(response.data[0].url);
      });
  }, [id]);

  // console.log(imgBreed);
  return (
    <Card key={id} className={classes.root}>
      <CardActionArea>
        {!imgBreed ? (
          <CircularProgress />
        ) : (
          <CardMedia className={classes.media} image={imgBreed} title={title} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {temperament}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BreedCard;
