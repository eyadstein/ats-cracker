# ATS Cracker 🚀

> Get hired with an ATS-optimized resume. Build, export, and crack any ATS system.

## Description
ATS Cracker is a powerful CV builder designed to help you create professional, ATS-friendly resumes that get past automated screening systems with a 96-100% match score. Built by [@eyadstein](https://github.com/eyadstein).

## Features
- ✅ Build your CV in minutes with a clean, guided interface
- ✅ Download your CV as PDF
- ✅ ATS-optimized resume structure (96-100% score on JobScan)
- ✅ Your CV is stored as a JSON object — edit with any tool or AI
- ✅ Import/export CV as JSON
- ✅ Paste JSON to instantly populate your CV
- ✅ Fully responsive — reorder sections drag & drop
- ✅ Admin panel at `/admin` to manage users and CVs

## Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS, Framer Motion
- **Backend:** Python, Django, Django REST Framework
- **Infrastructure:** Docker, Docker Compose, Nginx

## Installation
```bash
git clone https://github.com/eyadstein/ats-cracker.git
cd ats-cracker
docker-compose up --build
```
Then open: `http://127.0.0.1:8861`

- Create an account — you will get an example CV to start with
- Admin panel: `http://127.0.0.1:8861/admin/`

## CV Sections
- Personal Information
- Summary
- Work Experience
- Education
- Certifications / Courses
- Skills
- Languages

## License
MIT — feel free to use and build on top of this.
