-- TESTING INSERT
CREATE TABLE Clientes
(
    ID_Cliente INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

INSERT INTO Clientes (Nombre, CorreoElectronico)
VALUES ("Juan Perez", "juan@example.com");

INSERT INTO Clientes (Nombre, ID_Cliente)
VALUES ("Zibas Cbas+", 230948123);

INSERT INTO Clientes (Nombre, CorreoElectronico, ID_Cliente)
VALUES ("Pancho Sanchez", "panxito@example.com", 111111111);
-- TESTING SELECT
SELECT * FROM Clientes WHERE Nombre = "Zibas Cbas+";
SELECT * FROM Clientes;

SELECT Nombre, ID_Cliente, CorreoElectronico
FROM Clientes
WHERE Nombre = "Zibas Cbas+";

-- TESTING UPDATE
CREATE TABLE Clientes2
(
    ID_Cliente INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

INSERT INTO Clientes2 (Nombre, CorreoElectronico)
VALUES ("Juan Perez", "juan@example.com");

INSERT INTO Clientes2 (Nombre, ID_Cliente)
VALUES ("Zibas Cbas+", 230948123);

INSERT INTO Clientes2 (Nombre, CorreoElectronico, ID_Cliente)
VALUES ("Pancho Sanchez", "panxito@example.com", 111111111);

UPDATE Clientes2
SET
    Nombre = "Aquiles Castro",
    ID_Cliente = 1987344,
    CorreoElectronico = "simon@maje.com"
WHERE Nombre = "Zibas Cbas+" OR ID_Cliente = 111111111;

UPDATE Clientes2
SET
    CorreoElectronico = "correodiferente@maje.com"
WHERE Nombre = "Juan Perez";

-- TESTING DELETE
CREATE TABLE Clientes3
(
    ID_Cliente INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

INSERT INTO Clientes3 (Nombre, CorreoElectronico)
VALUES ("Juan Perez", "juan@example.com");

INSERT INTO Clientes3 (Nombre, ID_Cliente)
VALUES ("Zibas Cbas+", 230948123);

INSERT INTO Clientes3 (Nombre, CorreoElectronico, ID_Cliente)
VALUES ("Pancho Sanchez", "panxito@example.com", 111111111);

DELETE FROM Clientes3
WHERE Nombre = "Zibas Cbas+";

-- TESTING TRUNCATE
CREATE TABLE Clientes4
(
    ID_Cliente INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

INSERT INTO Clientes4 (Nombre, CorreoElectronico)
VALUES ("Juan Perez", "juan@example.com");

INSERT INTO Clientes4 (Nombre, ID_Cliente)
VALUES ("Zibas Cbas+", 230948123);

INSERT INTO Clientes4 (Nombre, CorreoElectronico, ID_Cliente)
VALUES ("Pancho Sanchez", "panxito@example.com", 111111111);

TRUNCATE TABLE Clientes4;


/*
UPDATE Clientes
SET Nombre = "Aquiles Castro", ID_Cliente = 1987344
WHERE 12341 ;
*/
