// internal import
import apiClient from "../client";
import { ChatAPIs, HttpMethod } from "../endpoints";

// types import
import {
  ChatQueryByConvName,
  IChatsByConvNameRes,
  IConversationRes,
} from "@/features/chats/types/chat";

export async function getChatsByConvName(
  params: ChatQueryByConvName
): Promise<IChatsByConvNameRes | null> {
  const { method, url } = ChatAPIs.get_all_msg_by_conv_name;

  let newRouteSegment;
  if (params.conName.startsWith("community")) {
    newRouteSegment = "community";
  } else if (params.conName.startsWith("classroom")) {
    newRouteSegment = "classroom";
  } else {
    newRouteSegment = params.conName;
  }

  const response = await apiClient[method as HttpMethod](url(newRouteSegment), {
    params,
  });
  return response.data;
}

export async function getConversationByConName(params: {
  conName: string;
}): Promise<IConversationRes | null> {
  const { method, url } = ChatAPIs.get_conv_by_conv_name;
  const response = await apiClient[method as HttpMethod](url, {
    params,
  });
  return response.data;
}
