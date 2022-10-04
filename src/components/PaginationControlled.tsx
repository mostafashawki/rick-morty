import * as React from 'react';
import Pagination from '@mui/material/Pagination';

interface PaginationProps {
  page:number
  pages:number
  setPage:React.Dispatch<React.SetStateAction<number>>
}

export default function PaginationControlled(props: PaginationProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value);
  };

  return (
      <Pagination count={props.pages} page={props.page} onChange={handleChange} style={{display: "flex", justifyContent: "center"}} />

  );
}
