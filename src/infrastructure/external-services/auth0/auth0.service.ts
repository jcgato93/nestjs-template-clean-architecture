import { AuthenticationClient, ManagementClient } from 'auth0';

import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class Auth0Service {
  private readonly managementClient: ManagementClient;
  private readonly authClient: AuthenticationClient;

  constructor() {
    this.managementClient = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    });

    this.authClient = new AuthenticationClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    });
  }

  async createUser(email: string, password: string, name: string): Promise<any> {
    try {
      return await this.managementClient.users.create({
        connection: 'Username-Password-Authentication',
        email,
        password,
        name,
      });
    } catch (error) {
      throw new UnauthorizedException('Error creating user: ' + error.message);
    }
  }

  async authenticateUser(email: string, password: string): Promise<any> {
    try {
      const response = await this.authClient.oauth.passwordGrant({
        username: email,
        password,
      });
      return response;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
