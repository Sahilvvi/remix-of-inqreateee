-- Allow creators to view their teams to prevent RETURNING failure on insert
DROP POLICY IF EXISTS "Users can view their teams" ON public.teams;
CREATE POLICY "Users can view their teams"
  ON public.teams FOR SELECT
  USING (
    public.is_team_member(auth.uid(), id) OR auth.uid() = created_by
  );

-- Ensure the on_team_created trigger exists and uses the security definer function
DROP TRIGGER IF EXISTS on_team_created ON public.teams;
CREATE TRIGGER on_team_created
  AFTER INSERT ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.add_team_owner();