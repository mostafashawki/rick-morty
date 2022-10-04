import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';


export default function ResponsiveGrid() {
  return (
    
        <>
        {Array.from(Array(20)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
          <Skeleton variant="rectangular" animation="wave" width={345} height={326} />
          </Grid>
        ))}
        </>
     
  
  );
}
