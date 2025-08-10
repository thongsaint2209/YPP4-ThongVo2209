CREATE DATABASE Trello
Go
USE [Trello]
GO

-- Activity Table
CREATE TABLE [dbo].[Activity](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[ActivityDescription] [nvarchar](1000) NULL,
	[UserId] [int] NULL,
	[CategoryId] [int] NULL,
	[OwnerId] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Attachment Table
CREATE TABLE [dbo].[Attachment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CardId] [int] NULL,
	[AttachmentTypeId] [int] NULL,
	[AttachmentPath] [varchar](255) NULL,
	[AttachmentName] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Size] [varchar](255) NULL,
	[IsCover] [bit] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- AttachmentType Table
CREATE TABLE [dbo].[AttachmentType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeValue] [varchar](50) NOT NULL,
	[DisplayValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- BillingContact Table
CREATE TABLE [dbo].[BillingContact](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[WorkspaceId] [int] NULL,
	[BillingContactName] [varchar](50) NULL,
	[BillingContactEmail] [varchar](100) NULL,
	[BillingLanguage] [int] NULL,
	[AdditionalInvoiceDetail] [varchar](250) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- BillingPlan Table
CREATE TABLE [dbo].[BillingPlan](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PlanName] [varchar](100) NULL,
	[BillingPlanDescription] [varchar](1000) NULL,
	[PricePerUser] [decimal](10, 2) NULL,
	[IsActive] [bit] NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Board Table
CREATE TABLE [dbo].[Board](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BoardName] [varchar](255) NULL,
	[BoardDescription] [nvarchar](1000) NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[BackgroundUrl] [varchar](2000) NULL,
	[WorkspaceId] [int] NULL,
	[BoardStatus] [varchar](50) NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- BoardCollection Table
CREATE TABLE [dbo].[BoardCollection](
	[BoardId] [int] NOT NULL,
	[CollectionId] [int] NOT NULL
)
GO

-- BoardPowerUp Table
CREATE TABLE [dbo].[BoardPowerUp](
	[BoardId] [int] NOT NULL,
	[PowerUpId] [int] NOT NULL,
	[BoardPowerUpStatus] [bit] NOT NULL
)
GO

-- CardCoverType Table
CREATE TABLE [dbo].[CardCoverType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeValue] [varchar](50) NOT NULL,
	[DisplayValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- CardLabel Table
CREATE TABLE [dbo].[CardLabel](
	[CardId] [int] NOT NULL,
	[LabelId] [int] NOT NULL
)
GO

-- Cards Table
CREATE TABLE [dbo].[Cards](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StageId] [int] NULL,
	[Title] [varchar](255) NULL,
	[CardDescription] [nvarchar](1000) NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[CardStatus] [varchar](20) NULL,
	[CardLocation] [varchar](255) NULL,
	[StartDate] [date] NULL,
	[DueDate] [date] NULL,
	[CardCoverTypeId] [int] NULL,
	[CoverValue] [varchar](2000) NULL,
	[Position] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- CardSticker Table
CREATE TABLE [dbo].[CardSticker](
	[CardId] [int] NOT NULL,
	[StickerId] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[PositionX] [float] NULL,
	[PositionY] [float] NULL,
	[IndexZ] [int] NULL
)
GO

-- CheckList Table
CREATE TABLE [dbo].[CheckList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CheckListName] [varchar](255) NULL,
	[CardId] [int] NULL,
	[Position] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- CheckListItem Table
CREATE TABLE [dbo].[CheckListItem](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CheckListItemName] [varchar](255) NULL,
	[MemberId] [int] NULL,
	[CheckListId] [int] NULL,
	[DueDate] [date] NULL,
	[CheckListItemStatus] [bit] NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[Position] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Collections Table
CREATE TABLE [dbo].[Collections](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CollectionName] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[WorkspaceId] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Color Table
CREATE TABLE [dbo].[Color](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ColorName] [varchar](50) NULL,
	[ColorHex] [varchar](7) NULL,
	[Icon] [varchar](255) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Comment Table
CREATE TABLE [dbo].[Comment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](1000) NULL,
	[CardId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- CommentReaction Table
CREATE TABLE [dbo].[CommentReaction](
	[CommentId] [int] NOT NULL,
	[ReactionId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedAt] [datetime] NULL
)
GO

-- CustomField Table
CREATE TABLE [dbo].[CustomField](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](255) NULL,
	[DataTypeId] [int] NULL,
	[BoardId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[Position] [int] NULL,
	[IsFrontCardShowed] [bit] NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- DataType Table
CREATE TABLE [dbo].[DataType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DataTypeValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Export Table
CREATE TABLE [dbo].[Export](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkspaceId] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[Size] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- FieldItem Table
CREATE TABLE [dbo].[FieldItem](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ColorId] [int] NULL,
	[FieldItemValue] [varchar](50) NULL,
	[Position] [int] NULL,
	[CustomFieldId] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- FieldValue Table
CREATE TABLE [dbo].[FieldValue](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CardId] [int] NULL,
	[FieldValue] [varchar](255) NULL,
	[CustomFieldId] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Label Table
CREATE TABLE [dbo].[Label](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](100) NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[ColorId] [int] NULL,
	[IsDefault] [bit] NOT NULL,
	[BoardId] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Members Table
CREATE TABLE [dbo].[Members](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[RolePermissonId] [int] NULL,
	[OwnerTypeId] [int] NULL,
	[OwnerId] [int] NULL,
	[InvitedBy] [int] NULL,
	[JoinedAt] [datetime] NULL,
	[MemberStatus] [varchar](50) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Notification Table
CREATE TABLE [dbo].[Notification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ActivityId] [int] NULL,
	[IsRead] [bit] NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- OwnerType Table
CREATE TABLE [dbo].[OwnerType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OwnerTypeValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- PaymentInformation Table
CREATE TABLE [dbo].[PaymentInformation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BillingContactId] [int] NULL,
	[CardNumber] [varchar](20) NULL,
	[CardBrand] [varchar](50) NULL,
	[ExpirationDate] [date] NULL,
	[Cvv] [varchar](10) NULL,
	[Country] [varchar](100) NULL,
	[PostalCode] [varchar](20) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- PowerUp Table
CREATE TABLE [dbo].[PowerUp](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PowerUpName] [varchar](50) NULL,
	[IconUrl] [varchar](2000) NULL,
	[BackgroundUrl] [varchar](2000) NULL,
	[AuthorName] [varchar](50) NULL,
	[PowerUpDescription] [nvarchar](1000) NULL,
	[EmailContact] [varchar](50) NULL,
	[PolicyUrl] [varchar](2000) NULL,
	[IsStaffPick] [bit] NULL,
	[IsIntegration] [bit] NULL,
	[CategoryId] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- PowerUpCategory Table
CREATE TABLE [dbo].[PowerUpCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryValue] [varchar](50) NOT NULL,
	[DisplayValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Reaction Table
CREATE TABLE [dbo].[Reaction](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReactionsName] [varchar](255) NULL,
	[ShortCode] [varchar](50) NOT NULL,
	[CategoryId] [int] NULL,
	[Icon] [varchar](255) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- ReactionCategory Table
CREATE TABLE [dbo].[ReactionCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryValue] [varchar](50) NOT NULL,
	[DisplayValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- RolePermission Table
CREATE TABLE [dbo].[RolePermission](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PermissionName] [varchar](50) NULL,
	[PermissionCode] [varchar](50) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- SettingKey Table
CREATE TABLE [dbo].[SettingKey](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[KeyName] [varchar](100) NULL,
	[SettingKeyDescription] [nvarchar](1000) NULL,
	[OwnerTypeId] [int] NULL,
	[DefaultValue] [int] NULL,
	[IsBoolean] [bit] NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- SettingKeySettingOption Table
CREATE TABLE [dbo].[SettingKeySettingOption](
	[SettingKeyId] [int] NOT NULL,
	[SettingOptionId] [int] NOT NULL
)
GO

-- SettingOption Table
CREATE TABLE [dbo].[SettingOption](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DisplayValue] [varchar](255) NULL,
	[SettingOptionValue] [varchar](50) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- SettingValue Table
CREATE TABLE [dbo].[SettingValue](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SettingKeyId] [int] NULL,
	[SettingContent] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[OwnerId] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- ShareLink Table
CREATE TABLE [dbo].[ShareLink](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OwnerTypeId] [int] NULL,
	[RolePermissonId] [int] NULL,
	[OwnerId] [int] NULL,
	[ShareLinkToken] [varchar](255) NULL,
	[ShareLinkStatus] [bit] NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Stage Table
CREATE TABLE [dbo].[Stage](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[BoardId] [int] NULL,
	[StageStatus] [varchar](20) NULL,
	[ColorId] [int] NULL,
	[Position] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Sticker Table
CREATE TABLE [dbo].[Sticker](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[StickerName] [varchar](50) NULL,
	[StickerUrl] [varchar](2000) NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- StickerCategory Table
CREATE TABLE [dbo].[StickerCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryValue] [varchar](50) NOT NULL,
	[DisplayValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Subscription Table
CREATE TABLE [dbo].[Subscription](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BillingContactId] [int] NULL,
	[BillingPlanId] [int] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[IsMonthly] [bit] NOT NULL,
	[SubscriptionStatus] [bit] NOT NULL,
	[AutoRenew] [bit] NULL,
	[MemberCountBilled] [int] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Template Table
CREATE TABLE [dbo].[Template](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](255) NULL,
	[TemplateDescription] [nvarchar](1000) NULL,
	[CategoryId] [int] NULL,
	[Viewed] [int] NULL,
	[Copied] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[BoardId] [int] NULL,
	[BackgroundUrl] [varchar](255) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- TemplateCategory Table
CREATE TABLE [dbo].[TemplateCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryValue] [varchar](50) NOT NULL,
	[DisplayValue] [varchar](50) NOT NULL,
	[IconUrl] [varchar](255) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- User Table
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](255) NULL,
	[Bio] [nvarchar](1000) NULL,
	[Email] [varchar](255) NULL,
	[LastActive] [datetime] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[PictureUrl] [varchar](255) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- UserStarredBoard Table
CREATE TABLE [dbo].[UserStarredBoard](
	[UserId] [int] NOT NULL,
	[BoardId] [int] NOT NULL,
	[CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
	[StarredBoardsStatus] [bit] NOT NULL
)
GO

-- UserViewHistory Table
CREATE TABLE [dbo].[UserViewHistory](
	[UserId] [int] NOT NULL,
	[OwnerTypeId] [int] NULL,
	[OwnerId] [int] NOT NULL,
	[AccessedAt] [datetime] NULL
)
GO

-- Workspace Table
CREATE TABLE [dbo].[Workspace](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkspaceName] [varchar](255) NULL,
	[WorkspaceDescription] [nvarchar](1000) NULL,
	[TypeId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[LogoUrl] [varchar](500) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- WorkspaceMembershipDomain Table
CREATE TABLE [dbo].[WorkspaceMembershipDomain](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkspaceId] [int] NOT NULL,
	[Domain] [nvarchar](1000) NOT NULL,
	[CreatedAt] [datetime] NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- WorkspaceType Table
CREATE TABLE [dbo].[WorkspaceType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeValue] [varchar](50) NOT NULL,
	[DisplayValue] [varchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Foreign Key Constraints
ALTER TABLE [dbo].[Activity] ADD FOREIGN KEY([UserId]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Attachment] ADD FOREIGN KEY([CardId]) REFERENCES [dbo].[Cards] ([Id])
GO
ALTER TABLE [dbo].[Attachment] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Attachment] ADD CONSTRAINT [FK_Attachment_AttachmentType] FOREIGN KEY([AttachmentTypeId]) REFERENCES [dbo].[AttachmentType] ([Id])
GO

ALTER TABLE [dbo].[BillingContact] ADD FOREIGN KEY([BillingLanguage]) REFERENCES [dbo].[SettingOption] ([Id])
GO
ALTER TABLE [dbo].[BillingContact] ADD FOREIGN KEY([UserId]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[BillingContact] ADD FOREIGN KEY([WorkspaceId]) REFERENCES [dbo].[Workspace] ([Id])
GO

ALTER TABLE [dbo].[Board] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Board] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Board] ADD FOREIGN KEY([WorkspaceId]) REFERENCES [dbo].[Workspace] ([Id])
GO

ALTER TABLE [dbo].[BoardCollection] ADD FOREIGN KEY([BoardId]) REFERENCES [dbo].[Board] ([Id])
GO
ALTER TABLE [dbo].[BoardCollection] ADD FOREIGN KEY([CollectionId]) REFERENCES [dbo].[Collections] ([Id])
GO

ALTER TABLE [dbo].[BoardPowerUp] ADD FOREIGN KEY([BoardId]) REFERENCES [dbo].[Board] ([Id])
GO
ALTER TABLE [dbo].[BoardPowerUp] ADD FOREIGN KEY([PowerUpId]) REFERENCES [dbo].[PowerUp] ([Id])
GO

ALTER TABLE [dbo].[CardLabel] ADD FOREIGN KEY([CardId]) REFERENCES [dbo].[Cards] ([Id])
GO
ALTER TABLE [dbo].[CardLabel] ADD FOREIGN KEY([LabelId]) REFERENCES [dbo].[Label] ([Id])
GO

ALTER TABLE [dbo].[Cards] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Cards] ADD FOREIGN KEY([StageId]) REFERENCES [dbo].[Stage] ([Id])
GO
ALTER TABLE [dbo].[Cards] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Cards] ADD CONSTRAINT [FK_Cards_CardCoverType] FOREIGN KEY([CardCoverTypeId]) REFERENCES [dbo].[CardCoverType] ([Id])
GO

ALTER TABLE [dbo].[CardSticker] ADD FOREIGN KEY([CardId]) REFERENCES [dbo].[Cards] ([Id])
GO
ALTER TABLE [dbo].[CardSticker] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[CardSticker] ADD FOREIGN KEY([StickerId]) REFERENCES [dbo].[Sticker] ([Id])
GO

ALTER TABLE [dbo].[CheckList] ADD FOREIGN KEY([CardId]) REFERENCES [dbo].[Cards] ([Id])
GO
ALTER TABLE [dbo].[CheckList] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[CheckList] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[CheckListItem] ADD FOREIGN KEY([CheckListId]) REFERENCES [dbo].[CheckList] ([Id])
GO
ALTER TABLE [dbo].[CheckListItem] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[CheckListItem] ADD FOREIGN KEY([MemberId]) REFERENCES [dbo].[Members] ([Id])
GO
ALTER TABLE [dbo].[CheckListItem] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Collections] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Collections] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Collections] ADD FOREIGN KEY([WorkspaceId]) REFERENCES [dbo].[Workspace] ([Id])
GO

ALTER TABLE [dbo].[Comment] ADD FOREIGN KEY([CardId]) REFERENCES [dbo].[Cards] ([Id])
GO
ALTER TABLE [dbo].[Comment] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Comment] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[CommentReaction] ADD FOREIGN KEY([CommentId]) REFERENCES [dbo].[Comment] ([Id])
GO
ALTER TABLE [dbo].[CommentReaction] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[CommentReaction] ADD FOREIGN KEY([ReactionId]) REFERENCES [dbo].[Reaction] ([Id])
GO

ALTER TABLE [dbo].[CustomField] ADD FOREIGN KEY([BoardId]) REFERENCES [dbo].[Board] ([Id])
GO
ALTER TABLE [dbo].[CustomField] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[CustomField] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[CustomField] ADD CONSTRAINT [FK_CustomField_DataType] FOREIGN KEY([DataTypeId]) REFERENCES [dbo].[DataType] ([Id])
GO

ALTER TABLE [dbo].[Export] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Export] ADD FOREIGN KEY([WorkspaceId]) REFERENCES [dbo].[Workspace] ([Id])
GO

ALTER TABLE [dbo].[FieldItem] ADD FOREIGN KEY([ColorId]) REFERENCES [dbo].[Color] ([Id])
GO
ALTER TABLE [dbo].[FieldItem] ADD FOREIGN KEY([CustomFieldId]) REFERENCES [dbo].[CustomField] ([Id])
GO

ALTER TABLE [dbo].[FieldValue] ADD FOREIGN KEY([CardId]) REFERENCES [dbo].[Cards] ([Id])
GO
ALTER TABLE [dbo].[FieldValue] ADD FOREIGN KEY([CustomFieldId]) REFERENCES [dbo].[CustomField] ([Id])
GO

ALTER TABLE [dbo].[Label] ADD FOREIGN KEY([BoardId]) REFERENCES [dbo].[Board] ([Id])
GO
ALTER TABLE [dbo].[Label] ADD FOREIGN KEY([ColorId]) REFERENCES [dbo].[Color] ([Id])
GO
ALTER TABLE [dbo].[Label] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Label] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Members] ADD FOREIGN KEY([RolePermissonId]) REFERENCES [dbo].[RolePermission] ([Id])
GO
ALTER TABLE [dbo].[Members] ADD FOREIGN KEY([UserId]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Members] ADD CONSTRAINT [FK_Members_OwnerType] FOREIGN KEY([OwnerTypeId]) REFERENCES [dbo].[OwnerType] ([Id])
GO

ALTER TABLE [dbo].[Notification] ADD FOREIGN KEY([ActivityId]) REFERENCES [dbo].[Activity] ([Id])
GO

ALTER TABLE [dbo].[PaymentInformation] ADD FOREIGN KEY([BillingContactId]) REFERENCES [dbo].[BillingContact] ([Id])
GO

ALTER TABLE [dbo].[PowerUp] ADD CONSTRAINT [FK_PowerUp_PowerUpCategory] FOREIGN KEY([CategoryId]) REFERENCES [dbo].[PowerUpCategory] ([Id])
GO

ALTER TABLE [dbo].[Reaction] ADD CONSTRAINT [FK_Reaction_ReactionCategory] FOREIGN KEY([CategoryId]) REFERENCES [dbo].[ReactionCategory] ([Id])
GO

ALTER TABLE [dbo].[SettingKey] ADD CONSTRAINT [FK_SettingKey_OwnerType] FOREIGN KEY([OwnerTypeId]) REFERENCES [dbo].[OwnerType] ([Id])
GO

ALTER TABLE [dbo].[SettingKeySettingOption] ADD FOREIGN KEY([SettingKeyId]) REFERENCES [dbo].[SettingKey] ([Id])
GO
ALTER TABLE [dbo].[SettingKeySettingOption] ADD FOREIGN KEY([SettingOptionId]) REFERENCES [dbo].[SettingOption] ([Id])
GO

ALTER TABLE [dbo].[SettingValue] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[SettingValue] ADD FOREIGN KEY([SettingKeyId]) REFERENCES [dbo].[SettingKey] ([Id])
GO
ALTER TABLE [dbo].[SettingValue] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[ShareLink] ADD FOREIGN KEY([RolePermissonId]) REFERENCES [dbo].[RolePermission] ([Id])
GO
ALTER TABLE [dbo].[ShareLink] ADD CONSTRAINT [FK_ShareLink_OwnerType] FOREIGN KEY([OwnerTypeId]) REFERENCES [dbo].[OwnerType] ([Id])
GO

ALTER TABLE [dbo].[Stage] ADD FOREIGN KEY([BoardId]) REFERENCES [dbo].[Board] ([Id])
GO
ALTER TABLE [dbo].[Stage] ADD FOREIGN KEY([ColorId]) REFERENCES [dbo].[Color] ([Id])
GO
ALTER TABLE [dbo].[Stage] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Stage] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Sticker] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Sticker] ADD CONSTRAINT [FK_Sticker_StickerCategory] FOREIGN KEY([CategoryId]) REFERENCES [dbo].[StickerCategory] ([Id])
GO

ALTER TABLE [dbo].[Subscription] ADD FOREIGN KEY([BillingContactId]) REFERENCES [dbo].[BillingContact] ([Id])
GO
ALTER TABLE [dbo].[Subscription] ADD FOREIGN KEY([BillingPlanId]) REFERENCES [dbo].[BillingPlan] ([Id])
GO

ALTER TABLE [dbo].[Template] ADD FOREIGN KEY([BoardId]) REFERENCES [dbo].[Board] ([Id])
GO
ALTER TABLE [dbo].[Template] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Template] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Template] ADD CONSTRAINT [FK_Template_TemplateCategory] FOREIGN KEY([CategoryId]) REFERENCES [dbo].[TemplateCategory] ([Id])
GO

ALTER TABLE [dbo].[UserStarredBoard] ADD FOREIGN KEY([BoardId]) REFERENCES [dbo].[Board] ([Id])
GO
ALTER TABLE [dbo].[UserStarredBoard] ADD FOREIGN KEY([UserId]) REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[UserViewHistory] ADD FOREIGN KEY([UserId]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[UserViewHistory] ADD CONSTRAINT [FK_UserViewHistory_OwnerType] FOREIGN KEY([OwnerTypeId]) REFERENCES [dbo].[OwnerType] ([Id])
GO

ALTER TABLE [dbo].[Workspace] ADD FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Workspace] ADD FOREIGN KEY([UpdatedBy]) REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Workspace] ADD CONSTRAINT [FK_Workspace_WorkspaceType] FOREIGN KEY([TypeId]) REFERENCES [dbo].[WorkspaceType] ([Id])
GO

ALTER TABLE [dbo].[WorkspaceMembershipDomain] ADD FOREIGN KEY([WorkspaceId]) REFERENCES [dbo].[Workspace] ([Id])
GO