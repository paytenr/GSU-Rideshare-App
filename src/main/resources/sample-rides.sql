
-- sample drivers, for demonstration only 

-- create sarah
INSERT INTO users (
    id, created_at, updated_at, email,
    first_name, last_name, password_hash, phone, role
)
SELECT
    UNHEX(REPLACE(UUID(), '-', '')),
    NOW(6), NOW(6),
    'sarah.demo@georgiasouthern.edu',
    'Sarah', 'Johnson', 'DEMO_ACCOUNT_NO_LOGIN', NULL, 'DRIVER'
WHERE NOT EXISTS (
    SELECT 1 FROM users
    WHERE email = 'sarah.demo@georgiasouthern.edu'
);

-- create james
INSERT INTO users (
    id, created_at, updated_at, email,
    first_name, last_name, password_hash, phone, role
)
SELECT
    UNHEX(REPLACE(UUID(), '-', '')),
    NOW(6), NOW(6),
    'james.demo@georgiasouthern.edu',
    'James', 'Williams', 'DEMO_ACCOUNT_NO_LOGIN', NULL, 'DRIVER'
WHERE NOT EXISTS (
    SELECT 1 FROM users
    WHERE email = 'james.demo@georgiasouthern.edu'
);

-- get the driver ids
SET @sarah_id = (
    SELECT id FROM users
    WHERE email = 'sarah.demo@georgiasouthern.edu'
);

SET @james_id = (
    SELECT id FROM users
    WHERE email = 'james.demo@georgiasouthern.edu'
);

-- add sarah's vehicle
INSERT INTO vehicles (
    id, created_at, updated_at, color,
    license_plate, make, model, seat_capacity,
    year, owner_id
)
SELECT
    UNHEX(REPLACE(UUID(), '-', '')),
    NOW(6), NOW(6),
    'White', 'GSU-SARAH-01',
    'Toyota', 'Camry', 4, 2022, @sarah_id
WHERE NOT EXISTS (
    SELECT 1 FROM vehicles
    WHERE license_plate = 'GSU-SARAH-01'
);

-- add james's vehicle
INSERT INTO vehicles (
    id, created_at, updated_at, color,
    license_plate, make, model, seat_capacity,
    year, owner_id
)
SELECT
    UNHEX(REPLACE(UUID(), '-', '')),
    NOW(6), NOW(6),
    'Black', 'GSU-JAMES-01',
    'Honda', 'Accord', 4, 2021, @james_id
WHERE NOT EXISTS (
    SELECT 1 FROM vehicles
    WHERE license_plate = 'GSU-JAMES-01'
);

-- get the vehicle ids
SET @sarah_vehicle_id = (
    SELECT id FROM vehicles
    WHERE license_plate = 'GSU-SARAH-01'
);

SET @james_vehicle_id = (
    SELECT id FROM vehicles
    WHERE license_plate = 'GSU-JAMES-01'
);

-- add sarah's ride to savannah
INSERT INTO rides (
    id, created_at, updated_at,
    available_seats, departure_time,
    destination_address, origin_address,
    price_per_seat, status, total_seats,
    driver_id, vehicle_id
)
SELECT
    UNHEX(REPLACE(UUID(), '-', '')),
    NOW(6), NOW(6),
    3, DATE_ADD(NOW(), INTERVAL 7 DAY),
    'Savannah, GA', 'Statesboro, GA',
    15.00, 'OPEN', 3,
    @sarah_id, @sarah_vehicle_id
WHERE NOT EXISTS (
    SELECT 1 FROM rides
    WHERE driver_id = @sarah_id
    AND origin_address = 'Statesboro, GA'
    AND destination_address = 'Savannah, GA'
);

-- add james's ride to atlanta
INSERT INTO rides (
    id, created_at, updated_at,
    available_seats, departure_time,
    destination_address, origin_address,
    price_per_seat, status, total_seats,
    driver_id, vehicle_id
)
SELECT
    UNHEX(REPLACE(UUID(), '-', '')),
    NOW(6), NOW(6),
    2, DATE_ADD(NOW(), INTERVAL 8 DAY),
    'Atlanta, GA', 'Statesboro, GA',
    35.00, 'OPEN', 2,
    @james_id, @james_vehicle_id
WHERE NOT EXISTS (
    SELECT 1 FROM rides
    WHERE driver_id = @james_id
    AND origin_address = 'Statesboro, GA'
    AND destination_address = 'Atlanta, GA'
);
