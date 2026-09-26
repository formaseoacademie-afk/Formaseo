/**
 * Structured Data (JSON-LD) generators for FormaSEO.ma
 * Strictly adheres to Google Guidelines (no fabricated ratings, accurate business data)
 */

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'FormaSEO.ma Académie',
  url: 'https://formaseo.ma',
  logo: 'https://formaseo.ma/logo.png',
  description: 'Académie pratique de référencement naturel (SEO) et création de site WordPress à Casablanca, Maroc.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenue Mers Sultan',
    addressLocality: 'Casablanca',
    addressRegion: 'Grand Casablanca',
    postalCode: '20000',
    addressCountry: 'MA',
  },
  sameAs: [
    'https://www.linkedin.com/in/kassy-wassim',
  ],
});

export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'FormaSEO.ma - Formation SEO & Marketing Digital Casablanca',
  image: 'https://formaseo.ma/logo.png',
  '@id': 'https://formaseo.ma/#localbusiness',
  url: 'https://formaseo.ma',
  telephone: '+212600000000',
  priceRange: 'MAD',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenue Mers Sultan',
    addressLocality: 'Casablanca',
    postalCode: '20000',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.585,
    longitude: -7.618,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
});

export const getCourseSchema = ({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'FormaSEO.ma Académie',
    sameAs: 'https://formaseo.ma',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: ['In-Person', 'Online'],
    location: {
      '@type': 'Place',
      name: 'FormaSEO.ma Centre Casablanca',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Casablanca',
        addressCountry: 'MA',
      },
    },
    inLanguage: 'fr',
  },
  url,
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://formaseo.ma${item.url}`,
  })),
});
