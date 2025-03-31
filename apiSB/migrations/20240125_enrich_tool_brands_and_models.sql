-- Add more brands
insert into public.tool_brands (name) values
  ('YELLOW JACKET'),
  ('BACHARACH'),
  ('DAIKIN'),
  ('VULKAN'),
  ('LOKRING'),
  ('GALAXAIR'),
  ('CORE'),
  ('TIF'),
  ('NAVAC'),
  ('IMPERIAL')
on conflict (name) do nothing;

-- Insert models for each brand and tool type
do $$
declare
  yellow_jacket_id uuid;
  bacharach_id uuid;
  daikin_id uuid;
  vulkan_id uuid;
  navac_id uuid;
  tif_id uuid;
begin
  -- Get brand IDs
  select id into yellow_jacket_id from tool_brands where name = 'YELLOW JACKET';
  select id into bacharach_id from tool_brands where name = 'BACHARACH';
  select id into daikin_id from tool_brands where name = 'DAIKIN';
  select id into vulkan_id from tool_brands where name = 'VULKAN';
  select id into navac_id from tool_brands where name = 'NAVAC';
  select id into tif_id from tool_brands where name = 'TIF';

  -- YELLOW JACKET models
  insert into tool_models (brand_id, name, tool_type) values
    (yellow_jacket_id, 'TITAN', 'manomètre'),
    (yellow_jacket_id, '41868', 'balance'),
    (yellow_jacket_id, 'P51-870 TITAN', 'pompe à vide'),
    (yellow_jacket_id, '95730', 'station de récupération'),
    (yellow_jacket_id, '68862', 'flexible');

  -- BACHARACH models
  insert into tool_models (brand_id, name, tool_type) values
    (bacharach_id, 'H-10 Pro', 'détecteur de fuite'),
    (bacharach_id, 'PGM-IR', 'détecteur de fuite'),
    (bacharach_id, 'Informant 2', 'détecteur de fuite');

  -- DAIKIN models
  insert into tool_models (brand_id, name, tool_type) values
    (daikin_id, 'VRV Checker', 'manomètre'),
    (daikin_id, 'VRV Service Checker Type 3', 'manomètre');

  -- VULKAN models
  insert into tool_models (brand_id, name, tool_type) values
    (vulkan_id, 'LOKBOX', 'flexible'),
    (vulkan_id, 'LOKPREP', 'flexible'),
    (vulkan_id, 'LOKRING Set', 'flexible');

  -- NAVAC models
  insert into tool_models (brand_id, name, tool_type) values
    (navac_id, 'NP12DM', 'pompe à vide'),
    (navac_id, 'NP4DM', 'pompe à vide'),
    (navac_id, 'NRC62D', 'station de récupération');

  -- TIF models
  insert into tool_models (brand_id, name, tool_type) values
    (tif_id, 'ZX-1', 'détecteur de fuite'),
    (tif_id, 'XP-1', 'détecteur de fuite'),
    (tif_id, 'RX-1', 'détecteur de fuite');

  -- Add more models for existing brands
  -- TESTO additional models
  insert into tool_models (brand_id, name, tool_type)
  select id, model_name, model_type
  from tool_brands cross join (
    values 
      ('316-3', 'thermomètre'),
      ('316-4', 'thermomètre'),
      ('905i', 'thermomètre'),
      ('552', 'manomètre'),
      ('558', 'manomètre')
  ) as models(model_name, model_type)
  where name = 'TESTO';

  -- MASTERCOOL additional models
  insert into tool_models (brand_id, name, tool_type)
  select id, model_name, model_type
  from tool_brands cross join (
    values 
      ('99661-A', 'manomètre'),
      ('98061', 'balance'),
      ('98062', 'balance'),
      ('69100', 'station de récupération'),
      ('69300', 'pompe à vide')
  ) as models(model_name, model_type)
  where name = 'MASTERCOOL';

  -- INFICON additional models
  insert into tool_models (brand_id, name, tool_type)
  select id, model_name, model_type
  from tool_brands cross join (
    values 
      ('TEK-Mate', 'détecteur de fuite'),
      ('HLD6000', 'détecteur de fuite'),
      ('D-TEK CO2', 'détecteur de fuite')
  ) as models(model_name, model_type)
  where name = 'INFICON';

end $$; 