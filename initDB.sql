DROP DATABASE IF EXISTS cs602;
CREATE DATABASE cs602;
USE cs602;

CREATE TABLE mediums (
	MediumID CHAR(36) PRIMARY KEY NOT NULL,
    MediumName VARCHAR(255) NOT NULL
);

CREATE TABLE availability (
	AvailabilityID CHAR(36) PRIMARY KEY NOT NULL,
    AvailabilityName VARCHAR(64) NOT NULL
);

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

CREATE TABLE galleries (
	GalleryID CHAR(36) PRIMARY KEY NOT NULL,
    GalleryName VARCHAR(255) NOT NULL,
    GalleryCity VARCHAR(64) NOT NULL,
    GalleryCountry VARCHAR(64) NOT NULL,
    GalleryURL VARCHAR(255) NOT NULL,
    GalleryImage BLOB NOT NULL
);

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

DROP PROCEDURE IF EXISTS GetAdminPaintings;
CREATE PROCEDURE GetAdminPaintings ()
SELECT PaintingID, PaintingImage, PaintingName, PaintingMimetype
FROM paintings;

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

DROP PROCEDURE IF EXISTS GetDisplayPaintings;
CREATE PROCEDURE GetDisplayPaintings()
SELECT PaintingId, PaintingImage, PaintingMimetype, PaintingName, PaintingLength, PaintingWidth
FROM paintings;

DROP PROCEDURE IF EXISTS GetPaintingById;
CREATE PROCEDURE GetPaintingById(pID CHAR(36))
SELECT PaintingId, PaintingImage, PaintingMimetype, PaintingName, PaintingDescription,
PaintingPrice, PaintingLength, PaintingWidth, MediumName, AvailabilityName
FROM paintings
JOIN mediums ON paintings.MediumID = mediums.MediumID
JOIN availability ON paintings.AvailabilityID = availability.AvailabilityID
WHERE paintings.PaintingId = pID;
CALL GetPaintingByID("1f952e23-a4d0-11ed-9e37-c03eba27c5e3");