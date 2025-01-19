export type Post = {
  slug: string;
  title: string;
  coverImage: {
    url: string;
  };
  date: string;
  author: {
    name: string;
    picture: string;
  };
  excerpt: string;
  content: any; // TODO replace by the proper type
};
