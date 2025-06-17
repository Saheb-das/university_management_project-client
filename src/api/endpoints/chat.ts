export const ChatAPIs = {
  get_all_msg_by_conv_name: {
    url: (conName: string) => `/chats/${conName}`,
    method: "get",
  },
  get_conv_by_conv_name: {
    url: "/chats/con",
    method: "get",
  },
};
