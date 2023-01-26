 
 
CREATE TABLE IF NOT EXISTS public.products
(
    product_id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    description  character varying COLLATE pg_catalog."default" NOT NULL,
    quantity integer,
    CONSTRAINT products_pkey PRIMARY KEY (product_id)
)