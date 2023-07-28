import CreatePassenger from "./application/usecase/CreatePassenger";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

process.stdin.on("data", async function (chunk) {
	const command = chunk.toString().replace(/\n/g, "");
	if (command.startsWith('create-passenger')) {
		const [ name, email, document ] = command.replace("create-passenger ", "").split(" ");
		try {
			const passengerRepository = new PassengerRepositoryDatabase();
			const useCase = new CreatePassenger(passengerRepository);
			const output = await useCase.execute({ name, email, document });
			console.log(output);
		} catch (error) {
			console.error(error);
		}
	}
});
