CREATE TABLE [Users] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Username] varchar(255),
  [Bio] text,
  [Email] varchar(255),
  [LastActive] datetime,
  [CreatedAt] datetime,
  [PictureUrl] varchar(MAX)
)
GO

CREATE TABLE [OwnerType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(50)
)
GO

CREATE TABLE [SettingKeys] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [KeyName] varchar(100),
  [Description] text,
  [OwnerTypeId] int,
  [DefaultValue] int,
  [TypeValue] varchar(50)
)
GO

CREATE TABLE [SettingOptions] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DisplayValue] varchar(255),
  [Value] varchar(50)
)
GO

CREATE TABLE [SettingValues] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SettingKeyId] int,
  [Value] int,
  [OwnerId] int
)
GO

CREATE TABLE [Activities] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CreatedAt] datetime,
  [Description] text,
  [UserId] int,
  [OwnerTypeId] int,
  [OwnerId] int
)
GO

CREATE TABLE [Notifications] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ActivityId] int,
  [Status] varchar(50)
)
GO

CREATE TABLE [Workspaces] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(255),
  [Description] text,
  [Type] varchar(100),
  [CreatedAt] datetime,
  [CreatedBy] int
)
GO

CREATE TABLE [ShareLinks] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [OwnerTypeId] int,
  [OwnerId] int,
  [PermissionId] int,
  [Token] varchar(255),
  [Status] varchar(50)
)
GO

CREATE TABLE [Boards] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(255),
  [Description] text,
  [CreatedAt] datetime,
  [CreatedBy] int,
  [AccessedAt] datetime,
  [IsStar] bit,
  [BackgroundUrl] varchar(MAX),
  [WorkspaceId] int,
  [Status] varchar(50)
)
GO

CREATE TABLE [Collections] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(255),
  [CreatedBy] int,
  [CreatedAt] datetime
)
GO

CREATE TABLE [Stages] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(255),
  [CreatedAt] datetime,
  [BoardId] int,
  [Status] varchar(20),
  [ColorId] int,
  [Position] int
)
GO

CREATE TABLE [Cards] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [StageId] int,
  [Title] varchar(255),
  [Description] text,
  [CreatedAt] datetime,
  [Status] varchar(20),
  [Location] varchar(255),
  [StartDate] date,
  [DueDate] date,
  [CoverType] varchar(50),
  [CoverValue] varchar(Max),
  [Position] int
)
GO

CREATE TABLE [Stickers] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(50),
  [StickerUrl] varchar(MAX)
)
GO

CREATE TABLE [Labels] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(100),
  [ColorId] int
)
GO

CREATE TABLE [CheckLists] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(255),
  [CardId] int
)
GO

CREATE TABLE [CheckListItems] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(255),
  [MemberId] int,
  [CheckListId] int,
  [DueDate] date,
  [Status] bit
)
GO

CREATE TABLE [CustomFields] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(255),
  [FieldType] varchar(50),
  [BoardId] int
)
GO

CREATE TABLE [FieldItems] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ColorId] int,
  [Value] varchar(50),
  [Priority] int,
  [CustomFieldId] int
)
GO

CREATE TABLE [FieldValues] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CardId] int,
  [Value] varchar(255),
  [CustomFieldId] int
)
GO

CREATE TABLE [Attachments] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CardId] int,
  [Link] varchar(255),
  [FileType] varchar(50),
  [FilePath] varchar(255),
  [Name] varchar(255),
  [UploadAt] datetime,
  [UploadBy] int,
  [IsCover] bit
)
GO

CREATE TABLE [Comments] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Content] text,
  [CardId] int,
  [CreatedAt] datetime,
  [CreatedBy] int
)
GO

CREATE TABLE [Reactions] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Icon] varchar(50)
)
GO

CREATE TABLE [Members] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [PermissionId] int,
  [OwnerTypeId] int,
  [OwnerId] int,
  [InvitedBy] int,
  [JoinedAt] datetime,
  [Status] varchar(50)
)
GO

CREATE TABLE [Permissions] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(50),
  [Code] varchar(50)
)
GO

CREATE TABLE [Templates] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] varchar(255),
  [Description] text,
  [TemplateCategoryId] int,
  [Viewed] int,
  [Copied] int,
  [CreatedBy] int,
  [CreatedAt] datetime,
  [BoardId] int,
  [BackgroundUrl] varchar(MAX)
)
GO

CREATE TABLE [TemplateCategories] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(100),
  [IconUrl] varchar(MAX)
)
GO

CREATE TABLE [WorkspaceMembershipDomains] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [WorkspaceId] int NOT NULL,
  [Domain] text NOT NULL,
  [CreatedAt] datetime
)
GO

CREATE TABLE [Exports] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [WorkspaceId] int,
  [CreatedBy] int,
  [CreatedAt] datetime,
  [Size] int
)
GO

CREATE TABLE [BillingPlans] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(100),
  [Type] varchar(50),
  [PricePerUser] decimal(10,2),
  [Status] varchar(50)
)
GO

CREATE TABLE [Billings] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [WorkspaceId] int,
  [Name] varchar(255),
  [Email] varchar(255),
  [Language] int,
  [AdditionalInvoiceDetail] varchar(250)
)
GO

CREATE TABLE [PaymentInformations] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BillingId] int,
  [CardNumber] varchar(20),
  [CardBrand] varchar(50),
  [ExpirationDate] date,
  [Cvv] varchar(10),
  [Country] varchar(100),
  [PostalCode] varchar(20)
)
GO

CREATE TABLE [Subscriptions] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BillingId] int,
  [BillingPlanId] int,
  [StartDate] date,
  [EndDate] date,
  [BillingCycle] varchar(20),
  [Status] varchar(50),
  [AutoRenew] bit,
  [MemberCountBilled] int
)
GO

CREATE TABLE [PowerUpCategories] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(50)
)
GO

CREATE TABLE [PowerUps] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(50),
  [IconUrl] varchar(Max),
  [BackgroundUrl] varchar(Max),
  [AuthorName] varchar(50),
  [Description] text,
  [EmailContact] varchar(50),
  [PolicyUrl] varchar(Max),
  [IsStaffPick] bit,
  [IsIntegration] bit,
  [PowerUpCategoryId] int
)
GO

CREATE TABLE [Colors] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] text,
  [Icon] text
)
GO

CREATE TABLE [CardLabels] (
  [CardId] int,
  [LabelId] int,
  PRIMARY KEY ([CardId], [LabelId])
)
GO

CREATE TABLE [MemberReactions] (
  [MemberId] int,
  [ReactionId] int,
  PRIMARY KEY ([MemberId], [ReactionId])
)
GO

CREATE TABLE [BoardCollections] (
  [BoardId] int,
  [CollectionId] int,
  PRIMARY KEY ([BoardId], [CollectionId])
)
GO

CREATE TABLE [SettingKeySettingOptions] (
  [SettingKeyId] int,
  [SettingOptionId] int,
  PRIMARY KEY ([SettingKeyId], [SettingOptionId])
)
GO

CREATE TABLE [CardAssignMembers] (
  [CardId] int,
  [MemberId] int,
  PRIMARY KEY ([CardId], [MemberId])
)
GO

CREATE TABLE [BoardPowerUps] (
  [BoardId] int,
  [PowerUpId] int,
  PRIMARY KEY ([BoardId], [PowerUpId])
)
GO

CREATE TABLE [CommentReactions] (
  [CommentId] int,
  [ReactionId] int,
  PRIMARY KEY ([CommentId], [ReactionId])
)
GO

CREATE TABLE [CardStickers] (
  [CardId] int,
  [StickerId] int,
  [PositionX] float,
  [PositionY] float,
  [IndexZ] int,
  PRIMARY KEY ([CardId], [StickerId])
)
GO

ALTER TABLE [SettingKeys] ADD FOREIGN KEY ([OwnerTypeId]) REFERENCES [OwnerType] ([Id])
GO

ALTER TABLE [SettingValues] ADD FOREIGN KEY ([SettingKeyId]) REFERENCES [SettingKeys] ([Id])
GO

ALTER TABLE [Activities] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Activities] ADD FOREIGN KEY ([OwnerTypeId]) REFERENCES [OwnerType] ([Id])
GO

ALTER TABLE [Notifications] ADD FOREIGN KEY ([ActivityId]) REFERENCES [Activities] ([Id])
GO

ALTER TABLE [Workspaces] ADD FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [ShareLinks] ADD FOREIGN KEY ([OwnerTypeId]) REFERENCES [OwnerType] ([Id])
GO

ALTER TABLE [ShareLinks] ADD FOREIGN KEY ([PermissionId]) REFERENCES [Permissions] ([Id])
GO

ALTER TABLE [Boards] ADD FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Boards] ADD FOREIGN KEY ([WorkspaceId]) REFERENCES [Workspaces] ([Id])
GO

ALTER TABLE [Collections] ADD FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Stages] ADD FOREIGN KEY ([BoardId]) REFERENCES [Boards] ([Id])
GO

ALTER TABLE [Stages] ADD FOREIGN KEY ([ColorId]) REFERENCES [Colors] ([Id])
GO

ALTER TABLE [Cards] ADD FOREIGN KEY ([StageId]) REFERENCES [Stages] ([Id])
GO

ALTER TABLE [Labels] ADD FOREIGN KEY ([ColorId]) REFERENCES [Colors] ([Id])
GO

ALTER TABLE [CheckLists] ADD FOREIGN KEY ([CardId]) REFERENCES [Cards] ([Id])
GO

ALTER TABLE [CheckListItems] ADD FOREIGN KEY ([MemberId]) REFERENCES [Members] ([Id])
GO

ALTER TABLE [CheckListItems] ADD FOREIGN KEY ([CheckListId]) REFERENCES [CheckLists] ([Id])
GO

ALTER TABLE [CustomFields] ADD FOREIGN KEY ([BoardId]) REFERENCES [Boards] ([Id])
GO

ALTER TABLE [FieldItems] ADD FOREIGN KEY ([ColorId]) REFERENCES [Colors] ([Id])
GO

ALTER TABLE [FieldItems] ADD FOREIGN KEY ([CustomFieldId]) REFERENCES [CustomFields] ([Id])
GO

ALTER TABLE [FieldValues] ADD FOREIGN KEY ([CardId]) REFERENCES [Cards] ([Id])
GO

ALTER TABLE [FieldValues] ADD FOREIGN KEY ([CustomFieldId]) REFERENCES [CustomFields] ([Id])
GO

ALTER TABLE [Attachments] ADD FOREIGN KEY ([CardId]) REFERENCES [Cards] ([Id])
GO

ALTER TABLE [Attachments] ADD FOREIGN KEY ([UploadBy]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Comments] ADD FOREIGN KEY ([CardId]) REFERENCES [Cards] ([Id])
GO

ALTER TABLE [Comments] ADD FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Members] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Members] ADD FOREIGN KEY ([PermissionId]) REFERENCES [Permissions] ([Id])
GO

ALTER TABLE [Members] ADD FOREIGN KEY ([OwnerTypeId]) REFERENCES [OwnerType] ([Id])
GO

ALTER TABLE [Templates] ADD FOREIGN KEY ([TemplateCategoryId]) REFERENCES [TemplateCategories] ([Id])
GO

ALTER TABLE [Templates] ADD FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Templates] ADD FOREIGN KEY ([BoardId]) REFERENCES [Boards] ([Id])
GO

ALTER TABLE [WorkspaceMembershipDomains] ADD FOREIGN KEY ([WorkspaceId]) REFERENCES [Workspaces] ([Id])
GO

ALTER TABLE [Exports] ADD FOREIGN KEY ([WorkspaceId]) REFERENCES [Workspaces] ([Id])
GO

ALTER TABLE [Exports] ADD FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Billings] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Billings] ADD FOREIGN KEY ([WorkspaceId]) REFERENCES [Workspaces] ([Id])
GO

ALTER TABLE [Billings] ADD FOREIGN KEY ([Language]) REFERENCES [SettingOptions] ([Id])
GO

ALTER TABLE [PaymentInformations] ADD FOREIGN KEY ([BillingId]) REFERENCES [Billings] ([Id])
GO

ALTER TABLE [Subscriptions] ADD FOREIGN KEY ([BillingId]) REFERENCES [Billings] ([Id])
GO

ALTER TABLE [Subscriptions] ADD FOREIGN KEY ([BillingPlanId]) REFERENCES [BillingPlans] ([Id])
GO

ALTER TABLE [PowerUps] ADD FOREIGN KEY ([PowerUpCategoryId]) REFERENCES [PowerUpCategories] ([Id])
GO

ALTER TABLE [CardLabels] ADD FOREIGN KEY ([CardId]) REFERENCES [Cards] ([Id])
GO

ALTER TABLE [CardLabels] ADD FOREIGN KEY ([LabelId]) REFERENCES [Labels] ([Id])
GO

ALTER TABLE [MemberReactions] ADD FOREIGN KEY ([MemberId]) REFERENCES [Members] ([Id])
GO

ALTER TABLE [MemberReactions] ADD FOREIGN KEY ([ReactionId]) REFERENCES [Reactions] ([Id])
GO

ALTER TABLE [BoardCollections] ADD FOREIGN KEY ([BoardId]) REFERENCES [Boards] ([Id])
GO

ALTER TABLE [BoardCollections] ADD FOREIGN KEY ([CollectionId]) REFERENCES [Collections] ([Id])
GO

ALTER TABLE [SettingKeySettingOptions] ADD FOREIGN KEY ([SettingKeyId]) REFERENCES [SettingKeys] ([Id])
GO

ALTER TABLE [SettingKeySettingOptions] ADD FOREIGN KEY ([SettingOptionId]) REFERENCES [SettingOptions] ([Id])
GO

ALTER TABLE [CardAssignMembers] ADD FOREIGN KEY ([CardId]) REFERENCES [Cards] ([Id])
GO

ALTER TABLE [CardAssignMembers] ADD FOREIGN KEY ([MemberId]) REFERENCES [Members] ([Id])
GO

ALTER TABLE [BoardPowerUps] ADD FOREIGN KEY ([BoardId]) REFERENCES [Boards] ([Id])
GO

ALTER TABLE [BoardPowerUps] ADD FOREIGN KEY ([PowerUpId]) REFERENCES [PowerUps] ([Id])
GO

ALTER TABLE [CommentReactions] ADD FOREIGN KEY ([CommentId]) REFERENCES [Comments] ([Id])
GO

ALTER TABLE [CommentReactions] ADD FOREIGN KEY ([ReactionId]) REFERENCES [Reactions] ([Id])
GO

ALTER TABLE [CardStickers] ADD FOREIGN KEY ([CardId]) REFERENCES [Cards] ([Id])
GO

ALTER TABLE [CardStickers] ADD FOREIGN KEY ([StickerId]) REFERENCES [Stickers] ([Id])
GO
