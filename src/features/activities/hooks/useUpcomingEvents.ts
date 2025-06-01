// external import
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

// internal import
import { getUpcomingEvents } from "@/api/services/event";
import { eventsAtom } from "../recoil/eventAtom";

export const useUpcomingEvents = () => {
  const setEvents = useSetRecoilState(eventsAtom);

  const { data, isSuccess } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: getUpcomingEvents,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setEvents(data.events);
    }
  }, [data, isSuccess]);
};
