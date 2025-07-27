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

-- Setting
-- Get all setting keys of user
SELECT sk.KeyName
FROM SettingKeys sk 
JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
WHERE ot.Value = 'User' 

-- Get all setting keys of user with option value(id=1)
SELECT *
FROM 
        (SELECT sk.KeyName, sv.OwnerId, sk.OwnerTypeId,sv.Value
         FROM SettingKeys sk 
         LEFT JOIN SettingValues sv ON sk.Id = sv.SettingKeyId) AS sbk
         JOIN OwnerTypes ot ON ot.Id = sbk.OwnerTypeId
         WHERE ot.Value = 'User' AND sbk.OwnerId = 1


SELECT
    sk.KeyName,
    sv.Value AS SettingValueId,
    so.DisplayValue AS SettingOption
FROM 
 SettingValues sv
JOIN SettingKeys sk ON sv.SettingKeyId = sk.Id
JOIN OwnerTypes ot ON sk.OwnerTypeId = ot.Id
JOIN SettingOptions so ON so.Id = sv.Value
WHERE ot.Value = 'User'
ORDER BY sk.KeyName;

-- Member
-- Q12: Get all the members of workkspace(id=13) and with permission
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
-- Q13: Get all members of the board with Sharelink(status=Active)
WITH GetShareLinksMember AS 
    (SELECT sl.OwnerId,sl.PermissionId, m.UserId
    FROM ShareLinks sl
    JOIN Members m ON m.OwnerId = sl.OwnerId
    Where m.OwnerTypeId = 2 AND sl.OwnerTypeId = 2 AND  sl.Status ='Active')
SELECT u.Username
FROM GetShareLinksMember gslm
JOIN Users u ON u.Id = gslm.UserId

-- Q17: Get name all power up of board(id=2)
SELECT puc.Name
FROM (SELECT pu.Id
FROM PowerUps pu
JOIN BoardPowerUps bu ON pu.Id = bu.PowerUpId
JOIN Boards b ON b.Id = bu.BoardId
WHERE bu.BoardId = 2) as p
JOIN PowerUpCategories puc ON puc.Id = p.Id

-- Power up
-- Q18: Get name power up(category=2)
SELECT *
FROM PowerUps pu
JOIN PowerUpCategories puc ON pu.PowerUpCategoryId = puc.Id
WHERE puc.id = 2

-- Q20: Get all member of board (id=1)
SELECT b.Id, b.Name
FROM Members AS m
JOIN Boards b ON m.OwnerId = b.Id
WHERE m.OwnerTypeId = 2 AND b.Id=1

-- Q21: Get all card of stage(id=1)
SELECT c.Title, c.Description, s.Title AS StageName
FROM Cards c
JOIN Stages s ON c.StageId = s.Id
WHERE s.Id = 1;

-- Q21: Get all Stage of board(id=1)
SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position
FROM Stages s
JOIN Boards b ON b.Id = s.BoardId
WHERE b.Id = 1
ORDER BY s.Position;

-- Q21: Get Cards's Stage at position 3rd of board(id=1)
SELECT *
FROM Cards as c
JOIN Stages as s ON s.Id = c.StageId
WHERE s.Position= 3
SELECT s.Id AS StageId, s.Title AS StageTitle, s.Position
FROM Stages s
JOIN Boards b ON b.Id = s.BoardId
WHERE b.Id = 1 AND s.Position= 3


-- Q22: Count card of stage(id=1)
SELECT s.Title AS StageName, COUNT(*) AS CardCount
FROM Stages s
JOIN Cards c ON s.Id = c.StageId
WHERE s.Id = 1
GROUP BY s.Title;

-- Q23: Count board user create by and sort desc 
SELECT u.Username, COUNT(*) AS BoardCount
FROM Users u
JOIN Boards b ON u.Id = b.CreatedBy
GROUP BY u.Username
ORDER BY BoardCount DESC

-- Q24: Get comment lastest each card
SELECT c.CardId, ca.Title AS CardTitle, c.Content, c.CreatedAt
FROM Comments c
JOIN Cards ca ON ca.Id = c.CardId
WHERE c.CreatedAt = (
    SELECT MAX(c2.CreatedAt)
    FROM Comments c2
    WHERE c2.CardId = c.CardId
);

-- Q25: Get boards are created 7 days lastest
SELECT Name, CreatedAt
FROM Boards
WHERE CreatedAt >= DATEADD(DAY, -7, GETDATE());

-- Q26: Get all cards are created on current month, year
SELECT *
FROM Cards
WHERE MONTH(CreatedAt) = MONTH(GETDATE())
  AND YEAR(CreatedAt) = YEAR(GETDATE());