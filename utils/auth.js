const getAuthHeader = (username = "admin", password = "password") => {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
};
