-- How many pizzas were ordered?
SELECT COUNT(*)
FROM customer_orders co

-- How many unique customer orders were made?
--How many successful orders were delivered by each runner?
SELECT rnr.runner_id, COUNT(*)
FROM customer_orders ctr
JOIN runner_orders rnr ON ctr.order_id = rnr.order_id
WHERE rnr.cancellation != 'Restaurant Cancellation' AND rnr.cancellation != 'Customer Cancellation'
GROUP BY rnr.runner_id
--How many of each type of pizza was delivered?
--How many Vegetarian and Meatlovers were ordered by each customer?
--What was the maximum number of pizzas delivered in a single order?
--For each customer, how many delivered pizzas had at least 1 change and how many had no changes?
--How many pizzas were delivered that had both exclusions and extras?
--What was the total volume of pizzas ordered for each hour of the day?
--What was the volume of orders for each day of the week?