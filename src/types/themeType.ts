export type ThemeData = {
  id: number;
  key: string;
  label: string;
  imageURL?: string;
  title: string;
  description?: string;
  backgroundColor?: string;
};

export type ThemeCategoryData = Pick<
  ThemeData,
  'id' | 'key' | 'label' | 'imageURL'
>;

export type ThemeHeroData = Pick<
  ThemeData,
  'key' | 'label' | 'title' | 'description' | 'backgroundColor'
>;
