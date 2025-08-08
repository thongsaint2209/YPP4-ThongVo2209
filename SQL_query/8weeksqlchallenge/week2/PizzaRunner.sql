-- DROP schema-related statements (not needed in SQL Server)

-- DROP tables if they exist
IF OBJECT_ID('runners', 'U') IS NOT NULL DROP TABLE runners;
CREATE TABLE runners (
  runner_id INT,
  registration_date DATE
);
INSERT INTO runners (runner_id, registration_date)
VALUES
  (1, '2021-01-01'),
  (2, '2021-01-03'),
  (3, '2021-01-08'),
  (4, '2021-01-15');

IF OBJECT_ID('customer_orders', 'U') IS NOT NULL DROP TABLE customer_orders;
CREATE TABLE customer_orders (
  order_id INT,
  customer_id INT,
  pizza_id INT,
  exclusions VARCHAR(4),
  extras VARCHAR(4),
  order_time DATETIME
);

INSERT INTO customer_orders (order_id, customer_id, pizza_id, exclusions, extras, order_time)
VALUES
  (1, 101, 1, NULL, NULL, '2020-01-01 18:05:02'),
  (2, 101, 1, NULL, NULL, '2020-01-01 19:00:52'),
  (3, 102, 1, NULL, NULL, '2020-01-02 23:51:23'),
  (3, 102, 2, NULL, NULL, '2020-01-02 23:51:23'),
  (4, 103, 1, '4', NULL, '2020-01-04 13:23:46'),
  (4, 103, 1, '4', NULL, '2020-01-04 13:23:46'),
  (4, 103, 2, '4', NULL, '2020-01-04 13:23:46'),
  (5, 104, 1, NULL, '1', '2020-01-08 21:00:29'),
  (6, 101, 2, NULL, NULL, '2020-01-08 21:03:13'),
  (7, 105, 2, NULL, '1', '2020-01-08 21:20:29'),
  (8, 102, 1, NULL, NULL, '2020-01-09 23:54:33'),
  (9, 103, 1, '4', '1, 5', '2020-01-10 11:22:59'),
  (10, 104, 1, NULL, NULL, '2020-01-11 18:34:49'),
  (10, 104, 1, '2, 6', '1, 4', '2020-01-11 18:34:49');

IF OBJECT_ID('runner_orders', 'U') IS NOT NULL DROP TABLE runner_orders;
CREATE TABLE runner_orders (
  order_id INT,
  runner_id INT,
  pickup_time VARCHAR(19),
  distance VARCHAR(7),
  duration VARCHAR(20),
  cancellation VARCHAR(50)
);

INSERT INTO runner_orders (order_id, runner_id, pickup_time, distance, duration, cancellation)
VALUES
  (1, 1, '2020-01-01 18:15:34', '20km', '32 minutes', NULL),
  (2, 1, '2020-01-01 19:10:54', '20km', '27 minutes', NULL),
  (3, 1, '2020-01-03 00:12:37', '13.4km', '20 mins', NULL),
  (4, 2, '2020-01-04 13:53:03', '23.4', '40', NULL),
  (5, 3, '2020-01-08 21:10:57', '10', '15', NULL),
  (6, 3, NULL, NULL, NULL, 'Restaurant Cancellation'),
  (7, 2, '2020-01-08 21:30:45', '25km', '25mins', NULL),
  (8, 2, '2020-01-10 00:15:02', '23.4 km', '15 minute', NULL),
  (9, 2, NULL, NULL, NULL, 'Customer Cancellation'),
  (10, 1, '2020-01-11 18:50:20', '10km', '10minutes', NULL);

IF OBJECT_ID('pizza_names', 'U') IS NOT NULL DROP TABLE pizza_names;
CREATE TABLE pizza_names (
  pizza_id INT,
  pizza_name VARCHAR(MAX)
);
INSERT INTO pizza_names (pizza_id, pizza_name)
VALUES
  (1, 'Meatlovers'),
  (2, 'Vegetarian');

IF OBJECT_ID('pizza_recipes', 'U') IS NOT NULL DROP TABLE pizza_recipes;
CREATE TABLE pizza_recipes (
  pizza_id INT,
  toppings VARCHAR(MAX)
);
INSERT INTO pizza_recipes (pizza_id, toppings)
VALUES
  (1, '1, 2, 3, 4, 5, 6, 8, 10'),
  (2, '4, 6, 7, 9, 11, 12');

IF OBJECT_ID('pizza_toppings', 'U') IS NOT NULL DROP TABLE pizza_toppings;
CREATE TABLE pizza_toppings (
  topping_id INT,
  topping_name VARCHAR(MAX)
);
INSERT INTO pizza_toppings (topping_id, topping_name)
VALUES
  (1, 'Bacon'),
  (2, 'BBQ Sauce'),
  (3, 'Beef'),
  (4, 'Cheese'),
  (5, 'Chicken'),
  (6, 'Mushrooms'),
  (7, 'Onions'),
  (8, 'Pepperoni'),
  (9, 'Peppers'),
  (10, 'Salami'),
  (11, 'Tomatoes'),
  (12, 'Tomato Sauce');
