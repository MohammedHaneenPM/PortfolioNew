export interface DatabaseProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  image_path?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  tags: string[];
  category: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseMeeting {
  id: string;
  full_name: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  agenda: string;
  created_at: string;
  admin_email_status: string;
  visitor_email_status: string;
}
