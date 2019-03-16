const name = {
  "jdiperi88@gmail.com": "Joey DiPeri",
  "sdiperi17@gmail.com": "Saida DiPeri",
  "tyronesanderson@yahoo.com": "Tyrone Sanderson"
};

module.exports = email => {
  return name[email];
};
