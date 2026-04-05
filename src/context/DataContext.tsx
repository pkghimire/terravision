import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export interface SiteContent {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    onSecondaryColor: string;
    fontFamily: string;
    logo: string;
  };
  home: {
    heroHeadline: string;
    heroSubheading: string;
    heroImage: string;
    aboutPreview: string;
  };
  about: {
    content: string;
    mission: string;
    vision: string;
    coreValues: string[];
    aboutImage: string;
    team: Array<{
      id: string;
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
  }>;
  blog: Array<{
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    published: boolean;
  }>;
}

const defaultContent: SiteContent = {
  theme: {
    primaryColor: '#4F7A28', // Green
    secondaryColor: '#006D8F', // Blue
    textColor: '#1f2937', // Gray 800
    onSecondaryColor: '#ffffff', // White
    fontFamily: 'Inter, sans-serif',
    logo: 'https://images.unsplash.com/photo-1568992687345-26948fad1702?q=80&w=200&auto=format&fit=crop', // Professional abstract logo placeholder
  },
  home: {
    heroHeadline: 'Data-driven insights for a sustainable world',
    heroSubheading: 'Terra Vision Consult is an Australian consulting firm specializing in GIS, remote sensing, and environmental intelligence.',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    aboutPreview: 'We deliver innovative, data-driven solutions for complex environmental and spatial challenges.',
  },
  about: {
    content: 'Terra Vision Consult is a newly established consulting firm based in Australia, founded with a vision to deliver innovative, data-driven solutions for complex environmental and spatial challenges. The firm integrates advanced Geographic Information Systems (GIS), remote sensing technologies, and analytical modeling to provide accurate insights that support informed decision-making.\n\nWith a multidisciplinary approach, Terra Vision Consult specializes in:\n- Environmental modeling\n- Hydrological analysis\n- Conservation planning\n- Natural hazard assessment\n- Sustainable land use planning\n- GIS-based infrastructure planning\n\nThe firm bridges the gap between data and actionable strategies, contributing to resilient ecosystems, sustainable development, and smarter infrastructure planning.',
    mission: 'To bridge the gap between data and actionable strategies, contributing to resilient ecosystems and sustainable development.',
    vision: 'To be the leading provider of spatial intelligence and environmental insights in Australia and beyond.',
    coreValues: ['Innovation', 'Sustainability', 'Integrity', 'Excellence', 'Collaboration'],
    aboutImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    team: [
      {
        id: '1',
        name: 'Dr. Sarah Jenkins',
        role: 'Principal Consultant',
        bio: 'Specializing in environmental modeling and sustainable land use planning with over 15 years of experience.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: '2',
        name: 'Marcus Thorne',
        role: 'GIS Specialist',
        bio: 'Expert in spatial data analysis and remote sensing technologies for infrastructure development.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: '3',
        name: 'Elena Rodriguez',
        role: 'Environmental Scientist',
        bio: 'Focused on conservation planning and natural hazard assessment across diverse ecosystems.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop'
      }
    ],
  },
  services: [
    {
      id: '1',
      title: 'Remote Sensing & Spatial Analysis',
      description: 'Advanced analysis for environmental and social studies, including agriculture and infrastructure development focus, EIA, IEE, and GIS modeling.',
      features: ['Satellite Imagery Analysis', 'Land Cover Mapping', 'Change Detection'],
      icon: 'Globe',
    },
    {
      id: '2',
      title: 'Research & Survey',
      description: 'Comprehensive field research and spatial surveys to gather accurate ground-truth data.',
      features: ['Topographical Surveys', 'Ecological Baselines', 'Socio-economic Surveys'],
      icon: 'Map',
    },
    {
      id: '3',
      title: 'Web Mapping & Spatial Data Visualization',
      description: 'Accessible, interactive deliverables including web maps and interactive dashboards.',
      features: ['Interactive Dashboards', 'Custom Web Applications', 'Comprehensive Reporting'],
      icon: 'Layers',
    }
  ],
  blog: [
    {
      id: '1',
      title: 'The Role of GIS in Sustainable Agriculture',
      excerpt: 'How spatial data is transforming farming practices for a more sustainable future.',
      content: 'Full content here...',
      date: '2026-04-01',
      author: 'Admin',
      category: 'Agriculture',
      published: true,
    }
  ]
};

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface DataContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: any) => Promise<void>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contentDoc = doc(db, 'content', 'main');
    
    const unsubscribe = onSnapshot(contentDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SiteContent;
        setContent({
          ...defaultContent,
          ...data,
          theme: { ...defaultContent.theme, ...data.theme },
          home: { ...defaultContent.home, ...data.home },
          about: { ...defaultContent.about, ...data.about },
          services: data.services || defaultContent.services,
          blog: data.blog || defaultContent.blog,
        });
      } else {
        // Initialize with default content if it doesn't exist
        setDoc(contentDoc, defaultContent).catch(err => handleFirestoreError(err, OperationType.WRITE, 'content/main'));
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'content/main');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Apply theme colors to root using CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', content.theme.primaryColor);
    root.style.setProperty('--secondary', content.theme.secondaryColor);
    root.style.setProperty('--text-color', content.theme.textColor);
    root.style.setProperty('--on-secondary', content.theme.onSecondaryColor);
    root.style.fontFamily = content.theme.fontFamily;
  }, [content]);

  const updateContent = async (section: keyof SiteContent, data: any) => {
    const newContent = {
      ...content,
      [section]: data
    };
    
    try {
      await setDoc(doc(db, 'content', 'main'), newContent);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'content/main');
    }
  };

  return (
    <DataContext.Provider value={{ content, updateContent, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
