export type Work = {
  DOI: string;
  'container-title': string;
  volume: string;
  title: string;
  URL: string;
  subject: string[];
  type: string;
  publisher: string;
  published: { 'date-parts': any[][]}
}

export type WorksListResponse = {
  message: {
    items: Work[]
  }
}

export type WorkResponse = {
  message: Work;
}
