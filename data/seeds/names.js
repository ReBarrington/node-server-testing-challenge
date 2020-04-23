
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('barringtons').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('barringtons').insert([
        {name: 'Matt'},
        {name: 'Steph'},
        {name: 'Reagan'},
        {name: 'Teddy'},
        {name: 'Saige'},
        {name: 'Josh'},
        {name: 'Marah'},
        {name: 'Ket'},
      ]);
    });
};
