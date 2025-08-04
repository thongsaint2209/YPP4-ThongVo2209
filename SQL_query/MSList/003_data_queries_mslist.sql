USE MsList

-- Dashboard Screen

-- Get table with value cell
SELECT 
    lr.Id list_row_id,
    ldc.Id list_column_id,
    lcl.CellValue cell_value
FROM ListRow lr
CROSS JOIN ListDynamicColumn ldc
LEFT JOIN ListCellValue lcl ON lcl.ListRowId = lr.Id AND lcl.ListColumnId = ldc.Id
WHERE lr.ListId = ldc.ListId AND lr.ListId = 1
ORDER BY lr.Id, ldc.Id

-- Get information of a user
SELECT acc.Id, acc.Avatar, acc.Email, acc.FirstName, acc.LastName, acc.Company, acc.AccountStatus
FROM Account acc
WHERE acc.Email = 'user1@example.com'

-- Get lists created by a user
SELECT l.Id, l.Color, l.Icon, l.ListName, l.ListStatus, l.UpdatedAt
FROM List l
INNER JOIN Account AS acc ON l.CreatedBy = acc.Id
WHERE acc.Id = 2
ORDER BY l.UpdatedAt ASC

-- Get favorite lists of a user
SELECT l.Id, l.Color, l.Icon, l.ListName, l.ListStatus
FROM List l
INNER JOIN FavoriteList fl ON l.Id = fl.ListId
WHERE fl.AccountId = 2
ORDER BY l.UpdatedAt ASC;

-- Create List

-- Get all list types 
SELECT lt.Id, lt.Icon, lt.Title, lt.HeaderImage, lt.ListTypeDescription 
FROM ListType lt

-- Get all templates of a provider
SELECT lt.Id,lt.Title, lt.TemplateDescription, lt.HeaderImage
FROM TemplateProvider tp
INNER JOIN ListTemplate lt ON tp.Id = lt.ProviderId
WHERE tp.Id = 4; 

-- Create List From List Type

-- Get all workspaces of a user
SELECT w.Id AS WorkspaceId, w.WorkspaceName
FROM WorkspaceMember wm
INNER JOIN Workspace w ON wm.WorkspaceId = w.Id
WHERE wm.AccountId = 4
ORDER BY wm.Id DESC;

-- Create List From Template
    
-- Get basic information of a template
SELECT lt.Id, lt.Title, lt.Icon, lt.Sumary, lt.Feature
FROM ListTemplate lt
WHERE lt.Id = 1

