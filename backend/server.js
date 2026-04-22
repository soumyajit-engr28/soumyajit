const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());   

mongoose.connect(
  'mongodb://kaustavnag05_db_user:SGnHhWEwlyJg0UNH@ac-ldeiutr-shard-00-00.ktaocs4.mongodb.net:27017,ac-ldeiutr-shard-00-01.ktaocs4.mongodb.net:27017,ac-ldeiutr-shard-00-02.ktaocs4.mongodb.net:27017/?ssl=true&replicaSet=atlas-7q5nya-shard-0&authSource=admin&appName=Cluster0')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend running!');
});

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log('🚀 Server started on http://localhost:3000');
});
