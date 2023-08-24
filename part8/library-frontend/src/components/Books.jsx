import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { useState } from "react";
import _ from "lodash";

// eslint-disable-next-line react-refresh/only-export-components
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, { variables: { genre: null } });
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      alert(`${addedBook.title} now in Books`);
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        addedBook
      );
    },
  });

  if (result.loading) return <div>loading...</div>;
  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;
  const allGenre = _.union(...books.map((item) => item.genres));

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre ? genre : "all genres"}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenre.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setGenre(genre);
            result.refetch({ genre });
          }}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => result.refetch({ genre: null })}>
        all genres
      </button>
    </div>
  );
};

export default Books;
