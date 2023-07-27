import { app } from "./app";
import { logger } from "./lib/logger/logger";

const start = (): void => {
  try {
    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
};

start();
