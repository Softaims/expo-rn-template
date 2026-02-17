export interface LegalSection {
  title: string;
  content?: string[];
  bullets?: string[];
}

export interface LegalDocumentScreenProps {
  title: string;
  introText: string;
  sections: LegalSection[];
}

export interface LegalContentSectionProps {
  number?: number;
  title: string;
  content?: string[];
  bullets?: string[];
  containerStyles?: string;
}
