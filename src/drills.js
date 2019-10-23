require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})


function searchByProduceName(searchTerm) {
    knexInstance
      .select('*')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
  }
  searchByProduceName('ham')


// function paginateProducts(page) {
//     const productsPerPage = 6
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//         .select('*')
//         .from('shopping_list')
//         .limit(productsPerPage)
//         .offset(offset)
//         .then(result => {
//             console.log(result)
//         })
// }

// paginateProducts(3)



// function getItemsAfterDate(days) {
//     knexInstance
//         .select('*')
//         .from('shopping_list')
//         .where(
//             'date_added',
//             '<',
//             knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//         )
//         .then(result => {
//             console.log(result)
//         })
// }
// getItemsAfterDate(5)



// function getPriceByCat() {
//     knexInstance
//         .select('category','price')
//         .from('shopping_list')
//         .groupBy('category','price')
//         .orderBy([
//             { column: 'category', order: 'ASC' },
//         ])
//         .then(result => {
//             console.log(result)
//         })
// }

// getPriceByCat()