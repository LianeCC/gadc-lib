-- Create fluid table
CREATE TABLE IF NOT EXISTS fluid (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    "order" INTEGER NOT NULL,  -- Using quotes because order is a reserved word
    category VARCHAR NOT NULL,
    gwp NUMERIC NOT NULL,  -- Using NUMERIC for precise decimal values
    inflammability BOOLEAN NOT NULL DEFAULT false
);

-- Add index for ordering
CREATE INDEX idx_fluid_order ON fluid ("order");

-- Add index for category searching
CREATE INDEX idx_fluid_category ON fluid (category);

-- Add comprehensive list of fluids, ordered by frequency of use
INSERT INTO fluid (name, "order", category, gwp, inflammability) VALUES
    -- HFC les plus courants
    ('R-134a', 1, 'HFC', 1430, false),
    ('R-404A', 2, 'HFC', 3922, false),
    ('R-410A', 3, 'HFC', 2088, false),
    ('R-407C', 4, 'HFC', 1774, false),
    ('R-32', 5, 'HFC', 675, true),
    ('R-507A', 6, 'HFC', 3985, false),
    
    -- Fluides naturels courants
    ('R-717 (NH3)', 7, 'Naturel', 0, true),
    ('R-744 (CO2)', 8, 'Naturel', 1, false),
    ('R-290 (Propane)', 9, 'Naturel', 3, true),
    ('R-600a (Isobutane)', 10, 'Naturel', 3, true),
    
    -- HFO et mélanges HFO courants (Nouvelle génération)
    ('R-1234yf', 11, 'HFO', 4, true),
    ('R-1234ze', 12, 'HFO', 7, false),
    ('R-448A', 13, 'Mélange-HFO', 1387, false),
    ('R-449A', 14, 'Mélange-HFO', 1397, false),
    ('R-452A', 15, 'Mélange-HFO', 2140, false),
    ('R-513A', 16, 'HFO', 631, false),
    
    -- HFC moins courants mais encore utilisés
    ('R-407A', 17, 'HFC', 2107, false),
    ('R-407F', 18, 'HFC', 1825, false),
    ('R-422D', 19, 'HFC', 2729, false),
    ('R-427A', 20, 'HFC', 2138, false),
    ('R-437A', 21, 'HFC', 1805, false),
    ('R-438A', 22, 'HFC', 2265, false),
    
    -- HCFC (Encore utilisé dans certaines régions)
    ('R-22', 23, 'HCFC', 1810, false),
    
    -- Nouveaux mélanges HFO
    ('R-452B', 24, 'Mélange-HFO', 698, true),
    ('R-454B', 25, 'Mélange-HFO', 466, true),
    ('R-455A', 26, 'Mélange-HFO', 148, true),
    ('R-454C', 27, 'Mélange-HFO', 148, true),
    ('R-449B', 28, 'Mélange-HFO', 1412, false),
    ('R-450A', 29, 'Mélange-HFO', 605, false),
    ('R-451A', 30, 'Mélange-HFO', 149, true),
    ('R-451B', 31, 'Mélange-HFO', 164, true),
    ('R-454A', 32, 'Mélange-HFO', 239, true),
    
    -- HFC peu courants
    ('R-23', 33, 'HFC', 14800, false),
    ('R-125', 34, 'HFC', 3500, false),
    ('R-143a', 35, 'HFC', 4470, true),
    ('R-152a', 36, 'HFC', 124, true),
    ('R-245fa', 37, 'HFC', 1030, false),
    ('R-417A', 38, 'HFC', 2346, false),
    ('R-422A', 39, 'HFC', 3143, false),
    ('R-434A', 40, 'HFC', 3245, false),
    
    -- Autres fluides naturels
    ('R-1270 (Propylene)', 41, 'Naturel', 2, true),
    
    -- Autres HFO
    ('R-1233zd', 42, 'HFO', 4.5, false),
    ('R-514A', 43, 'HFO', 7, false),
    ('R-515B', 44, 'HFO', 293, false),
    
    -- Mélanges HFO peu courants
    ('R-456A', 45, 'Mélange-HFO', 687, false),
    ('R-457A', 46, 'Mélange-HFO', 139, true),
    ('R-459A', 47, 'Mélange-HFO', 460, true),
    ('R-460A', 48, 'Mélange-HFO', 2103, false),
    ('R-460B', 49, 'Mélange-HFO', 1425, false),
    ('R-460C', 50, 'Mélange-HFO', 2189, false),
    ('R-470A', 51, 'Mélange-HFO', 947, false),
    ('R-471A', 52, 'Mélange-HFO', 137, true),
    
    -- Référence historique (CFC)
    ('R-11', 53, 'CFC', 4750, false),
    ('R-12', 54, 'CFC', 10900, false),
    
    -- HCFC peu courants
    ('R-123', 55, 'HCFC', 77, false),
    ('R-141b', 56, 'HCFC', 725, false),
    ('R-142b', 57, 'HCFC', 2310, false); 