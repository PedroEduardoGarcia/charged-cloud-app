import app from "./app";
import { config } from "./config/environment";
import { CompanyGenerator } from "./utils/CompanyGenerator";

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const path = require('path');

const cg = new CompanyGenerator(path.resolve('utils/data/addresses.json'), path.resolve('utils/data/names.json'));

console.log(cg.generate());
console.log(cg.generate());
console.log(cg.generate());
console.log(cg.generate());
console.log(cg.generate());