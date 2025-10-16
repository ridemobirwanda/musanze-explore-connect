-- Create tours table
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration TEXT NOT NULL,
  price NUMERIC NOT NULL,
  max_guests INTEGER NOT NULL DEFAULT 10,
  location TEXT NOT NULL,
  difficulty TEXT DEFAULT 'moderate',
  includes TEXT[],
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create guides table
CREATE TABLE public.guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  specialization TEXT NOT NULL,
  languages TEXT[] DEFAULT ARRAY['English'],
  experience_years INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  hourly_rate NUMERIC NOT NULL,
  phone TEXT,
  email TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create hotels table
CREATE TABLE public.hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  star_rating INTEGER DEFAULT 3,
  amenities TEXT[],
  image_url TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create hotel rooms table
CREATE TABLE public.hotel_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,
  description TEXT,
  price_per_night NUMERIC NOT NULL,
  max_guests INTEGER DEFAULT 2,
  amenities TEXT[],
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_rooms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tours
CREATE POLICY "Everyone can view tours" ON public.tours
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage tours" ON public.tours
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- RLS Policies for guides
CREATE POLICY "Everyone can view guides" ON public.guides
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage guides" ON public.guides
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- RLS Policies for hotels
CREATE POLICY "Everyone can view hotels" ON public.hotels
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage hotels" ON public.hotels
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- RLS Policies for hotel_rooms
CREATE POLICY "Everyone can view hotel rooms" ON public.hotel_rooms
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage hotel rooms" ON public.hotel_rooms
  FOR ALL USING (is_admin_or_manager(auth.uid()));