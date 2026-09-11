import type { Award, Experience, GalleryItem, Project } from '../types'

export const site = {
  name: '王思問 · Ssu-Wen Wang',
  nickname: 'Mia',
  headline: 'FinTech, machine learning, and ideas built into practice.',
  intro: 'Management Science and Computer Science student exploring how data, financial systems, and responsible technology can solve real problems.',
  location: 'Taipei · Hsinchu · Open to Canada',
  email: 'wangssuwen588@gmail.com',
  github: 'https://github.com/swenwang',
  linkedin: '',
}

export const projects: Project[] = [
  {
    slug: 'microchain-SME',
    title: 'MicroChain',
    eyebrow: 'SME Credit Scoring → Blockchain Financing',
    summary: 'An SME credit assessment proposal that advanced from the IDEA FinTech quarter-finals into an implemented and award-winning model.',
    description: [
      'MicroChain developed through two connected stages. We first proposed an alternative-data credit assessment framework for small and medium-sized enterprises and presented the concept in the IDEA FinTech quarter-finals.',
      'We then moved beyond the proposal by preparing the data and training the credit-scoring model. This implementation became the working foundation of MicroChain and received an Excellence Award in the FinTech Division at NYCU’s 3rd Smart Innovation and Interdisciplinary Talent Competition.',
    ],
    year: '2025',
    role: 'Team Lead · Proposal Lead',
    result: 'IDEA FinTech Quarter-finalist · Excellence Award, FinTech Division',
    tags: ['FinTech', 'LightGBM', 'SHAP', 'Blockchain', 'Credit Risk'],
    hierarchy: ['FinTech', 'Credit Risk Assessment', 'SME Credit Scoring', 'LightGBM + SHAP', 'Alternative data → MicroChain prototype'],
    cover: './images/sme-presentation.jpeg',
    gallery: ['./images/sme-presentation.jpeg', './images/sme-team.jpeg', './images/microchain-award.jpeg'],
    phases: [
      {
        step: 'Phase 01',
        title: 'Proposal & Quarter-finals',
        subtitle: 'IDEA FinTech 2025',
        description: 'We framed the SME financing problem, designed an alternative-data credit assessment approach, and presented how LightGBM and SHAP could support both predictive performance and explainable lending decisions.',
        outcome: 'Advanced to the quarter-finals',
        images: [
          { src: './images/sme-presentation.jpeg', alt: 'Ssu-Wen presenting the SME credit assessment proposal' },
          { src: './images/sme-team.jpeg', alt: 'The SME credit assessment team at the IDEA FinTech quarter-finals' },
        ],
      },
      {
        step: 'Phase 02',
        title: 'Model Implementation & Award',
        subtitle: 'MicroChain',
        description: 'We turned the proposal into practice by preparing the data and actually training the credit-scoring model. The implemented result became part of MicroChain, our micro-enterprise financing solution.',
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
    title: 'AI-Powered Advisory Demo',
    eyebrow: 'AWS Generative AI Hackathon',
    summary: 'A team-built image recognition and conversational advisory experience created with 800+ training images and AWS PartyRock.',
    description: [
      'Our team trained an image-recognition model with more than 800 photographs and connected the result to an advisory workflow.',
      'We used AWS PartyRock to prototype a conversational assistant, then presented and tested the complete experience during the 2025 AIWave Taiwan Generative AI Applications Hackathon.',
    ],
    year: '2025',
    role: 'Team Member · Model and Product Development',
    tags: ['AWS', 'Generative AI', 'Computer Vision', 'PartyRock', 'Prototype'],
    hierarchy: ['Artificial Intelligence', 'Image Recognition', 'Advisory Application', 'Vision Model + Generative AI', '800+ images + PartyRock demo'],
    cover: './images/aws-team.jpeg',
    gallery: ['./images/aws-team.jpeg', './images/aws-working.jpeg'],
    links: [{ label: 'Watch demo', url: 'https://youtu.be/1U7-pTY64E4' }],
    featured: true,
  },
  {
    slug: 'campus-token-dapp',
    title: 'Campus Token DApp',
    eyebrow: 'Blockchain Attendance & Rewards',
    summary: 'An end-to-end Web3 architecture connecting teacher-issued attendance, smart-contract verification, a React DApp, MetaMask, and Sepolia token rewards.',
    description: [
      'In this three-person course project, I did more than connect the frontend. I organized the end-to-end system architecture across the teacher workflow, smart contracts, React DApp, MetaMask, and the Sepolia blockchain. I also implemented the frontend interactions for wallet connection, teacher/student role-based views, token balances, signed attendance claims, AToken approval, and AToken-to-BToken exchange through ethers.js.',
    ],
    year: '2026',
    role: 'Frontend DApp Developer · System Architecture Integration',
    tags: ['Solidity', 'Hardhat', 'React', 'ethers.js', 'MetaMask', 'Sepolia'],
    hierarchy: ['Blockchain', 'Token Incentive System', 'Classroom Attendance & Rewards', 'ERC-20 + Digital Signatures', 'Teacher workflow → Smart Contracts → React DApp → MetaMask → Sepolia'],
    cover: '',
    gallery: [],
    links: [{ label: 'View GitHub repository', url: 'https://github.com/swenwang/campus' }],
    featured: true,
  }]

export const experiences: Experience[] = [
  { title: 'B.B.A. in Management Science', organization: 'National Yang Ming Chiao Tung University', period: '2024 — 2028 (Expected)', description: 'Interdisciplinary study across management science, finance, data, and computer science.', type: 'Education', logo: 'https://www.nycu.edu.tw/userfiles/images/all/logo.svg', logoAlt: 'National Yang Ming Chiao Tung University logo' },
  { title: 'Cross-university Computer Science Study', organization: 'National Chengchi University', period: '2025 — Present', description: 'Coursework and project experience in computer science and financial technology.', type: 'Education', logo: 'https://www.nccu.edu.tw/var/file/0/1000/img/19/ncculogo_en_w.png', logoAlt: 'National Chengchi University logo' },
  { title: 'Project Development Officer', organization: 'NCCU FinTech Innovation Lab', period: '2026 — Present', description: 'Supporting project development, organizational systems, and the lab’s website architecture.', type: 'Leadership', logo: './images/fintech-lab-logo.svg', logoAlt: 'NCCU FinTech Lab logo' },
  { title: 'Interdisciplinary Artificial Intelligence Program', organization: 'National Yang Ming Chiao Tung University', period: '2025 — Present', description: 'Currently pursuing interdisciplinary training in artificial intelligence, connecting machine learning and data-driven methods with applications beyond computer science.', type: 'Education', logo: 'https://www.nycu.edu.tw/userfiles/images/all/logo.svg', logoAlt: 'National Yang Ming Chiao Tung University logo' },
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
