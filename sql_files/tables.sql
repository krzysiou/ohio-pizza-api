CREATE TABLE "reservation"(
    "reservation_id" SERIAL NOT NULL,
    "reservation_date" DATE NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "reservation" ADD PRIMARY KEY("reservation_id");
CREATE TABLE "pizza_to_ingredients_relation"(
    "pizza_to_ingredients_relation_id" SERIAL NOT NULL,
    "pizza_id" BIGINT NOT NULL,
    "ingredient_id" BIGINT NOT NULL
);
ALTER TABLE
    "pizza_to_ingredients_relation" ADD PRIMARY KEY(
        "pizza_to_ingredients_relation_id"
    );
CREATE TABLE "ingredient"(
    "ingredient_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "ingredient" ADD PRIMARY KEY("ingredient_id");
CREATE TABLE "employee"(
    "employee_id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "employee" ADD PRIMARY KEY("employee_id");
CREATE TABLE "pizza"(
    "pizza_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10, 2) NOT NULL,
    "pic_url" VARCHAR(255) NULL
);
ALTER TABLE
    "pizza" ADD PRIMARY KEY("pizza_id");
ALTER TABLE
    "pizza_to_ingredients_relation" ADD CONSTRAINT "pizza_to_ingredients_relation_pizza_id_foreign" FOREIGN KEY("pizza_id") REFERENCES "pizza"("pizza_id");
ALTER TABLE
    "pizza_to_ingredients_relation" ADD CONSTRAINT "pizza_to_ingredients_relation_ingredient_id_foreign" FOREIGN KEY("ingredient_id") REFERENCES "ingredient"("ingredient_id");