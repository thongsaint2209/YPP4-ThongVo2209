import { DataSource } from 'typeorm';

export async function createTables(dataSource: DataSource): Promise<void> {
  console.log('Creating all tables...');

  try {
    // --- Drop tables nếu đã tồn tại ---
    await dataSource.query('DROP TABLE IF EXISTS UserStarredBoard');
    await dataSource.query('DROP TABLE IF EXISTS UserViewHistory');
    await dataSource.query('DROP TABLE IF EXISTS WorkspaceMembershipDomain');
    await dataSource.query('DROP TABLE IF EXISTS WorkspaceType');
    await dataSource.query('DROP TABLE IF EXISTS Workspace');
    await dataSource.query('DROP TABLE IF EXISTS User');
    await dataSource.query('DROP TABLE IF EXISTS TemplateCategory');
    await dataSource.query('DROP TABLE IF EXISTS Template');
    await dataSource.query('DROP TABLE IF EXISTS Subscription');
    await dataSource.query('DROP TABLE IF EXISTS StickerCategory');
    await dataSource.query('DROP TABLE IF EXISTS Sticker');
    await dataSource.query('DROP TABLE IF EXISTS Stage');
    await dataSource.query('DROP TABLE IF EXISTS ShareLink');
    await dataSource.query('DROP TABLE IF EXISTS SettingValue');
    await dataSource.query('DROP TABLE IF EXISTS SettingOption');
    await dataSource.query('DROP TABLE IF EXISTS SettingKeySettingOption');
    await dataSource.query('DROP TABLE IF EXISTS SettingKey');
    await dataSource.query('DROP TABLE IF EXISTS RolePermission');
    await dataSource.query('DROP TABLE IF EXISTS ReactionCategory');
    await dataSource.query('DROP TABLE IF EXISTS Reaction');
    await dataSource.query('DROP TABLE IF EXISTS PowerUpCategory');
    await dataSource.query('DROP TABLE IF EXISTS PowerUp');
    await dataSource.query('DROP TABLE IF EXISTS PaymentInformation');
    await dataSource.query('DROP TABLE IF EXISTS OwnerType');
    await dataSource.query('DROP TABLE IF EXISTS Notification');
    await dataSource.query('DROP TABLE IF EXISTS Members');
    await dataSource.query('DROP TABLE IF EXISTS Label');
    await dataSource.query('DROP TABLE IF EXISTS FieldValue');
    await dataSource.query('DROP TABLE IF EXISTS FieldItem');
    await dataSource.query('DROP TABLE IF EXISTS DataType');
    await dataSource.query('DROP TABLE IF EXISTS CustomField');
    await dataSource.query('DROP TABLE IF EXISTS CommentReaction');
    await dataSource.query('DROP TABLE IF EXISTS Comment');
    await dataSource.query('DROP TABLE IF EXISTS Color');
    await dataSource.query('DROP TABLE IF EXISTS Collections');
    await dataSource.query('DROP TABLE IF EXISTS CheckListItem');
    await dataSource.query('DROP TABLE IF EXISTS CheckList');
    await dataSource.query('DROP TABLE IF EXISTS CardSticker');
    await dataSource.query('DROP TABLE IF EXISTS Cards');
    await dataSource.query('DROP TABLE IF EXISTS CardLabel');
    await dataSource.query('DROP TABLE IF EXISTS CardCoverType');
    await dataSource.query('DROP TABLE IF EXISTS BoardPowerUp');
    await dataSource.query('DROP TABLE IF EXISTS BoardCollection');
    await dataSource.query('DROP TABLE IF EXISTS Board');
    await dataSource.query('DROP TABLE IF EXISTS BillingPlan');
    await dataSource.query('DROP TABLE IF EXISTS BillingContact');
    await dataSource.query('DROP TABLE IF EXISTS AttachmentType');
    await dataSource.query('DROP TABLE IF EXISTS Attachment');
    await dataSource.query('DROP TABLE IF EXISTS Activity');

    console.log('All existing tables dropped.');

    // --- Tạo các bảng ---
    await dataSource.query(`
      CREATE TABLE Activity (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CreatedAt DATETIME,
        ActivityDescription TEXT,
        UserId INTEGER,
        CategoryId INTEGER,
        OwnerId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Attachment (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CardId INTEGER,
        AttachmentTypeId INTEGER,
        AttachmentPath TEXT,
        AttachmentName TEXT,
        CreatedAt DATETIME,
        CreatedBy INTEGER,
        Size TEXT,
        IsCover BOOLEAN
      )
    `);

    await dataSource.query(`
      CREATE TABLE AttachmentType (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        TypeValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE BillingContact (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        UserId INTEGER,
        WorkspaceId INTEGER,
        BillingContactName TEXT,
        BillingContactEmail TEXT,
        BillingLanguage INTEGER,
        AdditionalInvoiceDetail TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE BillingPlan (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        PlanName TEXT,
        BillingPlanDescription TEXT,
        PricePerUser REAL,
        IsActive BOOLEAN NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE IF NOT EXISTS Workspace (
          Id INTEGER PRIMARY KEY,
          WorkspaceName TEXT,
          LogoUrl TEXT,
          CreatedAt TEXT,
          ShortName TEXT,
          Website TEXT,
          WorkspaceDescription TEXT
      );
  `);

    await dataSource.query(`
      CREATE TABLE Board (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        BoardName TEXT,
        BoardDescription TEXT,
        CreatedAt DATETIME,
        CreatedBy INTEGER,
        BackgroundUrl TEXT,
        WorkspaceId INTEGER,
        BoardStatus TEXT,
        UpdatedAt DATETIME,
        UpdatedBy INTEGER
      )
    `);

    // --- Tạo bảng User ---
    await dataSource.query(`
      CREATE TABLE User (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT,
        Bio TEXT,
        Email TEXT,
        LastActive DATETIME,
        CreatedAt DATETIME,
        UpdatedAt DATETIME,
        PictureUrl TEXT
      )
    `);

    // --- Tạo bảng UserStarredBoard ---
    await dataSource.query(`
      CREATE TABLE UserStarredBoard (
        UserId INTEGER NOT NULL,
        BoardId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        StarredBoardsStatus BOOLEAN NOT NULL,
        PRIMARY KEY (UserId, BoardId)
      )
    `);

    await dataSource.query(`
      CREATE TABLE UserViewHistory (
        Id INTEGER PRIMARY KEY,
        UserId INTEGER,
        OwnerId INTEGER,
        OwnerTypeId INTEGER,
        AccessedAt TEXT
    )
    `);

    await dataSource.query(`
      CREATE TABLE OwnerType (
          Id INTEGER PRIMARY KEY,
          OwnerTypeValue TEXT
      )
    `);

    await dataSource.query(`
    CREATE TABLE IF NOT EXISTS Members (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      UserId INTEGER NOT NULL,
      OwnerId INTEGER NOT NULL,
      OwnerTypeId INTEGER NOT NULL
    )
  `);

    await dataSource.query(`
      CREATE TABLE BoardCollection (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        BoardId INTEGER,
        CollectionId INTEGER,
        CreatedAt DATETIME,
        CreatedBy INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE BoardPowerUp (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        BoardId INTEGER,
        PowerUpId INTEGER,
        CreatedAt DATETIME,
        CreatedBy INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE CardCoverType (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        TypeValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE CardLabel (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        LabelName TEXT,
        ColorId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Cards (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CardName TEXT,
        CardDescription TEXT,
        CreatedAt DATETIME,
        CreatedBy INTEGER,
        DueDate DATETIME,
        CollectionId INTEGER,
        BoardId INTEGER,
        CardStatus TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE CardSticker (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CardId INTEGER,
        StickerId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE CheckList (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CheckListName TEXT,
        CardId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE CheckListItem (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CheckListId INTEGER,
        ItemName TEXT,
        IsChecked BOOLEAN
      )
    `);

    await dataSource.query(`
      CREATE TABLE Collections (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CollectionName TEXT,
        BoardId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Color (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ColorValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE Comment (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CommentText TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
        UserId INTEGER NOT NULL,
        CardId INTEGER NOT NULL
      )
    `);

    console.log('>>> Tables created successfully!');
  } catch (error) {
    console.error('>>> Error creating tables: ', error);
    throw error;
  }
}
