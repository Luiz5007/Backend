const app = require('./app')
const port = 3333

require('./infra/database')

app.listen(port, async () => {
  console.log('Server On')
  console.log('http://localhost:3333')
})
