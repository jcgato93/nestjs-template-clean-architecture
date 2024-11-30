export interface IAuthenticationService {
  createUser(email: string, password: string, name: string): Promise<any>;
  authenticateUser(email: string, password: string): Promise<any>;
}
