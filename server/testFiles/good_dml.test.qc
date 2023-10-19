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


UPDATE Clientes
SET Nombre = "Aquiles Castro", ID_Cliente = 1987344
WHERE Nombre = "Zibas Cbas+" OR ID_Cliente = 111111111
OR CorreoElectronico = "juan@example.com" AND 1111;


/*
UPDATE Clientes
SET Nombre = "Aquiles Castro", ID_Cliente = 1987344
WHERE 12341 ;
*/
