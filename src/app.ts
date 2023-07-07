import config from '@/config';
import Logging from '@/library/Logging';
import connect from '@/utils/connect';

const listen = async (): Promise<void> => {
  try {
    const server = await connect.connectDB();
    server.listen(config.port, (): void => {
      Logging.info(`Server is running @ port: ${config.port}`);
    });
  } catch (error) {
    Logging.error(error);
  }
};

export default { listen };
