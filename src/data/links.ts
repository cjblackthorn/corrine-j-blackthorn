export const links = {
  personal: {
    linkedin: 'https://www.linkedin.com/in/cwilsontechnerd?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    github: 'https://github.com/cjblackthorn',
  },
  ventures: {
    blackthornEnterprises: 'https://blackthorn.enterprises',
    blackthornsTropicals: 'https://tropicals.blackthorn.enterprises',
    techNerd: 'https://technerd.tech',
    rootworks: 'https://rootworks.technerd.tech',
    thornsToRoses: 'https://thorns2roses.com',
    blackthornFieldNotes: 'https://blackthornfieldnotes.ink',
    glassAndThorns: 'https://glassandthorns.art',
    petalAndFrame: 'https://petalsnframes.art',
  },
  linkedin: {
    techNerd: 'https://www.linkedin.com/company/technerd-consulting-llc/',
    thornsToRoses: 'https://www.linkedin.com/company/thorns-to-roses-coaching/',
  },
  music: {
    spotify: 'https://open.spotify.com/artist/0nJssvvsgu6BneymBJpEOE?si=Dk128huUQ_SlrdvYlvKuFw',
    appleMusic: 'https://music.apple.com/us/artist/glass-thorns/6779036792',
    youtube: 'https://youtube.com/@glassandthorns?si=vy6n2fXKPWR4KDU8',
  },
  publishing: { kdp: '' },
} as const;

// Single public collection. Only selected destinations are shown here.
// Unconfirmed ventures stay available in the links object for owner review.
export const ventureCards = [
  { title: 'Blackthorn Field Notes', category: 'Published writing', description: 'Essays, observations, technical reflections, and advocacy.', href: links.ventures.blackthornFieldNotes },
  { title: 'TechNerd', category: 'Professional practice', description: 'Cybersecurity, identity governance, consulting, and technical systems.', href: links.ventures.techNerd },
  { title: 'Glass & Thorns', category: 'Music and creative work', description: 'Original music and creative expression about identity and resilience.', href: links.ventures.glassAndThorns },
  { title: 'Blackthorn Enterprises', category: 'Business portfolio', description: 'The wider home for connected creative and technical projects.', href: links.ventures.blackthornEnterprises },
] as const;

export const selectedProjects = [
  { title: 'All of Me', status: 'In progress', description: 'A memoir about identity, resilience, honesty, and becoming whole.', href: '/writing/' },
  { title: 'Photography', status: 'Portfolio', description: 'Nature, changing light, textures, and the overlooked details of ordinary life.', href: '/photography/' },
  { title: 'Blackthorn Field Notes', status: 'Published essays', description: 'Independent writing about personal experiences, technology, disability, and advocacy.', href: links.ventures.blackthornFieldNotes },
  { title: 'Glass & Thorns', status: 'Music released', description: 'Music and artistic expression, including an initial public release.', href: '/music/' },
] as const;
