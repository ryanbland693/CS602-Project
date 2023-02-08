DROP DATABASE IF EXISTS cs602;
CREATE DATABASE cs602;
USE cs602;

DROP TABLE IF EXISTS mediums;
CREATE TABLE mediums (
	MediumID CHAR(36) PRIMARY KEY NOT NULL,
    MediumName VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS availability;
CREATE TABLE availability (
	AvailabilityID CHAR(36) PRIMARY KEY NOT NULL,
    AvailabilityName VARCHAR(64) NOT NULL
);

DROP TABLE IF EXISTS paintings;
CREATE TABLE paintings (
	PaintingID CHAR(36) PRIMARY KEY NOT NULL,
    PaintingImage LONGBLOB NOT NULL,
    PaintingMimetype VARCHAR(64) NOT NULL,
    PaintingName VARCHAR(255) NOT NULL,
    PaintingDescription VARCHAR(1000) NOT NULL,
    PaintingPrice INT NULL,
    PaintingLength SMALLINT NOT NULL,
    PaintingWidth SMALLINT NOT NULL,
    MediumID CHAR(36) NOT NULL,
    AvailabilityID CHAR(36) NOT NULL,
    FOREIGN KEY (MediumID) REFERENCES mediums(MediumID),
    FOREIGN KEY (AvailabilityID) REFERENCES availability(AvailabilityID)
);

DROP TABLE IF EXISTS galleries;
CREATE TABLE galleries (
	GalleryID CHAR(36) PRIMARY KEY NOT NULL,
    GalleryImage LONGBLOB NOT NULL,
    GalleryMimetype VARCHAR(64) NOT NULL,
    GalleryName VARCHAR(255) NOT NULL,
    GalleryCity VARCHAR(64) NOT NULL,
    GalleryCountry VARCHAR(64) NOT NULL,
    GalleryURL VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS exhibitions;
CREATE TABLE exhibitions(
	ExhibitionID CHAR(36) PRIMARY KEY NOT NULL,
    ExhibitionDate DATE NOT NULL,
    ExhibitionName VARCHAR(255) NOT NULL,
    ExhibitionURL VARCHAR(255) NOT NULL
);

CREATE INDEX idx_painting
ON paintings (PaintingName, PaintingDescription(500));

INSERT INTO mediums (MediumId, MediumName)
VALUES 
	((SELECT uuid()), "Oil on Panel"),
    ((SELECT uuid()), "Oil on Linen");
    
INSERT INTO availability (AvailabilityID, AvailabilityName)
VALUES
	((SELECT uuid()), "Available"),
    ((SELECT uuid()), "Sold"),
    ((SELECT uuid()), "Private Collection");

DROP PROCEDURE IF EXISTS GetMediums;
CREATE PROCEDURE GetMediums()
SELECT MediumName FROM mediums;

DROP PROCEDURE IF EXISTS GetAvailabilities;
CREATE PROCEDURE GetAvailabilities()
SELECT AvailabilityName FROM Availability;

DROP PROCEDURE IF EXISTS AddPainting;
CREATE PROCEDURE AddPainting(
	pPaintingImage LONGBLOB, 
    pPaintingMimetype VARCHAR(64),
    pPaintingName VARCHAR(255), 
    pPaintingDescription VARCHAR(1000), 
    pPaintingPrice INT, 
    pPaintingLength SMALLINT, 
    pPaintingWidth SMALLINT, 
    pMediumName VARCHAR(255), 
    pAvailabilityName VARCHAR(64) )
INSERT INTO paintings (PaintingId, 
					   PaintingImage, 
                       PaintingMimetype,
                       PaintingName, 
                       PaintingDescription, 
                       Paintingprice, 
                       PaintingLength,
                       PaintingWidth, 
                       MediumId, 
                       AvailabilityId)
VALUES((SELECT uuid()), 
	   pPaintingImage,
       pPaintingMimetype,
       pPaintingName,
       pPaintingDescription, 
       pPaintingPrice, 
       ppaintingLength, 
       pPaintingWidth, 
       (SELECT MediumID from mediums WHERE MediumName = pMediumName),
       (SELECT AvailabilityID FROM availability WHERE AvailabilityName = pAvailabilityName)
);


DROP PROCEDURE IF EXISTS GetPaintings;
CREATE PROCEDURE GetPaintings()
SELECT PaintingId, PaintingImage, PaintingMimetype, PaintingName, PaintingDescription,
PaintingPrice, PaintingLength, PaintingWidth, MediumName, AvailabilityName
FROM paintings
JOIN mediums ON paintings.MediumID = mediums.MediumID
JOIN availability ON paintings.AvailabilityID = availability.AvailabilityID;

select * from paintings;

DROP PROCEDURE IF EXISTS GetPaintingById;
CREATE PROCEDURE GetPaintingById(pID CHAR(36))
SELECT PaintingId, PaintingImage, PaintingMimetype, PaintingName, PaintingDescription,
PaintingPrice, PaintingLength, PaintingWidth, MediumName, AvailabilityName
FROM paintings
JOIN mediums ON paintings.MediumID = mediums.MediumID
JOIN availability ON paintings.AvailabilityID = availability.AvailabilityID
WHERE paintings.PaintingId = pID;
CALL GetPaintingByID("1f952e23-a4d0-11ed-9e37-c03eba27c5e3");

DROP PROCEDURE IF EXISTS DeletePaintingById;
CREATE PROCEDURE DeletePaintingById(pID CHAR(36))
DELETE FROM paintings WHERE PaintingId = pID;

DROP PROCEDURE IF EXISTS EditPainting;
CREATE PROCEDURE EditPainting(
	pPaintingId CHAR(36),
	pPaintingImage LONGBLOB, 
    pPaintingMimetype VARCHAR(64),
    pPaintingName VARCHAR(255), 
    pPaintingDescription VARCHAR(1000), 
    pPaintingPrice INT, 
    pPaintingLength SMALLINT, 
    pPaintingWidth SMALLINT, 
    pMediumName VARCHAR(255), 
    pAvailabilityName VARCHAR(64) )
UPDATE paintings
SET 
	PaintingImage= CASE
		WHEN pPaintingImage IS NOT NULL AND pPaintingMimetype IS NOT NULL THEN pPaintingImage
		ELSE PaintingImage END,
    PaintingMimetype= CASE
		WHEN pPaintingImage IS NOT NULL AND pPaintingMimetype IS NOT NULL THEN pPaintingMimetype
		ELSE PaintingMimetype END,
    PaintingName = pPaintingName,
    PaintingDescription = pPaintingDescription,
    PaintingPrice = pPaintingPrice,
    PaintingLength = pPaintingLength,
    PaintingWidth = pPaintingWidth,
    MediumId = (SELECT MediumID from mediums WHERE MediumName = pMediumName),
    AvailabilityId = (SELECT AvailabilityID FROM availability WHERE AvailabilityName = pAvailabilityName)
WHERE PaintingId = pPaintingId;

DROP PROCEDURE IF EXISTS GetGalleries;
CREATE PROCEDURE GetGalleries()
SELECT GalleryId, GalleryImage, GalleryMimetype,
GalleryName, GalleryCity, GalleryCountry, GalleryURL
FROM galleries;

DROP PROCEDURE IF EXISTS AddGallery;
CREATE PROCEDURE AddGallery(
	pGalleryImage LONGBLOB, 
    pGalleryMimetype VARCHAR(64),
	pGalleryName VARCHAR(255), 
    pGalleryCity VARCHAR(64), 
    pGalleryCountry VARCHAR(64),
	pGalleryURL VARCHAR(255))
INSERT INTO galleries (
	GalleryId, 
    GalleryImage, 
    GalleryMimetype, 
	GalleryName, 
    GalleryCity, 
    GalleryCountry, 
    GalleryURL)
VALUES (
	(SELECT uuid()), 
    pGalleryImage, 
    pGalleryMimetype, 
    pGalleryName,
	pGalleryCity, 
    pGalleryCountry, 
    pGalleryURL);

DROP PROCEDURE IF EXISTS GetGalleryByID;
CREATE PROCEDURE GetGalleryByID(pID CHAR(36))
SELECT GalleryId, GalleryImage, GalleryMimetype, GalleryName, GalleryCity, GalleryCountry, GalleryURL
FROM Galleries
WHERE GalleryId = pID;

DROP PROCEDURE IF EXISTS DeleteGalleryByID;
CREATE PROCEDURE DeleteGalleryByID(pID CHAR(36))
DELETE FROM galleries WHERE GalleryID = pID;
