const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Up and Awake</h1>')
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})