import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Charles G. E. K.",
  DESCRIPTION: "DevOps, Cloud, Networking and Infrastructure",
  AUTHOR: "Charles G.E. KALAYDJIAN",
}

// About / Resume Page
export const SUMMARY: Page = {
  TITLE: "Professional Summary",
}
export const SKILLS: Page = {
  TITLE: "Core Competencies",
}
export const WORK: Page = {
  TITLE: "Work History",
  DESCRIPTION: "My Resume / CV",
}
export const EDUCATION: Page = {
  TITLE: "Education",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
//export const PROJECTS: Page = {
//  TITLE: "Projects",
//  DESCRIPTION: "Recent projects I have worked on.",
//}

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
    TEXT: "contact@charlesgek.com",
    HREF: "mailto:contact@charlesgek.com",
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

