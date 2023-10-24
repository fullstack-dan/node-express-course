const { people } = require("../data");

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide a name." });
  }
  res.status(201).send({ success: true, name: name });
};

const getPeople = (req, res) => {
  res.json(people);
};

const getPerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === parseInt(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `No person with id ${id} found.` });
  }
  res.status(200).json({ success: true, data: person });
};

const updatePerson = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const person = people.find((p) => p.id === parseInt(id));

  console.log(id);

  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }

  if (name) {
    person.name = name;
  }

  res.status(200).json({ success: true, data: person });
};

const deletePerson = (req, res) => {
  const id = req.params.id;
  const index = people.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Person not found" });
  }

  people.splice(index, 1);

  res.status(200).json({ success: true, data: people });
};

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};
