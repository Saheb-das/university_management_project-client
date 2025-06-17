// external import
import { io, Socket } from "socket.io-client";

const server_url = import.meta.env.VITE_SERVER_BASE_URL;

export const createSocket = (namespace: string, token: string): Socket => {
  return io(`${server_url}${namespace}`, {
    withCredentials: true,
    auth: { token },
  });
};
