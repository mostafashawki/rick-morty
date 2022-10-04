import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query Characters($page: Int!) {
    characters(page: $page) {
      info {
        count, pages
      }
      results {
        id, name, status, image, location{
          name
        }
      }
    }
  }
`;