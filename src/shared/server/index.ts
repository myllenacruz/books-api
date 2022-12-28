import { server } from "@shared/server/app";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.info(`Server listening on port ${PORT}`);
});