import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";
import Select from "react-select";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const setBirthyear = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: name.value, setBornTo: born } });
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null;
  }

  const authors = result.data.allAuthors;
  const options = authors.map(({ name }) => ({ value: name, label: name }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={setBirthyear}>
        <Select defaultValue={name} onChange={setName} options={options} />
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={(e) => setBorn(parseInt(e.target.value))}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
