-- Script insert 1000 dòng vào bảng Attachments cho SQL Server
-- Logic: Link có Link data, File có FileType+FilePath, Image có IsCover

DECLARE @i INT = 1;
DECLARE @CardId INT;
DECLARE @Link VARCHAR(255);
DECLARE @FileType VARCHAR(50);
DECLARE @FilePath VARCHAR(255);
DECLARE @Name VARCHAR(255);
DECLARE @UploadBy INT;
DECLARE @IsCover BIT;
DECLARE @AttachmentType INT; -- 0=Link, 1=File, 2=Image
DECLARE @RandomNum INT;

WHILE @i <= 1000
BEGIN
    -- Random CardId từ 1-1000
    SET @CardId = ABS(CHECKSUM(NEWID()) % 1000) + 1;
    
    -- Random UploadBy từ 1-1000
    SET @UploadBy = ABS(CHECKSUM(NEWID()) % 1000) + 1;
    
    -- Reset values
    SET @Link = NULL;
    SET @FileType = NULL;
    SET @FilePath = NULL;
    SET @IsCover = NULL;
    
    -- Random attachment type: 0=Link, 1=File, 2=Image
    SET @AttachmentType = ABS(CHECKSUM(NEWID()) % 3);
    
    IF @AttachmentType = 0 -- LINK
    BEGIN
        SET @RandomNum = ABS(CHECKSUM(NEWID()) % 5);
        SET @Link = CASE @RandomNum
            WHEN 0 THEN 'https://www.google.com/document_' + CAST(@i AS VARCHAR(10))
            WHEN 1 THEN 'https://drive.google.com/file/d/abc123def456_' + CAST(@i AS VARCHAR(10))
            WHEN 2 THEN 'https://github.com/project/repository_' + CAST(@i AS VARCHAR(10))
            WHEN 3 THEN 'https://www.figma.com/design/project_' + CAST(@i AS VARCHAR(10))
            ELSE 'https://trello.com/c/card_' + CAST(@i AS VARCHAR(10))
        END;
        SET @Name = 'External Link ' + CAST(@i AS VARCHAR(10));
        -- IsCover = NULL for links
    END
    ELSE IF @AttachmentType = 1 -- FILE
    BEGIN
        SET @RandomNum = ABS(CHECKSUM(NEWID()) % 6);
        IF @RandomNum = 0
        BEGIN
            SET @FileType = 'pdf';
            SET @FilePath = '/uploads/documents/document_' + CAST(@i AS VARCHAR(10)) + '.pdf';
            SET @Name = 'Document_' + CAST(@i AS VARCHAR(10)) + '.pdf';
        END
        ELSE IF @RandomNum = 1
        BEGIN
            SET @FileType = 'docx';
            SET @FilePath = '/uploads/documents/report_' + CAST(@i AS VARCHAR(10)) + '.docx';
            SET @Name = 'Report_' + CAST(@i AS VARCHAR(10)) + '.docx';
        END
        ELSE IF @RandomNum = 2
        BEGIN
            SET @FileType = 'xlsx';
            SET @FilePath = '/uploads/spreadsheets/data_' + CAST(@i AS VARCHAR(10)) + '.xlsx';
            SET @Name = 'Data_' + CAST(@i AS VARCHAR(10)) + '.xlsx';
        END
        ELSE IF @RandomNum = 3
        BEGIN
            SET @FileType = 'txt';
            SET @FilePath = '/uploads/text/notes_' + CAST(@i AS VARCHAR(10)) + '.txt';
            SET @Name = 'Notes_' + CAST(@i AS VARCHAR(10)) + '.txt';
        END
        ELSE IF @RandomNum = 4
        BEGIN
            SET @FileType = 'zip';
            SET @FilePath = '/uploads/archives/package_' + CAST(@i AS VARCHAR(10)) + '.zip';
            SET @Name = 'Package_' + CAST(@i AS VARCHAR(10)) + '.zip';
        END
        ELSE
        BEGIN
            SET @FileType = 'pptx';
            SET @FilePath = '/uploads/presentations/slides_' + CAST(@i AS VARCHAR(10)) + '.pptx';
            SET @Name = 'Slides_' + CAST(@i AS VARCHAR(10)) + '.pptx';
        END;
        -- IsCover = NULL for files
    END
    ELSE -- IMAGE
    BEGIN
        SET @RandomNum = ABS(CHECKSUM(NEWID()) % 4);
        IF @RandomNum = 0
        BEGIN
            SET @FileType = 'jpg';
            SET @FilePath = '/uploads/images/photo_' + CAST(@i AS VARCHAR(10)) + '.jpg';
            SET @Name = 'Photo_' + CAST(@i AS VARCHAR(10)) + '.jpg';
        END
        ELSE IF @RandomNum = 1
        BEGIN
            SET @FileType = 'png';
            SET @FilePath = '/uploads/images/screenshot_' + CAST(@i AS VARCHAR(10)) + '.png';
            SET @Name = 'Screenshot_' + CAST(@i AS VARCHAR(10)) + '.png';
        END
        ELSE IF @RandomNum = 2
        BEGIN
            SET @FileType = 'gif';
            SET @FilePath = '/uploads/images/animation_' + CAST(@i AS VARCHAR(10)) + '.gif';
            SET @Name = 'Animation_' + CAST(@i AS VARCHAR(10)) + '.gif';
        END
        ELSE
        BEGIN
            SET @FileType = 'svg';
            SET @FilePath = '/uploads/images/icon_' + CAST(@i AS VARCHAR(10)) + '.svg';
            SET @Name = 'Icon_' + CAST(@i AS VARCHAR(10)) + '.svg';
        END;
        
        -- Random IsCover cho images (70% false, 30% true)
        SET @IsCover = CASE WHEN ABS(CHECKSUM(NEWID()) % 10) < 3 THEN 1 ELSE 0 END;
    END;

    INSERT INTO Attachments (
        CardId,
        Link,
        FileType,
        FilePath,
        Name,
        UploadAt,
        UploadBy,
        IsCover
    ) VALUES (
        @CardId,
        @Link,
        @FileType,
        @FilePath,
        @Name,
        DATEADD(MINUTE, -ABS(CHECKSUM(NEWID()) % 525600), GETDATE()), -- Random trong 1 năm qua
        @UploadBy,
        @IsCover
    );
    
    SET @i = @i + 1;
END;

-- Kiểm tra kết quả
SELECT 
    CASE 
        WHEN Link IS NOT NULL THEN 'Link'
        WHEN FileType IN ('jpg', 'png', 'gif', 'svg') THEN 'Image'
        ELSE 'File'
    END AS AttachmentType,
    COUNT(*) as Count,
    AVG(CASE WHEN IsCover = 1 THEN 1.0 ELSE 0.0 END) * 100 as CoverPercentage
FROM Attachments 
GROUP BY 
    CASE 
        WHEN Link IS NOT NULL THEN 'Link'
        WHEN FileType IN ('jpg', 'png', 'gif', 'svg') THEN 'Image'
        ELSE 'File'
    END;

-- Xem mẫu dữ liệu
SELECT TOP 15
    Id,
    CardId,
    CASE 
        WHEN Link IS NOT NULL THEN 'LINK: ' + LEFT(Link, 40) + '...'
        WHEN FileType IS NOT NULL THEN 'FILE: ' + FileType + ' - ' + Name
        ELSE 'OTHER'
    END as AttachmentInfo,
    IsCover,
    UploadAt,
    UploadBy
FROM Attachments 
ORDER BY Id DESC;

-- Kiểm tra logic IsCover (chỉ images mới có giá trị)
SELECT 
    FileType,
    IsCover,
    COUNT(*) as Count
FROM Attachments 
WHERE FileType IN ('jpg', 'png', 'gif', 'svg')
GROUP BY FileType, IsCover
ORDER BY FileType, IsCover;