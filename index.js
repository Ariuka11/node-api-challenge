const express = require("express");
const actionRouter = require("./actionRouter")
const projectRouter = require("./projectRouter")

const server = express();
const port = 4000

server.use(express.json());

server.use("/api/actions", actionRouter)
server.use("/api/projects", projectRouter)

server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((err, req, res, next) => {
    console.log(err)
      res.status(500).json({
        message: 'Error retrieving the projects'
   })
  })

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
