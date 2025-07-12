-- Create the database
CREATE DATABASE IF NOT EXISTS rewear_db;
USE rewear_db;

-- User table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    role ENUM('user', 'admin') DEFAULT 'user',
    avatar LONGBLOB,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Item table
CREATE TABLE IF NOT EXISTS item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    type VARCHAR(100),
    size VARCHAR(50),
    `condition` VARCHAR(100),
    tags VARCHAR(255),
    status ENUM('available', 'swapped', 'redeemed', 'pending') DEFAULT 'pending',
    uploader_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uploader_id) REFERENCES user(id) ON DELETE SET NULL
);

-- ItemImage table
CREATE TABLE IF NOT EXISTS item_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    image_data LONGBLOB,
    FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE
);

-- SwapRequest table
CREATE TABLE IF NOT EXISTS swap_request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    requester_id INT,
    status ENUM('pending', 'accepted', 'rejected', 'completed') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE,
    FOREIGN KEY (requester_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Redemption table
CREATE TABLE IF NOT EXISTS redemption (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    redeemer_id INT,
    points_used INT,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE,
    FOREIGN KEY (redeemer_id) REFERENCES user(id) ON DELETE CASCADE
);

-- AdminAction table
CREATE TABLE IF NOT EXISTS admin_action (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    action_type VARCHAR(100),
    target_item_id INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (admin_id) REFERENCES user(id) ON DELETE SET NULL,
    FOREIGN KEY (target_item_id) REFERENCES item(id) ON DELETE SET NULL
); 