const axios = require('axios');
const { Client } = require('graphqurl')
const client = new Client({
  endpoint: 'http://localhost:8080/v1alpha1/graphql',
  headers: {
    'Content-Type': 'application/json',
    'X-Hasura-Access-Key': 'mysecretkey'
  }
})

axios.get('https://api.iextrading.com/1.0/stock/aapl/company')
.then(async result => {
  const techCompany = result.data
  const insertTechCompany = `mutation insert_tech_company (
    $symbol: String!,
    $company_name:  String!) {
      insert_tech_company (
        objects: [
          {
            symbol: $symbol,
            company_name: $company_name
          }
        ]
      ) {
        returning {
          id
          symbol
          company_name
        }
      }
    }`

    const techCompanyDetails = {
      symbol: techCompany.symbol,
      company_name: techCompany.companyName
    }

    console.log(techCompany)
    console.log(techCompanyDetails)

    await client.query(insertTechCompany, techCompanyDetails)
    .catch(error => {
      console.log(JSON.stringify(error, null, 2))
    })
  }).catch(error => {
    console.log(JSON.stringify(error, null, 2))
  })
