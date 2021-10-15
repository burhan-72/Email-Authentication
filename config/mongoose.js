const mongoose = require('mongoose');

main().catch(err => console.log(err));
main().then(() => console.log('Database Connection Established'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/emailAuthentication');
}