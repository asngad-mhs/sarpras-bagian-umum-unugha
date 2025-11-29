
export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Announcement {
  date: string;
  title: string;
  content: string;
}

export interface ProcedureStep {
  icon: string;
  title: string;
  description: string;
}

export interface AnalyzedRequest {
    category: string;
    summary: string;
    priority: 'Rendah' | 'Sedang' | 'Tinggi';
}
