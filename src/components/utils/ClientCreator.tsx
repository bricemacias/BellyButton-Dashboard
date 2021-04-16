import { ApolloClient, InMemoryCache } from '@apollo/client';

interface ClientProps {
  token: string;
}

const ClientCreator = (props: ClientProps) => {
  const uri = process.env.REACT_APP_API_URL;
  const cache = new InMemoryCache();
  const token = props.token;

  const client = new ApolloClient({
    uri: uri,
    cache: cache,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return client;
};

export default ClientCreator;
