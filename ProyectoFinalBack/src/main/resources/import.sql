INSERT INTO libros (titulo,autor,created_at) VALUES('Los tres mosqueteros','Alexandre Dumas','2021-10-01');
INSERT INTO libros (titulo,autor,created_at) VALUES('Orgullo y prejuicio','Jane Austen','2021-10-01');
INSERT INTO libros (titulo,autor,created_at)VALUES('A sangre fría','Truman Capote','2021-10-01');

INSERT INTO libros_para_leer (titulo,autor) VALUES('Cementerio de animales','Stephen King');
--INSERT INTO libros (titulo,autor,created_at) VALUES('Orgullo y prejuicio','Jane Austen','2021-10-01');
--INSERT INTO libros (titulo,autor,created_at)VALUES('A sangre fría','Truman Capote','2021-10-01');

INSERT INTO usuarios (enabled, password, username) VALUES(1,'$2a$10$FQyl7zwMz3h702VjwhTGEeXQsr1evwqghqdUpgoNIPptKRso13kli','Patricia');
INSERT INTO usuarios (enabled, password, username) VALUES(1,'$2a$10$Cnrf9bkaTeDkreJJASHwM.GRvNmeMhsYU/VDhw6GY/QlqoyVeEeGa','admin');


INSERT INTO roles (nombre) VALUES('ROLE_USER');
INSERT INTO roles (nombre) VALUES('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,1);
