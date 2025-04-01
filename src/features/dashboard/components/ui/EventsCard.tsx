// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import EventCardItem from "../shared/EventCardItem";

type EventsListsType =
  | {
      id: number;
      eventImg: string;
      eventTitle: string;
      eventDate: string;
      eventTime: string;
    }[]
  | [];

const eventsLists: EventsListsType = [
  {
    id: 1,
    eventTitle: "coding: what is eaten?",
    eventDate: "12.06.24",
    eventImg: "",
    eventTime: "2:30pm",
  },
  {
    id: 2,
    eventTitle: "coding: what is eaten?",
    eventDate: "12.06.24",
    eventImg: "",
    eventTime: "2:30pm",
  },
  {
    id: 3,
    eventTitle: "coding: what is eaten?",
    eventDate: "12.06.24",
    eventImg: "",
    eventTime: "2:30pm",
  },
];

function EventsCard() {
  return (
    <ScrollArea className="">
      <div className=" flex w-max space-x-4  p-4 ">
        {eventsLists.length !== 0 ? (
          eventsLists.map(
            ({ id, eventTitle, eventImg, eventTime, eventDate }) => (
              <EventCardItem
                key={id}
                eventTitle={eventTitle}
                eventDate={eventDate}
                eventImg={eventImg}
                eventTime={eventTime}
              />
            )
          )
        ) : (
          <h2 className="font-medium text-red-700">
            Opps! Now there are no event{" "}
          </h2>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

// export
export default EventsCard;
