
// recupération de la date pour la creation du compte (affichage)
const DateParser = (num) => {
  let options = { weekday:"long", year:"numeric", month:"short", day:"numeric"};

  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
  return date.toString()
};

export default DateParser;
// recupération date post temoignages (affichage)
export const dateParser = (num) => {
  let options = {
  year: "numeric",
  month: "short",
  };
  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  return date.charAt(0).toUpperCase() + date.slice(1);
  };


// si valeur vide
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};