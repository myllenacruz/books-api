import { createConnection } from "typeorm";

const connect = async (): Promise<void> => {
	try {
		await createConnection();
	} catch (error) {
		console.error("Error when trying to create a connection: \n", error);
		process.exit(1);
	}
};

connect();

export = connect();
