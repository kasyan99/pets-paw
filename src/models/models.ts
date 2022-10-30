export interface IWeight {
  imperial: string
  metric: string
}

export interface IImage {
  id: string
  url: string
  breeds?: IBreed[]
  width: number
  height: number
  vote_id?: string
}

export interface IBreed {
  url?: string
  breeds?: IBreed[]
  width?: number
  height?: number
  favourite?: {
    id: number
  }
  weight: IWeight
  id: string
  name: string
  cfa_url: string
  vetstreet_url: string
  vcahospitals_url: string
  temperament: string
  origin: string
  country_codes: string
  country_code: string
  description: string
  life_span: string
  indoor: number
  lap: number
  alt_names: string
  adaptability: number
  affection_level: number
  child_friendly: number
  dog_friendly: number
  energy_level: number
  grooming: number
  health_issues: number
  intelligence: number
  shedding_level: number
  social_needs: number
  stranger_friendly: number
  vocalisation: number
  experimental: number
  hairless: number
  natural: number
  rare: number
  rex: number
  suppressed_tail: number
  short_legs: number
  wikipedia_url: string
  hypoallergenic: number
  reference_image_id: string
  image: IImage
  cat_friendly?: number
  bidability?: number
}

export interface FavouritesItem {
  id: number
  user_id: string
  image_id: string
  sub_id: string
  image: {
    id: string
    url: string
  }
}

export interface IVoutedItem {
  id: number
  image_id: string
  sub_id: string
  created_at: Date
  value: number
  country_code: string
  image: {
    id: string
    url: string
  }
}

export type FavByImageId = { [key: string]: string }
export type BreedsNumberById = { [key: string]: number }
