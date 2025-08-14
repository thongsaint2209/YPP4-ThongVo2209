import { DataSource } from 'typeorm';

export async function insertData(dataSource: DataSource): Promise<void> {
  console.log('>>> Inserting data into Board and UserStarredBoard...');

  try {
    // Xóa dữ liệu cũ
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="Workspace"',
    );

    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Board"');

    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Members"');

    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="UserViewHistory"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="OwnerType"',
    );

    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="UserStarredBoard"',
    );

    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="User"');

    // --- Chèn dữ liệu mẫu cho Board ---
    await dataSource.query(`
      INSERT INTO Board 
        (Id, BoardName, BoardDescription, CreatedAt, CreatedBy, BackgroundUrl, BoardStatus, WorkspaceId)
      VALUES 
        (1, 'Test Board 1', 'Description', datetime('now'), 1, 'url1', 'active', 1),
        (2, 'Test Board 2', 'Description', datetime('now'), 1, 'url2', 'active', 1),
        (3, 'Test Board 3', 'Description', datetime('now'), 1, 'url3', 'archived', 1),
        (4, 'Test Board 4', 'Description', datetime('now'), 1, 'url3', 'archived', 1)
    `);

    // --- Chèn dữ liệu mẫu cho UserStarredBoard ---
    await dataSource.query(`
      INSERT INTO UserStarredBoard 
        (UserId, BoardId, CreatedAt, StarredBoardsStatus)
      VALUES 
        (1, 1, datetime('now'), 1),
        (1, 2, datetime('now'), 1)
    `);

    await dataSource.query(`
      INSERT INTO User (Id, PictureUrl, Email, Username, Bio) VALUES
        (1, 'https://example.com/images/james85.png', 'james85@booth-daniels.net', 'james85', 'Software engineer and coffee lover.'),
        (2, 'https://example.com/images/alice99.png', 'alice99@example.com', 'alice99', 'UI/UX designer with a passion for art.'),
        (3, 'https://example.com/images/bob77.png', 'bob77@example.com', 'bob77', 'Backend developer and open-source enthusiast.')
    `);

    await dataSource.query(`
      INSERT INTO OwnerType (Id, OwnerTypeValue)
      VALUES 
        (1, 'WORKSPACE'),
        (2, 'BOARD'),
        (3, 'USER'),
        (4, 'CARD')
    `);

    // --- Chèn dữ liệu mẫu cho UserViewHistory ---
    await dataSource.query(`
      INSERT INTO UserViewHistory (Id, UserId, OwnerId, OwnerTypeId, AccessedAt)
      VALUES 
        (1, 1, 1, 2, datetime('now', '-1 day')),
        (2, 1, 2, 2, datetime('now', '-2 day')),
        (3, 2, 1, 2, datetime('now', '-3 day'))
    `);

    // (OwnerTypeId = 1 => WORKSPACE)
    // (OwnerTypeId = 2 => BOARD)
    // (OwnerTypeId = 3 => USER)
    // (OwnerTypeId = 4 => CARD)
    await dataSource.query(`
      INSERT INTO Members (UserId, OwnerId, OwnerTypeId)
      VALUES
        (1, 1, 1), 
        (1, 2, 1), 
        (2, 1, 1),
        (1, 1, 2),  
        (1, 2, 2), 
        (2, 3, 2),  
        (2, 1, 2), 
        (3, 1, 2);  
    `);

    await dataSource.query(`
      INSERT INTO Workspace (Id, WorkspaceName, LogoUrl, CreatedAt, ShortName, Website, WorkspaceDescription)
      VALUES 
        (1, 'Workspace 1', 'logo1.png', datetime('now', '-5 day'), 'WS1', 'https://workspace1.com', 'Description for Workspace 1'),
        (2, 'Workspace 2', 'logo2.png', datetime('now', '-10 day'), 'WS2', 'https://workspace2.com', 'Description for Workspace 2')
    `);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('>>> Error inserting data: ', error);
    throw error;
  }
}
