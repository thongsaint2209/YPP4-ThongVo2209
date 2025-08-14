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

    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Users"');
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="WorkspaceType"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Color"');
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Stage"');
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
      INSERT INTO Users (Id, PictureUrl, Email, Username, Bio) VALUES
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
      INSERT INTO UserViewHistory ( UserId, OwnerId, OwnerTypeId, AccessedAt)
      VALUES 
        ( 1, 1, 2, datetime('now', '-1 day')),
        ( 1, 2, 2, datetime('now', '-2 day')),
        ( 2, 1, 2, datetime('now', '-3 day'))
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
      INSERT INTO WorkspaceType (Id, TypeValue, DisplayValue) VALUES
      (1, 'business', 'Business'),
      (2, 'sales_crm', 'Sales CRM'),
      (3, 'engineering_it', 'Engineering-IT'),
      (4, 'small_business', 'Small Business'),
      (5, 'education', 'Education'),
      (6, 'human_resources', 'Human Resources'),
      (7, 'operations', 'Operations'),
      (8, 'marketing', 'Marketing'),
      (9, 'other', 'Other'); 
    `);

    await dataSource.query(`
      INSERT INTO Workspace (Id, WorkspaceName, LogoUrl, CreatedAt, ShortName, Website, WorkspaceDescription)
      VALUES 
        (1, 'Workspace 1', 'logo1.png', datetime('now', '-5 day'), 'WS1', 'https://workspace1.com', 'Description for Workspace 1'),
        (2, 'Workspace 2', 'logo2.png', datetime('now', '-10 day'), 'WS2', 'https://workspace2.com', 'Description for Workspace 2')
    `);

    await dataSource.query(`
      INSERT INTO Color (Id, ColorName, Icon) VALUES
            (1, 'Red', 'https://example.com/icons/red-icon.png'),
            (2, 'Blue', 'https://example.com/icons/blue-icon.png'),
            (3, 'Green', 'https://example.com/icons/green-icon.png')
    `);

    await dataSource.query(`
       INSERT INTO Stage (Id, Title, Position, BoardId, ColorId) VALUES
            (1, 'To Do', 1, 1, 1),
            (2, 'In Progress', 2, 1, 2),
            (3, 'Coming', 2, 1, 2)
    `);
    await dataSource.query(`
       INSERT INTO Cards (Id, Title, CardDescription, Position, StageId, CardLocation, CoverValue) VALUES
            (1, 'Card 1', 'Description for Card 1', 1, 1, 'List 1', 'Cover1'),
            (2, 'Card 2', 'Description for Card 2', 2, 1, 'List 1', 'Cover2'),
            (3, 'Card 3', 'Description for Card 3', 1, 2, 'List 2', 'Cover3')
    `);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('>>> Error inserting data: ', error);
    throw error;
  }
}
