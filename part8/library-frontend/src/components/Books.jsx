import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import _ from "lodash";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, { variables: { genre: null } });
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
