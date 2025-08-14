import { DataSource } from 'typeorm';

export async function createTables(dataSource: DataSource): Promise<void> {
  console.log('Creating all tables...');
  const tables = [
    'Users',
    'WorkspaceType',
    'Workspace',
    'Board',
    'Color',
    'Stage',
    'CardCoverType',
    'Cards',
    'Labels',
    'CardLabel',
    'AttachmentType',
    'Attachment',
    'CheckList',
    'RolePermission',
    'OwnerType',
    'Members',
    'CheckListItem',
    'Comment',
    'DataType',
    'CustomField',
    'FieldItem',
    'FieldValue',
    'Collections',
    'BoardCollection',
    'PowerUpCategory',
    'PowerUp',
    'BoardPowerUp',
    'StickerCategory',
    'Sticker',
    'CardSticker',
    'ReactionCategory',
    'Reaction',
    'CommentReaction',
    'Activity',
    'Notification',
    'ShareLink',
    'UserStarredBoard',
    'UserViewHistory',
    'WorkspaceMembershipDomain',
    'TemplateCategory',
    'Template',
    'SettingOption',
    'SettingKey',
    'SettingKeySettingOption',
    'SettingValue',
    'BillingPlan',
    'BillingContact',
    'PaymentInformation',
    'Subscription',
    'Export',
  ];
  try {
    console.log('>>> Dropping existing tables...');
    for (const table of tables) {
      await dataSource.query(`DROP TABLE IF EXISTS ${table}`);
    }
    console.log('>>> Tables dropped successfully!');

    // --- Tạo bảng Users ---
    await dataSource.query(`
      CREATE TABLE Users (
        Id INTEGER PRIMARY KEY,
        Username TEXT,
        Bio TEXT,
        Email TEXT,
        LastActive TEXT,
        CreatedAt TEXT,
        UpdatedAt TEXT,
        PictureUrl TEXT,
        FullName TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE WorkspaceType (
        Id INTEGER PRIMARY KEY,
        TypeValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE Workspace (
        Id INTEGER PRIMARY KEY,
        WorkspaceName TEXT,
        WorkspaceDescription TEXT,
        ShortName TEXT,
        Website TEXT,
        TypeId INTEGER,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        LogoUrl TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE Board (
        Id INTEGER PRIMARY KEY,
        BoardName TEXT,
        BoardDescription TEXT,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        BackgroundUrl TEXT,
        WorkspaceId INTEGER,
        BoardStatus TEXT,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        IsTemplate INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Color (
        Id INTEGER PRIMARY KEY,
        ColorName TEXT,
        ColorHex TEXT,
        Icon TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE Stage (
        Id INTEGER PRIMARY KEY,
        Title TEXT,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        BoardId INTEGER,
        StageStatus TEXT,
        ColorId INTEGER,
        Position INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE CardCoverType (
        Id INTEGER PRIMARY KEY,
        TypeValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE Cards (
        Id INTEGER PRIMARY KEY,
        StageId INTEGER,
        Title TEXT,
        CardDescription TEXT,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        CardStatus TEXT,
        CardLocation TEXT,
        StartDate TEXT,
        DueDate TEXT,
        CardCoverTypeId INTEGER,
        CoverValue TEXT,
        Position INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        IsTemplate INTEGER,
        IsCompleted INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Labels (
        Id INTEGER PRIMARY KEY,
        Title TEXT,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        ColorId INTEGER,
        IsDefault INTEGER NOT NULL,
        BoardId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE CardLabel (
        CardId INTEGER,
        LabelId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE AttachmentType (
        Id INTEGER PRIMARY KEY,
        TypeValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE Attachment (
        Id INTEGER PRIMARY KEY,
        CardId INTEGER,
        AttachmentTypeId INTEGER,
        AttachmentPath TEXT,
        AttachmentName TEXT,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        Size TEXT,
        IsCover INTEGER,
        Thumbnail TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE CheckList (
        Id INTEGER PRIMARY KEY,
        CheckListName TEXT,
        CardId INTEGER,
        Position INTEGER,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE RolePermission (
        Id INTEGER PRIMARY KEY,
        PermissionName TEXT,
        PermissionCode TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE OwnerType (
        Id INTEGER PRIMARY KEY,
        OwnerTypeValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE Members (
        Id INTEGER PRIMARY KEY,
        UserId INTEGER,
        RolePermissonId INTEGER,
        OwnerTypeId INTEGER,
        OwnerId INTEGER,
        InvitedBy INTEGER,
        JoinedAt TEXT,
        MemberStatus TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE CheckListItem (
        Id INTEGER PRIMARY KEY,
        CheckListItemName TEXT,
        MemberId INTEGER,
        CheckListId INTEGER,
        DueDate TEXT,
        CheckListItemStatus INTEGER,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        Position INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Comment (
        Id INTEGER PRIMARY KEY,
        Content TEXT,
        CardId INTEGER,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE DataType (
        Id INTEGER PRIMARY KEY,
        DataTypeValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE CustomField (
        Id INTEGER PRIMARY KEY,
        Title TEXT,
        DataTypeId INTEGER,
        BoardId INTEGER,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        Position INTEGER,
        IsFrontCardShowed INTEGER NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE FieldItem (
        Id INTEGER PRIMARY KEY,
        ColorId INTEGER,
        FieldItemValue TEXT,
        Position INTEGER,
        CustomFieldId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE FieldValue (
        Id INTEGER PRIMARY KEY,
        CardId INTEGER,
        FieldValue TEXT,
        CustomFieldId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Collections (
        Id INTEGER PRIMARY KEY,
        CollectionName TEXT,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        WorkspaceId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE BoardCollection (
        BoardId INTEGER,
        CollectionId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE PowerUpCategory (
        Id INTEGER PRIMARY KEY,
        CategoryValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE PowerUp (
        Id INTEGER PRIMARY KEY,
        PowerUpName TEXT,
        IconUrl TEXT,
        BackgroundUrl TEXT,
        AuthorName TEXT,
        PowerUpDescription TEXT,
        EmailContact TEXT,
        PolicyUrl TEXT,
        IsStaffPick INTEGER,
        IsIntegration INTEGER,
        CategoryId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE BoardPowerUp (
        BoardId INTEGER,
        PowerUpId INTEGER,
        BoardPowerUpStatus INTEGER NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE StickerCategory (
        Id INTEGER PRIMARY KEY,
        CategoryValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE Sticker (
        Id INTEGER PRIMARY KEY,
        CategoryId INTEGER,
        StickerName TEXT,
        StickerUrl TEXT,
        CreatedAt TEXT,
        CreatedBy INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE CardSticker (
        CardId INTEGER,
        StickerId INTEGER,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        PositionX REAL,
        PositionY REAL,
        IndexZ INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE ReactionCategory (
        Id INTEGER PRIMARY KEY,
        CategoryValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE Reaction (
        Id INTEGER PRIMARY KEY,
        ReactionName TEXT,
        ShortCode TEXT NOT NULL,
        CategoryId INTEGER,
        Icon TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE CommentReaction (
        CommentId INTEGER,
        ReactionId INTEGER,
        CreatedBy INTEGER,
        CreatedAt TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE Activity (
        Id INTEGER PRIMARY KEY,
        CreatedAt TEXT,
        ActivityDescription TEXT,
        UserId INTEGER,
        OwnerTypeId INTEGER,
        OwnerId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Notification (
        Id INTEGER PRIMARY KEY,
        ActivityId INTEGER,
        IsRead INTEGER NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE ShareLink (
        Id INTEGER PRIMARY KEY,
        OwnerTypeId INTEGER,
        RolePermissonId INTEGER,
        OwnerId INTEGER,
        ShareLinkToken TEXT,
        ShareLinkStatus INTEGER NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE UserStarredBoard (
        UserId INTEGER,
        BoardId INTEGER,
        CreatedAt TEXT,
        StarredBoardsStatus INTEGER NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE UserViewHistory (
        UserId INTEGER,
        OwnerTypeId INTEGER,
        OwnerId INTEGER,
        AccessedAt TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE WorkspaceMembershipDomain (
        Id INTEGER PRIMARY KEY,
        WorkspaceId INTEGER,
        Domain TEXT,
        CreatedAt TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateCategory (
        Id INTEGER PRIMARY KEY,
        CategoryValue TEXT NOT NULL,
        DisplayValue TEXT NOT NULL,
        IconUrl TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE Template (
        Id INTEGER PRIMARY KEY,
        Title TEXT,
        TemplateDescription TEXT,
        CategoryId INTEGER,
        Viewed INTEGER,
        Copied INTEGER,
        CreatedBy INTEGER,
        CreatedAt TEXT,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        BoardId INTEGER,
        BackgroundUrl TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE SettingOption (
        Id INTEGER PRIMARY KEY,
        DisplayValue TEXT,
        SettingOptionValue TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE SettingKey (
        Id INTEGER PRIMARY KEY,
        KeyName TEXT,
        SettingKeyDescription TEXT,
        OwnerTypeId INTEGER,
        DefaultValue INTEGER,
        IsBoolean INTEGER NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE SettingKeySettingOption (
        SettingKeyId INTEGER,
        SettingOptionId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE SettingValue (
        Id INTEGER PRIMARY KEY,
        SettingKeyId INTEGER,
        SettingContent INTEGER,
        CreatedAt TEXT,
        CreatedBy INTEGER,
        UpdatedAt TEXT,
        UpdatedBy INTEGER,
        OwnerId INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE BillingPlan (
        Id INTEGER PRIMARY KEY,
        PlanName TEXT,
        BillingPlanDescription TEXT,
        PricePerUser REAL,
        IsActive INTEGER NOT NULL
      )
    `);

    await dataSource.query(`
      CREATE TABLE BillingContact (
        Id INTEGER PRIMARY KEY,
        UserId INTEGER,
        WorkspaceId INTEGER,
        BillingContactName TEXT,
        BillingContactEmail TEXT,
        BillingLanguage INTEGER,
        AdditionalInvoiceDetail TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE PaymentInformation (
        Id INTEGER PRIMARY KEY,
        BillingContactId INTEGER,
        CardNumber TEXT,
        CardBrand TEXT,
        ExpirationDate TEXT,
        Cvv TEXT,
        Country TEXT,
        PostalCode TEXT
      )
    `);

    await dataSource.query(`
      CREATE TABLE Subscription (
        Id INTEGER PRIMARY KEY,
        BillingContactId INTEGER,
        BillingPlanId INTEGER,
        StartDate TEXT,
        EndDate TEXT,
        IsMonthly INTEGER NOT NULL,
        SubscriptionStatus INTEGER NOT NULL,
        AutoRenew INTEGER,
        MemberCountBilled INTEGER
      )
    `);

    await dataSource.query(`
      CREATE TABLE Export (
        Id INTEGER PRIMARY KEY,
        WorkspaceId INTEGER,
        CreatedBy INTEGER,
        CreatedAt TEXT,
        Size INTEGER
      )
    `);

    console.log('>>> Tables created successfully!');
  } catch (error) {
    console.error('>>> Error creating tables:', error);
    throw error;
  }
}
