-- Add custom brand and model fields to tools table
alter table public.tools
  add column custom_brand text,
  add column custom_model text;

-- Add check constraints to ensure either brand_id/model_id or custom_brand/custom_model is set
alter table public.tools
  add constraint check_brand_fields 
    check (
      (brand_id is not null and custom_brand is null) or 
      (brand_id is null and custom_brand is not null)
    ),
  add constraint check_model_fields 
    check (
      (model_id is not null and custom_model is null) or 
      (model_id is null and custom_model is not null)
    ); 