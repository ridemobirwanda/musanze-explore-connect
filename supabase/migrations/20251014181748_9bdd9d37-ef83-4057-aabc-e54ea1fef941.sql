-- Drop policies that depend on the old functions
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage content" ON public.content;
DROP POLICY IF EXISTS "Admins can update content" ON public.content;
DROP POLICY IF EXISTS "Everyone can view published content" ON public.content;
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
DROP POLICY IF EXISTS "Admins can update events" ON public.events;
DROP POLICY IF EXISTS "Admins can delete events" ON public.events;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;

-- Drop old functions
DROP FUNCTION IF EXISTS public.has_role(uuid, user_role) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin_or_manager(uuid) CASCADE;

-- Create enum for roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Migrate existing data
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, role::text::app_role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Create security definer functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_manager(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'manager')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Recreate policies for profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Recreate policies for content
CREATE POLICY "Admins can manage content" ON public.content FOR INSERT WITH CHECK (public.is_admin_or_manager(auth.uid()));
CREATE POLICY "Admins can update content" ON public.content FOR UPDATE USING (public.is_admin_or_manager(auth.uid()));
CREATE POLICY "Everyone can view published content" ON public.content FOR SELECT USING ((status = 'published'::text) OR public.is_admin_or_manager(auth.uid()));

-- Recreate policies for events
CREATE POLICY "Admins can manage events" ON public.events FOR INSERT WITH CHECK (public.is_admin_or_manager(auth.uid()));
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE USING (public.is_admin_or_manager(auth.uid()));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE USING (public.is_admin_or_manager(auth.uid()));

-- Recreate policies for bookings
CREATE POLICY "Admins can update bookings" ON public.bookings FOR UPDATE USING (public.is_admin_or_manager(auth.uid()));
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING ((user_id = auth.uid()) OR public.is_admin_or_manager(auth.uid()));

-- Create admin user
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, 'admin'::app_role
FROM public.profiles
WHERE email = 'admin@admin.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Drop role column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;