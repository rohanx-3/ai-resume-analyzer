/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SampleProfile {
  id: string;
  title: string;
  targetRole: string;
  category: string;
  description: string;
  resumeFileName: string;
  resumeText: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'fullstack-engineer',
    title: 'Senior Full Stack Engineer',
    targetRole: 'Senior Full Stack Software Engineer',
    category: 'Engineering',
    description: 'TypeScript, React, Node.js, AWS, and PostgreSQL with high-scale microservices focus.',
    resumeFileName: 'Alex_Morgan_Senior_FullStack_Resume.pdf',
    resumeText: `ALEX MORGAN
San Francisco, CA | (555) 382-9104 | alex.morgan.dev@email.com | linkedin.com/in/alexmorgan-dev | github.com/alexmorgan

PROFESSIONAL SUMMARY
Results-oriented Senior Full Stack Software Engineer with 6+ years of experience building resilient web applications and distributed backend architectures. Proven track record of scaling React and Node.js microservices handling 25M+ monthly requests. Passionate about clean system design, TypeScript, CI/CD automation, and mentoring junior engineers.

CORE COMPETENCIES & TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Vite, Jest, Webpack
Backend: Node.js, Express.js, REST APIs, GraphQL, Microservices architecture
Databases: PostgreSQL, Redis, MongoDB
DevOps & Cloud: AWS (EC2, S3, Lambda), Docker, GitHub Actions CI/CD, Linux, Terraform
Practices: Agile/Scrum, System Design, Unit Testing, Code Review, Performance Optimization

WORK EXPERIENCE
Senior Full Stack Engineer | CloudScale Systems | San Francisco, CA
March 2022 – Present
• Architected and deployed multi-tenant React and TypeScript dashboard serving 45,000 daily enterprise users with 99.98% uptime.
• Spearheaded migration of legacy monolith to Node.js microservices on AWS and Docker, slashing API response times by 42%.
• Engineered automated CI/CD pipeline using GitHub Actions, cutting release deployment cycles from 4 hours to 18 minutes.
• Mentored 5 mid-level and junior developers in test-driven development (TDD), resulting in 30% reduction in production bug reports.
• Designed and optimized PostgreSQL database queries and Redis caching layer, decreasing database query latency by 35%.

Software Engineer | Apex FinTech Labs | Austin, TX
July 2019 – February 2022
• Developed real-time transaction monitoring portal using React, Node.js, and WebSocket connections handling $12M daily volume.
• Implemented role-based access control (RBAC) and OAuth 2.0 security protocols adhering to SOC 2 compliance standards.
• Reduced web application bundle size by 38% through code splitting, tree shaking, and lazy loading strategies.
• Collaborated closely with product managers and UI/UX designers in 2-week Agile sprint cycles to launch 14 key feature releases.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley (2015 – 2019)
Dean's Honor List | Coursework: Data Structures, Algorithms, Distributed Systems, Database Management

PROJECTS
OpenSource DevPulse: Created open-source developer productivity tool with 1,200+ GitHub stars built with Next.js, TypeScript, and Tailwind.`,
    jobTitle: 'Senior Full Stack Software Engineer',
    companyName: 'CloudScale Inc.',
    jobDescription: `Job Title: Senior Full Stack Software Engineer
Company: CloudScale Inc.
Location: Remote (US)

About the Role:
We are seeking an experienced Senior Full Stack Software Engineer to build and scale our next-generation cloud infrastructure management platform. You will design, develop, and deploy high-throughput features using React, TypeScript, Node.js, and modern cloud technologies.

Responsibilities:
• Architect, build, and maintain mission-critical web applications with React, TypeScript, and modern frontend frameworks.
• Develop robust backend microservices, REST APIs, and GraphQL endpoints using Node.js and Express.
• Design schema migrations and optimize database performance in PostgreSQL and Redis.
• Deploy scalable containerized applications utilizing Docker, Kubernetes, and AWS (Amazon Web Services).
• Drive engineering excellence through CI/CD automation, comprehensive unit testing, and rigorous code reviews.
• Collaborate with cross-functional teams including product managers, UX designers, and site reliability engineers in an Agile environment.

Requirements & Qualifications:
• 5+ years of professional software engineering experience building full-stack web applications.
• Strong proficiency in TypeScript, JavaScript, React, and Node.js.
• Hands-on experience with relational databases (PostgreSQL or MySQL) and query optimization.
• Practical knowledge of cloud platforms (AWS preferred) and container technologies (Docker, Kubernetes).
• Experience designing and consuming RESTful APIs and microservice architectures.
• Demonstrated understanding of CI/CD pipelines, Git, and automated testing frameworks.
• Strong communication, problem-solving, and system design abilities.`
  },
  {
    id: 'product-manager',
    title: 'Senior Product Manager (AI & SaaS)',
    targetRole: 'Senior Product Manager - AI & Platform',
    category: 'Product',
    description: 'Product strategy, AI workflows, roadmap execution, user analytics, and agile cross-functional leadership.',
    resumeFileName: 'Sarah_Chen_Senior_Product_Manager.docx',
    resumeText: `SARAH CHEN
New York, NY | (212) 555-0198 | sarah.chen.pm@email.com | linkedin.com/in/sarahchen-pm

EXECUTIVE SUMMARY
Strategic and data-driven Senior Product Manager with 7 years of experience launching B2B SaaS and AI-driven workflow products. Proven history of taking products from concept to $8M ARR, increasing user retention by 28%, and driving roadmap execution across 25+ engineer and design organizations. Skilled in customer discovery, Agile product delivery, analytics, and GenAI feature integration.

AREAS OF EXPERTISE & SKILLS
Product Strategy: Product Vision, Go-to-Market (GTM) Strategy, Roadmap Planning, Competitive Analysis
Methodologies: Agile & Scrum, Sprint Planning, User Stories, PRD Authoring, Design Thinking
Analytics & Tools: Amplitude, Mixpanel, Tableau, SQL, Google Analytics, Jira, Confluence, Figma
Domain Knowledge: B2B SaaS, Machine Learning, Artificial Intelligence, API Integrations, Customer Retention
Soft Skills: Cross-functional Leadership, Stakeholder Management, Executive Presentations

PROFESSIONAL EXPERIENCE
Senior Product Manager | Veloce Analytics | New York, NY
January 2022 – Present
• Defined product vision and executed multi-year roadmap for flagship AI-powered customer intelligence platform, generating $4.2M net-new ARR in Year 1.
• Spearheaded discovery and delivery of generative AI predictive summaries, boosting weekly active user engagement by 34%.
• Authored comprehensive PRDs and user stories; facilitated backlog grooming and sprint planning with 3 distributed engineering teams.
• Conducted 80+ enterprise customer interviews to validate product-market fit, reducing churn by 18% over 12 months.
• Partnered closely with Sales, Customer Success, and Marketing to execute seamless quarterly product launches.

Product Manager | Omnia Cloud Solutions | Boston, MA
August 2018 – December 2021
• Managed lifecycle of automated workflow orchestration tool from MVP launch through enterprise adoption reaching 200,000 monthly active users.
• Utilized SQL and Mixpanel dashboards to uncover customer onboarding drop-offs, driving experiments that improved Day-30 retention by 22%.
• Collaborated with UX researchers to redesign onboarding flow, lowering support ticket inquiries by 26%.
• Maintained prioritized feature backlog in Jira balancing technical debt against high-value customer feature requests.

EDUCATION
Bachelor of Science in Business Administration & Information Systems
Boston University (2014 – 2018)
Summa Cum Laude | Minor in Computer Science

CERTIFICATIONS
• Certified Scrum Product Owner (CSPO)
• Pragmatic Institute Certified (PMC-III)`,
    jobTitle: 'Senior Product Manager - AI & Platform',
    companyName: 'PulseTech AI',
    jobDescription: `Job Title: Senior Product Manager - AI & Platform
Company: PulseTech AI
Location: New York, NY (Hybrid)

About PulseTech:
PulseTech builds autonomous AI workflow platforms for modern enterprise teams. We are scaling rapidly and looking for an exceptional Senior Product Manager to lead our Core AI & Platform team.

Role Overview:
You will own the product strategy, vision, and execution for our core machine learning capabilities and platform integrations. You will translate complex AI algorithms into simple, delightful enterprise workflows.

Key Responsibilities:
• Define and champion the multi-quarter product roadmap for AI platform features.
• Write clear, concise Product Requirement Documents (PRDs) and user stories with measurable success metrics.
• Lead cross-functional Agile teams consisting of machine learning engineers, frontend developers, and UI/UX designers.
• Analyze product analytics (Amplitude, SQL) to evaluate feature adoption, funnel conversion, and user retention.
• Conduct continuous customer discovery interviews with enterprise leaders to identify pain points and opportunities.
• Collaborate with executive leadership on GTM strategy, pricing, and product positioning.

Required Qualifications:
• 5+ years of product management experience within B2B SaaS or enterprise software.
• Demonstrated track record of launching machine learning or AI-powered features.
• Strong quantitative and analytical skills; proficiency with SQL, Amplitude, Tableau, or similar analytics tools.
• Deep experience with Agile/Scrum development methodologies, Jira, and sprint planning.
• Exceptional written and verbal communication, with the ability to articulate technical concepts to non-technical stakeholders.
• Bachelor’s degree in Business, Computer Science, or related field.`
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst & BI Specialist',
    targetRole: 'Senior Data Analyst / BI Specialist',
    category: 'Data & Analytics',
    description: 'SQL, Python, Tableau, Power BI, statistical modeling, and executive KPI reporting.',
    resumeFileName: 'Marcus_Vance_Data_Analyst.pdf',
    resumeText: `MARCUS VANCE
Chicago, IL | (312) 555-7821 | marcus.vance.data@email.com | linkedin.com/in/marcusvance-data

PROFESSIONAL SUMMARY
Analytical and detail-oriented Senior Data Analyst with 5+ years of experience delivering actionable business intelligence, predictive models, and executive dashboards. Expert in complex SQL query optimization, Python data pipelines, Tableau, and automated reporting systems. Proven ability to translate raw transactional data into multimillion-dollar revenue insights.

TECHNICAL SKILLS & TOOLS
Databases & Querying: Advanced SQL, PostgreSQL, Snowflake, BigQuery, MySQL
Languages & Libraries: Python (Pandas, NumPy, Scikit-learn), R, HTML
Visualization & BI: Tableau Desktop & Server, Power BI, Looker, Excel (VBA, Power Query)
Analytics & Modeling: Statistical Analysis, A/B Testing, Cohort Analysis, Predictive Modeling, ETL Pipelines
Collaboration: Git, Jira, Confluence, Agile, Stakeholder Presentations

PROFESSIONAL EXPERIENCE
Senior Data Analyst | FinMetrics Capital | Chicago, IL
June 2021 – Present
• Designed and automated 18 executive Tableau dashboards tracking $350M in assets under management (AUM), saving 25 monthly reporting hours.
• Spearheaded deep-dive cohort analysis in Python and SQL, identifying churn drivers and guiding interventions that retained $1.8M in annual revenue.
• Developed automated ETL data pipelines in Snowflake and Python, reducing report data latency from 24 hours to near real-time (15 minutes).
• Led statistical A/B testing framework for digital marketing campaigns, boosting loan application conversion rate by 19.4%.
• Mentored 3 junior business intelligence analysts in SQL optimization techniques and data visualization best practices.

Data Analyst | Meridian Retail Brands | Milwaukee, WI
September 2018 – May 2021
• Built automated daily inventory replenishment reports in SQL and Power BI across 120 retail store locations.
• Conducted customer segmentation and basket analysis using Pandas and K-Means clustering to optimize promotional markdown pricing.
• Reduced month-end reporting reconciliation errors by 40% through standardized data validation rules.

EDUCATION
Bachelor of Science in Statistics & Applied Mathematics
University of Illinois Urbana-Champaign (2014 – 2018)
Coursework: Multivariate Statistics, Linear Algebra, Machine Learning, Database Design`,
    jobTitle: 'Senior Business Intelligence & Data Analyst',
    companyName: 'FinMetrics Corp.',
    jobDescription: `Job Title: Senior Business Intelligence & Data Analyst
Company: FinMetrics Corp.
Location: Chicago, IL (Hybrid)

Role Summary:
FinMetrics Corp is looking for a Senior Data Analyst / BI Specialist to partner with executive stakeholders across Finance, Operations, and Marketing. You will transform complex datasets into high-impact visual intelligence and strategic recommendations.

Key Responsibilities:
• Build and maintain enterprise-grade dashboards and visualizations using Tableau and Power BI.
• Write advanced, high-performance SQL queries across Snowflake and BigQuery cloud data warehouses.
• Develop Python scripts for statistical modeling, data manipulation (Pandas, NumPy), and automated reporting.
• Design and interpret randomized controlled A/B experiments to guide strategic marketing investments.
• Partner with data engineering to optimize ETL pipelines and ensure data governance and metric accuracy.
• Present analytical findings and strategic recommendations to C-level executives and department leaders.

Requirements:
• 4+ years of experience as a Data Analyst, BI Analyst, or Analytics Engineer.
• Expert-level SQL skills (window functions, query plan tuning, CTEs, complex joins).
• Extensive experience designing dashboards in Tableau or Power BI.
• Proficient in Python for data analysis (Pandas, NumPy).
• Strong grounding in statistics, hypothesis testing, and exploratory data analysis.
• Excellent storytelling with data and interpersonal presentation skills.`
  }
];
