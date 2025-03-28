import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Charles G. E. K.",
  DESCRIPTION: "Passionate about DevOps, Cloud, Networking and Infrastructure ",
  AUTHOR: "Charles G.E. KALAYDJIAN",
}

// About / Resume Page
export const WORK: Page = {
  TITLE: "Resume / CV",
  DESCRIPTION: "My Resume / CV",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "About / Resume", 
    HREF: "/about", 
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Contact", 
    HREF: "/contact", 
  },
//  { 
//    TEXT: "Projects", 
//    HREF: "/projects", 
//  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "Contact Form",
    HREF: "/contact/",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "charlesgek",
    HREF: "https://github.com/charlesgek"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "charles-kalaydjian",
    HREF: "https://www.linkedin.com/in/charles-kalaydjian/",
  },
]

