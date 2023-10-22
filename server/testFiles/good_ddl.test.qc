CREATE TABLE Clientes
(
    ID_Cliente INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

ALTER TABLE Clientes
ADD Temp VARCHAR;

ALTER TABLE Clientes
ADD Libras Double;

ALTER TABLE Clientes
ADD DPI VARCHAR;

ALTER TABLE Clientes
DROP COLUMN Temp;

ALTER TABLE Clientes
RENAME TO Personas;

ALTER TABLE Personas
RENAME COLUMN Libras TO Kilos;

CREATE TABLE Toy
(
    Fecha DATE,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR
);

DROP TABLE Toy;
