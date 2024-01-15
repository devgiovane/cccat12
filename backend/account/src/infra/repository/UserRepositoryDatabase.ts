import User from "../../domain/entity/User";
import DatabaseConnection from "../database/DatabaseConnection";
import UserRepository from "../../application/repository/UserRepository";

export default class UserRepositoryDatabase implements UserRepository {

	constructor(private readonly connection: DatabaseConnection) {
	}

	public async save(user: User): Promise<void> {
		await this.connection.query("INSERT INTO cccat12.user (user_id, email, password, password_type, salt) VALUES ($1, $2, $3, $4, $5)", [
			user.userId, user.email.getValue(), user.password.getValue(), user.passwordType, user.password.getSalt()
		]);
	}

	public async getByEmail(email: string): Promise<User> {
		const [ passengerData ] = await this.connection.query("SELECT * FROM cccat12.user WHERE email = $1", [
			email
		]);
		return new User(passengerData.user_id, passengerData.email, passengerData.password, passengerData.password_type, passengerData.salt);
	}

}
