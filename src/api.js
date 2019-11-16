// Send GET requests
const getData = async url => {
  const result = {
    data: {},
    statusCode: 0
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    result.data = await response.json();
    result.statusCode = 200;
    return result;
  } catch (error) {
    console.error("An error occurred: ", error);
    result.statusCode = 500;
    return result;
  }
};

export default getData;
