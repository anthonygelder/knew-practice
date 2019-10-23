require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

// function searchByProduceName(searchTerm) {
//     knexInstance.from('amazong_products').select('product_id', 'name', 'price', 'category')
//         .where('name', 'ILIKE', `%holo%`)
//         .then(result => {
//         console.log(result)
//         })
// }


// searchByProduceName('holo')


// function paginateProducts(page) {
//     const productsPerPage = 10
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//       .select('product_id', 'name', 'price', 'category')
//       .from('amazong_products')
//       .limit(productsPerPage)
//       .offset(offset)
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   paginateProducts(2)


// SELECT product_id, name, price, category, image
//   FROM amazong_products
//   WHERE image IS NOT NULL;

//   function getProductsWithImages() {
//     knexInstance
//       .select('product_id', 'name', 'price', 'category', 'image')
//       .from('amazong_products')
//       .whereNotNull('image')
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   getProductsWithImages()



// SELECT video_name, region, count(date_viewed) AS views
// FROM whopipe_video_views
// WHERE date_viewed > (now() - '30 days'::INTERVAL)
// GROUP BY video_name, region
// ORDER BY region ASC, views DESC;

// function mostPopularVideosForDays(days) {
//     knexInstance
//       .select('video_name', 'region')
//       .count('date_viewed AS views')
//       .where(
//         'date_viewed',
//         '>',
//         knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//       )
//       .from('whopipe_video_views')
//       .groupBy('video_name', 'region')
//       .orderBy([
//         { column: 'region', order: 'ASC' },
//         { column: 'views', order: 'DESC' },
//       ])
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   mostPopularVideosForDays(30)


