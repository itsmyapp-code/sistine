import { Project, Testimonial } from '@/types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'georgian-townhouse-restoration-cheltenham',
    title: 'Georgian Townhouse Interior & Cornice Restoration',
    category: 'Interior',
    location: 'Cheltenham, Gloucestershire',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: 'Complete interior restoration of a Grade II listed Georgian drawing room. Stripped degraded plaster coatings, hand-repaired intricate acanthus leaf cornicing, and applied a breathable Little Greene eggshell and matte emulsion system.',
    scopeDetails: [
      'Delicate lime plaster consolidation & fibrous plaster repairs',
      'Farrow & Ball "School House White" and "De Nimes" palette',
      'Four coats of durable oil-egg woodwork preparation on floor-to-ceiling shutters',
      'Full surface dust-free Mirka extraction sanding'
    ],
    featured: true,
    publishedAt: '2026-08-15',
  },
  {
    id: 'proj-2',
    slug: 'victorian-facade-masonry-sash-windows-bath',
    title: 'Victorian Villa Exterior Masonry & Timber Preservation',
    category: 'Exterior',
    location: 'Royal Crescent Area, Bath',
    beforeImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Weatherproof restorative paint system across Bath stone masonry, dormer fascias, and 14 sets of traditional double-hung sash windows. Utilized breathable silicate mineral coatings with a 15-year performance guarantee.',
    scopeDetails: [
      'Deep chemical wash and fungal sterilization of historic stone',
      'Keim Soldalit breathable mineral masonry paint application',
      'Dry-rot excision and Repair Care International resin stabilization',
      'Full re-cording and draught-proof perimeter beading on sash windows'
    ],
    featured: true,
    publishedAt: '2026-07-28',
  },
  {
    id: 'proj-3',
    slug: 'morris-co-hand-printed-wallpaper-cotswolds',
    title: 'Heritage Morris & Co. Botanical Wallpaper Installation',
    category: 'Wallpapering',
    location: 'Chipping Campden, Cotswolds',
    beforeImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'Precision hanging of William Morris "Strawberry Thief" archival paper across high-ceiling dining hall and vaulted alcoves with invisible seam joints and non-stretch lining paper underlay.',
    scopeDetails: [
      '1400-grade heavy lining paper cross-lined crosswise',
      'Hand-trimmed salvage edges for seamless pattern match',
      'Spongeable protective coat applied over high-traffic contact zones',
      'Satinwood woodwork matched to heritage archive ink pigments'
    ],
    featured: true,
    publishedAt: '2026-08-04',
  },
  {
    id: 'proj-4',
    slug: 'bespoke-kitchen-cabinetry-airless-spray-bristol',
    title: 'Bespoke In-Frame Kitchen Cabinetry Airless Spray Refinish',
    category: 'Restoration & Woodwork',
    location: 'Clifton, Bristol',
    beforeImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
    description: 'High-durability conversion of solid oak kitchen cabinetry from dark varnish to an ultra-smooth factory spray finish using Renner 2K polyurethane waterborne enamel.',
    scopeDetails: [
      'Complete degreasing, mechanical keyed sanding and adhesion priming',
      'High-volume low-pressure (HVLP) fine finish airless spray',
      'Renner 2K Italian polyurethane coating in 10% dead matte',
      'Hardware upgrade to brushed aged brass knurled handles'
    ],
    featured: true,
    publishedAt: '2026-09-02',
  },
  {
    id: 'proj-5',
    slug: 'edwardian-hallway-panelling-stroud',
    title: 'Edwardian Hallway & Spindles Refurbishment',
    category: 'Restoration & Woodwork',
    location: 'Stroud, Gloucestershire',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Restoration of multi-flight Edwardian staircase, tongue-and-groove wainscoting, and dado rails with high-impact scuff-resistant Benjamin Moore Scuff-X.',
    scopeDetails: [
      'Two-part timber wood-filler repairs on stepped stringers',
      'Benjamin Moore Scuff-X matte on walls and satin on high-wear balustrades',
      'Hardwood handrail stripping, wire wool burnishing and Osmo oil finish'
    ],
    featured: false,
    publishedAt: '2026-06-19',
  },
  {
    id: 'proj-6',
    slug: 'boutique-retail-showroom-cirencester',
    title: 'Boutique Commercial Interior & Facade Refit',
    category: 'Commercial',
    location: 'Market Place, Cirencester',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    description: 'Out-of-hours commercial decorative refit completed within a tight 72-hour turnaround window with zero disruption to retail trading.',
    scopeDetails: [
      'Fast-curing low-VOC Zinsser AllCoat exterior coating',
      'Commercial grade magnetic blackboard feature wall installation',
      'High-traffic polyurethane floor sealant application'
    ],
    featured: false,
    publishedAt: '2026-05-11',
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Julian & Sarah Montgomery',
    location: 'Montpellier, Cheltenham',
    projectType: 'Period Townhouse Full Interior',
    rating: 5,
    reviewText: 'Apex transformed our four-storey Georgian home with flawless attention to detail. Their dustless sanding meant our furnishings were pristine, and the decorative plaster repairs on our drawing room cornices are genuinely museum quality. Punctual, respectful, and transparent throughout.',
    source: 'Facebook',
    publishedAt: '2026-08-18',
    verifiedLink: 'https://facebook.com/reviews/apex-decorating-cheltenham',
  },
  {
    id: 'test-2',
    clientName: 'David H. Pemberton OBE',
    location: 'Lansdown, Bath',
    projectType: 'Grade II Listed Exterior & Sash Windows',
    rating: 5,
    reviewText: 'Finding tradesmen who understand traditional lime mortars, mineral paints, and historic sash window joinery is rare. The Apex team repaired decayed sills that two other firms told us had to be ripped out. Incredible craftsmanship and true pride in their trade.',
    source: 'Direct Quote',
    publishedAt: '2026-07-30',
  },
  {
    id: 'test-3',
    clientName: 'Claire & Marcus Vance',
    location: 'Painswick, Cotswolds',
    projectType: 'Feature Wallpapering & Master Suite',
    rating: 5,
    reviewText: 'We bought £180/roll designer botanical wallpaper and were terrified of improper hanging. Apex hung 9 rolls with zero visible seams, perfect alignment over difficult sloping ceilings, and finished ahead of schedule. Exceptional service.',
    source: 'Facebook',
    publishedAt: '2026-08-08',
    verifiedLink: 'https://facebook.com/reviews/apex-decorating-cheltenham',
  },
  {
    id: 'test-4',
    clientName: 'Eleanor Thorne',
    location: 'Clifton Village, Bristol',
    projectType: 'Kitchen Cabinetry Spray Refinish',
    rating: 5,
    reviewText: 'Saved us upwards of £18,000 compared to replacing our bespoke kitchen. The sprayed finish on our cabinets looks like it came straight out of a luxury showroom. Not a single drip, bubble, or rough edge.',
    source: 'Google Verified',
    publishedAt: '2026-09-05',
  },
  {
    id: 'test-5',
    clientName: 'Dr. Alistair Ross',
    location: 'Tetbury, Gloucestershire',
    projectType: 'Cottage Renovation & Timber Care',
    rating: 5,
    reviewText: 'Professional, tidy, courteous, and totally honest with quote itemisation. Every evening they vacuumed and packed their tools neatly. The final finish on our oak beams and lime-washed walls is stunning.',
    source: 'Direct Quote',
    publishedAt: '2026-06-22',
  }
];

export const BUSINESS_CONFIG = {
  name: 'Apex Decorating & Restoration',
  legalName: 'Apex Decorating & Restoration Ltd',
  registrationNo: '14892014',
  vatNumber: 'GB 419 8832 90',
  phone: '01242 898 421',
  mobile: '07700 900 842',
  email: 'hello@itsmyapp.co.uk',
  dataPrivacyLeadEmail: 'hello@itsmyapp.co.uk',
  address: '14 Imperial Square, Cheltenham, Gloucestershire, GL50 1QZ',
  coverageAreas: [
    'Cheltenham',
    'Gloucester',
    'Cotswolds & Stroud',
    'Bath & North East Somerset',
    'Bristol (Clifton & Redland)',
    'Cirencester & Tetbury'
  ],
  insuranceCoverage: '£5,000,000 Public & Employers Liability (Direct Line for Business)',
  workingHours: 'Monday – Friday: 07:30 – 17:30 | Saturday: 08:00 – 13:00',
  accreditations: [
    'City & Guilds Qualified Master Painters',
    'Dulux Select Decorators Approved',
    'Repair Care International Certified Bio-Resin Timber Restorers',
    'Farrow & Ball & Little Greene Recommended Craftsmen',
    'TrustMark Government Endorsed Quality'
  ]
};
