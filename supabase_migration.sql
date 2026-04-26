-- Supabase Verilənlər Bazası Miqrasiya Skripti
-- Pultap Layihəsi
-- Bu skripti Supabase Dashboard > SQL Editor bölməsinə yapışdırıb icra edin.

-- 1. BANKS cədvəli
CREATE TABLE IF NOT EXISTS banks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "logoColor" TEXT,
    rating NUMERIC(3, 1),
    reviews INTEGER
);

-- 2. CREDITS cədvəli
CREATE TABLE IF NOT EXISTS credits (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "bankId" TEXT REFERENCES banks(id),
    type TEXT NOT NULL, -- online, nağd, ipoteka, avto
    rate NUMERIC(5, 2),
    "amountMin" NUMERIC(15, 2),
    "amountMax" NUMERIC(15, 2),
    "termMin" INTEGER,
    "termMax" INTEGER,
    collateral BOOLEAN,
    insurance BOOLEAN,
    highlight TEXT
);

-- 3. DEPOSITS cədvəli
CREATE TABLE IF NOT EXISTS deposits (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "bankId" TEXT REFERENCES banks(id),
    rate NUMERIC(5, 2),
    currency TEXT NOT NULL, -- AZN, USD, EUR
    "termMonths" INTEGER,
    "minAmount" NUMERIC(15, 2)
);

-- 4. CARDS cədvəli
CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "bankId" TEXT REFERENCES banks(id),
    kind TEXT NOT NULL, -- debet, kredit
    cashback NUMERIC(5, 2),
    "annualFee" NUMERIC(15, 2),
    "limit" NUMERIC(15, 2),
    perks JSONB -- Array of strings
);

-- 5. CURRENCIES cədvəli
CREATE TABLE IF NOT EXISTS currencies (
    code TEXT PRIMARY KEY,
    flag TEXT,
    buy NUMERIC(10, 4),
    sell NUMERIC(10, 4),
    change NUMERIC(10, 4)
);

-- 6. BOKTS cədvəli
CREATE TABLE IF NOT EXISTS bokts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "logoColor" TEXT,
    rating NUMERIC(3, 1),
    reviews INTEGER
);

-- 7. BOKT_PRODUCTS cədvəli
CREATE TABLE IF NOT EXISTS bokt_products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "boktId" TEXT REFERENCES bokts(id),
    type TEXT NOT NULL, -- nağd, lombard, pts
    rate NUMERIC(5, 2),
    "amountMin" NUMERIC(15, 2),
    "amountMax" NUMERIC(15, 2),
    "termMin" INTEGER,
    "termMax" INTEGER,
    collateral BOOLEAN,
    highlight TEXT
);

-- 8. INSTITUTIONS cədvəli
CREATE TABLE IF NOT EXISTS institutions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "officialName" TEXT,
    "logoColor" TEXT,
    type TEXT NOT NULL, -- bank, bokt
    established INTEGER,
    branches INTEGER,
    atms INTEGER,
    website TEXT,
    phone TEXT,
    rating NUMERIC(3, 1),
    reviews INTEGER,
    description TEXT,
    swift TEXT,
    voen TEXT,
    "correspondentAccount" TEXT,
    address TEXT,
    "logoUrl" TEXT
);

-- 9. BLOG_POSTS cədvəli
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    category TEXT,
    "readMin" INTEGER,
    date TEXT,
    cover TEXT,
    body TEXT
);

-- Note: 'leads' and 'contacts' tables should already exist in your database based on previous work.
-- Just in case, here are the definitions:

-- LEADS cədvəli (Əgər yoxdursa)
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    fin_code TEXT,
    amount NUMERIC(15, 2),
    credit_type TEXT
);

-- CONTACTS cədvəli (Əgər yoxdursa)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    message TEXT NOT NULL
);

-- Enable RLS for all tables but allow reading for everyone and writing via service role
ALTER TABLE banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE bokts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bokt_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to these tables (essential for frontend)
CREATE POLICY "Public Read Access" ON banks FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON credits FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON deposits FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON cards FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON currencies FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON bokts FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON bokt_products FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON institutions FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON blog_posts FOR SELECT USING (true);

-- Not: Yazmaq (Insert/Update/Delete) icazələri ancaq backend üzərindən service_role ilə ediləcək,
-- ona görə əlavə RLS siyasətlərinə (policy) ehtiyac yoxdur.
