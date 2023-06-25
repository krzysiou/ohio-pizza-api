--get/set reservation
CREATE OR REPLACE FUNCTION insert_reservation( reservation_date DATE, phone_number VARCHAR(20),lastname VARCHAR(50))
RETURNS VOID AS $$
BEGIN
    INSERT INTO reservation(reservation_date, phone_number,lastname)
    VALUES( reservation_date, phone_number,lastname);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_reservation()
RETURNS TABLE(reservation_id INT, reservation_date DATE, phone_number VARCHAR(20),lastname VARCHAR(50)) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM reservation;
END;
$$ LANGUAGE plpgsql;

--get/set employee
CREATE OR REPLACE FUNCTION insert_employee( login VARCHAR(255), password VARCHAR(255))
RETURNS VOID AS $$
BEGIN
    INSERT INTO employee( login, password)
    VALUES( login, password);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_employee()
RETURNS TABLE(employee_id INT, login VARCHAR(255), password VARCHAR(255)) AS $$
BEGIN
    RETURN QUERY SELECT * FROM employee;
END;
$$ LANGUAGE plpgsql;


-- --get/set pizza
CREATE OR REPLACE FUNCTION insert_pizza( name VARCHAR(255),price DECIMAL(10, 2) , pic_url VARCHAR(255))
RETURNS VOID AS $$
BEGIN
    INSERT INTO pizza( name,price, pic_url)
    VALUES( name, price, pic_url);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_pizza()
RETURNS TABLE(pizza_id INT,price DECIMAL(10, 2), name VARCHAR(255), pic_url VARCHAR(255)) AS
$$
#variable_conflict use_column
BEGIN
    RETURN QUERY SELECT pizza_id, price::DECIMAL(10, 2), name, pic_url FROM pizza;
END;
$$ LANGUAGE plpgsql;

-- --get/set ingredient
CREATE OR REPLACE FUNCTION insert_ingredient( name VARCHAR(255))
RETURNS VOID AS 
$$
BEGIN
    INSERT INTO ingredient( name)
    VALUES( name);
END;
$$ LANGUAGE plpgsql;


-- --get/set pizza_ingredient
CREATE OR REPLACE FUNCTION insert_pizza_ingredient( pizza_id INT, ingredient_id INT)
RETURNS VOID AS 
$$
BEGIN
    INSERT INTO pizza_ingredient( pizza_id, ingredient_id)
    VALUES( pizza_id, ingredient_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_pizza_ingredient()
RETURNS TABLE(pizza_id INT, ingredient_id INT) AS $$
BEGIN
    RETURN QUERY SELECT * FROM pizza_ingredient;
END;
$$ LANGUAGE plpgsql;