// internal import
import apiClient from "../client";
import { EventAPIs, HttpMethod } from "../endpoints";

// types import
import {
  IEventBody,
  IEventCreateRes,
  IEventsRes,
} from "@/features/activities/types/activity";

export async function createEvent(
  body: IEventBody
): Promise<IEventCreateRes | null> {
  const { method, url } = EventAPIs.create_event;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}

export async function getUpcomingEvents(
  params: any = {}
): Promise<IEventsRes | null> {
  const { method, url } = EventAPIs.get_upcoming_events;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}
