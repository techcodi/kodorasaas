function Error() {
  return (
    <div className="error" style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Please check the URL or return to the homepage.</p>
      <a href="/">Go to Homepage</a>
    </div>
  );
}

export default Error;
