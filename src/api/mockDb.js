// src/api/mockDb.js

// Initial Mock Data
const initialPortfolio = [
  {
    id: '1',
    slug: 'tech-startup-scale',
    title: 'Tech Startup Scale',
    category: 'Media Buying',
    shortDescription: 'Scaled ARR by 300% in 6 months using advanced Meta & Google Ads strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: '', // Add video URL if available
    client: 'FinTech Innovators',
    industry: 'Financial Technology',
    challenge: 'High CPA and low lead quality from existing campaigns.',
    solution: 'Restructured account, implemented value-based bidding, and refreshed creative testing framework.',
    results: ['300% ARR Growth', '45% reduction in CPA', '2.5x ROAS'],
    content: 'Full details of the campaign execution...',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    slug: 'ecommerce-brand-growth',
    title: 'E-commerce Brand Growth',
    category: 'Video Editing',
    shortDescription: 'High-converting TikTok and Reels creatives driving 4x ROAS.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    client: 'Luxe Apparel',
    industry: 'E-commerce / Fashion',
    challenge: 'Ad fatigue on Meta platforms leading to declining ROAS.',
    solution: 'Produced a series of high-paced, engaging short-form videos tailored for TikTok and Reels.',
    results: ['4x ROAS', 'Over 2M organic views', '50% decrease in CPM'],
    content: 'Detailed breakdown of the video creative process...',
    createdAt: new Date().toISOString()
  }
];

const initialCaseStudies = [
  {
    id: '1',
    slug: 'global-saas-launch',
    title: 'Global SaaS Product Launch',
    clientName: 'SaaS Dynamics',
    industry: 'Software',
    challenge: 'Entering a highly competitive market with low initial brand awareness.',
    strategy: 'Multi-channel approach combining LinkedIn lead gen with Google Search intent capture and YouTube awareness.',
    results: 'Generated 5,000+ qualified leads in Q1 and achieved a 3x pipeline ROI.',
    metrics: { roi: '3x', leads: '5k+', costPerLead: '$45' },
    testimonial: {
      quote: 'Their strategic approach to our launch was a game-changer.',
      author: 'Jane Doe, CMO'
    },
    featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    video: ''
  }
];

// Helper to simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

class MockDatabase {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem('mb_portfolio')) {
      localStorage.setItem('mb_portfolio', JSON.stringify(initialPortfolio));
    }
    if (!localStorage.getItem('mb_casestudies')) {
      localStorage.setItem('mb_casestudies', JSON.stringify(initialCaseStudies));
    }
  }

  // PORTFOLIO API
  async getPortfolio() {
    await delay();
    return JSON.parse(localStorage.getItem('mb_portfolio')) || [];
  }

  async getPortfolioBySlug(slug) {
    await delay();
    const items = JSON.parse(localStorage.getItem('mb_portfolio')) || [];
    return items.find(item => item.slug === slug) || null;
  }

  async createPortfolio(data) {
    await delay();
    const items = JSON.parse(localStorage.getItem('mb_portfolio')) || [];
    const newItem = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
    items.push(newItem);
    localStorage.setItem('mb_portfolio', JSON.stringify(items));
    return newItem;
  }

  async updatePortfolio(id, data) {
    await delay();
    const items = JSON.parse(localStorage.getItem('mb_portfolio')) || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Not found');
    items[index] = { ...items[index], ...data };
    localStorage.setItem('mb_portfolio', JSON.stringify(items));
    return items[index];
  }

  async deletePortfolio(id) {
    await delay();
    let items = JSON.parse(localStorage.getItem('mb_portfolio')) || [];
    items = items.filter(item => item.id !== id);
    localStorage.setItem('mb_portfolio', JSON.stringify(items));
    return true;
  }

  // CASE STUDIES API
  async getCaseStudies() {
    await delay();
    return JSON.parse(localStorage.getItem('mb_casestudies')) || [];
  }

  async getCaseStudyBySlug(slug) {
    await delay();
    const items = JSON.parse(localStorage.getItem('mb_casestudies')) || [];
    return items.find(item => item.slug === slug) || null;
  }

  async createCaseStudy(data) {
    await delay();
    const items = JSON.parse(localStorage.getItem('mb_casestudies')) || [];
    const newItem = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
    items.push(newItem);
    localStorage.setItem('mb_casestudies', JSON.stringify(items));
    return newItem;
  }

  async updateCaseStudy(id, data) {
    await delay();
    const items = JSON.parse(localStorage.getItem('mb_casestudies')) || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Not found');
    items[index] = { ...items[index], ...data };
    localStorage.setItem('mb_casestudies', JSON.stringify(items));
    return items[index];
  }

  async deleteCaseStudy(id) {
    await delay();
    let items = JSON.parse(localStorage.getItem('mb_casestudies')) || [];
    items = items.filter(item => item.id !== id);
    localStorage.setItem('mb_casestudies', JSON.stringify(items));
    return true;
  }
}

export const api = new MockDatabase();
