const express = require('express');
const cors = require('cors')
const app = express();
const auth = require('./routes/auth')
const todo = require('./routes/todo')

app.use(express.json());
app.use(cors());
app.use("/user",auth)
app.use("/todo",todo)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
