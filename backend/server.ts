import app from "./app";
import { config } from "./config/environment";

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});