const httpPost = async (api, body) => {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error) {
    console.error({ httpPost: error });
    alertify.notify(error.message, "error", 6);
  }
};

const httpGet = async api => {
  try {
    const response = await fetch(api);
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error) {
    console.error({ httpGet: error });
    alertify.notify(error.message, "error", 6);
  }
};

const httpPut = async (api, body) => {
  try {
    const response = await fetch(api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error) {
    console.error({ httpPut: error });
    alertify.notify(error.message, "error", 6);
  }
};

const httpDelete = async api => {
  try {
    const response = await fetch(api, {
      method: "DELETE",
    });

    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error) {
    console.error({ httpPut: error });
    alertify.notify(error.message, "error", 6);
  }
};
