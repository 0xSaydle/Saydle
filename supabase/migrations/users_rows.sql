
-- For the user table

"id", "email", "name", "image", "phone_number", "country", "weaknesses",  "feelings", "verified", "subscribed", "last_sign_in", "created_at", "updated_at","subscription_id"

-- For the subscription table
"id", "customer_id",
 
  data: {
    type: 'subscriptions',
    id: '1230230',
    attributes: {
      store_id: 179745,
      customer_id: 5899687,
      order_id: 5600027,
      order_item_id: 5538850,
      product_id: 512281,
      variant_id: 798618,
      product_name: 'Saydle monthly',
      variant_name: 'Default',
      user_name: 'Zedd Zoul',
      user_email: 'adelewisdom@gmail.com',
      status: 'active',
      status_formatted: 'Active',
      card_brand: 'visa',
      card_last_four: '4242',
      pause: null,
      cancelled: false,
      trial_ends_at: null,
      billing_anchor: 27,
      first_subscription_item: [Object],
      urls: [Object],
      renews_at: '2025-06-27T13:20:49.000000Z',
      ends_at: null,
      created_at: '2025-05-27T13:20:50.000000Z',
      updated_at: '2025-05-27T13:20:56.000000Z',
      test_mode: true



      -- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    image TEXT,
    phone_number TEXT,
    country TEXT,
    weaknesses TEXT,
    feelings TEXT,
    verified BOOLEAN DEFAULT false,
    subscribed BOOLEAN DEFAULT false,
    last_sign_in TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    subscription_id TEXT
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    store_id INTEGER,
    order_id INTEGER,
    order_item_id INTEGER,
    product_id INTEGER,
    variant_id INTEGER,
    product_name TEXT,
    variant_name TEXT,
    user_name TEXT,
    user_email TEXT,
    status TEXT,
    status_formatted TEXT,
    card_brand TEXT,
    card_last_four TEXT,
    pause BOOLEAN,
    cancelled BOOLEAN DEFAULT false,
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    billing_anchor INTEGER,
    renews_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    test_mode BOOLEAN DEFAULT false
);