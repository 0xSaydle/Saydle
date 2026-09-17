create table user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  frequency text check (frequency in ('daily', 'weekly', 'monthly')) not null default 'daily',
  time_of_day time not null default '08:00',
  days_of_week text[] default array[]::text[],
  delivery_method text check (delivery_method in ('sms', 'whatsapp')) not null default 'sms',
  is_opted_in boolean not null default true,
  created_at timestamp default now()
);

alter table user_preferences enable row level security;

create policy "Users can access their own preferences"
  on user_preferences
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
