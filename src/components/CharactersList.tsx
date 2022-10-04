import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
///
import { useQuery, gql } from "@apollo/client";
import { GET_CHARACTERS } from "../GraphQL/Queries";
import Skeletons from "./Skeletons"
import PaginationControlled from './PaginationControlled';
import {useFavoriteStore} from '../store/index';


interface Character {
    id: string;
    name: string;
    image: string;
    status: string;
    location: {
        name: string;
    }
}

function CharactersList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(0);
  const { error, loading, data } = useQuery(GET_CHARACTERS, {
    variables: {page}
  });
  const addFavorite = useFavoriteStore(state => state.addFavorite);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleAddFavorite = (item:Character) => {
    addFavorite({id: item.id, name: item.name})
    setOpenSuccess(true)
  }

  const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  useEffect(() => {
    if (data) {
        setCharacters(data.characters.results);
        setPages(data.characters.info.pages);
    }
  }, [data]);

  return (
    
    <div>
        <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }} onClose={handleCloseSuccess}>
            Character added to favorite!
        </Alert>
        </Snackbar>
        {error ? <Alert severity="error">Oops...Something went wrong while fetching the data!</Alert> : null}
    <Grid container spacing={4} >
        
        {loading ? <Skeletons/> :null}
      {characters.map((item:Character) => {
        return (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }}>
              {item.name[0]}
            </Avatar>
          }
          title={item.name}
          subheader={item.status}
        />
       
       {loading || !item.image ? <Skeleton variant="rectangular" animation="wave" width={345} height={194}/> :
       <CardMedia
          component="img"
          height="194"
          image={item.image}
          alt={item.name}
        />}

    
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.location.name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => handleAddFavorite(item)}>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
      </Grid>
        )
      })}
      
    </Grid>
    {data ? <PaginationControlled page={page} pages={pages} setPage={setPage}/> : null}
    </div>
  );
}

export default CharactersList;