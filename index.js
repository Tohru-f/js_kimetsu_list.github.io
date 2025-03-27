async function callCharacters(category) {
  const res = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${category}.json`);
  const Characters = await res.json();
  return Characters;
}

export { callCharacters }