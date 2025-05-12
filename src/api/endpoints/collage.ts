export const CollageAPIs = {
  get_by_id: {
    url: (id: string) => `/collages/${id}`,
    method: "get",
  },
  update_collage_by_id: {
    url: (id: string) => `/collages/${id}`,
    method: "patch",
  },
};
