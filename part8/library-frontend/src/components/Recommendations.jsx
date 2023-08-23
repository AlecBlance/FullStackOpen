/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { useEffect, useState } from "react";

const Recommendations = (props) => {
  const [genre, setGenre] = useState(null);
  const genreQuery = useQuery(ME, { skip: !props.show });
  const result = useQuery(ALL_BOOKS, { variables: { genre }, skip: !genre });

  useEffect(() => {
    if (genreQuery.data) {
      setGenre(genreQuery.data.me.favoriteGenre);
    }
  }, [genreQuery.data]);

  if (result.loading || genreQuery.loading) return <div>loading...</div>;
  // eslint-disable-next-line react/prop-types
  if (!props.show || !result.data) {
    return null;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <p>
        books in your favorite genre <b>{genre}</b>
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
    </div>
  );
};

export default Recommendations;
