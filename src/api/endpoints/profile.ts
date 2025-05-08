export const ProfileAPIs = {
  get_by_userId: {
    url: (id: string) => `/users/${id}`,
    method: "get",
  },
  update_profile: {
    url: (id: string) => `/users/${id}`,
    method: "patch",
  },
};
