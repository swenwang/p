import type { Award, Experience, GalleryItem, Project } from '../types'

export const site = {
  name: '王思問 · Ssu-Wen Wang',
  nickname: 'Mia',
  headline: 'Management insight, engineered into better financial systems.',
  intro: 'I am a Management Science student pursuing a cross-university double major in Computer Science. My work connects financial judgment with machine learning, blockchain, and system design to make decisions and processes more transparent.',
  location: 'Taipei · Hsinchu, Taiwan',
  email: 'wangssuwen588@gmail.com',
  github: 'https://github.com/swenwang',
  linkedin: 'https://www.linkedin.com/in/%E6%80%9D%E5%95%8F-%E7%8E%8B-b632a5362',
  stats: [
    { value: '3', label: 'Competitions & Hackathons' },
    { value: '2 + 2', label: 'Advancements + Awards' },
    { value: '800+', label: 'Images Curated for AI' },
    { value: '60–80', label: 'Largest Team Led' },
    { value: '200+', label: 'Event Participants' },
    { value: '590K+', label: 'Transactions Analyzed' },
  ],
  academics: {
    degree: 'B.B.A. in Management Science',
    secondMajor: 'Cross-university Double Major in Computer Science',
    period: '2024 — 2028 (Expected)',
    gpa: '3.75 / 4.3',
    gpaAsOf: 'Through Spring 2026 (Academic Year 114-2)',
    toeic: 'TOEIC 785',
    coursework: ['Machine Learning Applications', 'Financial Technology', 'Investment', 'Corporate Finance', 'Statistics', 'Operations Research', 'Information Theory', 'Computer Networks', 'Data Structures', 'Blockchain Technology'],
  },
}

export const projects: Project[] = [
  {
    slug: 'microchain-SME',
    title: 'MicroChain',
    eyebrow: 'SME Credit Scoring → Blockchain Financing',
    summary: 'A five-person SME credit assessment project that advanced to the IDEA FinTech quarter-finals among 40+ teams, then evolved into the award-winning MicroChain prototype.',
    description: [
      'As team lead and lead presenter, I organized the proposal, planned the financial-risk analysis, and connected logistics, e-commerce, and invoice data to an explainable SME credit assessment framework.',
      'We selected LightGBM for its ability to model nonlinear relationships across mixed business features and used SHAP to explain how individual factors contributed to each score. The proposal also considered data consent, purpose limitation, model transparency, and human review so that alternative data would support—rather than automatically determine—financing decisions.',
      'In the second stage, we implemented the concept with a simulated SME dataset and trained a credit-scoring prototype. We present this as a prototype because the current dataset and model are not a production lending system.',
    ],
    year: '2025',
    role: 'Team Lead · Lead Presenter · Financial Risk Analysis',
    result: 'IDEA FinTech Quarter-finalist · Excellence Award, FinTech Division',
    tags: ['FinTech', 'LightGBM', 'SHAP', 'Blockchain', 'Credit Risk'],
    hierarchy: ['FinTech', 'Credit Risk Assessment', 'SME Credit Scoring', 'LightGBM + SHAP', 'Alternative data → MicroChain prototype'],
    cover: './images/sme-presentation.jpeg',
    gallery: ['./images/sme-presentation.jpeg', './images/sme-team.jpeg', './images/microchain-award.jpeg'],
    links: [{ label: 'View proposal presentation', url: 'https://drive.google.com/file/d/18LMh-bXfcred2Gmu1o4G8PRVaapgM8kO/view?usp=sharing' }],
    phases: [
      {
        step: 'Phase 01',
        title: 'SME Chain Proposal & Quarter-finals',
        subtitle: 'IDEA FinTech 2025',
        description: 'Our five-person team proposed an alternative-data credit assessment approach using logistics, e-commerce, and invoice signals. I led the project direction, planned the financial-risk analysis, and delivered the main presentation. LightGBM supported nonlinear tabular modeling, while SHAP made individual score drivers interpretable.',
        outcome: 'Quarter-finalist · Selected from 40+ teams',
        images: [
          { src: './images/sme-presentation.jpeg', alt: 'Ssu-Wen presenting the SME credit assessment proposal' },
          { src: './images/sme-team.jpeg', alt: 'The SME credit assessment team at the IDEA FinTech quarter-finals' },
        ],
      },
      {
        step: 'Phase 02',
        title: 'Model Implementation & Award',
        subtitle: 'MicroChain',
        description: 'We translated the proposal into a working prototype by structuring a simulated SME dataset and training a credit-scoring model. The result became the model component of MicroChain, while remaining clearly framed as an academic prototype rather than a production lending system.',
        outcome: 'Excellence Award · FinTech Division',
        images: [
          { src: './images/microchain-award.jpeg', alt: 'MicroChain Excellence Award certificate' },
        ],
      },
    ],
    featured: true,
  },
  {
    slug: 'aws-generative-ai-hackathon',
    title: 'Cultural Heritage Restoration System',
    eyebrow: 'AWS Generative AI Hackathon',
    summary: 'A five-person cultural-heritage response prototype combining a 15-class image-recognition workflow, 800+ curated images, and an AWS PartyRock advisory experience.',
    description: [
      'As team lead, I coordinated the project, built the backend workflow, integrated the system components, and delivered the main presentation. Our team collected and categorized more than 800 online images across 15 cultural-heritage object classes.',
      'We used an AWS image-recognition service to classify uploaded objects and connected the recognition result to an AWS PartyRock advisory flow. Because the exact training configuration and evaluation split are not yet documented, the portfolio describes this conservatively as an image-recognition workflow rather than claiming that we trained a model from scratch.',
    ],
    year: '2025',
    role: 'Team Lead · Backend Development · System Integration · Lead Presenter',
    tags: ['AWS', 'Amazon Rekognition', 'Generative AI', 'PartyRock', 'Computer Vision'],
    hierarchy: ['Artificial Intelligence', 'Cultural Heritage Recognition', 'Restoration Advisory', 'AWS Recognition + Generative AI', '800+ curated images · 15 classes · Demo workflow'],
    cover: './images/aws-team.jpeg',
    gallery: ['./images/aws-team.jpeg', './images/aws-working.jpeg'],
    links: [
      { label: 'Watch demo', url: 'https://youtu.be/1U7-pTY64E4' },
      { label: 'View presentation', url: 'https://canva.link/gyvfgvnyyan6jpm' },
    ],
    featured: true,
  },
  {
    slug: 'campus-token-dapp',
    title: 'Dual-Token Attendance Reward System',
    eyebrow: 'Blockchain Attendance & Rewards',
    summary: 'A three-person Web3 course project that turns verified classroom attendance into AToken rewards and supports on-chain conversion into BToken for future campus-merchant use.',
    description: [
      'I integrated the end-to-end architecture across the teacher workflow, smart contracts, React DApp, MetaMask, and Sepolia, then implemented the frontend interactions through ethers.js. Students receive AToken after a verified attendance claim; approved AToken can be exchanged through the contract, which mints BToken at conversion time. BToken is designed as a future reward asset for collaboration with campus merchants.',
    ],
    year: '2026',
    role: 'System Architecture Integration · Frontend DApp Developer',
    tags: ['Solidity', 'Hardhat', 'React', 'ethers.js', 'MetaMask', 'Sepolia'],
    hierarchy: ['Blockchain', 'Dual-Token Incentive System', 'Classroom Attendance & Campus Rewards', 'ERC-20 + Digital Signatures', 'Attendance claim → AToken approval → Exchange contract → BToken mint'],
    cover: '',
    gallery: [],
    links: [{ label: 'View GitHub repository', url: 'https://github.com/swenwang/campus' }],
    featured: true,
  }]

export const experiences: Experience[] = [
  { title: 'B.B.A. in Management Science', organization: 'National Yang Ming Chiao Tung University', period: '2024 — 2028 (Expected)', description: 'Interdisciplinary study across management science, finance, data, and computer science.', type: 'Education', logo: './images/nycu-logo.svg', logoAlt: 'National Yang Ming Chiao Tung University logo' },
  { title: 'Cross-university Computer Science Study', organization: 'National Chengchi University', period: '2025 — Present', description: 'Coursework and project experience in computer science and financial technology.', type: 'Education', logo: './images/nccu-logo.svg', logoAlt: 'National Chengchi University logo' },
  { title: 'Project Development Officer', organization: 'NCCU FinTech Innovation Lab', period: '2026 — Present', description: 'Supporting project development, organizational systems, and the lab’s website architecture.', type: 'Leadership', logo: './images/fintech-lab-logo.svg', logoAlt: 'NCCU FinTech Lab logo' },
  { title: 'Interdisciplinary Artificial Intelligence Program', organization: 'National Yang Ming Chiao Tung University', period: '2025 — Present', description: 'Currently pursuing interdisciplinary training in artificial intelligence, connecting machine learning and data-driven methods with applications beyond computer science.', type: 'Education', logo: './images/nycu-logo.svg', logoAlt: 'National Yang Ming Chiao Tung University logo' },
  { title: 'Team Lead & Proposal Lead', organization: 'IDEA FinTech 2025', period: '2025', description: 'Led an alternative-data SME credit scoring proposal and its later development into the award-winning MicroChain prototype.', type: 'Competition' },
]

export const awards: Award[] = [
  { title: 'Excellence Award, FinTech Division', issuer: 'The 3rd NYCU Smart Innovation and Interdisciplinary Talent Competition', date: 'December 2025', description: 'Awarded for MicroChain: Blockchain-Based Financing for Micro Enterprises.', image: './images/microchain-award.jpeg' },
  { title: 'Quarter-finalist', issuer: 'IDEA FinTech 2025', date: '2025', description: 'SME credit assessment using alternative data, LightGBM, SHAP, and regulatory considerations.' },
]

export const gallery: GalleryItem[] = [
  { src: './images/aws-team.jpeg', alt: 'AWS hackathon team portrait', category: 'Competitions', caption: 'AWS Generative AI Hackathon · Team portrait', orientation: 'landscape' },
  { src: './images/aws-working.jpeg', alt: 'Team working at the AWS hackathon', category: 'Competitions', caption: 'Building together during the hackathon', orientation: 'landscape' },
  { src: './images/sme-presentation.jpeg', alt: 'Ssu-Wen presenting the SME fintech project', category: 'Projects', caption: 'Presenting our SME financing solution', orientation: 'portrait' },
  { src: './images/sme-team.jpeg', alt: 'SME fintech project team', category: 'Projects', caption: 'MicroChain project team', orientation: 'portrait' },
  { src: './images/microchain-award.jpeg', alt: 'MicroChain Excellence Award certificate', category: 'Awards', caption: 'Excellence Award · FinTech Division', orientation: 'portrait' },
]

export const skills = ['Python', 'Machine Learning', 'SQL', 'React', 'TypeScript', 'Solidity', 'Git & GitHub', 'Financial Analysis', 'Research Design', 'Project Leadership']
