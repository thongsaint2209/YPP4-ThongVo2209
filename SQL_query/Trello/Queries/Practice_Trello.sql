-- Homepage
-- Homepage: recently viewed boards
-- Get 4 recently viewed boards by user(id=1) (Slide 4)
SELECT TOP 4 b.Id, b.[Name], b.BackgroundUrl
FROM Boards b
JOIN BoardUsers bu ON bu.BoardId = b.Id
JOIN Users u ON u.Id = bu.UserId
WHERE bu.UserId = 1
ORDER BY bu.AccessedAt DESC;

-- Homepage: Workspace, Member
-- Get all workspace that User(id=1) is member (Slide 4)
SELECT w.[Name]
FROM Workspaces w
JOIN Members m ON m.OwnerId = w.Id
JOIN OwnerTypes ot ON m.OwnerTypeId = ot.Id
JOIN Users u ON u.Id = m.UserId
WHERE ot.Value = 'Workspace' AND u.Id = 1;

-- Get list all board that User(i=1) is member for each Workspace (Slide 4)
SELECT
    w.[Name] AS WorkspaceId,
    w.[Name] AS WorkspaceName,
    b.Name AS BoardName,
    b.BackgroundUrl
FROM Boards b
JOIN Members m ON m.OwnerId = b.Id
JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId 
JOIN Workspaces w ON b.WorkspaceId = w.Id
JOIN Users u ON m.UserId = u.Id
WHERE u.Id = 1 AND ot.Value = 'Board'

-- Homepage: Board Starred
-- Get the all starred boards by the user(id=8). (Slide 4)
SELECT b.Id, b.[Name]
FROM Boards b
JOIN BoardUsers bu ON bu.BoardId = b.Id
JOIN Users u ON bu.UserId = u.Id
WHERE u.Id = 8 AND b.IsStar = 1

-- Template
-- Get all template categories. (Slide 5)
SELECT TOP 7 Id, [Name] , IconUrl
FROM TemplateCategories;

-- Get top 3 most viewed templates. (Slide 5)
SELECT TOP 3 t.Title, t.[Description], t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
ORDER BY Viewed DESC

-- Search templates by keyword in title. (Slide 5)
SELECT t.Title, t.BackgroundUrl , u.Username
FROM Templates as t
JOIN Boards b ON b.Id = t.BoardId
JOIN Users u ON u.Id = t.CreatedBy
WHERE Title LIKE '%B%';

-- Get list templates in a specific category (e.g., 'VP Marketing'). (Slide 6)
SELECT t.Title, t.[Description], t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
JOIN TemplateCategories tc ON tc.Id = t.TemplateCategoryId
WHERE TC.Name ='VP Marketing'

-- Get information templates(category = 'VP Marketing', id=22) (Slide 7)
SELECT t.Title, u.PictureUrl, t.[Description], t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
JOIN TemplateCategories tc ON tc.Id = t.TemplateCategoryId
JOIN Users u ON u.Id = t.CreatedBy
WHERE tc.Name ='VP Marketing' AND t.Id ='22'

-- Get information templates from board (use templates) (Slide 7)
SELECT 
    t.Title, 
    t.[Description],
    t.Copied,
    t.Viewed,
    b.BackgroundUrl,
    b.Name
FROM Templates t
    JOIN Boards b ON b.id = t.BoardId
WHERE t.Id = 1;

-- Get top 4 suggested Boards Template for each Teamplate category have highest view (Slide 9)
SELECT  
  TOP 4 
    b.[Name],
    b.BackgroundUrl
FROM Boards b
    JOIN Templates t ON t.BoardId = b.Id
    JOIN TemplateCategories tc ON t.TemplateCategoryId = tc.Id
WHERE tc.Name = 'Financial Analyst'
ORDER BY 
    t.Viewed DESC

-- Get Boards that user(id=1) is a member in workspace(i=2) (Slide 9)
SELECT b.[Name], b.BackgroundUrl
FROM Boards b
    JOIN Members m ON m.OwnerId = b.Id
    JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId
    JOIN Workspaces w ON w.Id = b.WorkspaceId
    JOIN Users u ON u.Id = m.UserId
WHERE ot.Value = 'Board' AND u.Id = 1 AND w.Id = 1

-- Search boards by keyword in title. (Slide 10)
SELECT b.[Name]
FROM Boards b
WHERE b.Name LIKE '%An%';

-- Member
-- Get all the members of workkspace(id=13) and with permission (Slide 12)
WITH GetUserPermission AS
    (SELECT m.UserId , m.PermissionId
    FROM Members m
    JOIN Workspaces w ON m.OwnerId = w.Id
    WHERE m.OwnerTypeId = 1 AND m.OwnerId = 13)
SELECT u.Username, p.[Name]
FROM Users u
JOIN GetUserPermission gup ON gup.UserId = u.Id
JOIN Permissions p ON p.Id = gup.PermissionId

-- Member,Sharelink
-- Get sharelink of workspace(id=9) (Slide 13)
SELECT sl.Token, sl.[Status]
FROM ShareLinks sl
    JOIN Workspaces w ON w.Id = sl.OwnerId
    JOIN Permissions p ON sl.PermissionId = p.Id
WHERE w.Id = 9;

-- Get all members of the board(id=1) with permissions (Slide 13)
SELECT m.Id, u.PictureUrl, u.Username, u.Email ,p.[Name]
FROM Members m
    JOIN Boards b ON b.Id = m.OwnerId
    JOIN Permissions p ON p.Id = m.PermissionId
    JOIN Users u ON u.Id = m.UserId
WHERE b.Id = 1;

-- Setting
-- Get all setting keys of user 
SELECT sk.KeyName
FROM SettingKeys sk 
JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
WHERE ot.[Value] = 'User' 

-- Get setting workspace(id=2) visibility(value=22, user=2) (Slide 17)
SELECT w.[Name], sk.KeyName, so.DisplayValue
FROM SettingKeys sk
JOIN SettingValues sv ON sv.SettingKeyId = sk.Id
JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
JOIN SettingOptions so ON so.Id = sv.Value
JOIN Workspaces w ON w.Id = sv.OwnerId
JOIN Users u ON u.Id = w.CreatedBy
WHERE ot.[Value] = 'Workspace' AND sk.KeyName = 'workspacevisibility' AND u.Id = 2 AND  w.Id = 2;

-- Get all setting keys of user (id=1) with option value (Slide 18)
SELECT sk.KeyName, sv.[Value] AS SettingValueId, so.DisplayValue AS SettingOption, u.Id
FROM SettingKeys sk
JOIN SettingValues sv ON sv.SettingKeyId = sk.Id
JOIN OwnerTypes ot ON sk.OwnerTypeId = ot.Id
JOIN SettingOptions so ON so.Id = sv.[Value]
JOIN Users u ON u.Id = sv.OwnerId 
WHERE ot.[Value] = 'User' AND  u.Id = 6
ORDER BY sk.KeyName;

-- Get SettingKeys and SettingOptions of this SettingKeys  for Workspace (Slide 17)
SELECT sk.KeyName, so.DisplayValue
FROM SettingKeys sk
    JOIN SettingKeySettingOptions skso ON skso.SettingKeyId = sk.Id
    JOIN SettingOptions so ON so.Id = skso.SettingOptionId
    JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId 
    WHERE ot.[Value] = 'Workspace'
GROUP BY sk.KeyName, so.DisplayValue

-- Power up
-- Get name all power up of workspace(id=2)  (Slide 21)
SELECT pu.[Name], pu.BackgroundUrl , pu.IsStaffPick, pu.IsIntegration
FROM PowerUps pu
JOIN BoardPowerUps bu ON bu.PowerUpId = pu.Id
JOIN Boards b ON b.Id = bu.BoardId
JOIN PowerUpCategories puc ON pu.PowerUpCategoryId = puc.Id
JOIN Workspaces w ON w.Id = b.Id
WHERE w.Id = 1 AND pu.IsStaffPick = 1;

-- Get detail information power up(category=2) (Slide 22)
SELECT pu.Name, pu.[Description], pu.IconUrl, pu.AuthorName, pu.BackgroundUrl, puc.[Name]
FROM PowerUps pu
JOIN PowerUpCategories puc ON pu.PowerUpCategoryId = puc.Id
WHERE puc.id = 2

-- Get Billing Plan (Slide 24)
SELECT DISTINCT bp.[Name], bp.PricePerUser, bp.Type
FROM BillingPlans bp

-- Get Subscription of Billing's specific Workspace (Slide 27)
SELECT s.StartDate, s.EndDate, s.BillingCycle, s.MemberCountBilled, b.[Type], b.PricePerUser, b.[Name]
FROM Subscriptions s
JOIN BillingPlans b ON b.Id = s.BillingPlanId
JOIN BillingContacts bc ON bc.Id = s.BillingId
JOIN Workspaces w ON  w.Id = bc.WorkspaceId
WHERE  w.Id = 2

-- Get information user of specific Workspace (Slide 28)
SELECT bc.Name, bc.Email, bc.Language
FROM BillingContacts bc
JOIN Subscriptions s ON bc.id = s.BillingId
JOIN Workspaces w ON  w.Id = bc.WorkspaceId
WHERE  w.Id = 2

-- List export of specific Workspace (Slide 30)
SELECT e.CreatedAt , e.Size
FROM Exports AS e
JOIN Workspaces w ON e.WorkspaceId = w.Id 
WHERE w.Id = 1

-- Board, Stage, Card
-- Get all list Stage of board(id=1) (Slide 33)
WITH get_board AS (
    SELECT *
    FROM Boards b
    WHERE b.Id = 1
)
SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position, c.[Name]
FROM Stages s
JOIN get_board gb ON gb.Id = s.BoardId 
JOIN Colors c ON c.Id = s.ColorId
ORDER BY s.Position;

SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position, c.[Name]
FROM Stages s
JOIN Boards b ON b.Id = s.BoardId
JOIN Colors c ON c.Id = s.ColorId
WHERE b.Id = 1
ORDER BY s.Position;

-- Get list Stage(position=3) of board(id=1) (Slide 33)
WITH get_board AS (
    SELECT *
    FROM Boards b
    WHERE b.Id = 1
)
SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position, c.[Name]
FROM Stages s
JOIN get_board gb ON gb.Id = s.BoardId 
JOIN Colors c ON c.Id = s.ColorId
WHERE s.Position = 3


-- Get all card of stage(position=1) in board (id=3) (Slide 33)
SELECT c.Title, c.[Description], c.CoverValue
FROM Cards c
JOIN Stages s ON c.StageId = s.Id
JOIN Boards b ON s.BoardId = b.Id
WHERE s.Position= 1 AND b.Id = 3;


-- Get members in card(id=1) (Slide 33)
SELECT u.Id, u.PictureUrl
FROM Members m
JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId
JOIN Cards c ON c.Id = m.OwnerId
JOIN Users u ON u.Id = m.UserId
WHERE ot.Value = 'Card' AND c.Id = 1;

-- Get information card (id=1) of a stage(id=2), board(id=2) (Slide 34)
WITH CountAttachmentCard AS (
    SELECT CardId, COUNT(*) AS number_of_attachment
    FROM Attachments
    GROUP BY CardId
),
CountChecklistItem AS (
    SELECT cl.CardId, COUNT(*) AS number_of_checklist_item
    FROM CheckLists cl
    JOIN CheckListItems cli ON cli.CheckListId = cl.Id
    GROUP BY cl.CardId
)
SELECT c.Id, c.Title, c.[Location], c.StartDate, c.DueDate, c.Position,
    ISNULL(cac.number_of_attachment, 0) AS number_of_attachment,
    ISNULL(ccl.number_of_checklist_item, 0) AS number_of_checklist_item
FROM Cards c
LEFT JOIN CountAttachmentCard cac ON cac.CardId = c.Id
LEFT JOIN CountChecklistItem ccl ON ccl.CardId = c.Id
JOIN Stages s ON s.Id = c.StageId
JOIN Boards b ON b.Id = s.BoardId
WHERE s.Id = 2 AND b.Id = 2;

--JOIN Members m ON m.OwnerId = c.Id
--JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId 

-- Get labels of card(id=720) (Slide 35)
SELECT c.Id, c.Title, col.[Name], col.Icon
FROM Labels l
JOIN CardLabels cl ON cl.LabelId = l.Id
JOIN Cards c ON c.Id = cl.CardId
JOIN Colors col ON col.Id = l.ColorId
WHERE c.Id = 1;

-- Get activities of card(id=12) (Slide 36)
SELECT a.[Description], a.CreatedAt, c.id, u.Username, u.PictureUrl
FROM Activities a
JOIN OwnerTypes ot ON ot.Id = a.OwnerTypeId
JOIN Cards c ON c.Id = a.OwnerId
JOIN Users u ON u.Id = a.UserId
WHERE ot.Value = 'Card' AND c.Id = 1
ORDER BY a.CreatedAt DESC

-- Get list Photo Uplash of card(id=189) (Slide 37)
SELECT c.CoverValue
FROM Cards c
JOIN Stages s ON s.Id = c.StageId
JOIN Boards b ON b.Id = s.BoardId
WHERE c.CoverType = 'UNSPLASH' AND b.Id = 1 AND c.Id = 189 AND c.Position = 4

-- Get list color of card(id=12) (Slide 37)
SELECT c.[Name], c.Icon
FROM Colors c

-- Get label of card(id=12) (Slide 38)
SELECT l.Title, co.[Name], co.Icon
FROM Labels l
JOIN Colors co ON co.Id = l.ColorId
JOIN CardLabels cl ON cl.LabelId = l.Id
JOIN Cards c ON c.Id = cl.CardId
WHERE c.Id = 1


-- Get list all checklist items assigned to the user. (Slide 40)
SELECT cl.[Name] AS ChecklistName, cli.[Name] AS ChecklistItemName ,cli.Position, cli.[Status] , ca.Id AS CardId
FROM CheckListItems cli
JOIN CheckLists cl ON cl.Id = cli.CheckListId
JOIN Cards ca ON ca.Id = cl.CardId
JOIN Stages st ON st.Id = ca.StageId
JOIN Boards bo ON bo.Id = st.BoardId
JOIN Members me ON me.Id = cli.MemberId
JOIN Users us ON us.Id = me.UserId
WHERE  ca.Id = 91

-- Get attachments of card (id = 1) (Slide 42)
SELECT a.[Name], a.Link ,a.UploadAt, a.IsCover
FROM Attachments a
JOIN Cards c ON c.Id = a.CardId
WHERE c.Id = 50
ORDER BY UploadAt DESC

-- Get comment of card (id = 1) (Slide 43)
SELECT c.CardId, ca.Title AS CardTitle, c.Content, c.CreatedAt, c.Id AS CommentId, u.Username, u.PictureUrl
FROM Comments c
JOIN Cards ca ON ca.Id = c.CardId
JOIN Stages s ON s.Id = ca.StageId
JOIN Boards b ON b.Id = s.BoardId 
JOIN Users u ON u.Id = c.CreatedBy
WHERE ca.Id = 1 AND s.Id = 159 AND b.Id = 159

-- Get reaction of comment's card (id = 201) (Slide 43) 
SELECT r.Id, r.Icon, COUNT(*) AS NumberReaction
FROM Reactions r
JOIN CommentReactions cr ON cr.ReactionId = r.Id
JOIN Comments c ON c.Id = cr.CommentId
WHERE c.Id = 104
GROUP BY r.Id, r.Icon;

--  Show all CustomField and Selection of a specific card (Slide 45)
WITH CustomFieldOfCard AS (
    SELECT 
        Id,
        Title,
        FieldType,
        Position,
        BoardId
    FROM CustomFields cf
    WHERE BoardId = (
        SELECT 
            st.BoardId
        FROM (
            SELECT 
                Id,
                StageId
            FROM Cards
            WHERE Id = 1
        ) ca
        JOIN Stages st ON st.Id = ca.StageId
    )
)
SELECT
    cfoc.Id AS custom_field_id,
    cfoc.Title AS custom_field_title,
    cfoc.FieldType AS custom_field_type,
    cfoc.Position AS custom_field_position,
    fv.[Value] AS field_value,
    CASE 
        WHEN cfoc.FieldType = 'DROPDOWN' THEN fi.[Value]
        ELSE fv.[Value] 
    END AS field_item_value,
    fv.CardId AS card_id
FROM CustomFieldOfCard cfoc
JOIN FieldValues fv ON fv.CustomFieldId = cfoc.Id AND fv.CardId = 1
LEFT JOIN FieldItems fi ON cfoc.FieldType = 'DROPDOWN' AND fi.Id = TRY_CAST(fv.[Value] AS INT);

-- Show all options of a custom field(id=13) with DROPDOWN type (Slide 45)
SELECT 
    cf.Id AS custom_field_id,
    cf.Title AS custom_field_title,
    cf.FieldType AS custom_field_type,
    fi.[Value] AS field_item_value,
    fi.[Priority] AS field_item_priority,
    co.[Name] AS color_name,
    co.Icon AS color_icon
FROM CustomFields cf
JOIN FieldItems fi ON fi.CustomFieldId = cf.Id
JOIN Colors co ON co.Id = fi.ColorId
WHERE cf.Id = 13
ORDER BY fi.[Priority];

-- Get list sticker  (Slide 47)
SELECT s.Id, s.[Name], s.StickerUrl
FROM Stickers s

-- Get stickers of card(id=1) (Slide 47)
SELECT s.Id, s.[Name], s.StickerUrl
FROM Stickers s
JOIN CardStickers cs ON cs.StickerId = s.Id
JOIN Cards c ON c.Id = cs.CardId
WHERE c.Id = 1

-- Get list all recent card's activities in the user's card. (Slide 49)
SELECT ca.Title , wo.[Name] AS WorkSpace , bo.[Name]  AS Board, st.Title , us.Username , us.PictureUrl , ac.[Description],
       ABS(DATEDIFF(DAY, GETDATE(), ac.CreatedAt)) AS day_ago
FROM (SELECT UserId, OwnerTypeId, OwnerId, [Description], CreatedAt
    FROM Activities WHERE OwnerTypeId = 3) ac
JOIN Cards ca ON ca.Id = ac.OwnerId AND ca.CreatedBy = 1
JOIN Stages st ON st.Id = ca.StageId
JOIN Boards bo ON bo.Id = st.BoardId
JOIN Workspaces wo ON wo.Id = bo.WorkspaceId
JOIN Users us ON us.Id = ac.UserId
Order By day_ago;

-- Show Activities unread notifications of the user. (Slide 50)
SELECT u.Username, u.PictureUrl, a.[Description], a.CreatedAt
FROM Activities a
JOIN Notifications n ON a.Id = n.ActivityId
JOIN  Users u ON u.Id = a.UserId
WHERE u.Id = 2 AND n.[Status] = 'UNREAD'

-- Count total number of unread notifications of the user. (Slide 50)
SELECT COUNT(ac.UserId) AS NumberOfNotifications
FROM Notifications n
JOIN Activities ac ON ac.Id = n.ActivityId
WHERE ac.UserId = 2 AND n.[Status] = 'UNREAD';

-- Get list boards in collection (id = 1) (Slide 52)
SELECT b.[Name] ,co.[Name] 
FROM BoardCollections bc
JOIN Boards b ON b.Id = bc.BoardId
JOIN Collections co ON co.Id = bc.CollectionId
WHERE b.WorkspaceId = 1

