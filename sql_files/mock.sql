-- INSERT INTO "reservation"("reservation_date") VALUES('2023-05-13');
-- INSERT INTO "reservation"("reservation_date") VALUES('2023-05-15');
-- INSERT INTO "reservation"("reservation_date") VALUES('2023-05-18');
-- INSERT INTO "reservation"("reservation_date") VALUES('2023-05-18'); 
-- INSERT INTO "reservation"("reservation_date") VALUES('2023-05-19');


INSERT INTO "ingredient"("name") VALUES('tomato');
INSERT INTO "ingredient"("name") VALUES('onion');
INSERT INTO "ingredient"("name") VALUES('garlic');
INSERT INTO "ingredient"("name") VALUES('chicken');
INSERT INTO "ingredient"("name") VALUES('beef');
INSERT INTO "ingredient"("name") VALUES('pork');
INSERT INTO "ingredient"("name") VALUES('fish');
INSERT INTO "ingredient"("name") VALUES('shrimp');

INSERT INTO "pizza"("name", "price") VALUES('Quattro Stagioni', 20.5);
INSERT INTO "pizza"("name", "price") VALUES('Frutti di Mare', 25.5);
INSERT INTO "pizza"("name", "price") VALUES('Quattro Formaggi', 22);

INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(1, 1);
INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(1, 2);
INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(1, 3);
INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(2, 1);
INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(2, 3);
INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(3, 1);
INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(3, 2);
INSERT INTO "pizza_to_ingredients_relation"("pizza_id", "ingredient_id") VALUES(3, 3);

INSERT INTO "employee"( "login", "password") VALUES( 'emp1', 'passwd');
INSERT INTO "employee"( "login", "password") VALUES( 'emp2', 'passwd');





