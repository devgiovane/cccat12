import Login from "../../src/application/usecase/Login";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import RepositoryFactoryDatabase from "../../src/infra/repository/RepositoryFactoryDatabase";
import GetSession from "../../src/application/usecase/GetSession";

let connection: DatabaseConnection;
let repositoryFactory: RepositoryFactory;

describe('Login Integration Test', function () {

	beforeAll(function () {
		connection = new PgPromiseConnection();
		repositoryFactory = new RepositoryFactoryDatabase(connection);
	});

	afterAll(async function () {
		await connection.close();
	});

	it('should be able make a login', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			password: "123456"
		};
		const createPassenger = new CreatePassenger(repositoryFactory);
		await createPassenger.execute(input);
		const inputLogin = {
			email: "john.doe@gmail.com",
			password: "123456"
		}
		const login = new Login(repositoryFactory);
		const outputLogin = await login.execute(inputLogin);
		expect(outputLogin.token).toBeDefined();
	});

	it('should be able make a login and validate user logged', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			password: "123456"
		};
		const createPassenger = new CreatePassenger(repositoryFactory);
		await createPassenger.execute(input);
		const inputLogin = {
			email: "john.doe@gmail.com",
			password: "123456"
		}
		const login = new Login(repositoryFactory);
		const outputLogin = await login.execute(inputLogin);
		const getSession = new GetSession();
		const outputSession = await getSession.execute({ token: outputLogin.token });
		expect(outputSession.email).toBe("john.doe@gmail.com");
	});

});
