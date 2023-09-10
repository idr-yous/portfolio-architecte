export async function fetchJSON(url, options = {}) {
  const headers = {
    Accept: "application/json",
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });

  if (res.ok) {
    return res.json();
  }
  throw new Error("Erreur serveur", { cause: res });
}

export async function authUser(body) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const res = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers,
    body,
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Erreur serveur", { cause: res });
}
