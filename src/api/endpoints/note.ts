export const StudyRoomAPIs = {
  create_new_material: {
    url: "/notes/materials",
    method: "post",
  },
  get_all_notes_by_batch_id: {
    url: (batchId: string) => `/notes/materials/batches/${batchId}`,
    method: "get",
  },
};
