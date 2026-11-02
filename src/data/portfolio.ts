// Selected examples drawn from existing published experience descriptions.
// No confidential employer or system details are added.
export const specialties = [
  { title: 'Identity governance and access', description: 'Identity lifecycle, external identities, RBAC, certifications, access reviews, and privileged access boundaries.' },
  { title: 'Security architecture and systems', description: 'Thinking across dependencies, control design, operational resilience, and the people affected by security decisions.' },
  { title: 'Audit readiness and GRC', description: 'Control evidence, policy translation, repeatable documentation, risk reduction, and collaboration with technical teams.' },
  { title: 'Automation and process design', description: 'Using scripting, reporting, and systems thinking to make fragile workflows understandable and repeatable.' },
] as const;

export const impactCases = [
  {
    title: 'External identity cleanup at scale',
    problem: 'Dormant identities introduce lingering access risk and complicate governance.',
    approach: 'Cleaned up more than 10,000 dormant external Active Directory accounts as part of identity lifecycle and data-quality work.',
    result: 'Reduced stale access and improved the reliability of the external identity population.',
    tags: ['Active Directory', 'Identity lifecycle', 'Risk reduction'],
  },
  {
    title: 'SailPoint IIQ governance reporting',
    problem: 'Identity governance workflows need repeatable reporting to support operational decisions.',
    approach: 'Developed a more streamlined SailPoint IdentityIQ license true-up reporting process.',
    result: 'Made the reporting process easier to repeat and less time-consuming.',
    tags: ['SailPoint IdentityIQ', 'Reporting', 'Governance'],
  },
  {
    title: 'Privileged access separation',
    problem: 'High-impact administrator credentials need stronger separation from ordinary endpoint activity.',
    approach: 'Made the case for dedicated privileged access workstations as a practical architecture control.',
    result: 'Helped connect control design to administrator-account exposure and operational risk.',
    tags: ['Privileged access', 'Architecture', 'Risk'],
  },
  {
    title: 'Audit evidence and communication',
    problem: 'Control owners and auditors may interpret security evidence using different terminology.',
    approach: 'Translated evidence requests and control context into clear tasks, documentation, and cross-team communication.',
    result: 'Improved the clarity of requests and supported actionable follow-through.',
    tags: ['GRC', 'Audit evidence', 'Collaboration'],
  },
] as const;

export const careerProgression = [
  { stage: 'Foundation', title: 'Systems engineering and operations', description: 'Infrastructure, platform support, user-facing operations, and reliable technical foundations.' },
  { stage: 'Specialization', title: 'Identity and access engineering', description: 'Directory services, enterprise access, SailPoint IdentityIQ, lifecycle controls, and scripting.' },
  { stage: 'Current focus', title: 'Governance, architecture, and security', description: 'Access governance, control design, risk management, audit readiness, and systems-level decisions.' },
] as const;
