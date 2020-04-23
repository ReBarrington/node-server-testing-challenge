const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(barrington) {
  return db("barringtons").insert(barrington, "id");
}

async function update(id, changes) {
  return db("barringtons")
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id)
    })
}

function remove(id) {
    return db("barringtons")
    .where({ id })
    .del()
    .then(() => {
        return getAll();
    })
}

function getAll() {
  return db("barringtons");
}

function findById(id) {
    let query = db('barringtons');
    if (id) {
      return query
        .where({ id })
        .then((barrington) => {
          if (barrington) {
            return barrington;
          } else {
            return null;
          }
        });
    }
}
