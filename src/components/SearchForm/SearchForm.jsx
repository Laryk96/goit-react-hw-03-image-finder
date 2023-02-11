import { FaSearch } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
const SearchForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={({ query }, actions) => {
        onSubmit(query);
        actions.resetForm();
      }}
    >
      <Form className="SearchForm">
        <button type="submit" className="SearchForm-button ">
          <span className="SearchForm-button-label ">Search</span>
          <FaSearch />
        </button>
        <Field
          name="query"
          className="SearchForm-input"
          placeholder="Search image and photos"
        ></Field>
      </Form>
    </Formik>
  );
};

export default SearchForm;
