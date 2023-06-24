CREATE OR REPLACE FUNCTION get_pizza_with_ingredients_table(id BIGINT)
RETURNS TABLE (pizza_name VARCHAR(255), ingredient_name VARCHAR(255))
AS $$
BEGIN
    RETURN QUERY
    SELECT piz.name AS pizza_name, ing.name AS ingredient_name
    FROM "pizza_to_ingredients_relation" AS rel
    JOIN "ingredient" AS ing ON rel.ingredient_id = ing.ingredient_id
    JOIN "pizza" AS piz ON rel.pizza_id = piz.pizza_id
    WHERE rel.pizza_id = id;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_pizza_with_ingredients_string(id BIGINT)
RETURNS TEXT
AS $$
DECLARE
    pizza_name TEXT;
    ingredient_list TEXT;
BEGIN
    SELECT p.name INTO pizza_name
    FROM "pizza" AS p
    WHERE p.pizza_id = id;
    
    SELECT string_agg(i.name, ', ') INTO ingredient_list
    FROM "pizza_to_ingredients_relation" AS rel
    JOIN "ingredient" AS i ON rel.ingredient_id = i.ingredient_id
    WHERE rel.pizza_id = id;
    
    RETURN 'Pizza: "' || pizza_name || '" Ingredients: ' || ingredient_list;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_all_pizzas()
RETURNS TABLE (pizza_name VARCHAR(255), ingredient_name VARCHAR(255))
AS $$
BEGIN
    RETURN QUERY
    SELECT piz.name AS pizza_name, ing.name AS ingredient_name
    FROM "pizza_to_ingredients_relation" AS rel
    JOIN "ingredient" AS ing ON rel.ingredient_id = ing.ingredient_id
    JOIN "pizza" AS piz ON rel.pizza_id = piz.pizza_id;
END;
$$ LANGUAGE plpgsql;
