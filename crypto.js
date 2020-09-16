const { randomBytes } = require("crypto");
console.log(randomBytes(10).toString("base64"))