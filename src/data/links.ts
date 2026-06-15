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
  publishing: {
    kdp: '',
  },
} as const;

export const ventureCards = [
  {
    title: 'Blackthorn Enterprises',
    description: 'The umbrella for Corrine’s business ventures, community-centered work, and evolving ecosystem.',
    href: links.ventures.blackthornEnterprises,
  },
  {
    title: 'Petal & Frame Photography',
    description: 'Photography focused on quiet moments, changing light, nature, food, people, and visual storytelling.',
    href: links.ventures.petalAndFrame,
  },
  {
    title: 'Glass & Thorns',
    description: 'Music, art, and creative expression — including the artist project behind My Body Isn’t Home Anymore.',
    href: links.ventures.glassAndThorns,
  },
  {
    title: 'Blackthorn Field Notes',
    description: 'Essays, observations, memoir updates, technical reflections, and long-form writing.',
    href: links.ventures.blackthornFieldNotes,
  },
  {
    title: 'TechNerd',
    description: 'Technology, information security, infrastructure, experimentation, and practical technical knowledge.',
    href: links.ventures.techNerd,
  },
  {
    title: 'Thorns to Roses Coaching',
    description: 'Coaching, transformation, support, and advocacy-centered growth work.',
    href: links.ventures.thornsToRoses,
  },
];
