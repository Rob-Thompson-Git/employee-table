INSERT INTO department(name)
VALUES('HR'), ('IT'), ('Engineering'), ('Management');

INSERT INTO role(title, salary, department_id)
VALUES('Director', 100000, 4), 
('Web Dev', 70000, 3),
('HR Associate', 90000, 1),
('IT Tech',600000, 2) 

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Rob', 'Thompson', 1, null),
('Jimbo', 'Fischer', 2, 1),
('Ro', 'Shambo', 3, 2),
('Jack', 'Hughes', 4, 2)