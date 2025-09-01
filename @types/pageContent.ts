export interface PageData {
  title: string;
  subtitle?: string;
  items?: { label: string; link: string; description: string }[];
  shapes?: {
    name: string;
    position: string;
    color: string;
    parallax?: string;
  }[];
  footerLinks?: {
    leftLink?: {
      label: string;
      link: string;
      noUnderline?: boolean;
    };
    rightLink?: {
      label: string;
      link: string;
      noUnderline?: boolean;
    };
  };
}
