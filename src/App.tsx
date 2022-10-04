// import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import CharactersList from "./components/CharactersList";
import Container from '@mui/material/Container'
import Header from "./components/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MyFavoriteDialog from './components/MyFavoritesDialog'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message}) => {
      alert(`Graphql error ${message}`);
    });
  }
});


const link = from([
  errorLink,
  //TODO: use env
  new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  
  return (
    <ApolloProvider client={client}>
     
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header/>
      <MyFavoriteDialog/>
      <Container maxWidth="lg">
      <CharactersList />
      </Container>
      </ThemeProvider>

    </ApolloProvider>
  );
}

export default App;
