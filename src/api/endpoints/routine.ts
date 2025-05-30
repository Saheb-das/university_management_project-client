export const RoutineAPIs = {
  create_routine: {
    url: "/routines",
    method: "post",
  },
  get_routine_by_batch_id_sem_no: {
    url: (batchName: string) => `/routines/batch/${batchName}`,
    method: "get",
  },
};
