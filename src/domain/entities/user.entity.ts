export class User {
  id?: string;
  email: string;
  name: string;
  isActive: boolean;

  constructor(data?: { id?: string; email: string; name: string; isActive: boolean }) {
    if (data) {
      this.id = data.id || '';
      this.email = data.email;
      this.name = data.name;
      this.isActive = data.isActive;
    }
  }
}
