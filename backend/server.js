const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());   

mongoose.connect(
  'mongodb://shrirupstark_db_user:Shrirup%4004102006@ac-zxot96c-shard-00-00.buumgxc.mongodb.net:27017,ac-zxot96c-shard-00-01.buumgxc.mongodb.net:27017,ac-zxot96c-shard-00-02.buumgxc.mongodb.net:27017/gymApp?ssl=true&replicaSet=atlas-jbgdxa-shard-0&authSource=admin&appName=GymAppCluster'
)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend running!');
});

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log('🚀 Server started on http://localhost:3000');
});
