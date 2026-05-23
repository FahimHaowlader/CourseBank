# CourseBank 🎓
👉 **Live Link:** [coursebanks.onrender.com](https://coursebanks.onrender.com)

**CourseBank** is a comprehensive, multi-tenant academic resource registry and curriculum management system designed to streamline the way universities organize, audit, and discover course information. 

Navigating academic tracks often involves juggling messy spreadsheets and fragmented syllabi. CourseBank resolves this by acting as a single, structured source of truth. Built with a robust **Role-Based Access Control (RBAC)** matrix, it serves everyone from prospective students planning their terms to global administrators provisioning security credentials. 

---

## 👥 Roles & Permissions Matrix

The core platform logic separates users into four distinct functional tiers to protect data integrity while ensuring maximum usability. 

### 1. What a Student / Public User Can Do
The public facing interface is engineered for fast, frictionless exploration. Public users do not require administrative privileges to browse the curriculum directory. 

![Course Search Dashboard](FrontEnd/Public/Screenshot%202026-05-23%20at%202.50.12%E2%80%AFPM.jpg)

* **Granular Multi-Parameter Searching:** Users can dynamically search for courses using individual or combined parameters, including: 
    * *Text Identification:* Search by specific Course Title or precise Course Code. 
    * *Personnel Filters:* Filter courses by Instructor / Teacher Name. 
    * *Academic Classification:* Drill down by Department, Degree Level (Bachelors/Masters), Academic Year, Semester, Course Type (Core/Elective/Project/Lab), Credit Weight, and Course Format. 
* **Comprehensive Course Profiles:** Clicking on a course pulls up a dedicated overview displaying the official host department, verified instructor profiles, course initialization dates, and user-friendly tag pills for instant recognition. 

![Course Profile Overview](FrontEnd/Public/Screenshot%202026-05-23%20at%202.51.05%E2%80%AFPM.png)

* **Syllabus & Handbook Extraction:** Public users have a dedicated section within each course to download or view a "Full Course Handbook" (e.g., hand-written student study guides or official university syllabi) to plan their academic journeys seamlessly. 
* **Social Distribution:** Includes integrated "Share Now" triggers allowing users to effortlessly distribute deep links to specific course pages with peers or advisors. 

---

### 2. What a Contributor Can Do
Contributors are the primary content creators of the ecosystem—typically professors, teaching assistants, or departmental heads. 

![Contributor Workspace](FrontEnd/Public/Screenshot%202026-05-23%20at%202.55.58%E2%80%AFPM.jpg)

* **Dedicated Contribution Workspace:** Contributors have a private dashboard summarizing their active entries (e.g., "Contributor have 3 courses") without cluttering their view with other users' drafts. 
* **Structured Proposal Engine:** Through the **"Add New Course"** interface, contributors fill out structured forms enforcing strict data constraints, mapping essential academic variables like HSC Year definitions, explicit starting calendars, credit allocations, and targeted formats. 

![Add New Course Interface](FrontEnd/Public/Screenshot%202026-05-23%20at%202.55.17%E2%80%AFPM.jpg)

* **Inline Draft Refinement:** Contributors retain full modification and deletion rights over their submitted courses. They can quickly use inline edit pencils to tweak course descriptions or correct instructor bios on the fly. 
* **Lifecycle Management:** Once a course entry is perfectly formed, contributors utilize the finalization controls to save and push changes to the review queues. 

---

### 3. What a Moderator Can Do
Moderators serve as the quality control layer, ensuring that no unverified or non-compliant coursework is permanently published to the public bank. 

![Moderator Dashboard](FrontEnd/Public/Screenshot%202026-05-23%20at%202.57.38%E2%80%AFPM.jpg)

* **Command Control Hub:** The specialized **Moderator Dashboard** breaks their operational responsibilities into three logical application blocks: 
    * *Manage Courses Module:* Oversees systemic course lists, reviews curriculum structures, and toggles real-time course availability. 
    * *Manage Contributors Module:* Audits active contributor accounts, maps faculty outputs, and checks department workloads. 
    * *Content Moderation Gate:* A dedicated zone to review reported flags, check user feedback, and enforce strict institutional community guidelines. 
* **Cross-Department Inspection:** Allows high-level monitoring over several interlinked collegiate blocks (e.g., Computer Science & Engineering, Chemical Engineering, etc.) to keep systemic standards consistent across the university. 

---

### 4. What an Admin Can Do
Administrators possess global system-wide root access. They oversee the entire platform infrastructure and have absolute management power over security, courses, and **both personnel management sub-systems (Moderators and Contributors)**. 

![Admin Dashboard](FrontEnd/Public/Screenshot%202026-05-23%20at%203.10.44%E2%80%AFPM.png)

* **Global Administrative Control Panel:** The executive panel lets administrators manage courses, contributors, moderators, and system analytical frameworks out of a single responsive center. 
* **Moderator Account Management:** Admins hold root access to the moderator registry. They can: 
    * Provision new moderator credentials via the "+ New Moderator" action engine. 
    * Audit active moderator profiles using IDs (e.g., `MOD20260111`) and track individual login passwords. 
    * Toggle system privileges on demand using dynamic `ALLOW` state rules. 
    * Revoke access or permanently purge accounts from the infrastructure utilizing active deletion tools. 

![Search and Explore Moderators](FrontEnd/Public/Screenshot%202026-05-23%20at%202.56.38%E2%80%AFPM.jpg)

* **Contributor Account Management:** Admins manage the entire academic contribution team at scale: 
    * Onboard staff members across various academic streams via the "+ New Contributor" trigger. 
    * Filter and isolate contributor directories by Department, Degree Track, and Operational Access state. 
    * Securely monitor system passwords and credentials assigned to contributors (e.g., `MEE20260242`). 
    * Handle instant account terminations or permission changes to maintain systemic security. 

![Search and Explore Contributors](FrontEnd/Public/Screenshot%202026-05-23%20at%203.11.17%E2%80%AFPM.png)

* **Global Course Auditing:** Admins can monitor, modify, or inject courses instantly across the ecosystem using the advanced admin-tier exploration panel, featuring global bypass overrides. 

![Global Course Auditing Workspace](FrontEnd/Public/Screenshot%202026-05-23%20at%203.09.58%E2%80%AFPM.jpg)

* **System Infrastructure Analytics:** Built-in dashboard modules permit real-time scanning of application usage, resource consumption trends, and overall student platform engagement. 

---

## 🛠️ Platform & UI Implementation Details

* **Clean & Accessible UI Design:** Built with a cohesive color system focusing on a deep emerald green palette (`#008080` variants). Features modern typography, clear button state indicators, and highly scannable filter boxes to maximize user efficiency.
* **Dynamic Client Filtering:** Implements stateless or stateful query tracking allowing multiple search queries to resolve concurrently, with an instantaneous "Reset Filters" mechanism to clear complex user search paths.
* **Security & Safety Frameworks:** Strict backend constraints isolate critical security properties (like user passwords and global state overrides) behind admin-only API routes, ensuring safety against unauthorized client requests.