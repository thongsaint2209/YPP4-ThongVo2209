-- 
-- recently viewed boards
-- Get 4 recently viewed boards by user(id=1) (Slide 4)
SELECT TOP 4 brd.Id, brd.BoardName, brd.BackgroundUrl, uvh.AccessedAt
FROM Board brd
JOIN UserViewHistory uvh ON uvh.OwnerId = brd.Id 
JOIN OwnerType owt ON owt.Id = uvh.OwnerTypeId
WHERE uvh.UserId = 5 AND owt.OwnerTypeValue = 'BOARD'
ORDER BY uvh.AccessedAt DESC;

-- Workspace, Member
-- Get all workspace that User(id=1) is member (Slide 4)
SELECT w.Id, w.WorkspaceName
FROM Workspaces w
JOIN Members m ON m.OwnerId = w.Id
JOIN Categories c ON m.CategoryId = c.Id
JOIN Users u ON u.Id = m.UserId
WHERE c.CategoryName = 'WORKSPACE' AND u.Id = 1;

-- Get list all board that User(i=1) is member for each Workspace (Slide 4)
SELECT b.Id AS BoardId, b.BoardName AS BoardName, w.WorkspaceName AS WorkspaceName, b.BackgroundUrl
FROM Boards b
JOIN Members m ON m.OwnerId = b.Id
JOIN Categories c ON m.CategoryId = c.Id
JOIN Workspaces w ON b.WorkspaceId = w.Id
JOIN Users u ON m.UserId = u.Id
WHERE u.Id = 1 AND c.CategoryName = 'BOARD'

-- Board Starred
-- Get the all starred boards by the user(id=8). (Slide 4)
SELECT
    usb.UserId,
    brd.Id BoardId,
    brd.BackgroundUrl,
    brd.BoardName,
    brd.BoardStatus
FROM UserStarredBoard usb
JOIN Board brd ON brd.Id = usb.BoardId
WHERE UserId = 1 AND brd.BoardStatus = 'active'
ORDER BY usb.CreatedAt DESC;

-- Template
-- Get all template categories. (Slide 5)
SELECT TOP 7 c.Id, c.CategoryName , c.Icon
FROM Categories c
JOIN CategoryTypes ct ON ct.Id = c.CategoryTypeId AND  ct.Id = 6


-- Get top 3 most viewed templates. (Slide 5)
SELECT TOP 3 t.Id, t.Title, t.TemplateDescription, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
ORDER BY Viewed DESC

-- Search templates by keyword in title. (Slide 5)
SELECT t.Id, t.Title, t.BackgroundUrl , u.Username
FROM Templates as t
JOIN Boards b ON b.Id = t.BoardId
JOIN Users u ON u.Id = t.CreatedBy
WHERE Title LIKE '%B%';

-- Get list templates in a specific category (e.g., 'Design'). (Slide 6)
SELECT t.Id, t.Title, t.TemplateDescription, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
JOIN Categories c ON c.Id = t.CategoryId
JOIN CategoryTypes ct ON ct.Id = c.CategoryTypeId
WHERE ct.Id = 6 and c.CategoryName ='Design'

-- Get information templates(category = 'Design', id=22) (Slide 7)
SELECT t.Id, t.Title, t.TemplateDescription, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
JOIN Categories c ON c.Id = t.CategoryId
JOIN CategoryTypes ct ON ct.Id = c.CategoryTypeId
WHERE ct.Id = 6 and c.CategoryName ='Design' AND t.Id ='22'

-- Get information templates from board (use templates) (Slide 7)
SELECT t.Id, t.Title, t.TemplateDescription, t.Copied, t.Viewed, b.BackgroundUrl, b.BoardName
FROM Templates t
    JOIN Boards b ON b.id = t.BoardId
WHERE t.Id = 1;

-- list all checklist items assigned to the user with status set to false. (Slide 8)
SELECT 
    cli.CheckListItemName AS checklist_item_name, 
    cli.CheckListItemStatus AS checklist_item_status,
    ca.Title AS card_title, 
    bo.BoardName AS board_name,
    us.PictureUrl
FROM CheckListItems cli
JOIN CheckLists cl ON cl.Id = cli.CheckListId
JOIN Cards ca ON ca.Id = cl.CardId
JOIN Stages st ON st.Id = ca.StageId
JOIN Boards bo ON bo.Id = st.BoardId
JOIN Members me ON me.Id = cli.MemberId
JOIN Users us ON us.Id = me.UserId
WHERE cli.CheckListItemStatus = 0 AND me.UserId = 1;

-- List all Activities of cards that are currently assigned to the member.

-- List all Comment of cards that are currently assigned to the member.



-- Get top 4 suggested Boards Template for each Teamplate category have highest view (Slide 9)
SELECT TOP 4 b.Id, b.BoardName, b.BackgroundUrl
FROM Boards b
    JOIN Templates t ON t.BoardId = b.Id
    JOIN Categories c ON c.Id = t.CategoryId
WHERE c.CategoryName = 'Business'
ORDER BY 
    t.Viewed DESC

-- Get Boards that user(id=1) is a member in workspace(i=2) (Slide 9)
SELECT b.Id, b.BoardName, b.BackgroundUrl
FROM Boards b
    JOIN Members m ON m.OwnerId = b.Id
    JOIN Categories c ON c.Id = m.CategoryId
    JOIN Workspaces w ON w.Id = b.WorkspaceId
    JOIN Users u ON u.Id = m.UserId
WHERE c.CategoryName = 'BOARD' AND u.Id = 40 AND w.Id = 1

-- Search boards by keyword in title. (Slide 10)
SELECT b.BoardName
FROM Boards b
WHERE b.BoardName LIKE '%b%';

-- Member
-- Get all the members of workkspace(id=13) and with permission (Slide 12)
WITH GetUserPermission AS
    (SELECT m.UserId , m.PermissionId
    FROM Members m
    JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId
    JOIN Workspaces w ON m.OwnerId = w.Id
    WHERE ot.OwnerTypeValue = 'Workspace' AND w.Id = 13)
SELECT u.Id, u.Username,u.PictureUrl, u.LastActive, p.RolePermissionName
FROM Users u
JOIN GetUserPermission gup ON gup.UserId = u.Id
JOIN RolePermissions p ON p.Id = gup.PermissionId

-- Member,Sharelink
-- Get sharelink of workspace(id=9) (Slide 13)
SELECT sl.Token, sl.ShareLinkStatus
FROM ShareLinks sl
    JOIN Workspaces w ON w.Id = sl.OwnerId
    JOIN RolePermissions p ON sl.PermissionId = p.Id
WHERE w.Id = 9;

-- Get all members of the board(id=1) with permissions (Slide 13)
SELECT m.Id, u.PictureUrl, u.Username, u.Email ,rp.RolePermissionName
FROM Members m
    JOIN Boards b ON b.Id = m.OwnerId
    JOIN OwnerTypes o ON o.Id = m.OwnerTypeId
    JOIN RolePermissions rp ON rp.Id = m.PermissionId
    JOIN Users u ON u.Id = m.UserId
WHERE o.OwnerTypeValue = 'Board' AND b.Id = 1;

-- List all permission options can choose (Slide 15)
SELECT RolePermissionName 
FROM RolePermissions;

-- Setting
-- Select all settingkey of Workspace with value 
SELECT sk.Id, sk.KeyName, so.DisplayValue, sv.SettingContent
FROM  SettingValues sv 
JOIN SettingKeys sk ON sv.SettingKeyId = sk.Id AND sk.DataTypeId = 1 
JOIN OwnerTypes ot ON sk.OwnerTypeId = ot.Id
JOIN SettingOptions so ON so.Id = sv.SettingContent
JOIN Workspaces w ON w.Id = sv.OwnerId 
WHERE ot.OwnerTypeValue = 'WORKSPACE' AND w.Id = 6

-- Get setting workspace(id=7) visibility(value=22, user=7) (Slide 17)
SELECT w.Id, w.WorkspaceName, sk.KeyName, so.DisplayValue
FROM SettingKeys sk
JOIN SettingValues sv ON sv.SettingKeyId = sk.Id
JOIN SettingOptions so ON so.Id = sv.SettingValue
JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
JOIN Workspaces w ON w.Id = sv.OwnerId
JOIN Users u ON u.Id = w.CreatedBy
WHERE ot.OwnerTypeValue = 'Workspace' AND sk.KeyName = 'workspacevisibility' AND u.Id = 7 AND  w.Id = 7;

-- Get SettingKeys and SettingOptions of this SettingKeys  for Workspace (Slide 17)
SELECT sk.KeyName, so.DisplayValue
FROM SettingKeys sk
    JOIN SettingKeySettingOptions skso ON skso.SettingKeyId = sk.Id
    JOIN SettingOptions so ON so.Id = skso.SettingOptionId
    JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId 
    WHERE ot.OwnerTypeValue = 'Workspace'
GROUP BY sk.KeyName, so.DisplayValue

-- Get all setting keys of user (id=1) with option value (Slide 18)
SELECT sk.KeyName, sv.SettingValue AS SettingValueId, so.DisplayValue AS SettingOption, u.Id
FROM SettingKeys sk
JOIN SettingValues sv ON sv.SettingKeyId = sk.Id
JOIN OwnerTypes ot ON sk.OwnerTypeId = ot.Id
JOIN SettingOptions so ON so.Id = sv.SettingValue
JOIN Users u ON u.Id = sv.OwnerId 
WHERE ot.OwnerTypeValue = 'User' AND  u.Id = 6
ORDER BY sk.KeyName;

-- Power up
-- Get name all power up of workspace(id=2)  (Slide 21)
SELECT pu.Id, pu.PowerUpName, pu.BackgroundUrl , pu.IsStaffPick
FROM PowerUps pu
JOIN BoardPowerUps bu ON bu.PowerUpId = pu.Id
JOIN Boards b ON b.Id = bu.BoardId
JOIN Categories c ON pu.CategoryId = c.Id
JOIN Workspaces w ON w.Id = b.Id
WHERE w.Id = 1 AND pu.IsStaffPick = 1;

-- Get detail information power up(category=2) (Slide 22)
SELECT pu.Id, pu.PowerUpName, pu.PowerUpDescription, pu.IconUrl, pu.AuthorName, pu.BackgroundUrl, c.CategoryName
FROM PowerUps pu
JOIN Categories c ON pu.CategoryId = c.Id
WHERE c.CategoryName = 'Automation'

-- Get Billing Plan (Slide 24)
SELECT bp.Id, bp.BillingPlanName, bp.PricePerUser, bp.BillingPlanType
FROM BillingPlans bp

-- Get Subscription of Billing's specific Workspace (Slide 27)
SELECT s.Id, s.StartDate, s.EndDate, s.BillingCycle, s.MemberCountBilled, b.BillingPlanType, b.PricePerUser, b.BillingPlanName
FROM Subscriptions s
JOIN BillingPlans b ON b.Id = s.BillingPlanId
JOIN BillingContacts bc ON bc.Id = s.BillingId
JOIN Workspaces w ON  w.Id = bc.WorkspaceId
WHERE  w.Id = 2

-- Get information user of specific Workspace (Slide 28)
SELECT bc.Id, bc.BillingContactName, bc.Email, bc.BillingContactLanguage
FROM BillingContacts bc
JOIN Subscriptions s ON bc.id = s.BillingId
JOIN Workspaces w ON  w.Id = bc.WorkspaceId
WHERE  w.Id = 2

-- List export of specific Workspace (Slide 30)
SELECT e.Id, e.CreatedAt , e.Size
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
SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position, c.ColorName
FROM Stages s
JOIN get_board gb ON gb.Id = s.BoardId 
JOIN Colors c ON c.Id = s.ColorId
ORDER BY s.Position;

SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position, c.ColorName
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
SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position, c.ColorName
FROM Stages s
JOIN get_board gb ON gb.Id = s.BoardId 
JOIN Colors c ON c.Id = s.ColorId
WHERE s.Position = 3


-- Get all card of stage(position=1) in board (id=3) (Slide 33)
SELECT c.Id, c.Title, c.CardDescription, c.CoverValue
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
WHERE ot.OwnerTypeValue = 'Card' AND c.Id = 1;

-- Get information card (id=219) of a stage(id=2), board(id=2) (Slide 34)
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
SELECT c.Id, c.Title, c.CardLocation, c.StartDate, c.DueDate, c.Position,
    ISNULL(cac.number_of_attachment, 0) AS number_of_attachment,
    ISNULL(ccl.number_of_checklist_item, 0) AS number_of_checklist_item,
    col.Icon,
    col.ColorName
FROM Cards c
LEFT JOIN CountAttachmentCard cac ON cac.CardId = c.Id
LEFT JOIN CountChecklistItem ccl ON ccl.CardId = c.Id
JOIN Stages s ON s.Id = c.StageId
JOIN Boards b ON b.Id = s.BoardId
JOIN CardLabels cl ON cl.CardId = c.Id
JOIN Labels l ON l.Id = cl.LabelId
JOIN Colors col ON col.Id = l.ColorId
WHERE c.Id =219 AND s.Id = 2 AND b.Id = 2;
 

-- Get labels of card(id=1) (Slide 35)
SELECT l.Id, col.ColorName, col.Icon
FROM Labels l
JOIN CardLabels cl ON cl.LabelId = l.Id
JOIN Cards c ON c.Id = cl.CardId
JOIN Colors col ON col.Id = l.ColorId
WHERE c.Id = 1;

-- Get activities of card(id=12) (Slide 36)
SELECT a.Id, a.ActivityDescription, a.CreatedAt, c.id, u.Username, u.PictureUrl
FROM Activities a
JOIN OwnerTypes ot ON ot.Id = a.OwnerTypeId
JOIN Cards c ON c.Id = a.OwnerId
JOIN Users u ON u.Id = a.UserId
WHERE ot.OwnerTypeValue = 'Card' AND c.Id = 1
ORDER BY a.CreatedAt DESC

-- Get list Photo Uplash of card(id=189) (Slide 37)
SELECT c.Id, c.CoverValue
FROM Cards c
JOIN Stages s ON s.Id = c.StageId
JOIN Boards b ON b.Id = s.BoardId
WHERE c.CoverType = 'UNSPLASH' AND b.Id = 159 AND c.Id = 1 AND c.Position = 3

-- Get list color of card(id=12) (Slide 37)
SELECT Id, ColorName,Icon
FROM Colors;

-- Get label of card(id=12) (Slide 38)
SELECT l.Id, l.Title, co.ColorName, co.Icon
FROM Labels l
JOIN Colors co ON co.Id = l.ColorId
JOIN CardLabels cl ON cl.LabelId = l.Id
JOIN Cards c ON c.Id = cl.CardId
WHERE c.Id = 1


-- Get list all checklist items assigned to the user. (Slide 40)
SELECT cl.Id, cl.CheckListName AS ChecklistName, cli.CheckListItemName AS ChecklistItemName ,cli.Position, cli.CheckListItemStatus , ca.Id AS CardId
FROM CheckListItems cli
JOIN CheckLists cl ON cl.Id = cli.CheckListId
JOIN Cards ca ON ca.Id = cl.CardId
JOIN Stages st ON st.Id = ca.StageId
JOIN Boards bo ON bo.Id = st.BoardId
JOIN Members me ON me.Id = cli.MemberId
JOIN Users us ON us.Id = me.UserId
WHERE  ca.Id = 832

-- Get attachments of card (id = 1) (Slide 42)
SELECT a.Id, a.AttachmentName, a.Link ,a.UploadAt, a.IsCover
FROM Attachments a
JOIN Cards c ON c.Id = a.CardId
WHERE c.Id = 50
ORDER BY UploadAt DESC

-- Get comment of card (id = 1) (Slide 43)
SELECT c.Id, c.CardId, ca.Title AS CardTitle, c.Content, c.CreatedAt, c.Id AS CommentId, u.Username, u.PictureUrl
FROM Comments c
JOIN Cards ca ON ca.Id = c.CardId
JOIN Stages s ON s.Id = ca.StageId
JOIN Boards b ON b.Id = s.BoardId 
JOIN Users u ON u.Id = c.CreatedBy
WHERE ca.Id = 1 AND s.Id = 159 AND b.Id = 159

-- Get reaction of comment's card (id = 104) (Slide 43) 
SELECT r.Id, r.Icon, COUNT(*) AS NumberReaction
FROM Reactions r
JOIN CommentReactions cr ON cr.ReactionId = r.Id
JOIN Comments c ON c.Id = cr.CommentId
WHERE c.Id = 104
GROUP BY r.Id, r.Icon;

-- Select all Custom Field of board (Slide 45)
SELECT cf.Id, cf.title,  cf.CategoryId
FROM CustomFields cf
WHERE cf.BoardId = 1

-- Select all Cust4


-- Select all option of all Custom Field (=dropdown) (Slide 45)
SELECT cf.Id, cf.CategoryId, cf.Title, fi.FieldItemValue, cf.Id 
FROM CustomFields cf
JOIN FieldItems fi ON fi.CustomFieldId= cf.Id AND cf.CategoryId = 7

-- Get list sticker  (Slide 47)
SELECT s.Id, s.StickerName, s.StickerUrl
FROM Stickers s

-- Get stickers of card(id=1) (Slide 47)
SELECT s.Id, s.StickerName, s.StickerUrl
FROM Stickers s
JOIN CardStickers cs ON cs.StickerId = s.Id
JOIN Cards c ON c.Id = cs.CardId
WHERE c.Id = 1

-- Get list all recent card's activities in the user's card. (Slide 49)
SELECT ca.Title , wo.WorkspaceName AS WorkSpace , bo.BoardName  AS Board, st.Title , u.Username , u.PictureUrl , ac.ActivityDescription,
       DATEDIFF(DAY,ac.CreatedAt, GETDATE()) AS day_ago
FROM (SELECT UserId, CategoryId , OwnerId, ActivityDescription, CreatedAt
      FROM Activities 
      WHERE CategoryId = 3) ac
JOIN Cards ca ON ca.Id = ac.OwnerId 
JOIN Stages st ON st.Id = ca.StageId
JOIN Boards bo ON bo.Id = st.BoardId
JOIN Workspaces wo ON wo.Id = bo.WorkspaceId
JOIN Users u ON u.Id = ac.UserId
WHERE u.Id = 1
Order By day_ago;

-- Show Activities unread notifications of the user. (Slide 50)
SELECT a.Id, u.Username, u.PictureUrl, a.ActivityDescription, a.CreatedAt
FROM Activities a
JOIN Notifications n ON a.Id = n.ActivityId
JOIN  Users u ON u.Id = a.UserId
WHERE u.Id = 2 AND n.IsRead = 0

-- Count total number of unread notifications of the user. (Slide 50)
SELECT COUNT(ac.UserId) AS NumberOfNotifications
FROM Notifications n
JOIN Activities ac ON ac.Id = n.ActivityId
WHERE ac.UserId = 2 AND n.IsRead = 0;

-- Get list boards in collection (id = 1) (Slide 52)
SELECT b.BoardName ,co.CollectionName
FROM BoardCollections bc
JOIN Boards b ON b.Id = bc.BoardId
JOIN Collections co ON co.Id = bc.CollectionId
WHERE b.WorkspaceId = 1



-- Select all Custom Field of board 
SELECT cf.Id, cf.title, cf.DataTypeId
FROM CustomFields cf
WHERE cf.BoardId = 1

-- Select all Custom Field of board with value
SELECT cf.Id, cf.title, cf.DataTypeId, fv.FieldValue, fi.FieldItemValue
FROM CustomFields cf
JOIN FieldValues fv ON fv.CustomFieldId = cf.Id
LEFT JOIN FieldItems fi ON fi.Id= TRY_CAST(fv.FieldValue AS INT) AND cf.DataTypeId = 1
WHERE cf.BoardId = 1

-- Select all option of 1 Custom Field (=dropdown)
SELECT cf.Id, cf.DataTypeId, cf.Title, fi.FieldItemValue
FROM CustomFields cf
JOIN FieldItems fi ON fi.CustomFieldId= cf.Id AND cf.DataTypeId = 1
WHERE cf.BoardId = 491 AND cf.Id = 1

- xx0. Show all custom field of specific card
SELECT 
    csf.Id CustomFieldId,
    csf.Title CustomFieldName,
    cgr.CategoryName,
    csf.Position CustomFieldPosition,
    crd.Id CardId,
    brd.Id BoardId
FROM CustomFields csf 
JOIN Categories cgr ON cgr.Id = csf.CategoryId 
JOIN Boards brd ON brd.Id = csf.BoardId
JOIN Stages stg ON stg.BoardId = brd.Id
JOIN Cards crd ON crd.StageId = stg.Id
WHERE crd.Id = 1
ORDER BY csf.Position

-- Show custom field WITH DROPDOWN TYPE and their field value of specific card
WITH FieldValuesWithCast AS(
    SELECT 
        Id,
        TRY_CAST(FieldValue AS INT) FieldValue,
        CustomFieldId,
        CardId
    FROM FieldValues
)
SELECT 
    ctf.Id CustomFieldId,
    ctf.Title CustomFieldTitle,
    ftm.FieldItemValue,
    ctf.Position CustomFieldPosition,
    cgr.CategoryName,
    fvl.CardId
FROM CustomFields ctf
JOIN FieldValuesWithCast fvl ON fvl.CustomFieldId = ctf.Id
JOIN FieldItems ftm ON ftm.Id = fvl.FieldValue
JOIN Categories cgr ON cgr.Id = ctf.CategoryId
WHERE CategoryName = 'DROPDOWN'
ORDER BY ctf.Position


-- Show custom field without dropdown type and their field value of specific card 
SELECT 
    ctf.Id CustomFieldId,
    ctf.Title CustomFieldTitle,
    fvl.FieldValue,
    cgr.CategoryName,
    ctf.Position CustomFieldPosition,
    crd.Id CardId,
    brd.Id BoardId
FROM CustomFields ctf
LEFT JOIN FieldValues fvl ON fvl.CustomFieldId = ctf.Id
LEFT JOIN Cards crd ON crd.Id = fvl.CardId
JOIN Categories cgr ON cgr.Id = ctf.CategoryId
JOIN CategoryTypes ctt ON ctt.Id = cgr.CategoryTypeId
JOIN Stages stg ON stg.Id = crd.StageId
JOIN Boards brd ON brd.Id = stg.BoardId
WHERE CategoryName != 'DROPDOWN' AND ctt.CategoryTypeValue = 'DataTypes' AND brd.Id = 1 AND crd.Id = 1
ORDER BY ctf.Position

-- Show options of custom field with dropdown type of specific board
SELECT 
    ctf.Id,
    ctf.Title,
    ftm.Id,
    ftm.FieldItemValue,
    cgr.CategoryName,
    ctf.Position,
    ctf.BoardId
FROM CustomFields ctf
JOIN FieldItems ftm ON ftm.CustomFieldId = ctf.Id
JOIN Categories cgr ON cgr.Id = ctf.CategoryId
WHERE ctf.BoardId = 2 AND cgr.CategoryName = 'DROPDOWN'
ORDER BY ctf.Position