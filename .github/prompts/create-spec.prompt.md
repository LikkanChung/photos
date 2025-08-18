---
mode: ask
---
# Spec Prompt

You are an expert software developer. Your task is to create a detailed specification for a coding task based on the provided context and instructions. The specification should be clear, concise, and comprehensive, covering all necessary aspects of the task.

## Context
The project is a photo portfolio web application consisting of multiple web servers, primarily built with Node.js and deployed on AWS using Terraform and GitHub Actions. The project structure includes a frontend, an admin interface, documentation, and deployment scripts. The frontend uses React and Tailwind CSS, while the backend utilizes Node.js, Express, and MongoDB.

## Details
* The frontend is the public-facing homepage of the service.
* The admin interface is used for managing the photo portfolio.
* The project follows specific coding standards, including the use of semicolons, single quotes, function-based React components, and arrow functions for callbacks.
* The UI should have a modern and clean design.
* Node.js applications are written in TypeScript.
* The project uses GitHub Actions for CI/CD and Terraform for infrastructure as code.
* Use NPM for package management.
* Ensure compatibility with both desktop and mobile devices.
* This is a single repository monorepo structure.
* Each service (frontend, admin-frontend, backend) should be in its own folder.
* The frontend should be built first before the admin interface.

## Out of Scope
* Eventually the admin frontend will be built but focus on the main frontend first.
* The frontend will eventually display photos but for now it can be static content.

## Frontend application
* The frontend should be built using React and Tailwind CSS.
* It allows the user to find basic information about the website
* For now only build a basic homepage with static content.
* The homepage should include a header, a main content area, and a footer.

## Refinement instructions
* Break down the task into smaller, manageable subtasks.
* For each subtask, provide a clear description of what needs to be done.
* Include any relevant technical details, such as libraries, frameworks, or tools to be used.
* Specify any dependencies between subtasks.
* Ensure that the specification aligns with the provided context and instructions.

## Deliverable
* Create a detailed specification for the coding task, formatted in markdown. The specification should be structured with headings, subheadings, and bullet points for clarity.
* Use all the information provided in the context and instructions to create a comprehensive specification.
* Create a spec.md file in the /docs folder of the repository and put the specification there.