const { Link } = require("react-router-dom");

const ErrorPage = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to="/">Back to Home Page</Link>
    </>
  );
};

export default ErrorPage;
