import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private _mockData: User[] = [];
  private _nextId = 1;

  // Getter & Setter mockData
  get mockData(): User[] {
    return this._mockData;
  }

  set mockData(data: User[]) {
    this._mockData = data;
  }

  // Getter & Setter nextId
  get nextId(): number {
    return this._nextId;
  }

  set nextId(id: number) {
    this._nextId = id;
  }

  // CREATE
  create(data: Omit<User, 'id' | 'createdAt'>): User {
    const now = new Date();

    const sql = `
      INSERT INTO [User] (Username, Bio, Email, LastActive, CreatedAt, UpdatedAt, PictureUrl)
      VALUES ('${data.username}', '${data.bio}', '${data.email}', '${data.lastActive?.toISOString()}', '${now.toISOString()}', NULL, '${data.pictureUrl}')
    `;
    console.log('🟢 SQL EXECUTED:', sql);

    const newUser = new User(
      this.mockData.length + 1,
      data.username,
      data.bio,
      data.email,
      data.lastActive,
      now,
      undefined,
      data.pictureUrl,
    );

    this.mockData.push(newUser);
    return newUser;
  }

  // READ ALL
  findAll(): User[] {
    const sql = `SELECT * FROM [User]`;
    console.log('🟢 SQL EXECUTED:', sql);
    return this.mockData;
  }

  // READ BY ID
  getUserById(id: number): User | null {
    const sql = `SELECT * FROM [User] WHERE Id = ${id}`;
    console.log('🟢 SQL EXECUTED:', sql);
    return this.mockData.find((u) => u.id === id) ?? null;
  }

  // UPDATE
  update(id: number, data: Partial<User>): User | null {
    const now = new Date();
    const index = this.mockData.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const current = this.mockData[index];

    const sql = `
      UPDATE [User]
      SET
        Username = '${data.username ?? current.username}',
        Bio = '${data.bio ?? current.bio}',
        Email = '${data.email ?? current.email}',
        LastActive = '${data.lastActive?.toISOString() ?? current.lastActive?.toISOString()}',
        UpdatedAt = '${now.toISOString()}',
        PictureUrl = '${data.pictureUrl ?? current.pictureUrl}'
      WHERE Id = ${id};
    `;
    console.log('🟢 SQL EXECUTED:', sql);

    const updated = new User(
      current.id,
      data.username ?? current.username,
      data.bio ?? current.bio,
      data.email ?? current.email,
      data.lastActive ?? current.lastActive,
      current.createdAt,
      now,
      data.pictureUrl ?? current.pictureUrl,
    );

    this.mockData[index] = updated;
    return updated;
  }

  // DELETE
  delete(id: number): boolean {
    const sql = `DELETE FROM [User] WHERE Id = ${id}`;
    console.log('🟢 SQL EXECUTED:', sql);

    const index = this.mockData.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
      return true;
    }
    return false;
  }
}
