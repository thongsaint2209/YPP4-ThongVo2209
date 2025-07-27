-- Homepage
-- Homepage: recently viewed boards
-- Q1: Get 4 recently viewed boards by user(id=1)
SELECT TOP 4 b.Id, b.Name, b.BackgroundUrl
FROM Boards b
JOIN BoardUsers bu ON bu.BoardId = b.Id
JOIN Users u ON u.Id = bu.UserId
WHERE bu.UserId = 1
ORDER BY bu.AccessedAt DESC;

-- Homepage: Workspace, Member
-- Q2: Get all workspace that User(id=1) is member
SELECT w.Name
FROM Workspaces w
JOIN Members m ON m.OwnerId = w.Id
JOIN OwnerTypes ot ON m.OwnerTypeId = ot.Id
JOIN Users u ON u.Id = m.UserId
WHERE ot.Value = 'Workspace' AND u.Id = 1;

-- Q3: Get list all board that User(i=1) is Member for each Workspace
SELECT
    w.Id AS WorkspaceId,
    w.Name AS WorkspaceName,
    b.Name AS BoardName,
    b.BackgroundUrl
FROM Boards b
JOIN Members m ON m.OwnerId = b.Id
JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId 
JOIN Workspaces w ON b.WorkspaceId = w.Id
JOIN Users u ON m.UserId = u.Id
WHERE u.Id = 1 AND ot.Value = 'Board'

-- Homepage: Board Starred
-- Q4: Get the all starred boards by the user(id=8).
SELECT b.Id, b.Name
FROM Boards b
JOIN BoardUsers bu ON bu.BoardId = b.Id
JOIN Users u ON bu.UserId = u.Id
WHERE u.Id = 8 AND b.IsStar = 1

-- Template
-- Q6: Get all template categories.
SELECT TOP 7 Id, Name , IconUrl
FROM TemplateCategories;

-- Template
-- Q7: Get list templates in a specific category (e.g., 'VP Marketing').
SELECT tc.Name, t.Title, t.Description, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
JOIN TemplateCategories tc ON tc.Id = t.TemplateCategoryId
WHERE TC.Name ='VP Marketing'

-- Q7: Get information templates(category = 'VP Marketing', id=22)
SELECT t.Title, t.Description, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
JOIN TemplateCategories tc ON tc.Id = t.TemplateCategoryId
WHERE tc.Name ='VP Marketing' AND t.Id ='22'

-- Q8: Get information templates from board (use templates)
SELECT 
    t.Title, 
    t.Description,
    t.Copied,
    t.Viewed,
    b.BackgroundUrl,
    b.Name
FROM Templates t
    JOIN Boards b ON b.id = t.BoardId
WHERE t.Id = 1;

--Template
-- Q8: Get top 5 most viewed templates.
SELECT TOP 5 t.Title, t.Description, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
ORDER BY Viewed DESC

-- Template
-- Q9: Search templates by keyword in title.
SELECT Title
FROM Templates
WHERE Title LIKE '%B%';

-- Template
-- Q10: Search boards by keyword in title.
SELECT b.Name
FROM Boards b
WHERE b.Name LIKE '%An%';

-- Setting
-- Q11: Get setting workspace(id=1001) visibility(value=22, user=200)
SELECT w.Name, sk.KeyName, so.DisplayValue
FROM SettingKeys sk
JOIN SettingValues sv ON sv.SettingKeyId = sk.Id
JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
JOIN SettingOptions so ON so.Id = sv.Value
JOIN Workspaces w ON w.Id = sv.OwnerId
JOIN Users u ON u.Id = w.CreatedBy
WHERE ot.Value = 'Workspace' AND sk.KeyName = 'workspacevisibility' AND u.Id = 200 AND  w.Id = 1001;

-- Q12: Get top 4 suggested Boards Template for each Teamplate category have highest view
SELECT  
  TOP 4 
    b.Name,
    b.BackgroundUrl
FROM Boards b
    JOIN Templates t ON t.BoardId = b.Id
    JOIN TemplateCategories tc ON t.TemplateCategoryId = tc.Id
WHERE tc.Name = 'Financial Analyst'
ORDER BY 
    t.Viewed DESC

-- Q13: Get Boards that user(id=1) is a member in workspace(i=2)
SELECT b.Name, b.BackgroundUrl
FROM Boards b
    JOIN Members m ON m.OwnerId = b.Id
    JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId
    JOIN Workspaces w ON w.Id = b.WorkspaceId
    JOIN Users u ON u.Id = m.UserId
WHERE ot.Value = 'Board' AND u.Id = 1 AND w.Id = 2

-- Member
-- Q14: Get all the members of workkspace(id=13) and with permission
WITH GetUserPermission AS
    (SELECT m.UserId , m.PermissionId
    FROM Members m
    JOIN Workspaces w ON m.OwnerId = w.Id
    WHERE m.OwnerTypeId = 1 AND m.OwnerId = 13)
SELECT u.Username, p.Name
FROM Users u
JOIN GetUserPermission gup ON gup.UserId = u.Id
JOIN Permissions p ON p.Id = gup.PermissionId

-- Member,Sharelink
-- Q15. Get sharelink of workspace(id=9)
SELECT sl.Token, sl.Status
FROM ShareLinks sl
    JOIN Workspaces w ON w.Id = sl.OwnerId
    JOIN Permissions p ON sl.PermissionId = p.Id
WHERE w.Id = 9;

-- Q16: Get all members of the board(id=1) with permissions
SELECT m.Id, u.Username,p.Name
FROM Members m
    JOIN Boards b ON b.Id = m.OwnerId
    JOIN Permissions p ON p.Id = m.PermissionId
    JOIN Users u ON u.Id = m.UserId
WHERE b.Id = 1;

-- Setting
-- Q16: Get all setting keys of user
SELECT sk.KeyName
FROM SettingKeys sk 
JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
WHERE ot.Value = 'User' 

-- Q17: Get all setting keys of user (id=1) with option value
SELECT sk.KeyName, sv.Value AS SettingValueId, so.DisplayValue AS SettingOption, u.Id
FROM SettingKeys sk
JOIN SettingValues sv ON sv.SettingKeyId = sk.Id
JOIN OwnerTypes ot ON sk.OwnerTypeId = ot.Id
JOIN SettingOptions so ON so.Id = sv.Value
JOIN Users u ON u.Id = sv.OwnerId 
WHERE ot.Value = 'User' AND  u.Id = 1
ORDER BY sk.KeyName;

-- Q18: Get SettingKeys and SettingOptions of this SettingKeys  for Workspace
SELECT sk.KeyName, so.DisplayValue
FROM SettingKeys sk
    JOIN SettingKeySettingOptions skso ON skso.SettingKeyId = sk.Id
    JOIN SettingOptions so ON so.Id = skso.SettingOptionId
    JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId 
    WHERE ot.Value = 'Workspace'
GROUP BY sk.KeyName, so.DisplayValue

-- Power up
-- Q19:: Get name all power up of board(id=2)
SELECT pu.Name, pu.BackgroundUrl , pu.IsStaffPick, pu.IsIntegration
FROM PowerUps pu
JOIN BoardPowerUps bu ON bu.PowerUpId = pu.Id
JOIN Boards b ON b.Id = bu.BoardId
JOIN PowerUpCategories puc ON pu.PowerUpCategoryId = puc.Id
WHERE bu.BoardId = 2 AND pu.IsStaffPick = 1;

-- Q20: Get detail information power up(category=2)
SELECT pu.Name, pu.Description, pu.IconUrl, pu.AuthorName, pu.BackgroundUrl, puc.Name
FROM PowerUps pu
JOIN PowerUpCategories puc ON pu.PowerUpCategoryId = puc.Id
WHERE puc.id = 2

-- Q21: Get all member of board (id=1)
SELECT b.Id, b.Name
FROM Members AS m
JOIN Boards b ON m.OwnerId = b.Id
WHERE m.OwnerTypeId = 2 AND b.Id=1

-- Q22: Get Billing Plan
SELECT DISTINCT bp.Name, bp.PricePerUser, bp.Type
FROM BillingPlans bp

-- Q23. Get Subscription of specific Workspace

-- Board, Stage, Card
-- Q21: Get all Stage of board(id=1)
SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position
FROM Stages s
JOIN Boards b ON b.Id = s.BoardId
WHERE b.Id = 1
ORDER BY s.Position;

-- Q22: Get all card of stage(position=1) in board (id=1)
SELECT c.Title, c.Description, c.CoverValue
FROM Cards c
JOIN Stages s ON c.StageId = s.Id
JOIN Boards b ON s.BoardId = b.Id
WHERE s.Position= 1 AND b.Id = 3;

-- Q23: Get detail card(id=1) of stage(position=1) in board (id=1)
SELECT c.Title, c.Description, c.CoverValue, c.DueDate, c.StartDate, c.Location
FROM Cards c
JOIN Stages s ON c.StageId = s.Id
JOIN Boards b ON s.BoardId = b.Id
WHERE s.Position= 1 AND b.Id = 3;

-- Q24: Get members are assiged in card(id=1) of stage(position=1) in board (id=1)
SELECT u.Username, u.PictureUrl
FROM Members m
JOIN CardAssignMembers cam ON cam.MemberId = m.Id
JOIN Cards c ON c.Id = cam.CardId
JOIN Stages s ON c.StageId = s.Id
JOIN OwnerTypes ot ON ot.Id = m.OwnerTypeId
JOIN Boards b ON s.BoardId = b.Id
JOIN Users u ON u.Id = m.UserId
WHERE s.Position= 1 AND b.Id = 1 AND ot.Value = 'Board' AND c.Id = 1;

-- Q25: Count card of stage(id=1)
SELECT s.Title AS StageName, COUNT(*) AS CardCount
FROM Stages s
JOIN Cards c ON s.Id = c.StageId
WHERE s.Id = 1
GROUP BY s.Title;

-- Q26: Count board user create by and sort desc 
SELECT u.Username, COUNT(*) AS BoardCount
FROM Users u
JOIN Boards b ON u.Id = b.CreatedBy
GROUP BY u.Username
ORDER BY BoardCount DESC

-- Q27: Get comment lastest each card
SELECT c.CardId, ca.Title AS CardTitle, c.Content, c.CreatedAt
FROM Comments c
JOIN Cards ca ON ca.Id = c.CardId
WHERE c.CreatedAt = (
    SELECT MAX(c2.CreatedAt)
    FROM Comments c2
    WHERE c2.CardId = c.CardId
);

-- Q28: Get boards are created 7 days lastest
SELECT Name, CreatedAt
FROM Boards
WHERE CreatedAt >= DATEADD(DAY, -7, GETDATE());

-- Q29: Get all cards are created on current month, year
SELECT *
FROM Cards
WHERE MONTH(CreatedAt) = MONTH(GETDATE())
  AND YEAR(CreatedAt) = YEAR(GETDATE());