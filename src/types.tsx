export interface HNResponse {
  hits: {
    title: string;
    objectID: string;
    url: string;
  }[];
}

export interface Subreddit {
  data: {
    display_name: string;
    id: string;
    subscribers: number;
    title: string;
    url: string;
  };
  kind: 't5';
}

export interface Response {
  data: {
    data: {
      children: Array<Subreddit>;
    };
    kind: 'Listing';
  };
}

export interface Story {
  data: {
    author: string;
    id: string;
    score: number;
    title: string;
    url: string;
    thumbnail: string;
    subreddit_name_prefixed: string;
  };
  kind: 't3';
}
