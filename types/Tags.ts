export interface Tag {
  _id: string
  tagname: string
  description: string
}

export interface TagsStore {
  loading: boolean
  error: string | null
  tags: Tag[]

  fetchTags: () => Promise<void>
  addTag: (data: Omit<Tag, "_id">) => Promise<void>
  updateTag: (id: string, data: Omit<Tag, "_id">) => Promise<void>
  deleteTag: (id: string) => Promise<void>
}
